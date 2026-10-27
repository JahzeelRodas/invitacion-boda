import { lazy, Suspense, useState } from 'react'
import { wedding } from '../config/wedding'
import Reveal from '../components/animation/Reveal'
import { SectionHeader } from '../components/layout/SectionHeader'

// Visor dividido en un fragmento aparte: solo se descarga al abrir una foto.
const Lightbox = lazy(() => import('../components/gallery/Lightbox'))

/** Galería editorial en columnas asimétricas con visor a pantalla completa. */
export default function GallerySection() {
  const { gallery } = wedding
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section id="galeria" className="bg-silk py-24 md:py-32" aria-labelledby="galeria-title">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={gallery.eyebrow} title={gallery.title} />

        <div className="mt-14 columns-2 gap-3 md:columns-3 md:gap-4">
          {gallery.images.map((image, index) => (
            <Reveal key={image.src} delay={(index % 3) * 0.08} className="mb-3 break-inside-avoid md:mb-4">
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Ampliar fotografía: ${image.alt}`}
                className="gallery-item group block w-full cursor-pointer overflow-hidden border border-gold/15 bg-champagne/10"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="img-zoom h-auto w-full object-cover"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Suspense fallback={null}>
        {lightboxIndex !== null && (
          <Lightbox
            images={gallery.images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </Suspense>
    </section>
  )
}
