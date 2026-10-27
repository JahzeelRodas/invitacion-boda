import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  src: string
  alt: string
  /** Clases del contenedor: define altura con `aspect-*`. */
  className?: string
  /** Amplitud del desplazamiento en px. */
  amount?: number
}

/**
 * Fotografía con parallax moderado. El desplazamiento se desactiva
 * cuando el visitante prefiere movimiento reducido.
 */
export default function ParallaxImage({ src, alt, className = '', amount = 20 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { y }}
        className="h-full w-full scale-[1.15] object-cover"
      />
    </div>
  )
}
