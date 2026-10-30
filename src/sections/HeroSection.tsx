import { wedding } from '../config/wedding'
import { FlowerBranch, GoldenOrnament, EnvelopeBack, EnvelopeFlap } from '../components/decor/ornaments'

/**
 * Encabezado: filete dorado + "Nuestra Boda", sobre digital con dos fotos
 * flotantes tipo polaroid, ramal florales y nombres en letra display con
 * el gran signo "&" caligráfico al fondo.
 */
export default function HeroSection() {
  const { couple, hero } = wedding
  const [mainPhoto, secondaryPhoto] = hero.photos

  return (
    <header className="relative z-10 flex flex-col items-center overflow-x-clip px-6 pb-14 pt-10 text-center">
      {/* ramal detrás del sobre */}
      <FlowerBranch
        aria-hidden="true"
        className="pointer-events-none absolute left-[2%] top-[86px] w-[54%] -scale-x-100 text-navy/25 drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]"
        style={{ animation: 'dbFloat 6s ease-in-out 0.4s infinite' }}
      />
      <GoldenOrnament className="relative z-10 mb-3 block w-[82px] md:w-[104px]" />

      <p className="relative z-10 font-case text-[15px] font-semibold uppercase tracking-[0.14em] text-navy md:text-[18px]">
        {hero.kicker}
      </p>

      {/* ── Sobre digital con fotos flotantes ──────────────────────────── */}
      <div className="relative z-10 mt-[26%] w-[64.2%] max-w-[300px] md:max-w-[380px]">
        <div className="relative aspect-[283/328]">
          {/* sobre (parte trasera) */}
          <EnvelopeBack className="pointer-events-none absolute inset-0 z-10 w-full" />

          {/* polaroid 1 */}
          <div
            className="absolute left-[0.9%] top-[-15.7%] z-20 w-[67.4%]"
            style={{ animation: 'dbFloat 6.5s ease-in-out 0.2s infinite', willChange: 'transform' }}
          >
            <div className="aspect-[191/255] rotate-[-9.93deg] border-[6px] border-white bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.25)] md:border-8">
              <img
                src={mainPhoto.src}
                alt={mainPhoto.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: mainPhoto.position }}
              />
            </div>
          </div>

          {/* polaroid 2 */}
          <div
            className="absolute left-[31%] top-[8.8%] z-[21] w-[59.2%]"
            style={{ animation: 'dbFloat 7s ease-in-out 0.8s infinite', willChange: 'transform' }}
          >
            <div className="aspect-[167/219] rotate-[17.26deg] border-[6px] border-white bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.25)] md:border-8">
              <img
                src={secondaryPhoto.src}
                alt={secondaryPhoto.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: secondaryPhoto.position }}
              />
            </div>
          </div>

          {/* solapa frontal del sobre */}
          <EnvelopeFlap className="pointer-events-none absolute left-0 top-[42.7%] z-30 w-full" />

          {/* rama flotante a la derecha */}
          <span aria-hidden="true" className="pointer-events-none absolute left-[75.3%] top-[33.8%] z-[35] block w-[50.5%]">
            <span className="block" style={{ animation: 'dbFloat 5s ease-in-out infinite', willChange: 'transform' }}>
              <FlowerBranch className="block w-full text-navy/40 drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" />
            </span>
          </span>
        </div>
      </div>

      {/* ── Nombres con el gran "&" ─────────────────────────────────────── */}
      <div className="relative z-10 mt-[20%] flex flex-col items-center gap-[19px]">
        <p className="font-display text-[clamp(36px,10.5vw,45px)] uppercase leading-none text-navy md:text-[56px]">
          {couple.groomName}
        </p>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[37%] -translate-y-1/2 font-script text-[100px] leading-none text-navy/15 md:text-[128px]"
        >
          &amp;
        </span>
        <p className="font-display text-[clamp(36px,10.5vw,45px)] uppercase leading-none text-navy md:text-[56px]">
          {couple.brideName}
        </p>
      </div>
    </header>
  )
}
