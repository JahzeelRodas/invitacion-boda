import { Shirt } from 'lucide-react'
import { wedding } from '../config/wedding'
import Reveal from '../components/animation/Reveal'
import ParallaxImage from '../components/animation/ParallaxImage'
import { HairDivider } from '../components/layout/SectionHeader'

/** Código de vestimenta sobre fondo tinta: bloque editorial de contraste. */
export default function DressCodeSection() {
  const { dressCode } = wedding

  return (
    <section id="vestimenta" className="paper-texture bg-ink py-24 text-silk md:py-32" aria-labelledby="vestimenta-title">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-champagne/45 text-champagne" aria-hidden="true">
            <Shirt size={19} strokeWidth={1.4} />
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.35em] text-champagne">{dressCode.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 id="vestimenta-title" className="mt-4 font-serif text-3xl font-medium md:text-[2.9rem] md:leading-tight">
            {dressCode.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-5 font-script text-2xl text-champagne/90 md:text-[1.7rem]">{dressCode.type}</p>
        </Reveal>

        <Reveal delay={0.18}>
          <HairDivider className="mt-7" light />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-[1.9] text-silk/80 md:text-[15px]">{dressCode.description}</p>
        </Reveal>

        {dressCode.avoidNote && (
          <Reveal delay={0.24}>
            <p className="mx-auto mt-5 max-w-xl text-xs leading-relaxed text-silk/60">{dressCode.avoidNote}</p>
          </Reveal>
        )}

        {dressCode.palette.length > 0 && (
          <Reveal delay={0.28}>
            <ul className="mt-12 flex flex-wrap items-start justify-center gap-6 sm:gap-9" aria-label="Paleta de colores sugerida">
              {dressCode.palette.map((color) => (
                <li key={color.hex} className="flex flex-col items-center gap-2.5">
                  <span
                    className="block h-9 w-9 rounded-full border border-silk/25 shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden="true"
                  />
                  <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-silk/70">{color.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {dressCode.inspirationImages.length > 0 && (
          <div className="mt-14 grid justify-center gap-5 sm:grid-cols-2 sm:gap-8">
            {dressCode.inspirationImages.map((image, index) => (
              <Reveal key={image.src} delay={index * 0.1} className="mx-auto w-44 sm:w-52">
                <figure className="overflow-hidden border border-silk/15">
                  <ParallaxImage src={image.src} alt={image.alt} className="aspect-[3/4] w-full" amount={10} />
                </figure>
                <figcaption className="mt-3 text-[9px] font-medium uppercase tracking-[0.3em] text-silk/55">
                  Inspiración {index + 1}
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
