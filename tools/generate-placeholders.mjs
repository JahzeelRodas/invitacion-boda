/* ────────────────────────────────────────────────────────────────────────────
   Generador de imágenes de marcador (placeholders).
   Crea SVG elegantes en /public/images para que la invitación se vea pulida
   incluso antes de subir las fotografías reales. Ejecutar con:
     npm run assets:placeholders
   ──────────────────────────────────────────────────────────────────────────── */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'images')
mkdirSync(outDir, { recursive: true })

const GOLD = '#B49A67'
const INK = '#292723'
const WARM = '#77716A'

// Duotonos suaves tomados de la paleta de la invitación.
const TONES = [
  ['#F2EADC', '#DCC9AC'],
  ['#F6F2E9', '#E5D9C4'],
  ['#EAE2D3', '#CFBD9F'],
  ['#F0E4D2', '#CBB089'],
]

function frame(w, h, inset) {
  return [
    `<rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}" fill="none" stroke="${GOLD}" stroke-opacity="0.5" stroke-width="1.4"/>`,
    `<rect x="${inset + 7}" y="${inset + 7}" width="${w - (inset + 7) * 2}" height="${h - (inset + 7) * 2}" fill="none" stroke="${GOLD}" stroke-opacity="0.28" stroke-width="0.7"/>`,
  ].join('')
}

function ornament(cx, cy, scale = 1) {
  return [
    `<g transform="translate(${cx},${cy})" stroke="${GOLD}" fill="none">`,
    `  <line x1="${-96 * scale}" y1="0" x2="${-20 * scale}" y2="0" stroke-opacity="0.55"/>`,
    `  <rect x="${-5.5 * scale}" y="${-5.5 * scale}" width="${11 * scale}" height="${11 * scale}" transform="rotate(45)" stroke-opacity="0.85"/>`,
    `  <line x1="${20 * scale}" y1="0" x2="${96 * scale}" y2="0" stroke-opacity="0.55"/>`,
    `</g>`,
  ].join('')
}

function svg({ w, h, label, sub, toneIndex, angle = 0 }) {
  const [c0, c1] = TONES[toneIndex % TONES.length]
  const cx = w / 2
  const cy = h / 2
  const fs = Math.max(15, Math.min(26, Math.round(Math.min(w, h) * 0.045)))
  const subFs = Math.max(11, Math.round(fs * 0.55))
  const diagonals = [
    { x1: 0, y1: 0, x2: 1, y2: 1 },
    { x1: 1, y1: 0, x2: 0, y2: 1 },
    { x1: 0, y1: 0, x2: 0, y2: 1 },
    { x1: 0, y1: 0, x2: 1, y2: 0 },
  ]
  const d = diagonals[toneIndex % diagonals.length]

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="${d.x1}" y1="${d.y1}" x2="${d.x2}" y2="${d.y2}">
      <stop offset="0" stop-color="${c0}"/>
      <stop offset="1" stop-color="${c1}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${frame(w, h, Math.round(Math.min(w, h) * 0.055))}
  ${ornament(cx, cy - fs * 1.6, Math.min(1.2, Math.max(0.7, Math.min(w, h) / 700)))}
  <text x="${cx}" y="${cy + fs * 1.7}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fs}" letter-spacing="${Math.round(fs * 0.28)}" fill="${INK}" fill-opacity="0.82" style="text-transform:uppercase">${label.toUpperCase()}</text>
  <text x="${cx}" y="${cy + fs * 1.7 + subFs * 2.6}" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="${subFs}" fill="${WARM}" fill-opacity="0.6">${sub}</text>
</svg>
`
}

const IMAGES = [
  { file: 'hero-couple.svg', w: 1200, h: 1600, label: 'Fotografía principal' },
  { file: 'story-1.svg', w: 900, h: 1150, label: 'Historia · 01' },
  { file: 'story-2.svg', w: 900, h: 1150, label: 'Historia · 02' },
  { file: 'story-3.svg', w: 900, h: 1150, label: 'Historia · 03' },
  { file: 'gallery-1.svg', w: 800, h: 1200, label: 'Galería · 01' },
  { file: 'gallery-2.svg', w: 1000, h: 700, label: 'Galería · 02' },
  { file: 'gallery-3.svg', w: 900, h: 900, label: 'Galería · 03' },
  { file: 'gallery-4.svg', w: 900, h: 1250, label: 'Galería · 04' },
  { file: 'gallery-5.svg', w: 1000, h: 720, label: 'Galería · 05' },
  { file: 'gallery-6.svg', w: 800, h: 1050, label: 'Galería · 06' },
  { file: 'gallery-7.svg', w: 950, h: 950, label: 'Galería · 07' },
  { file: 'gallery-8.svg', w: 880, h: 1180, label: 'Galería · 08' },
  { file: 'band.svg', w: 1200, h: 800, label: 'Grupo musical' },
  { file: 'dress-1.svg', w: 700, h: 900, label: 'Inspiración · 01' },
  { file: 'dress-2.svg', w: 700, h: 900, label: 'Inspiración · 02' },
  { file: 'closing.svg', w: 1200, h: 1500, label: 'Fotografía de cierre' },
]

let i = 0
for (const image of IMAGES) {
  const content = svg({
    w: image.w,
    h: image.h,
    label: image.label,
    sub: `Reemplázame: /public/images/${image.file}`,
    toneIndex: i++,
  })
  writeFileSync(join(outDir, image.file), content, 'utf8')
}

console.log(`✔ ${IMAGES.length} imágenes de marcador creadas en public/images/`)
