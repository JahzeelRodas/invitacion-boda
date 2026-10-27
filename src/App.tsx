import { useEffect, useRef, useState } from 'react'
import { wedding } from './config/wedding'
import { MusicProvider, useMusic } from './components/audio/MusicProvider'
import MusicPlayer from './components/audio/MusicPlayer'
import ScrollProgress from './components/layout/ScrollProgress'
import InvitationOpening from './sections/InvitationOpening'
import HeroSection from './sections/HeroSection'
import OurStorySection from './sections/OurStorySection'
import GallerySection from './sections/GallerySection'
import CountdownSection from './sections/CountdownSection'
import EventDetailsSection from './sections/EventDetailsSection'
import DressCodeSection from './sections/DressCodeSection'
import MusicBandSection from './sections/MusicBandSection'
import RSVPSection from './sections/RSVPSection'
import ClosingSection from './sections/ClosingSection'

function Shell() {
  const [opened, setOpened] = useState(false)
  const { play } = useMusic()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = mainRef.current
    if (main) main.inert = !opened
    document.documentElement.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [opened])

  // Se llama en el instante del toque del usuario: la música arranca dentro
  // del contexto de gesto (evita bloqueos de autoplay) y la portada
  // comienza su transición bajo el sobre que aún se cierra.
  const handleOpen = () => {
    setOpened(true)
    play()
  }

  return (
    <>
      <a
        href="#historia"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:border focus:border-electric focus:bg-silk focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.2em]"
      >
        Saltar al contenido
      </a>

      <ScrollProgress />

      <InvitationOpening onOpen={handleOpen} />

      <main ref={mainRef} id="contenido" aria-hidden={!opened}>
        <HeroSection active={opened} />
        <OurStorySection />
        <GallerySection />
        <CountdownSection />
        <EventDetailsSection />
        <DressCodeSection />
        <MusicBandSection />
        <RSVPSection />
        <ClosingSection />

        <footer className="border-t border-electric/20 bg-ivory px-6 py-10 text-center">
          <p className="font-script text-2xl text-electric">{wedding.couple.monogram}</p>
          {wedding.isDemoContent ? (
            <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.3em] text-mute/70">
              Contenido de ejemplo — personaliza la invitación en src/config/wedding.ts
            </p>
          ) : (
            <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.3em] text-mute/70">
              {wedding.date.displayShort} · {wedding.date.place}
            </p>
          )}
        </footer>
      </main>

      <MusicPlayer visible={opened} />
    </>
  )
}

export default function App() {
  return (
    <MusicProvider>
      <Shell />
    </MusicProvider>
  )
}
