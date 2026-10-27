/* ────────────────────────────────────────────────────────────────────────────
   Generador de la pieza ambiental de DEMOSTRACIÓN (WAV, sin dependencias).
   Arpegio suave (Fmaj7 · Am7 · B♭maj7 · C6) a 72 bpm, 22,05 kHz, mono.
   Es un marcador de lugar: sustitúyela por una canción con licencia.
     npm run assets:audio
   ──────────────────────────────────────────────────────────────────────────── */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'audio')
mkdirSync(outDir, { recursive: true })

/* ── Parámetros ─────────────────────────────────────────────────────────── */

const SAMPLE_RATE = 22_050
const BPM = 72
const BEAT = 60 / BPM
const BAR = BEAT * 4
const EIGHTH = BEAT / 2
const BARS = 4
const DURATION = BAR * BARS // 13,333 s → bucle perfecto
const SAMPLES = Math.round(DURATION * SAMPLE_RATE) // 294.000

const TAU = 0.9 // decaimiento de las notas de arpegio (s)
const MASTER = 0.34
const DETUNE = 0.0012

/* ── Frecuencias ────────────────────────────────────────────────────────── */

const SEMITONES = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 }

function freqOf(note) {
  const match = /^([A-G])(b|#)?(-?\d)$/.exec(note)
  if (!match) throw new Error(`Nota inválida: ${note}`)
  const [, letter, accidental = '', octave] = match
  let semis = SEMITONES[letter]
  if (accidental === 'b') semis -= 1
  if (accidental === '#') semis += 1
  const midi = 69 + semis + (Number(octave) - 4) * 12
  return 440 * Math.pow(2, midi / 12)
}

const CHORDS = [
  ['F3', 'A3', 'C4', 'E4'], // Fmaj7
  ['A3', 'C4', 'E4', 'G4'], // Am7
  ['Bb3', 'D4', 'F4', 'A4'], // Bbmaj7
  ['C4', 'E4', 'G4', 'A4'], // C6
]

const BASS = ['F2', 'A2', 'Bb2', 'C3']
const PATTERN = [0, 1, 2, 3, 2, 1, 2, 3] // 8 corcheas por compás

/* ── Síntesis ───────────────────────────────────────────────────────────── */

const buffer = new Float64Array(SAMPLES)
const TAU_ATTACK = 0.01

function addNote({ freq, start, velocity, tau, attack = TAU_ATTACK, length = 3.2, partials = [[1, 1], [2, 0.32], [3, 0.12]] }) {
  const begin = Math.floor(start * SAMPLE_RATE)
  const end = Math.min(SAMPLES, Math.floor((start + length) * SAMPLE_RATE))

  for (let i = begin; i < end; i++) {
    const t = (i - begin) / SAMPLE_RATE
    const attackGain = t < attack ? t / attack : 1
    const env = attackGain * Math.exp(-t / tau)

    let sample = 0
    for (const [harmonic, amp] of partials) {
      const w = 2 * Math.PI * freq * harmonic * t
      // Dos voces desafinadas levemente: efecto cálido de piano preparado.
      sample += amp * (Math.sin(w * (1 - DETUNE)) + Math.sin(w * (1 + DETUNE))) * 0.5
    }
    buffer[i] += velocity * env * sample
  }
}

function addBass({ freq, start, duration }) {
  const begin = Math.floor(start * SAMPLE_RATE)
  const end = Math.min(SAMPLES, Math.floor((start + duration) * SAMPLE_RATE))
  const attack = 0.4
  const release = 0.45

  for (let i = begin; i < end; i++) {
    const t = (i - begin) / SAMPLE_RATE
    const rel = Math.min(1, (end - i) / SAMPLE_RATE / release)
    const env = Math.min(1, t / attack) * rel
    const w = 2 * Math.PI * freq * t
    buffer[i] += 0.13 * env * (Math.sin(w) + 0.22 * Math.sin(2 * w))
  }
}

// Compases
for (let bar = 0; bar < BARS; bar++) {
  const barStart = bar * BAR
  const chord = CHORDS[bar]

  // Bajo sostenido
  addBass({ freq: freqOf(BASS[bar]), start: barStart, duration: BAR })

  // Arpegio de corcheas
  PATTERN.forEach((index, step) => {
    const velocity = step % 2 === 0 ? 0.5 : 0.38
    addNote({
      freq: freqOf(chord[index]),
      start: barStart + step * EIGHTH,
      velocity,
      tau: TAU,
    })
  })
}

// Nota alta de destello (barra 2 y 4, en la 4.ª corchea)
addNote({ freq: freqOf('F5'), start: BAR + 3 * EIGHTH, velocity: 0.16, tau: 1.4, length: 2.4, partials: [[1, 1], [2, 0.18]] })
addNote({ freq: freqOf('A4'), start: BAR * 3 + 3 * EIGHTH, velocity: 0.16, tau: 1.4, length: 2.4, partials: [[1, 1], [2, 0.18]] })

/* ── Render a WAV 16-bit ────────────────────────────────────────────────── */

const fadeSamples = Math.round(0.008 * SAMPLE_RATE)
const pcm = Buffer.alloc(SAMPLES * 2)

for (let i = 0; i < SAMPLES; i++) {
  let value = buffer[i] * MASTER
  if (i < fadeSamples) value *= i / fadeSamples
  if (i >= SAMPLES - fadeSamples) value *= (SAMPLES - 1 - i) / fadeSamples

  // Limitación suave por si algún pico supera 1.0
  value = Math.tanh(value)
  const int = Math.max(-1, Math.min(1, value))
  pcm.writeInt16LE(Math.round(int * 32_767), i * 2)
}

const dataLength = pcm.length
const header = Buffer.alloc(44)
header.write('RIFF', 0, 'ascii')
header.writeUInt32LE(36 + dataLength, 4)
header.write('WAVE', 8, 'ascii')
header.write('fmt ', 12, 'ascii')
header.writeUInt32LE(16, 16) // tamaño del bloque fmt
header.writeUInt16LE(1, 20) // PCM
header.writeUInt16LE(1, 22) // mono
header.writeUInt32LE(SAMPLE_RATE, 24)
header.writeUInt32LE(SAMPLE_RATE * 2, 28) // byte rate
header.writeUInt16LE(2, 32) // block align
header.writeUInt16LE(16, 34) // bits
header.write('data', 36, 'ascii')
header.writeUInt32LE(dataLength, 40)

writeFileSync(join(outDir, 'ambience-demo.wav'), Buffer.concat([header, pcm]))
console.log(`✔ public/audio/ambience-demo.wav creado (${DURATION.toFixed(1)} s, ${(dataLength / 1024).toFixed(0)} KB)`)
