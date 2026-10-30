import { useMemo } from 'react'
import { designB } from '../../config/designB'
import { useCountdown, padTwo } from '../../hooks/useCountdown'
import { zonedTimeToUtc } from '../../utils/timezone'
import { CalendarHeart, HeartsDoodle, TagIcon } from '../../components/decor/bIcons'
import { WaveBand, WaveOverPhoto } from '../../components/decor/bWaves'
import { Reveal, TintedPhoto, TapHint } from './bShared'

/* ════════════════════════════════════════════════════════════════════════════
   4 · FECHA — foto con tinte + fecha larga + ¡NOS CASAMOS! + cuenta regresiva
       + botón para agendar.
   ══════════════════════════════════════════════════════════════════════════ */

export function BDateCountdown() {
  const { date } = designB
  const target = useMemo(() => {
    try {
      return zonedTimeToUtc(date.startLocal, date.timeZone)
    } catch {
      return null
    }
  }, [date.startLocal, date.timeZone])
  const countdown = useCountdown(target)
  const cells = [
    { value: countdown.days, label: date.labels.days },
    { value: countdown.hours, label: date.labels.hours },
    { value: countdown.minutes, label: date.labels.minutes },
    { value: countdown.seconds, label: date.labels.seconds },
  ]
  const finished = countdown.finished

  return (
    <TintedPhoto
      id="b-fecha"
      src={date.countdownPhoto}
      alt={date.photoAlt}
      /* 🟢 Añadimos un margen superior negativo (-mt-6 sm:-mt-10) para que la foto suba más */
      className="b-fecha relative -mt-6 h-[590px] overflow-visible sm:-mt-10 sm:h-[660px]"
      overClass="bg-[#394C5B]/55"
      position="center 32%"
    >
      {/* 🟢 Aumentamos ligeramente el desplazamiento negativo de la onda para solapar mejor */}
      <WaveOverPhoto color="#293C4B" flip={true} className="-top-[42px] sm:-top-[58px]" />

      {/* veladuras para que el texto respire arriba y abajo */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-0 h-24 bg-gradient-to-b from-[#24333E]/75 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-[#24333E]/75 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 py-9 text-center sm:py-11">
        <HeartsDoodle className="w-16 opacity-90" />

        <div>
          <Reveal>
            <p className="font-bQuatt text-[21px] text-white sm:text-[24px]">{date.longLine}</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-1 font-bQuatt text-[26px] tracking-[0.16em] text-white sm:text-[30px]">
              {finished ? '' : date.short}
            </p>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-8 font-bParis text-[34px] text-white sm:text-[40px]">{date.labels.before}</p>
            <CountdownRow cells={cells} />
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="relative">
            <a
              href={date.gcalUrls[0]}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-[24px] rounded-br-[46px] bg-white/85 px-6 py-3 font-bQuatt text-[19px] text-[#31495A] shadow-[0_8px_24px_rgba(20,35,45,0.28)] transition-colors hover:bg-white sm:text-[21px]"
            >
              <CalendarHeart className="h-9 w-9" stroke="#31495A" />
              {date.calendarLabel}
            </a>
            <TapHint className="absolute -right-12 bottom-0 hidden sm:inline-block" stroke="#fff" />
          </div>
        </Reveal>
      </div>
    </TintedPhoto>
  )
}

function CountdownRow({ cells }: { cells: { value: number; label: string }[] }) {
  return (
    <div className="mx-auto mt-4 flex max-w-[420px] items-end justify-between px-3 sm:px-5">
      {cells.map((cell, i) => (
        <span key={cell.label} className="flex items-end">
          <span className="block min-w-[58px] text-center sm:min-w-[66px]">
            <span className="block font-bAlice text-[42px] leading-none text-white sm:text-[56px]">
              {padTwo(cell.value)}
            </span>
            <span className="mt-1.5 block font-bQuatt text-[15px] tracking-wide text-white/85 sm:text-[17px]">
              {cell.label}
            </span>
          </span>
          {i < cells.length - 1 ? (
            <span aria-hidden="true" className="mb-7 font-bAlice text-[30px] text-white/85 sm:mb-8 sm:text-[40px]">
              :
            </span>
          ) : null}
        </span>
      ))}
    </div>
  )
}

/* ── 5 · ¡HEMOS RESERVADO! — banda con el número grande y la etiqueta. ──── */

export function BPases() {
  const { pases } = designB
  return (
    <WaveBand id="b-pases" band="navy" topWave bottomWave>
      <div className="px-6 pb-12 pt-10 text-center sm:pb-16 sm:pt-12">
        <Reveal>
          <p className="font-bParis text-[38px] text-white sm:text-[48px]">{pases.title}</p>
        </Reveal>
        <Reveal delay={110}>
          <span className="mt-5 flex items-center justify-center gap-3.5">
            <span className="font-bParis text-[86px] leading-none text-[#E8E4D6] sm:text-[104px]">
              {pases.amount}
            </span>
            <TagIcon className="h-14 w-14 sm:h-16 sm:w-16" stroke="#E8E4D6" strokeWidth={2.4} />
          </span>
        </Reveal>
        <Reveal delay={170}>
          <p className="mt-4 font-bQuatt text-[21px] tracking-wide text-white/90 sm:text-[23px]">{pases.label}</p>
        </Reveal>
      </div>
    </WaveBand>
  )
}