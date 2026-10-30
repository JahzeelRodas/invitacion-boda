import { wedding } from '../config/wedding'
import { designB } from '../config/designB'

/* ════════════════════════════════════════════════════════════════════════════
   PAGINA PRINCIPAL — selección entre los dos modelos de invitación:
     · Opción 1 · «Minimalismo azul profundo» (portada con sello).
     · Opción 2 · «Modelo elegante 2026» (hero en arco, ondas y vidrio).
   ══════════════════════════════════════════════════════════════════════════ */

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M5 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Miniatura del diseño A: sello azul sobre crema con ramas doradas. */
function PreviewA() {
  return (
    <div className="relative flex h-[212px] w-full items-center justify-center overflow-hidden rounded-xl bg-abyss">
      <div aria-hidden="true" className="absolute inset-4 rounded-lg border border-gold/40" />
      <div className="relative grid h-24 w-24 place-items-center rounded-full bg-navy shadow-[0_12px_30px_rgba(0,21,49,0.55)]">
        <div aria-hidden="true" className="absolute inset-1.5 rounded-full border border-gold/50" />
        <span className="font-hand text-[26px] text-gold">M&amp;A</span>
      </div>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-cream/70">
        {wedding.date.displayShort}
      </span>
    </div>
  )
}

/** Miniatura del diseño B: foto en arco + onda + banda azul con la fecha. */
function PreviewB() {
  return (
    <div className="flex h-[212px] w-full flex-col overflow-hidden rounded-xl bg-[#293C4B]">
      <div
        className="relative h-[104px] shrink-0 overflow-hidden"
        style={{ borderRadius: '0 0 50% 50% / 0 0 17% 17%' }}
      >
        <img
          src={designB.hero.photo}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-bInk/25" />
        <span className="absolute left-1/2 top-3 max-w-full -translate-x-1/2 truncate px-2 font-hand text-[19px] text-white drop-shadow sm:text-[21px]">
          {designB.hero.namesLine}
        </span>
      </div>
      <svg viewBox="0 0 1440 74" preserveAspectRatio="none" aria-hidden="true" className="block h-[26px] w-full shrink-0">
        <path
          d="M0,58 C90,30 190,16 320,26 C470,37 560,62 700,54 C850,45 930,12 1080,20 C1230,28 1320,52 1440,42 L1440,74 L0,74 Z"
          fill="#293C4B"
        />
      </svg>
      <div className="flex flex-1 items-center justify-center pb-1">
        <span className="font-bParis text-[24px] leading-none text-white/95">{designB.date.short}</span>
      </div>
    </div>
  )
}

interface PickerProps {
  onChoose: (option: 'a' | 'b') => void
}

export default function DesignPicker({ onChoose }: PickerProps) {
  return (
    <div className="grid min-h-dvh place-items-center bg-abyss px-5 py-12 text-cream">
      <div className="w-full max-w-[760px]">
        <header className="text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Invitaciones digitales</p>
          <h1 className="mt-3 font-display text-[32px] leading-tight sm:text-[42px]">
            El modelo de tu invitación
          </h1>
          <p className="mx-auto mt-3 max-w-[430px] text-[13.5px] leading-relaxed text-cream/70">
            Ambos diseños son personales: imágenes, textos y enlaces se ajustan
            en <code className="font-sans text-[12px] text-gold">src/config</code>. Abre la que más te guste y personalízala paso a paso.
          </p>
        </header>

        <div className="mt-9 grid gap-6 sm:grid-cols-2">
          {/* OPTION 1 */}
          <button
            type="button"
            onClick={() => onChoose('a')}
            className="group cursor-pointer rounded-2xl border border-cream/15 bg-navy/40 p-4 text-left transition-colors hover:border-gold/60 hover:bg-navy/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <PreviewA />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Opción 1</p>
                <h2 className="mt-1 font-display text-[22px]">Minimalismo azul profundo</h2>
                <p className="mt-1 text-[12.5px] leading-snug text-cream/60">
                  Portada con sello, galería 3D, cuenta regresiva y libro de visitas.
                </p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 text-gold transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </div>
          </button>

          {/* OPTION 2 */}
          <button
            type="button"
            onClick={() => onChoose('b')}
            className="group cursor-pointer rounded-2xl border border-cream/15 bg-navy/40 p-4 text-left transition-colors hover:border-gold/60 hover:bg-navy/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <PreviewB />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Opción 2</p>
                <h2 className="mt-1 font-display text-[22px]">Modelo elegante 2026</h2>
                <p className="mt-1 text-[12.5px] leading-snug text-cream/60">
                  Hero en arco, bandas onduladas, círculo de confirmación y collage.
                </p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 text-gold transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </div>
          </button>
        </div>

        <p className="mt-8 text-center text-[11px] text-cream/35">
          Vuelve a esta página con el enlace <span className="font-sans">#/modelos</span> o con el botón atrás del
          navegador. El modelo 2 se muestra por defecto en la página principal.
        </p>
      </div>
    </div>
  )
}
