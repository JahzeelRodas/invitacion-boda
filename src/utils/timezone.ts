/* ────────────────────────────────────────────────────────────────────────────
   UTILIDADES DE ZONA HORARIA
   Permiten interpretar una fecha y hora "local del evento" y convertirla
   a un instante UTC exacto, respetando el horario de verano del lugar.
   ──────────────────────────────────────────────────────────────────────────── */

/** Desfase en milisegundos de `timeZone` respecto a UTC, evaluado en `date`. */
export function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const parts: Record<string, string> = {}
  for (const part of formatter.formatToParts(date)) {
    parts[part.type] = part.value
  }

  const hour = Number(parts.hour) === 24 ? 0 : Number(parts.hour)
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    hour,
    Number(parts.minute),
    Number(parts.second),
  )

  return asUtc - date.getTime()
}

/**
 * Convierte una fecha "naive" local del evento (p. ej. "2026-12-05T17:30:00")
 * al instante UTC correspondiente en la zona horaria indicada.
 */
export function zonedTimeToUtc(localISO: string, timeZone: string): Date {
  const naive = Date.parse(`${localISO}Z`)
  if (Number.isNaN(naive)) {
    throw new Error(`Fecha inválida: "${localISO}"`)
  }

  // Dos pasadas para corregir el desfase en fronteras de horario de verano.
  let offset = getTimeZoneOffsetMs(new Date(naive), timeZone)
  let timestamp = naive - offset
  offset = getTimeZoneOffsetMs(new Date(timestamp), timeZone)
  timestamp = naive - offset

  return new Date(timestamp)
}

/** Formatea una fecha en la zona horaria del evento (para textos). */
export function formatInZone(date: Date, timeZone: string, locale = 'es-ES'): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
