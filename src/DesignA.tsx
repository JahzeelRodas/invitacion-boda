import { useEffect, useRef, useState } from 'react'
import { wedding } from './config/wedding'
import { MusicProvider, useMusic } from './components/audio/MusicProvider'
import MusicPlayer from './components/audio/MusicPlayer'
import InvitationOpening from './sections/InvitationOpening'
import HeroSection from './sections/HeroSection'
import CeremonyInfoCard from './sections/CeremonyInfoCard'
import GalleryCarousel from './sections/GalleryCarousel'
import ReceptionInfoCard from './sections/ReceptionInfoCard'
import VenueSection from './sections/VenueSection'
//import DressCodeSection from './sections/DressCodeSection'
import ProgramTimelineCard from './sections/ProgramTimelineCard'
import MusicGroupsSection from './sections/MusicGroupsSection'
import GuestbookSection from './sections/GuestbookSection'
//import GiftsSection from './sections/GiftsSection'
import RSVPModal from './components/rsvp/RSVPModal'
import { GoldenOrnament } from './components/decor/ornaments'

/* ════════════════════════════════════════════════════════════════════════════
   DISEÑO A — "MINIMALISMO AZUL PROFUNDO"; portada con sello y flujo completo.
   ══════════════════════════════════════════════════════════════════════════ */

function Shell() {
  const [opened, setOpened] = useState(false)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const { play } = useMusic()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = mainRef.current
    if (main) main.inert = !opened
    // La portada (y el modal RSVP) bloquean el desplazamiento del fondo.
    const lockScroll = !opened || rsvpOpen
    document.documentElement.style.overflow = lockScroll ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [opened, rsvpOpen])

  // Se llama en el instante del toque del usuario: la música arranca dentro
  // del contexto de gesto (evita bloqueos de autoplay) y la portada
  // comienza su transición.
  const handleOpen = () => {
    setOpened(true)
    play()
  }

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:border focus:border-navy focus:bg-cream focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.2em]"
      >
        Saltar al contenido
      </a>

      <InvitationOpening onOpen={handleOpen} />

      <main
        ref={mainRef}
        id="contenido"
        aria-hidden={!opened}
        className="flex w-full justify-center overflow-x-clip bg-white"
      >
        {/* Escenario de la invitación: columna móvil de 480px; en escritorio
            se enmarca con un filete sutil — igual que la referencia visual. */}
        <div
          className="relative isolate w-full max-w-[480px] overflow-hidden text-navy md:mx-auto md:max-w-[900px] md:rounded-sm md:border md:border-navy/15"
          style={{ backgroundColor: '#F7F5EE' }}
        >
          {/* textura de papel global */}
          <div aria-hidden="true" className="paper-noise pointer-events-none absolute inset-0 z-0 opacity-60" />

          <HeroSection />
          <CeremonyInfoCard />

          <div className="relative z-10">
            <GalleryCarousel />
          </div>

          <ReceptionInfoCard onOpenRsvp={() => setRsvpOpen(true)} />
          <VenueSection />
          {/*<DressCodeSection /> */}
          <ProgramTimelineCard />
          <MusicGroupsSection />
          <GuestbookSection />
          {/*<GiftsSection />*/}

          {/* cierre */}
          <footer className="relative z-10 flex flex-col items-center px-6 pb-6 text-center">
            <p className="mx-auto flex max-w-[560px] flex-col gap-1 text-[11px] text-navy md:text-[13px]">
              {wedding.gifts.footnote}
            </p>
            <GoldenOrnament className="mt-6 block w-12" />
            {/*wedding.isDemoContent ? (
              <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.3em] text-navy/50">
                Contenido de ejemplo — personaliza la invitación en src/config/wedding.ts
              </p>
            ) : (
              <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.3em] text-navy/50">
                {wedding.date.displayShort} · {wedding.date.place}
              </p>
            )*/}
          </footer>
        </div>
      </main>

      <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
      <MusicPlayer visible={opened && !rsvpOpen} />
    </>
  )
}

export default function DesignA() {
  return (
    <MusicProvider>
      <Shell />
    </MusicProvider>
  )
}
