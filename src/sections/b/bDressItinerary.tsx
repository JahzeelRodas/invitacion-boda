import { designB } from '../../config/designB'
import { WaveBand } from '../../components/decor/bWaves'
import { BrideBadge, GroomBadge, IChurch, IRunway, IDance, IDinner, IGlasses, IBouquet, HeartFill } from '../../components/decor/bIcons'
import { Reveal, ScriptTitle } from './bShared'

/* ════════════════════════════════════════════════════════════════════════════
   10 · CÓDIGO DE VESTIMENTA — bustos en círculos + indicación formal.
   ══════════════════════════════════════════════════════════════════════════ */

export function BDressCode() {
  const { dressCode } = designB
  return (
    <>
      <WaveBand id="b-vestimenta" band="navy" topWave bottomWave>
        <ScriptTitle text={dressCode.title} />
      </WaveBand>
      <section className="bg-bPaper px-6 pb-16 pt-14 text-center sm:pb-20 sm:pt-16">
        <Reveal>
          <div className="flex items-center justify-center gap-9 sm:gap-12">
            <GroomBadge className="h-[118px] w-[118px] sm:h-[136px] sm:w-[136px]" />
            <BrideBadge className="h-[118px] w-[118px] sm:h-[136px] sm:w-[136px]" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-9 font-bQuatt text-[27px] font-bold text-bBody sm:text-[31px]">{dressCode.label}</p>
          <p className="mx-auto mt-2 max-w-[380px] font-bQuatt text-[20px] text-bBody sm:text-[22px]">{dressCode.note}</p>
        </Reveal>
      </section>
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   11 · ITINERARIO — foto con tinte pizarra, línea vertical central,
         iconos de línea y textos alternados en cada lado.
   ══════════════════════════════════════════════════════════════════════════ */

const ICONS = {
  church: IChurch,
  runway: IRunway,
  dance: IDance,
  dinner: IDinner,
  glasses: IGlasses,
  bouquet: IBouquet,
}

export function BItinerary() {
  const { itinerary } = designB

  return (
    <section
      id="b-itinerario"
      className="relative bg-[#24333E] pb-16"
    >
      <div className="py-12 sm:py-16">
        <ScriptTitle text={itinerary.title} />

        <div className="relative mx-auto mt-8 max-w-[460px] px-5 sm:px-6">
          {/* Línea central */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-1/2 top-2 z-0 -translate-x-1/2 bg-white/85"
            style={{ width: 1.5 }}
          />

          {itinerary.items.map((item, i) => {
            const Icon = ICONS[item.icon]
            const labelLines = item.label.split('\n')
            const iconLeft = i % 2 === 0

            return (
              <div key={`${item.label}-${i}`} className="relative">
                <Reveal
                  delay={60}
                  className="grid min-h-[148px] grid-cols-[1fr_1fr] items-center sm:min-h-[168px]"
                >
                  {/* Celda izquierda */}
                  <div
                    className={`${iconLeft ? 'pr-2' : 'pr-3'} flex h-full items-center`}
                  >
                    {iconLeft ? (
                      <Icon className="ml-auto h-[84px] w-[84px] sm:h-[94px] sm:w-[94px]" />
                    ) : (
                      <div className="w-full text-right font-bQuatt text-[20px] leading-[1.32] text-white sm:text-[22px]">
                        {labelLines.map((line, index) => (
                          <span key={index} className="block">
                            {line}
                          </span>
                        ))}
                        <span className="mt-1 block">{item.time}</span>
                      </div>
                    )}
                  </div>

                  {/* Celda derecha */}
                  <div
                    className={`${iconLeft ? 'pl-3' : 'pl-2'} flex h-full items-center`}
                  >
                    {iconLeft ? (
                      <div className="w-full font-bQuatt text-[20px] leading-[1.32] text-white sm:text-[22px]">
                        {labelLines.map((line, index) => (
                          <span key={index} className="block">
                            {line}
                          </span>
                        ))}
                        <span className="mt-1 block">{item.time}</span>
                      </div>
                    ) : (
                      <Icon className="mr-auto h-[84px] w-[84px] sm:h-[94px] sm:w-[94px]" />
                    )}
                  </div>
                </Reveal>

                {/* Corazón central */}
                <span
                  aria-hidden="true"
                  className="relative z-10 mx-auto flex items-center justify-center"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#7A835C]/95 shadow-[0_2px_8px_rgba(30,40,50,0.35)]">
                    <HeartFill className="h-5 w-5" fill="#fff" />
                  </span>
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 🟢 ONDA INTEGRADORA INFERIOR: Se coloca de forma absoluta abajo del itinerario 
          para solaparse con la siguiente sección y eliminar cualquier espacio blanco. */}
      <div className="absolute -bottom-[34px] left-0 w-full sm:-bottom-[46px] z-30 pointer-events-none leading-none">
        <svg
          viewBox="0 0 1440 74"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-[34px] w-full sm:h-[46px]"
        >
          <path
            d="M0,58 C90,30 190,16 320,26 C470,37 560,62 700,54 C850,45 930,12 1080,20 C1230,28 1320,52 1440,42 L1440,74 L0,74 Z"
            fill="#293C4B"
          />
        </svg>
      </div>
    </section>
  )
}