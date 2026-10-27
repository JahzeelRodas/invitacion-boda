import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Retraso en segundos para escalonar la aparición. */
  delay?: number
  /** Desplazamiento vertical inicial en px. */
  y?: number
  className?: string
  once?: boolean
}

/**
 * Aparición progresiva al entrar en pantalla.
 * Respeta prefers-reduced-motion: en ese caso solo hace fundido.
 */
export default function Reveal({ children, delay = 0, y = 28, className, once = true }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
