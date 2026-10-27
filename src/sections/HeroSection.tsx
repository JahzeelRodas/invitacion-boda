import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { wedding } from '../config/wedding'

interface HeroSectionProps {
  /** true cuando el usuario ya abrió la invitación: dispara la entrada. */
  active: boolean
}

/** Portada cinematográfica: fotografía con zoom lento y los nombres. */
export default function HeroSection({ active }: HeroSectionProps) {
  const reduce = useReducedMotion()
  const baseDelay = reduce ? 0.1 : 1.15

  return (
    <section id="inicio" className="relative flex h-[100svh] min-h-[560px] items-end justify-center overflow-hidden bg-ink sm:items-center">
      {/* Fotografía con zoom muy lento */}
      <motion.img
        src={wedding.hero.image}
        alt={wedding.hero.alt}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
        animate={active ? (reduce ? { opacity: 1 } : { opacity: 1, scale: 1.12 }) : {}}
        transition={
          reduce
            ? { duration: 0.8, delay: 0.2 }
            : { opacity: { duration: 1.4, delay: 0.9, ease: 'easeOut' }, scale: { duration: 26, delay: 0.9, ease: 'linear' } }
        }
      />

      {/* Veladuras para contraste y legibilidad */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(41,39,35,0.62),rgba(41,39,35,0.18)_46%,rgba(248,245,239,0.32))]"
      />

      {/* Contenido */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 pb-24 text-center sm:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: baseDelay }}
          className="text-[11px] font-medium uppercase tracking-[0.4em] text-champagne [text-shadow:0_1px_18px_rgba(41,39,35,0.5)]"
        >
          {wedding.phrases.heroKicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: baseDelay + 0.15 }}
          className="mt-5 font-serif text-[clamp(3rem,11vw,6.5rem)] font-medium leading-[0.98] text-silk [text-shadow:0_2px_28px_rgba(41,39,35,0.45)]"
        >
          {wedding.couple.brideName}
          <span className="my-1 block font-script text-[0.55em] leading-none text-champagne">&amp;</span>
          {wedding.couple.groomName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: baseDelay + 0.35 }}
          className="mt-7 flex flex-col items-center gap-3"
        >
          <span aria-hidden="true" className="h-px w-16 bg-champagne/70" />
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-silk/95 [text-shadow:0_1px_14px_rgba(41,39,35,0.55)]">
            {wedding.date.displayLong} · {wedding.date.place}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: baseDelay + 0.55 }}
          className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-silk/90 [text-shadow:0_1px_16px_rgba(41,39,35,0.55)] sm:text-xl"
        >
          {wedding.phrases.heroQuote}
        </motion.p>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: baseDelay + 0.9 }}
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-silk/85"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.38em]">Desliza</span>
        <ChevronDown size={16} strokeWidth={1.5} className="animate-drift" />
      </motion.div>
    </section>
  )
}
