import { useCallback, useEffect, useRef, useState } from 'react'
import { wedding } from '../config/wedding'
import Lightbox from '../components/gallery/Lightbox'

/**
 * Carrusel 3D tipo "coverflow": la fotografía activa al centro y las
 * siguientes escaladas sobre el eje Y. Navegable con flechas (desktop),
 * deslizando (móvil), puntos e indicadores; clic abre el visor completo.
 */
export default function GalleryCarousel() {
  const images = wedding.gallery.images
  const total = images.length

  const [active, setActive] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const autoplayRef = useRef<number | null>(null)
  const interactedRef = useRef(false)

  const go = useCallback(
    (delta: number) => {
      setActive((current) => (current + delta + total) % total)
    },
    [total],
  )

  /* Arco SIEMPRE sigue (como el original): se detiene con la primera
     interacción del usuario para no pelear con él. */
  useEffect(() => {
    if (interactedRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    autoplayRef.current = window.setInterval(() => {
      if (document.hidden) return
      setActive((current) => (current + 1) % total)
    }, 5_500)
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current)
    }
  }, [total])

  const markInteraction = () => {
    interactedRef.current = true
    if (autoplayRef.current) window.clearInterval(autoplayRef.current)
  }

  const onSwipeStart = (clientX: number) => {
    touchStartX.current = clientX
  }

  const onSwipeEnd = (clientX: number) => {
    const start = touchStartX.current
    touchStartX.current = null
    if (start === null) return
    const dx = clientX - start
    if (Math.abs(dx) < 44) return
    markInteraction()
    go(dx < 0 ? 1 : -1)
  }

  /* Posiciones para cada foto:
     desplazamiento horizontal, profundidad Z, rotación Y, escala y opacidad. */
  const offsetFor = (relative: number): string | null => {
    if (relative === 0) return 'translateX(0%) translateZ(0px) rotateY(0deg) scale(1)'
    if (relative === 1) return 'translateX(60%) translateZ(-150px) rotateY(45deg) scale(0.85)'
    if (relative === -1) return 'translateX(-60%) translateZ(-150px) rotateY(-45deg) scale(0.85)'
    if (relative === 2) return 'translateX(120%) translateZ(-300px) rotateY(90deg) scale(0.7)'
    if (relative === -2) return 'translateX(-120%) translateZ(-300px) rotateY(-90deg) scale(0.7)'
    if (relative > 2 && relative <= 4) return 'translateX(180%) translateZ(-450px) rotateY(135deg) scale(0.7)'
    if (relative < -2 && relative >= -4) return 'translateX(-180%) translateZ(-450px) rotateY(-135deg) scale(0.7)'
    return null
  }

  return (
    <div className="relative z-10 overflow-x-clip">
      <div className="relative z-10 flex flex-col items-center px-6 pb-10 pt-10">
        <h2 className="relative z-10 text-center font-serif text-[20px] font-bold uppercase tracking-[0.03em] text-navy">
          {wedding.gallery.title}
        </h2>

        <div className="relative z-10 mt-5 w-full max-w-[380px] md:max-w-[600px]">
          <div className="relative h-[340px] touch-pan-y md:h-[520px]">
            {/* flechas (solo escritorio) */}
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() => {
                markInteraction()
                go(-1)
              }}
              className="absolute left-0 top-1/2 z-[200] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy/20 md:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={() => {
                markInteraction()
                go(1)
              }}
              className="absolute right-0 top-1/2 z-[200] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy/20 md:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* escena 3D */}
            <div
              className="relative flex h-full w-full items-center justify-center"
              style={{ perspective: '1000px' }}
              onTouchStart={(event) => onSwipeStart(event.touches[0].clientX)}
              onTouchEnd={(event) => onSwipeEnd(event.changedTouches[0].clientX)}
            >
              {images.map((image, index) => {
                let relative = index - active
                // envolver el índice al ciclo corto más cercano
                if (relative > total / 2) relative -= total
                if (relative < -total / 2) relative += total

                const transform = offsetFor(relative)
                if (transform === null) return null

                const distance = Math.abs(relative)
                const isActive = relative === 0
                const zLayer = 100 - distance
                const opacity = distance === 0 ? 1 : distance === 1 ? 0.75 : distance === 2 ? 0.5 : 0.3

                return (
                  <div
                    key={`${image.src}-${index}`}
                    className="absolute h-[92%] cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-all ease-in-out ring-2 ring-white/30"
                    style={{
                      aspectRatio: '2 / 3',
                      transitionDuration: '1100ms',
                      transform,
                      opacity: relative === 0 ? 1 : opacity,
                      zIndex: zLayer,
                    }}
                    role="button"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={isActive ? `Ver ${image.alt} en grande` : `Ir a la foto ${index + 1}`}
                    onClick={() => {
                      if (isActive) {
                        setLightboxIndex(index)
                      } else {
                        markInteraction()
                        setActive(index)
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        if (isActive) setLightboxIndex(index)
                      }
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading={distance <= 1 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: '50% 50%' }}
                      draggable={false}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* puntos */}
          <div className="mt-3 flex justify-center gap-1.5">
            {images.map((image, index) => {
              const isActive = index === active
              return (
                <button
                  key={`${image.src}-dot-${index}`}
                  type="button"
                  aria-label={`Ir a la foto ${index + 1}`}
                  aria-current={isActive}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive ? 'w-6 bg-navy opacity-70' : 'w-2 bg-navy/25 hover:bg-navy/40'
                  }`}
                  onClick={() => {
                    markInteraction()
                    setActive(index)
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}
