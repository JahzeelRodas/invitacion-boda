/* ────────────────────────────────────────────────────────────────────────────
   GENERADOR DE CALENDARIO (ICS)
   Crea un archivo .ics válido con los eventos del matrimonio.
   ──────────────────────────────────────────────────────────────────────────── */

import { zonedTimeToUtc } from './timezone'

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/** Convierte un instante a formato ICS en UTC: 20261205T203000Z */
function toICSDate(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  )
}

function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/** Pliega las líneas a máximo 75 octetos (requerido por la especificación). */
function foldLine(line: string): string {
  const chars = Array.from(line)
  let result = ''
  let currentLine = ''
  let currentLength = 0

  for (const char of chars) {
    const size = char.charCodeAt(0) > 127 ? 2 : 1
    if (currentLength + size > (result ? 74 : 75)) {
      result += (result ? '\r\n ' : '') + currentLine
      currentLine = char
      currentLength = size
    } else {
      currentLine += char
      currentLength += size
    }
  }

  return result + (result ? '\r\n ' : '') + currentLine
}

interface ICSVenue {
  label: string
  isoDateTime: string
  durationMinutes: number
  venueName: string
  address: string
  description?: string
}

export interface ICSOptions {
  title: string
  timeZone: string
  venues: ICSVenue[]
}

export function buildICS({ title, timeZone, venues }: ICSOptions): string {
  const stamp = new Date()
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//InvitacionBoda//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ]

  venues.forEach((venue, i) => {
    const start = zonedTimeToUtc(venue.isoDateTime, timeZone)
    const end = new Date(start.getTime() + venue.durationMinutes * 60_000)

    lines.push(
      'BEGIN:VEVENT',
      `UID:boda-${Date.now().toString(36)}-${i}@invitacion`,
      `DTSTAMP:${toICSDate(stamp)}`,
      `DTSTART:${toICSDate(start)}`,
      `DTEND:${toICSDate(end)}`,
      `SUMMARY:${escapeText(`${venue.label} — ${title}`)}`,
      `LOCATION:${escapeText(`${venue.venueName}, ${venue.address}`)}`,
      `DESCRIPTION:${escapeText(venue.description ?? '')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
    )
  })

  lines.push('END:VCALENDAR')
  return lines.map(foldLine).join('\r\n')
}

export function downloadICS(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000)
}
