import { useMemo } from 'react'
import { wedding } from '../config/wedding'
import { zonedTimeToUtc } from '../utils/timezone'
import { useCountdown, padTwo } from '../hooks/useCountdown'
import { buildICS, downloadICS } from '../utils/ics'
import { HeartShape } from '../components/decor/ornaments'
import { FlowerBranch } from '../components/decor/ornaments'

/**
 * Tarjeta azul marino con "Info de la recepción": intro, hora, fecha grande,
 * bienvenida / entrada de los novios, cuenta regresiva, mini-calendario con
 * el día señalado y el enlace para guardarlo. Al pie, el botón RSVP.
 */
export default function ReceptionInfoCard({ onOpenRsvp }: { onOpenRsvp: () => void }) {
  const { couple, date, schedule } = wedding
  const { receptionCard, reception, ceremony } = schedule

  const target = useMemo(() => {
    try {
      return zonedTimeToUtc(reception.isoDateTime, date.timeZone)
    } catch {
      return null
    }
  }, [reception.isoDateTime, date.timeZone])

  const countdown = useCountdown(target)

  const addToCalendar = () => {
    const ics = buildICS({
      title: `Boda de ${couple.groomName} y ${couple.brideName}`,
      timeZone: date.timeZone,
      venues: [
        { label: ceremony.label, isoDateTime: ceremony.isoDateTime, durationMinutes: ceremony.durationMinutes, venueName: ceremony.venueName, address: '' },
        { label: reception.label, isoDateTime: reception.isoDateTime, durationMinutes: reception.durationMinutes, venueName: reception.venueName, address: reception.address },
      ],
    })
    downloadICS('invitacion-boda.ics', ics)
  }

  const finished = countdown.finished

  return (
    <section className="relative z-10 mx-auto mb-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      {/* decoración flotante */}
      <span aria-hidden="true" className="pointer-events-none absolute -left-[44%] top-[22%] z-0 block w-[54%]">
        <span className="block" style={{ animation: 'dbFloat 6s ease-in-out 0.3s infinite', willChange: 'transform' }}>
          <FlowerBranch className="block w-full -scale-x-100 text-navy/40 drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" />
        </span>
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-[5%] left-[84%] z-0 block w-[38%]">
        <span className="block" style={{ animation: 'dbFloat 5.4s ease-in-out 0.9s infinite', willChange: 'transform' }}>
          <FlowerBranch className="block w-full -rotate-90 text-navy/40 drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" />
        </span>
      </span>

      <div className="relative overflow-hidden rounded-[10px] px-5 py-9 text-center shadow-card">
        <div aria-hidden="true" className="absolute inset-0 rounded-[10px] bg-navy" />
        <div aria-hidden="true" className="paper-noise--dark absolute inset-0 rounded-[10px] opacity-60" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-center text-[20px] font-bold uppercase tracking-[0.03em] font-serif text-mist">
            {receptionCard.title}
          </h2>

          {/* intro + hora */}
          <div className="relative flex flex-col items-center gap-4 text-center font-serif md:gap-5">
            <h3 className="flex flex-col items-center text-[20px] font-normal uppercase text-mist md:text-[26px]">
              {receptionCard.intro}
            </h3>
            <div className="flex w-full max-w-[150px] min-w-max items-center justify-between gap-x-3 whitespace-nowrap text-[13px] uppercase text-mist/70 md:text-[15px]">
              <span>{reception.timeLabel.replace('A LAS ', '')}</span>
              <span>{date.weekday}</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-mist">
              <span className="font-serif text-[46px] leading-none md:text-[52px]">{date.day}</span>
              <div aria-hidden="true" className="h-[46px] w-px bg-mist/45" />
              <div className="flex flex-col items-start justify-center gap-1 text-left">
                <span className="text-[12px] uppercase md:text-[16px]">{date.monthName}</span>
                <span className="text-[18px] md:text-[24px]">{date.year}</span>
              </div>
            </div>
          </div>

          {/* bienvenida / entrada */}
          <div className="mt-1 flex items-center justify-center gap-8">
            <TimePair label={receptionCard.welcomeLabel} value={receptionCard.welcomeTime} />
            <TimePair label={receptionCard.entranceLabel} value={receptionCard.entranceTime} />
          </div>

          {/* cuenta regresiva */}
          <div className="mt-2 flex flex-col items-center gap-3">
            <h2 className="font-serif text-mist/70 md:text-lg">{receptionCard.countdownLabel}</h2>
            {finished ? (
              <p className="font-display text-3xl text-mist">¡Por fin es el gran día!</p>
            ) : (
              <div className="flex items-stretch justify-center gap-3 text-mist">
                <CountBlock value={String(countdown.days)} label="Días" />
                <CountBlock value={padTwo(countdown.hours)} label="Horas" />
                <CountBlock value={padTwo(countdown.minutes)} label="Min" />
                <CountBlock value={padTwo(countdown.seconds)} label="Seg" />
              </div>
            )}
          </div>

          {/* mini-calendario */}
          <div className="mt-2 w-fit max-w-full overflow-hidden rounded-[10px] bg-mist px-4 pb-4 pt-2">
            <CalendarStrip year={date.year} monthIndex={new Date(reception.isoDateTime).getMonth()} eventDay={date.day} monthTitle={`${capitalizedMonth(reception.isoDateTime)} ${date.year}`} />
          </div>

          {/* guardar recordatorio */}
          <button
            type="button"
            onClick={addToCalendar}
            className="inline-flex items-center justify-center gap-2 text-sm underline underline-offset-4 text-mist/90 transition-colors hover:text-mist"
          >
            {receptionCard.calendarLinkLabel}
          </button>
        </div>
      </div>

      {/* botón RSVP debajo de la tarjeta */}
      <div className="relative z-10 mt-6 flex w-full items-center justify-center">
        <button type="button" onClick={onOpenRsvp} className="btn-navy--sm shadow-[0_4px_14px_rgba(0,34,76,0.35)] transition-transform hover:scale-[1.03]">
          <span className="relative z-10">{receptionCard.rsvpLabel}</span>
          <span aria-hidden="true" className="btn-shine" />
        </button>
      </div>
    </section>
  )
}

/* ── Piezas internas ───────────────────────────────────────────────────────── */

function TimePair({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-[10px] uppercase tracking-[0.1em] text-mist/70 md:text-xs">{label}</span>
      <span className="mt-1 text-lg font-medium text-mist md:text-xl">{value}</span>
    </div>
  )
}

function CountBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-[3.2rem] flex-col items-center rounded-lg bg-mist/10 px-2 py-2">
      <span className="font-serif text-[26px] leading-none tabular-nums text-mist md:text-[30px]">{value}</span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-mist/70">{label}</span>
    </div>
  )
}

/** Devuelve "Noviembre" (capitalizado) a partir de la fecha ISO del evento. */
function capitalizedMonth(isoDateTime: string): string {
  const month = new Date(`${isoDateTime.slice(0, 10)}T12:00:00`)
  const name = month.toLocaleDateString('es-ES', { month: 'long' })
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/** Semana del 1.º del mes considerando lunes como primer día (0..6). */
function mondayFirstOffset(year: number, monthIndex: number): number {
  return (new Date(year, monthIndex, 1).getDay() + 6) % 7
}

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate()
}

function CalendarStrip({
  year,
  monthIndex,
  eventDay,
  monthTitle,
}: {
  year: number
  monthIndex: number
  eventDay: number
  monthTitle: string
}) {
  const weekdays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
  const offset = mondayFirstOffset(year, monthIndex)
  const days = daysInMonth(year, monthIndex)
  const weeks = Math.ceil((offset + days) / 7)

  return (
    <div className="mx-auto w-[280px] overflow-hidden rounded-lg md:w-[330px]" style={{ color: '#00224C' }}>
      <div
        className="border-b py-2.5 text-center font-script text-[25px] leading-tight"
        style={{ borderColor: 'rgba(0,34,76,0.27)' }}
      >
        {monthTitle}
      </div>

      <div className="grid grid-cols-7 border-b-2 border-navy">
        {weekdays.map((day) => (
          <div key={day} className="py-1.5 text-center text-[10px] font-medium opacity-60 md:text-[11px]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
        {/* huecos iniciales */}
        {Array.from({ length: offset }, (_, i) => (
          <div key={`gap-${i}`} className="flex h-[30px] items-center justify-center md:h-[34px]" />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const day = i + 1
          const isEvent = day === eventDay
          return (
            <div key={day} className="flex h-[30px] items-center justify-center md:h-[34px]">
              {isEvent ? (
                <span className="relative flex h-[24px] w-[26px] items-center justify-center md:h-[28px] md:w-[30px]">
                  <HeartShape className="absolute inset-0 h-full w-full text-navy drop-shadow-sm" />
                  <span className="relative z-10 text-[11px] font-bold text-white md:text-[12px]">{day}</span>
                </span>
              ) : (
                <span className="text-[12px] md:text-[13px]">{day}</span>
              )}
            </div>
          )
        })}
        {/* completar la última fila con huecos */}
        {Array.from({ length: weeks * 7 - (offset + days) }, (_, i) => (
          <div key={`tail-${i}`} className="flex h-[30px] items-center justify-center md:h-[34px]" />
        ))}
      </div>
    </div>
  )
}
