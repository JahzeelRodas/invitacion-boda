import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface LightboxProps {
  images: { src: string; alt: string }[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

/**
 * Visor a pantalla completa de la galería. Navegable con teclado
 * (Esc, ←, →) y cierre accesible.
 */
export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const total = images.length
  const image = images[index]

  const goPrev = () => onNavigate((index - 1 + total) % total)
  const goNext = () => onNavigate((index + 1) % total)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && total > 1) goPrev()
      if (event.key === 'ArrowRight' && total > 1) goNext()
    }
    window.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = previousOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, goPrev, goNext, total])

  if (!image) return null

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Fotografía ${index + 1} de ${total}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm sm:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar galería"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-mist/30 text-mist transition-colors hover:bg-mist/10"
      >
        <X size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goPrev()
            }}
            aria-label="Fotografía anterior"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mist/30 text-mist transition-colors hover:bg-mist/10 sm:left-6"
          >
            <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
            aria-label="Fotografía siguiente"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mist/30 text-mist transition-colors hover:bg-mist/10 sm:right-6"
          >
            <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </>
      )}

      <motion.figure
        key={index}
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-h-full flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[80vh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
        />
        <figcaption className="mt-5 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-mist/85">{image.alt}</span>
          <span className="mt-1 block text-[10px] tracking-[0.3em] text-mist/50">
            {index + 1} / {total}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}
