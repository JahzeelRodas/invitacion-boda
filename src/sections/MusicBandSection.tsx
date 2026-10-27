import { useState } from 'react'
import { Music, Pause, Play, Volume2 } from 'lucide-react'
import { wedding } from '../config/wedding'
import { useMusic } from '../components/audio/MusicProvider'
import Reveal from '../components/animation/Reveal'
import { HairDivider, SectionHeader } from '../components/layout/SectionHeader'

/**
 * Presentación del grupo musical. Carga el reproductor solo cuando el
 * invitado lo solicita (sin autoplay) y detiene la música ambiental
 * al iniciar el video.
 */
export default function MusicBandSection() {
  const { band } = wedding
  const { pause } = useMusic()
  const [videoActive, setVideoActive] = useState(false)
  const [thumbnailFallback, setThumbnailFallback] = useState(false)

  const hasYouTube = band.youtubeVideoId.trim() !== ''
  const hasMp4 = band.mp4Src.trim() !== ''
  const hasVideo = hasYouTube || hasMp4

  const startVideo = () => {
    // El audio ambiental no debe mezclarse con el video.
    pause()
    setVideoActive(true)
  }

  return (
    <section id="musica" className="py-24 md:py-32" aria-labelledby="musica-title">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionHeader eyebrow="La celebración" title="La música de nuestra celebración" />

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl font-script text-[1.8rem] leading-snug text-electric">{band.name}</p>
        </Reveal>

        {band.description && (
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-[1.9] text-mute md:text-[15px]">{band.description}</p>
          </Reveal>
        )}

        {/* ── Video ─────────────────────────────────────────────────────── */}
        <Reveal delay={0.2} className="mt-12">
          {hasVideo ? (
            <figure className="mx-auto max-w-3xl overflow-hidden border border-electric/25 bg-ink shadow-[0_14px_50px_rgba(41,39,35,0.14)]">
              <div className="relative aspect-video w-full">
                {videoActive ? (
                  hasYouTube ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${band.youtubeVideoId}?autoplay=1&rel=0`}
                      title={`Video de ${band.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  ) : (
                    <video
                      src={band.mp4Src}
                      poster={band.image}
                      controls
                      autoPlay
                      preload="metadata"
                      onPlay={pause}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  )
                ) : hasYouTube ? (
                  <button
                    type="button"
                    onClick={startVideo}
                    aria-label={`Reproducir video de ${band.name}`}
                    className="group absolute inset-0 block h-full w-full cursor-pointer"
                  >
                    <img
                      src={
                        thumbnailFallback
                          ? `https://i.ytimg.com/vi/${band.youtubeVideoId}/hqdefault.jpg`
                          : `https://i.ytimg.com/vi/${band.youtubeVideoId}/maxresdefault.jpg`
                      }
                      onError={() => setThumbnailFallback(true)}
                      alt={`Miniatura del video de ${band.name}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors duration-500 group-hover:bg-ink/10"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-silk/60 bg-ink/40 text-silk backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                        <Play size={22} strokeWidth={1.5} className="translate-x-[2px]" />
                      </span>
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startVideo}
                    aria-label={`Reproducir video de ${band.name}`}
                    className="group absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={band.image}
                      alt={`Imagen de ${band.name}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-silk/60 bg-ink/40 text-silk backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                      <Play size={22} strokeWidth={1.5} className="translate-x-[2px]" aria-hidden="true" />
                    </span>
                  </button>
                )}
              </div>
              <figcaption className="flex items-center justify-center gap-2 bg-silk px-4 py-3 text-[9px] font-medium uppercase tracking-[0.3em] text-mute">
                <Volume2 size={12} strokeWidth={1.5} aria-hidden="true" />
                {videoActive ? 'La música ambiental se detuvo' : 'Pulsa para descubrir su música'}
              </figcaption>
            </figure>
          ) : (
            /* Espacio de reserva cuando aún no se configura el video */
            <div className="mx-auto max-w-3xl border border-electric/25 bg-azure/10 px-8 py-14 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-electric/40 text-electric" aria-hidden="true">
                <Music size={19} strokeWidth={1.4} />
              </span>
              <p className="mt-5 font-serif text-xl italic text-ink/85">Espacio reservado para el video del grupo</p>
              <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-mute">
                Para activar esta sección, agrega el identificador de YouTube del grupo en
                <span className="font-medium text-ink/80"> src/config/wedding.ts → band.youtubeVideoId</span>
                , o un archivo MP4 en <span className="font-medium text-ink/80">/public/video</span> → band.mp4Src.
              </p>
              <p className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-mute">
                <Pause size={11} strokeWidth={1.5} aria-hidden="true" />
                Al reproducirlo, la música ambiental se pausará automáticamente
              </p>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.25}>
          <HairDivider className="mt-14" />
        </Reveal>
      </div>
    </section>
  )
}
