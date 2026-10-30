import { wedding } from '../config/wedding'
import { FlowerBranch, ProgramIcon } from '../components/decor/ornaments'

/**
 * "Programa del día": tarjeta azul marino con cronología vertical —
 * hora a la izquierda, línea con puntos al centro y actividad a la derecha,
 * con iconos pequeños lineales junto a algunos horarios.
 */
export default function ProgramTimelineCard() {
  const items = wedding.schedule.timeline

  return (
    <section className="relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      {/* rama flotante arriba a la derecha */}
      <span aria-hidden="true" className="pointer-events-none absolute left-[85%] top-[-10%] z-0 block w-[41%]">
        <span className="block" style={{ animation: 'dbFloat 5.2s ease-in-out 0.9s infinite', willChange: 'transform' }}>
          <FlowerBranch className="block w-full text-navy/40 drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" />
        </span>
      </span>

      <div className="relative overflow-hidden rounded-[10px] px-6 py-9 shadow-card">
        <div aria-hidden="true" className="absolute inset-0 rounded-[10px] bg-navy" />
        <div aria-hidden="true" className="paper-noise--dark absolute inset-0 rounded-[10px] opacity-60" />

        <div className="relative z-10 flex flex-col gap-4 px-2">
          <h2 className="text-center text-[20px] font-bold uppercase tracking-[0.03em] font-serif text-mist">
            Programa del Día
          </h2>

          <ol
            className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10"
          >
            {items.map((item, index) => {
              const isFirst = index === 0
              const isLast = index === items.length - 1
              /** La línea vertical comparte tramos: nace tras el primer punto y
                  muere en el último. */
              const lineClass = isFirst ? 'top-1/2 -bottom-8 md:-bottom-10' : isLast ? '-top-8 md:-top-10 bottom-1/2' : '-top-8 md:-top-10 -bottom-8 md:-bottom-10'

              return (
                <li key={`${item.time}-${item.label}`} className="contents">
                  {/* hora (+ icono opcional detrás) */}
                  <span className="pt-0.5 text-right font-serif text-[16px] tabular-nums tracking-wide leading-snug text-mist md:text-[17px]">
                    <span className="relative inline-block">
                      {item.icon && (
                        <span
                          aria-hidden="true"
                          className="absolute right-full top-1/2 flex w-max -translate-y-1/2 items-center justify-center"
                          style={{ marginRight: 30 }}
                        >
                          <ProgramIcon name={item.icon} className="block h-[26px] w-[26px] shrink-0 text-mist/85" />
                        </span>
                      )}
                      {item.time}
                    </span>
                  </span>

                  {/* línea + punto */}
                  <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                    <span className={`absolute left-1/2 w-px -translate-x-1/2 ${lineClass}`} style={{ backgroundColor: 'rgba(236,228,216,0.4)' }} />
                    <span
                      className="relative block h-2.5 w-2.5 rounded-full bg-mist"
                      style={{ boxShadow: '0 0 0 2px rgba(236,228,216,0.13)' }}
                    />
                  </span>

                  {/* actividad */}
                  <span className="font-serif text-[13px] text-mist/70 md:text-[15px]">{item.label}</span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
