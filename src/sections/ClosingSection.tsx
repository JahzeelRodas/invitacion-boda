import { motion, useReducedMotion } from 'framer-motion'
import { wedding } from '../config/wedding'
import Reveal from '../components/animation/Reveal'
import { HairDivider } from '../components/layout/SectionHeader'

/** Cierre emocional: fotografía final, nombres y frase de despedida. */
export default function ClosingSection() {
  const reduce = useReducedMotion()

  return (
    <section id="cierre" className="relative flex min-h-[88svh] items-center justify-center overflow-hidden bg-ink" aria-labelledby="cierre-title">
      <motion.img
        src={wedding.closing.image}
        alt={wedding.closing.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1.02 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(41,39,35,0.5),rgba(41,39,35,0.28)_40%,rgba(41,39,35,0.66))]"
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center px-6 py-28 text-center">
        <Reveal>
          <HairDivider light />
        </Reveal>

        <Reveal delay={0.08}>
          <p id="cierre-title" className="mt-9 font-script text-4xl leading-snug text-champagne sm:text-5xl">
            {wedding.phrases.closing}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <h2 className="mt-9 font-serif text-[clamp(2.4rem,8vw,4.2rem)] font-medium leading-tight text-silk">
            {wedding.couple.brideName} <span className="font-script text-[0.7em] text-champagne">&amp;</span>{' '}
            {wedding.couple.groomName}
          </h2>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.34em] text-silk/85">{wedding.date.displayShort}</p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 max-w-md text-sm leading-[1.9] text-silk/75 md:text-[15px]">{wedding.phrases.closingNote}</p>
        </Reveal>

        <Reveal delay={0.36}>
          <span aria-hidden="true" className="mt-10 block h-1.5 w-1.5 rotate-45 border border-champagne/80" />
        </Reveal>
      </div>
    </section>
  )
}
