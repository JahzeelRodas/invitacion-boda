import { motion } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useMusic, type MusicStatus } from './MusicProvider'

const EQ_CLASSES = ['animate-eq-1', 'animate-eq-2', 'animate-eq-3']
const EQ_HEIGHTS = ['h-2', 'h-3.5', 'h-2.5']

const STATUS_TITLES: Record<Exclude<MusicStatus, 'unconfigured'>, string> = {
  idle: 'Reproducir música',
  paused: 'Reproducir música',
  playing: 'Pausar música',
  error: 'La canción no está disponible',
}

interface MusicPlayerProps {
  /** Aparece con fundido una vez abierta la invitación. */
  visible: boolean
}

/**
 * Reproductor flotante pequeño y elegante: reproducción/pausa,
 * ecualizador discreto y control de silencio.
 */
export default function MusicPlayer({ visible }: MusicPlayerProps) {
  const { status, muted, toggle, toggleMuted } = useMusic()

  if (status === 'unconfigured') return null

  const isPlaying = status === 'playing'
  const broken = status === 'error'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6"
    >
      <div className="flex h-11 items-center gap-0.5 rounded-full border border-electric/40 bg-silk/90 pl-1.5 pr-1.5 shadow-[0_2px_18px_rgba(41,39,35,0.10)] backdrop-blur-sm">
        <button
          type="button"
          onClick={toggle}
          disabled={broken}
          aria-label={STATUS_TITLES[status]}
          title={STATUS_TITLES[status]}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-electric/10 disabled:cursor-not-allowed disabled:text-mute/60"
        >
          {isPlaying ? (
            <Pause size={15} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Play size={15} strokeWidth={1.5} aria-hidden="true" className="translate-x-[1px]" />
          )}
        </button>

        <div className="flex h-4 w-5 items-end justify-center gap-[3px]" aria-hidden="true">
          {isPlaying && !broken
            ? EQ_CLASSES.map((eq, i) => (
                <span
                  key={eq}
                  style={{ animationDelay: `${i * 0.18}s` }}
                  className={`${eq} ${EQ_HEIGHTS[i]} w-[2px] origin-bottom rounded-full bg-electric`}
                />
              ))
            : (
                <span className="h-px w-3.5 bg-electric/40" />
              )}
        </div>

        <button
          type="button"
          onClick={toggleMuted}
          aria-label={muted ? 'Activar sonido' : 'Silenciar música'}
          aria-pressed={muted}
          title={muted ? 'Activar sonido' : 'Silenciar música'}
          className="flex h-8 w-8 items-center justify-center rounded-full text-mute transition-colors hover:bg-electric/10"
        >
          {muted ? <VolumeX size={15} strokeWidth={1.5} aria-hidden="true" /> : <Volume2 size={15} strokeWidth={1.5} aria-hidden="true" />}
        </button>
      </div>
    </motion.div>
  )
}
