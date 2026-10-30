import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { wedding } from '../config/wedding'
import { HeartShape, PetalFlower, FlowerBranch, GoldenOrnament } from '../components/decor/ornaments'

interface InvitationOpeningProps {
  /** Se invoca en el instante del toque: inicia la música y la portada. */
  onOpen: () => void
}

const OPEN_TOTAL_MS = 1_500
const REDUCED_TOTAL_MS = 700

/** Semilla determinista para que los pétalos no "brinquen" entre renders. */
function rand(seed: number, min: number, max: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43_758.5453
  const frac = x - Math.floor(x)
  return min + frac * (max - min)
}

interface Petal {
  left: number
  size: number
  color: string
  sway: number
  duration: number
  delay: number
  flip: boolean
}

const PETAL_COLORS = ['#C9A24A', '#0B3A72', '#ECE4D8', '#3F6EA8', '#C9A24A', '#0B3A72', '#ECE4D8']

/**
 * Pantalla inicial estilo "sobre digital": fondo azul profundo con pétalos
 * cayendo y una tarjeta crema con sello de corazón, nombres, fecha y botón
 * para abrir la invitación.
 */
export default function InvitationOpening({ onOpen }: InvitationOpeningProps) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'closed' | 'opening' | 'done'>('closed')
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [])

  const opening = phase === 'opening'

  const open = () => {
    if (phase !== 'closed') return
    setPhase('opening')

    // La música y la portada se activan de inmediato (contexto de gesto del
    // usuario) mientras la portada termina su desvanecimiento.
    onOpen()

    const timer = window.setTimeout(() => setPhase('done'), reduce ? REDUCED_TOTAL_MS : OPEN_TOTAL_MS)
    timersRef.current.push(timer)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      open()
    }
  }

  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      left: rand(i, 3, 97),
      size: rand(i * 3, 10, 24),
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      sway: rand(i * 5, -30, 30),
      duration: rand(i * 7, 16, 27),
      delay: rand(i * 11, 0, 18),
      flip: Math.abs(rand(i * 13, 0, 1)) > 0.5,
    }))
  }, [])

  if (phase === 'done') return null
  const { couple, date, hero } = wedding

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom right, #073268, #00224C, #001531)' }}
      initial={false}
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={opening ? { duration: reduce ? 0.4 : 0.75, delay: reduce ? 0.1 : 0.55, ease: 'easeInOut' } : { duration: 0 }}
      aria-hidden={opening}
    >
      {/* Pétalos/amuletos cayendo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {petals.map((petal, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${petal.left}%`,
              top: '-6vh',
              color: petal.color,
              fontSize: `${petal.size}px`,
              transform: petal.flip ? 'scaleX(-1)' : undefined,
              // @ts-expect-error — variables CSS correctas, el tipo no las declara
              '--sway': `${petal.sway}px`,
              animation: petalFall(petal.duration, petal.delay),
            }}
          >
            <PetalFlower />
          </span>
        ))}
      </div>

      {/* Contenedor de la tarjeta */}
      <div className="relative z-10 w-[310px] sm:w-[340px]">
        {/* Sello de lacre que pellizca la solapa */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-12 z-30 flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 30% 30%, #033163, #000A2E)',
            boxShadow: '0 4px 20px rgba(0,34,76,0.55), inset 0 2px 4px rgba(255,255,255,0.28)',
            animation: opening ? undefined : 'sealPulse 2s ease-in-out infinite',
          }}
        >
          <HeartShape className="h-7 w-7 text-mist" />
        </div>

        <motion.div
          className="relative overflow-hidden rounded-lg border border-navy/15 bg-[rgba(247,245,238,0.97)] shadow-cover"
          initial={false}
          animate={opening ? { y: -72, scale: 1.03, opacity: 0.6 } : { y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0.3 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ramas florales en las esquinas */}
          <div className="pointer-events-none absolute inset-0">
            <FlowerBranch className="absolute -left-8 -top-7 block w-36 rotate-[24deg] text-navy/35 opacity-80 md:w-44" />
            <FlowerBranch className="absolute -bottom-7 -right-8 block w-36 -scale-x-100 -rotate-[24deg] text-navy/35 opacity-80 md:w-44" />
            <div className="paper-noise absolute inset-0 opacity-60" />
          </div>

          <div className="relative z-10 px-6 pb-14 pt-24 text-center md:pt-20">
            <h1 className="mb-2 flex flex-col items-center leading-tight">
              <span className="block w-full text-center font-display text-3xl text-navy sm:text-4xl">
                {couple.groomName}
              </span>
              <span className="block w-full text-center font-serif text-lg leading-none text-navy sm:text-xl">
                &amp;
              </span>
              <span className="block w-full text-center font-display text-3xl text-navy sm:text-4xl">
                {couple.brideName}
              </span>
            </h1>

            {/* ornamento central */}
            <div className="mb-2 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-navy" />
              <span className="text-sm text-navy/70">❦</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-navy" />
            </div>

            <p className="mb-5 text-[18px] text-navy/70">{date.displayLong}</p>

            <p className="mb-6 text-[18px] font-light text-navy/70">{hero.opening.title}</p>

            <button
              type="button"
              onClick={open}
              onKeyDown={handleKeyDown}
              disabled={opening}
              className="btn-navy group mx-auto flex w-fit cursor-pointer select-none items-center justify-center disabled:cursor-default"
            >
              <span>{hero.opening.button}</span>
              <span aria-hidden="true" className="btn-shine" />
            </button>
          </div>
        </motion.div>

        {/* Filete dorado bajo la tarjeta */}
        <GoldenOrnament className="mx-auto mt-6 block w-24 opacity-80" />
      </div>
    </motion.div>
  )
}

/** Construye la regla de animación de caída con las variables del pétalo. */
function petalFall(duration: number, delay: number): string {
  return `petalFall ${duration.toFixed(2)}s ease-in-out ${(-delay).toFixed(2)}s infinite`
}
