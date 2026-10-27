import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { wedding } from '../config/wedding'

interface InvitationOpeningProps {
  /** Se invoca en el instante del toque: inicia la música y la portada. */
  onOpen: () => void
}

const OPEN_TOTAL_MS = 1_450
const REDUCED_TOTAL_MS = 650

/**
 * Pantalla inicial: sobre digital con sello de lacre que se abre
 * y revela la invitación con una transición cinematográfica breve.
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
    // usuario) mientras el sobre termina de abrirse por encima.
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

  if (phase === 'done') return null

  return (
    <motion.div
      className="paper-texture fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-ivory px-6"
      initial={false}
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={opening ? { duration: reduce ? 0.3 : 0.55, delay: reduce ? 0.15 : 0.85, ease: 'easeInOut' } : { duration: 0 }}
      aria-hidden={opening}
    >
      {/* Florones de esquina */}
      <span aria-hidden="true" className="absolute left-5 top-5 h-10 w-10 border-l border-t border-electric/40" />
      <span aria-hidden="true" className="absolute right-5 top-5 h-10 w-10 border-r border-t border-electric/40" />
      <span aria-hidden="true" className="absolute bottom-5 left-5 h-10 w-10 border-b border-l border-electric/40" />
      <span aria-hidden="true" className="absolute bottom-5 right-5 h-10 w-10 border-b border-r border-electric/40" />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: opening ? 0 : 1, y: opening ? 0 : 8 }}
        transition={{ duration: 0.8, delay: opening ? 0 : 0.15 }}
        className="mb-2 text-[10px] font-medium uppercase tracking-[0.4em] text-mute"
      >
        Invitación digital
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.8, delay: opening ? 0 : 0.3 }}
        className="mb-10 font-script text-3xl text-electric sm:text-4xl"
      >
        {wedding.phrases.opening}
      </motion.p>

      {/* ── Sobre ──────────────────────────────────────────────────────── */}
      <div
        role="button"
        tabIndex={opening ? -1 : 0}
        aria-label="Abrir invitación"
        onClick={open}
        onKeyDown={handleKeyDown}
        className="relative h-[220px] w-[min(86vw,360px)] cursor-pointer outline-none sm:h-[250px]"
      >
        {/* Tarjeta interior */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[86%] border border-electric/35 bg-silk px-6 py-8 text-center shadow-[0_12px_44px_rgba(41,39,35,0.12)]"
          style={{ x: '-50%', y: '-50%' }}
          initial={false}
          animate={
            reduce
              ? { opacity: opening ? 1 : 1 }
              : { x: '-50%', y: '-52%', scale: opening ? 1.02 : 0.96 }
          }
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-2 border border-electric/20" />
          <p className="font-script text-2xl text-electric">{wedding.couple.monogram}</p>
          <p className="mt-3 font-serif text-[1.35rem] font-medium leading-tight text-ink sm:text-2xl">
            {wedding.couple.brideName} &amp; {wedding.couple.groomName}
          </p>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.32em] text-mute">
            {wedding.date.displayShort}
          </p>
        </motion.div>

        {/* Mitad superior del sobre */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 border border-electric/40 bg-gradient-to-b from-[#F1F4FB] to-[#E2E8F5]"
          initial={false}
          animate={reduce ? { opacity: opening ? 0 : 1 } : { y: opening ? '-115%' : 0, opacity: opening ? 0 : 1 }}
          transition={
            reduce
              ? { duration: 0.3 }
              : { y: { duration: 0.65, delay: 0.25, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.3, delay: 0.75 } }
          }
        />

        {/* Mitad inferior del sobre */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/2 border border-electric/40 bg-gradient-to-b from-[#EAEFF8] to-[#DDE4F2]"
          initial={false}
          animate={reduce ? { opacity: opening ? 0 : 1 } : { y: opening ? '115%' : 0, opacity: opening ? 0 : 1 }}
          transition={
            reduce
              ? { duration: 0.3 }
              : { y: { duration: 0.65, delay: 0.25, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.3, delay: 0.75 } }
          }
        />

        {/* Costura central */}
        <motion.div
          aria-hidden="true"
          className="absolute left-4 right-4 top-1/2 h-px bg-electric/50"
          initial={false}
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Sello de lacre */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-full sm:h-[70px] sm:w-[70px]"
          style={{
            x: '-50%',
            y: '-50%',
            background: 'radial-gradient(circle at 32% 30%, #5F84FF, #1F51FF 62%, #0F2FAE)',
            boxShadow:
              'inset 0 2px 6px rgba(255,252,247,0.4), inset 0 -3px 8px rgba(20,25,45,0.4), 0 2px 12px rgba(20,25,45,0.28)',
          }}
          initial={false}
          animate={opening ? { scale: 1.16, opacity: 0 } : { scale: [1, 1.045, 1], opacity: 1 }}
          transition={
            opening
              ? { duration: 0.45, ease: 'easeOut' }
              : { scale: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.3 } }
          }
        >
          <span className="font-serif text-lg font-medium text-ivory">{wedding.couple.initials}</span>
        </motion.div>
      </div>

      {/* Indicación */}
      <motion.p
        aria-hidden="true"
        animate={{ opacity: opening ? 0 : undefined }}
        transition={{ duration: 0.2 }}
        className="animate-soft-pulse mt-10 text-[10px] font-medium uppercase tracking-[0.32em] text-mute"
      >
        {wedding.phrases.openingHint}
      </motion.p>

      <motion.button
        type="button"
        onClick={open}
        disabled={opening}
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.8, delay: opening ? 0 : 0.45 }}
        className="btn-hairline mt-6"
      >
        Abrir invitación
      </motion.button>
    </motion.div>
  )
}
