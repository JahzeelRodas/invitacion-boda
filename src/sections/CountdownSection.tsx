import { useMemo } from 'react'
import { wedding } from '../config/wedding'
import { zonedTimeToUtc } from '../utils/timezone'
import { padTwo, useCountdown } from '../hooks/useCountdown'
import Reveal from '../components/animation/Reveal'
import { SectionHeader } from '../components/layout/SectionHeader'

interface UnitProps {
  value: string
  label: string
  delay: number
}

function Unit({ value, label, delay }: UnitProps) {
  return (
    <Reveal delay={delay} className="flex flex-col items-center">
      <span className="font-serif text-[clamp(2.6rem,9vw,4.5rem)] font-medium leading-none text-ink tabular-nums">
        {value}
      </span>
      <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.32em] text-warm">{label}</span>
    </Reveal>
  )
}

function Colon({ delay }: { delay: number }) {
  return (
    <Reveal delay={delay} aria-hidden="true" className="hidden items-start sm:flex">
      <span className="font-serif text-4xl font-light text-gold/60 md:text-5xl">:</span>
    </Reveal>
  )
}

/** Cuenta regresiva hacia la fecha del matrimonio. */
export default function CountdownSection() {
  const target = useMemo(() => {
    try {
      return zonedTimeToUtc(wedding.date.isoDateTime, wedding.date.timeZone)
    } catch {
      return null
    }
  }, [])

  const { days, hours, minutes, seconds, finished } = useCountdown(target)

  return (
    <section id="cuenta" className="py-24 md:py-32" aria-labelledby="cuenta-title">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionHeader eyebrow={finished ? '¡Por fin es hoy!' : 'Cuenta regresiva'} title={finished ? 'Nos casamos' : 'Falta poco para el gran día'} />

        {finished ? (
          <Reveal>
            <p className="mt-10 font-serif text-2xl italic text-ink md:text-3xl">
              {wedding.phrases.heroKicker} ¡Nos vemos ahí!
            </p>
          </Reveal>
        ) : (
          <div className="mt-12 flex items-start justify-center gap-6 sm:gap-8" role="timer" aria-label="Tiempo restante hasta el matrimonio">
            <Unit value={padTwo(days)} label="Días" delay={0} />
            <Colon delay={0.05} />
            <Unit value={padTwo(hours)} label="Horas" delay={0.05} />
            <Colon delay={0.1} />
            <Unit value={padTwo(minutes)} label="Minutos" delay={0.1} />
            <Colon delay={0.15} />
            <Unit value={padTwo(seconds)} label="Segundos" delay={0.15} />
          </div>
        )}

        <Reveal delay={0.2}>
          <p className="mt-12 text-xs uppercase tracking-[0.3em] text-warm">{wedding.date.displayLong}</p>
        </Reveal>
      </div>
    </section>
  )
}
