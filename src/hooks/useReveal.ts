import { useEffect, useRef, useState } from 'react'

/**
 * Aparición suave al entrar en el viewport (como anima el original:
 * textos que suben y se funden, escalas leves). Devuelve [ref, shown].
 */
export function useReveal<T extends HTMLElement>(options?: {
  threshold?: number
  rootMargin?: string
  once?: boolean
}) {
  const { threshold = 0.14, rootMargin = '0px 0px -8% 0px', once = true } = options ?? {}
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setShown(false)
          }
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, shown }
}
