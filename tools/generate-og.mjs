/* ────────────────────────────────────────────────────────────────────────────
   Generador de imagen Open Graph y apple-touch-icon (PNG puro, sin dependencias).
   Crea public/og-image.png (1200×630) y public/apple-touch-icon.png (180×180).
   Son marcadores elegantes: sustitúyelos por arte real si lo deseas.
     npm run assets:og
   ──────────────────────────────────────────────────────────────────────────── */

import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/* ── Codificador PNG mínimo (RGB de 8 bits) ─────────────────────────────── */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    table[n] = c >>> 0
  }
  return table
})()

function crc32(bytes) {
  let crc = 0xffffffff
  for (const byte of bytes) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([length, typeBuf, data, crc])
}

function encodePNG(pixels, width, height) {
  // pixels: Uint8Array RGB tripletes, fila a fila.
  const raw = Buffer.alloc((width * 3 + 1) * height)
  let offset = 0
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0 // filtro: none
    pixels.copy ? pixels.copy(raw, offset, y * width * 3, (y + 1) * width * 3) : Buffer.from(pixels.buffer, y * width * 3, width * 3).copy(raw, offset)
    offset += width * 3
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // profundidad
  ihdr[9] = 2 // color: truecolor
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/* ── Imagen OG 1200×630: degradado marfil→champagne con marco dorado ─────── */

const W = 1200
const H = 630
const px = Buffer.alloc(W * H * 3)

const IVORY = [248, 245, 239]
const AZURE = [201, 216, 242]
const ELECTRIC = [31, 81, 255]

function blend(base, overlay, amount) {
  return [
    Math.round(base[0] + (overlay[0] - base[0]) * amount),
    Math.round(base[1] + (overlay[1] - base[1]) * amount),
    Math.round(base[2] + (overlay[2] - base[2]) * amount),
  ]
}

function setPixel(x, y, color) {
  const i = (y * W + x) * 3
  px[i] = color[0]
  px[i + 1] = color[1]
  px[i + 2] = color[2]
}

for (let y = 0; y < H; y++) {
  const t = y / (H - 1)
  const row = blend(IVORY, AZURE, t)
  for (let x = 0; x < W; x++) {
    // Leve sombreado diagonal para dar profundidad.
    const shade = ((x / W) * 0.08 * (1 - t)) + t * 0.04
    const color = blend(row, AZURE, shade * 0.5)
    setPixel(x, y, color)
  }
}

// Marco doble dorado
function rectOutline(x0, y0, x1, y1, thickness, color) {
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const onEdge = x <= x0 + thickness - 1 || x >= x1 - thickness + 1 || y <= y0 + thickness - 1 || y >= y1 - thickness + 1
      if (onEdge) setPixel(x, y, color)
    }
  }
}
rectOutline(40, 40, W - 41, H - 41, 2, ELECTRIC)
rectOutline(50, 50, W - 51, H - 51, 1, blend(ELECTRIC, IVORY, 0.35))

// Ornamento central: rombo + filetes horizontales
const cx = W / 2
const cy = H / 2
const r = 24
for (let y = cy - r; y <= cy + r; y++) {
  const dx = r - Math.abs(y - cy)
  for (let x = cx - dx; x <= cx + dx; x++) {
    const isEdge = Math.abs(dx - Math.abs(x - cx)) < 1.6
    if (isEdge) setPixel(x, y, ELECTRIC)
  }
}
for (let x = cx - 260; x <= cx - r - 18; x++) setPixel(x, cy, ELECTRIC)
for (let x = cx + r + 18; x <= cx + 260; x++) setPixel(x, cy, ELECTRIC)
for (let x = cx - 300; x <= cx - 266; x++) setPixel(x, cy, blend(ELECTRIC, IVORY, 0.4))
for (let x = cx + 266; x <= cx + 300; x++) setPixel(x, cy, blend(ELECTRIC, IVORY, 0.4))

writeFileSync(join(root, 'public', 'og-image.png'), encodePNG(px, W, H))
console.log('✔ public/og-image.png creado (1200×630)')

/* ── Apple touch icon 180×180 ───────────────────────────────────────────── */

const S = 180
const icon = Buffer.alloc(S * S * 3)
for (let y = 0; y < S; y++) {
  for (let x = 0; x < S; x++) {
    const i = (y * S + x) * 3
    const t = (y / (S - 1)) * 0.5
    icon[i] = Math.round(IVORY[0] + (AZURE[0] - IVORY[0]) * t)
    icon[i + 1] = Math.round(IVORY[1] + (AZURE[1] - IVORY[1]) * t)
    icon[i + 2] = Math.round(IVORY[2] + (AZURE[2] - IVORY[2]) * t)
  }
}
const ccx = S / 2
const ccy = S / 2
for (let y = 0; y < S; y++) {
  for (let x = 0; x < S; x++) {
    const dist = Math.hypot(x - ccx, y - ccy)
    if (dist >= 62 && dist <= 65) {
      const i = (y * S + x) * 3
      icon[i] = ELECTRIC[0]
      icon[i + 1] = ELECTRIC[1]
      icon[i + 2] = ELECTRIC[2]
    }
  }
}
writeFileSync(join(root, 'public', 'apple-touch-icon.png'), encodePNG(icon, S, S))
console.log('✔ public/apple-touch-icon.png creado (180×180)')
