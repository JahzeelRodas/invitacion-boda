import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { designB } from '../../config/designB'

export interface SongContextValue {
  /** ¿Se está reproduciendo la canción ahora mismo? */
  playing: boolean
  play: () => void
  pause: () => void
  toggle: () => void
}

const SongContext = createContext<SongContextValue | null>(null)

/**
 * Proveedor único de la canción del Modelo 2 (`designB.song`). Garantiza
 * una sola instancia de <audio> (invisible y en bucle) para poder
 * pausarla y reanudarla desde cualquier sección: la barra del hero y
 * los videos de los grupos musicales comparten el mismo medio.
 */
export function SongProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Sincroniza el estado con los eventos reales del medio (así la barra
  // del hero refleja pausas iniciadas fuera de ella, p. ej. desde el video).
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => setPlaying(false)
    const handlePause = () => setPlaying(false)
    const handlePlay = () => setPlaying(true)

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('play', handlePlay)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('play', handlePlay)
    }
  }, [])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !designB.song.audioSrc) return
    audio.play().catch((error: unknown) => {
      console.error('No se pudo reproducir la canción:', error)
      setPlaying(false)
    })
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio || audio.paused) return
    audio.pause()
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      play()
    } else {
      pause()
    }
  }, [play, pause])

  const value = useMemo(
    () => ({ playing, play, pause, toggle }),
    [playing, play, pause, toggle],
  )

  return (
    <SongContext.Provider value={value}>
      {children}
      {/* Elemento de audio compartido (invisible) que vive con el Modelo 2. */}
      {designB.song.audioSrc ? (
        <audio ref={audioRef} src={designB.song.audioSrc} preload="none" loop controls={false} />
      ) : null}
    </SongContext.Provider>
  )
}

export function useSong(): SongContextValue {
  const context = useContext(SongContext)
  if (!context) {
    throw new Error('useSong debe usarse dentro de <SongProvider>')
  }
  return context
}
