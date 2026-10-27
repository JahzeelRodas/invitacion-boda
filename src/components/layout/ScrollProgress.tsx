import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/** Barra fina de progreso de scroll en la parte superior. */
export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  if (reduce) return null

  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-electric/70" style={{ scaleX }} />
}
