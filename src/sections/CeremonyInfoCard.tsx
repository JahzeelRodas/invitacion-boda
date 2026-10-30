import { wedding } from '../config/wedding'
import { FlowerBranch, GoldenOrnament } from '../components/decor/ornaments'

/**
 * Tarjeta azul marino con "Info de la ceremonia": padres de ambas familias,
 * anuncio, nombres completos de los novios y los bloques de ceremonia y
 * recepción con la hora y la fecha grande.
 */
export default function CeremonyInfoCard() {
  const { couple, schedule } = wedding
  const { ceremony, reception } = schedule

  return (
    <section className="relative z-10 mx-auto w-[88%] max-w-[420px] md:max-w-[560px]">
      {/* decoración flotante lateral */}
      <span aria-hidden="true" className="pointer-events-none absolute -left-[30%] top-[41.7%] z-0 block w-[41.7%]">
        <span className="block" style={{ animation: 'dbFloat 6s ease-in-out 0.4s infinite', willChange: 'transform' }}>
          <FlowerBranch className="block w-full text-navy/40 drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" />
        </span>
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute left-[85%] top-[28.7%] z-0 block w-[37%]">
        <span className="block" style={{ animation: 'dbFloat 5.5s ease-in-out 0.6s infinite', willChange: 'transform' }}>
          <FlowerBranch className="block w-full -scale-x-100 text-navy/40 drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" />
        </span>
      </span>

      <div className="relative overflow-hidden rounded-[13px] px-5 pb-10 pt-9 text-center shadow-card">
        <div aria-hidden="true" className="absolute inset-0 rounded-[13px] bg-navy" />
        <div aria-hidden="true" className="paper-noise--dark absolute inset-0 rounded-[13px] opacity-60" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="relative z-10 text-center font-serif text-[20px] font-bold uppercase tracking-[0.03em] text-mist">
            {schedule.prefix}
          </h2>

          {/* padres — novio / novia */}
          <div
            className="relative grid grid-cols-[1fr_auto_1fr] grid-rows-[repeat(3,auto)] justify-center gap-x-8 gap-y-[3px] text-center font-serif text-mist"
          >
            <div className="row-span-3 grid grid-rows-subgrid justify-items-center">
              <span className="text-[12px] text-mist/70">{couple.groomParents.label}</span>
              <span className="break-words text-[12px] font-semibold text-mist">{couple.groomParents.father}</span>
              <span className="break-words text-[12px] font-semibold text-mist">{couple.groomParents.mother}</span>
            </div>
            <div aria-hidden="true" className="row-span-3 h-[50px] w-px self-center bg-mist/40" />
            <div className="row-span-3 grid grid-rows-subgrid justify-items-center">
              <span className="text-[12px] text-mist/70">{couple.brideParents.label}</span>
              <span className="break-words text-[12px] font-semibold text-mist">{couple.brideParents.father}</span>
              <span className="break-words text-[12px] font-semibold text-mist">{couple.brideParents.mother}</span>
            </div>
          </div>

          {/* anuncio */}
          <p className="relative whitespace-pre-line text-center font-serif text-[12px] text-mist md:text-[13px]">
            {schedule.announce}
          </p>

          {/* nombres completos */}
          <div className="relative flex w-full min-w-0 flex-col items-center text-center gap-3 md:gap-4">
            <h3 className="font-display text-[clamp(28px,8.4vw,40px)] leading-[1.3] text-mist">
              {couple.groomFullName}
            </h3>
            <div className="text-[10px] uppercase tracking-[0.14em] text-mist/70 font-serif">El novio</div>
            <div className="font-hand text-[35px] leading-none text-mist">&amp;</div>
            <h3 className="font-display text-[clamp(28px,8.4vw,40px)] leading-[1.3] text-mist">
              {couple.brideFullName}
            </h3>
            <div className="text-[10px] uppercase tracking-[0.14em] text-mist/70 font-serif">La novia</div>
          </div>

          {/* bloque: ceremonia religiosa */}
          <Divisoria />
          <div className="relative flex flex-col items-center gap-4 text-center font-serif md:gap-5">
            <p className="whitespace-pre-line text-center font-normal text-[16px] text-mist/70 md:text-[18px]">
              {ceremony.label}
              {'\n'}
              {ceremony.venueName}
            </p>
            <div className="flex w-full max-w-[180px] min-w-max items-center justify-between gap-x-3 whitespace-nowrap text-[12px] uppercase text-mist/70 md:max-w-[210px] md:text-[14px]">
              <span>{ceremony.timeLabel}</span>
              <span>{wedding.date.weekday}</span>
            </div>
            <BigDate day={wedding.date.day} monthName={wedding.date.monthName} year={wedding.date.year} />
          </div>

          {/* bloque: recepción */}
          <div className="relative flex flex-col items-center gap-4 text-center font-serif md:gap-5">
            <p className="whitespace-pre-line text-center font-normal text-[16px] text-mist/70 md:text-[18px]">
              {reception.label}
              {'\n'}
              {reception.venueName}
            </p>
            <div className="flex w-full max-w-[180px] min-w-max items-center justify-between gap-x-3 whitespace-nowrap text-[12px] uppercase text-mist/70 md:max-w-[210px] md:text-[14px]">
              <span>{reception.timeLabel}</span>
              <span>{wedding.date.weekday}</span>
            </div>
            <BigDate day={wedding.date.day} monthName={wedding.date.monthName} year={wedding.date.year} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Piezas internas ───────────────────────────────────────────────────────── */

function BigDate({ day, monthName, year }: { day: number; monthName: string; year: number }) {
  return (
    <div className="flex items-center justify-center gap-4 text-mist">
      <span className="font-serif text-[40px] leading-none md:text-[46px]">{day}</span>
      <div aria-hidden="true" className="h-[46px] w-px bg-mist/45" />
      <div className="flex flex-col items-start justify-center gap-1 text-left">
        <span className="font-case text-[14px] uppercase md:text-[18px]">{monthName}</span>
        <span className="font-case text-[14px] uppercase md:text-[18px]">{year}</span>
      </div>
    </div>
  )
}

function Divisoria() {
  return (
    <div className="relative flex flex-col items-center gap-1 pt-2">
      <GoldenOrnament className="block w-24 opacity-90" />
    </div>
  )
}
