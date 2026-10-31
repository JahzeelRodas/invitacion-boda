import { designB } from '../../config/designB'
import { HeartSketch } from '../../components/decor/bIcons'
import { useReveal } from '../../hooks/useReveal'
import { Reveal } from './bShared'

/* ════════════════════════════════════════════════════════════════════════════
   4b · CALENDARIO — rejilla del mes del enlace con la fecha (21) marcada
        con un corazón latiente.
   ══════════════════════════════════════════════════════════════════════════ */

/** Letras de los días de la semana (semana iniciando en domingo). */
const WEEKDAY_LETTERS = ['D', 'L', 'M', 'M', 'J', 'V', 'S']

/** Arma las semanas del mes, domingo primero; null = hueco inicial. */
function buildCalendarWeeks(year: number, month: number): (number | null)[][] {
  const firstWeekday = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const weeks: (number | null)[][] = []
  let current: (number | null)[] = Array.from({ length: firstWeekday }, () => null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    current.push(day)
    if (current.length === 7) {
      weeks.push(current)
      current = []
    }
  }
  if (current.length > 0) {
    while (current.length < 7) current.push(null)
    weeks.push(current)
  }
  return weeks
}

export function BCalendar() {
  const { calendar } = designB
  const weeks = buildCalendarWeeks(calendar.year, calendar.month)

  return (
    <section id="b-calendario" className="bg-bPaper px-6 pb-16 pt-12 text-center sm:pb-20 sm:pt-16">
      <Reveal>
        <h2 className="font-bParis text-[42px] leading-[1.05] text-bHead sm:text-[52px]">{calendar.title}</h2>
        <p className="mt-2 font-bQuatt text-[22px] tracking-wide text-bNavy sm:text-[26px]">
          {calendar.monthName} {calendar.year}
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mx-auto mt-8 max-w-[400px] rounded-[22px] border border-bWave/50 bg-white px-3 pb-5 pt-4 shadow-[0_12px_32px_rgba(41,60,75,0.10)] sm:rounded-[26px] sm:px-6 sm:pb-6 sm:pt-5">
          <div className="grid grid-cols-7 gap-y-3 sm:gap-y-4" aria-label={`Calendario de ${calendar.monthName} ${calendar.year}`}>
            {WEEKDAY_LETTERS.map((letter, i) => (
              <span key={`${letter}-${i}`} aria-hidden="true" className="font-bQuatt text-[15px] font-bold text-bWave sm:text-[17px]">
                {letter}
              </span>
            ))}
            {weeks.flat().map((day, index) => {
              if (day === null) return <span key={`empty-${index}`} aria-hidden="true" />
              /* Día del enlace: corazón que se dibuja a lápiz y luego late. */
              if (day === calendar.day) {
                return (
                  <CalendarHeartMark
                    key={day}
                    day={day}
                    ariaLabel={`${day} de ${calendar.monthName.toLowerCase()} de ${calendar.year}`}
                    stroke={calendar.heart}
                  />
                )
              }
              return (
                <span key={day} className="font-bQuatt text-[17px] text-bBody sm:text-[19px]">
                  {day}
                </span>
              )
            })}
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <p className="mx-auto mt-6 max-w-[340px] font-bQuatt text-[19px] leading-snug text-bBody sm:text-[21px]">
          {calendar.note}
        </p>
      </Reveal>
    </section>
  )
}

/* ── Piezas internas ───────────────────────────────────────────────────────── */

/** Día destacado: al entrar en pantalla, un contorno a lápiz se dibuja solo
    (dos pasadas + sombreado), aparece el número y arranca el latido. */
function CalendarHeartMark({ day, ariaLabel, stroke }: { day: number; ariaLabel: string; stroke: string }) {
  const { ref, shown } = useReveal<HTMLSpanElement>()
  return (
    <span
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      className={`relative mx-auto grid place-items-center ${shown ? 'b-sketch-in animate-bHeartbeat' : ''}`}
    >
      <HeartSketch className="absolute h-11 w-11 sm:h-12 sm:w-12" stroke={stroke} />
      <span className="b-mark-number relative font-bAlice text-[18px] leading-none text-[#24333E] sm:text-[19px]">{day}</span>
    </span>
  )
}
