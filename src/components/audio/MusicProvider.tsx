import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { wedding } from '../../config/wedding'

export type MusicStatus = 'unconfigured' | 'idle' | 'playing' | 'paused' | 'error'

interface MusicContextValue {
  status: MusicStatus
  muted: boolean
  play: () => void
  pause: () => void
  toggle: () => void
  toggleMuted: () => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

/**
 * Proveedor único de audio ambiental. Garantiza una sola instancia de
 * <audio>, gestiona promesas de reproducción, errores de carga y mute.
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [status, setStatus] = useState<MusicStatus>(wedding.music.src ? 'idle' : 'unconfigured')
  const [muted, setMuted] = useState(false)

  const ensureAudio = useCallback((): HTMLAudioElement | null => {
    if (!wedding.music.src) return null
    if (audioRef.current) return audioRef.current

    const audio = new Audio()
    audio.loop = true
    audio.preload = 'metadata'
    audio.volume = Math.min(Math.max(wedding.music.volume ?? 0.5, 0), 1)
    audio.addEventListener('playing', () => setStatus('playing'))
    audio.addEventListener('pause', () => {
      setStatus((current) => (current === 'error' ? current : 'paused'))
    })
    audio.addEventListener('error', () => setStatus('error'))
    audio.src = wedding.music.src
    audioRef.current = audio
    return audio
  }, [])

  // Liberar el audio al desmontar el proveedor.
  useEffect(() => {
    return () => {
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        audio.removeAttribute('src')
        audio.load()
        audioRef.current = null
      }
    }
  }, [])

  const play = useCallback(() => {
    const audio = ensureAudio()
    if (!audio) return
    const attempt = audio.play()
    if (attempt) {
      attempt.catch((error: unknown) => {
        const name = error instanceof DOMException ? error.name : ''
        if (name === 'NotAllowedError') {
          // Autoplay bloqueado: queda a la espera de un gesto del usuario.
          setStatus((current) => (current === 'playing' ? current : 'paused'))
        } else if (name !== 'AbortError') {
          setStatus((current) => (current === 'playing' ? current : 'error'))
        }
      })
    }
  }, [ensureAudio])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio || audio.paused) return
    audio.pause()
    setStatus('paused')
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || audio.paused) {
      play()
    } else {
      pause()
    }
  }, [play, pause])

  const toggleMuted = useCallback(() => {
    setMuted((current) => {
      const next = !current
      const audio = audioRef.current
      if (audio) audio.muted = next
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ status, muted, play, pause, toggle, toggleMuted }),
    [status, muted, play, pause, toggle, toggleMuted],
  )

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export function useMusic(): MusicContextValue {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic debe usarse dentro de <MusicProvider>')
  }
  return context
}
