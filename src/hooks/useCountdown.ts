import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  finished: boolean
}

/**
 * Cuenta regresiva hacia `target` (instante UTC ya convertido desde la
 * zona horaria del evento). Se actualiza cada segundo y gestiona fechas
 * pasadas devolviendo `finished = true`.
 */
export function useCountdown(target: Date | null): Countdown {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!target) return
    const id = window.setInterval(() => setNow(Date.now()), 1_000)
    return () => window.clearInterval(id)
  }, [target])

  const remaining = target ? target.getTime() - now : 0
  const clamped = Math.max(0, remaining)

  return {
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor((clamped % 86_400_000) / 3_600_000),
    minutes: Math.floor((clamped % 3_600_000) / 60_000),
    seconds: Math.floor((clamped % 60_000) / 1_000),
    finished: target !== null && remaining <= 0,
  }
}

export function padTwo(value: number): string {
  return String(value).padStart(2, '0')
}
