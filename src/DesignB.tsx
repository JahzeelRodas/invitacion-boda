import { BNav } from './sections/b/bNav'
import { BHero, BMessage } from './sections/b/bHero'
import { BDateCountdown } from './sections/b/bCountdown'
import { BFamily } from './sections/b/bFamily'
import { BQuoteLocation } from './sections/b/bLocations'
import { BItinerary } from './sections/b/bDressItinerary'
import { BMusicGroups } from './sections/b/bMusic'
import { BRsvp, BAlbum } from './sections/b/bRsvpAlbum'
import { SongProvider } from './components/audio/SongProvider'

/* ════════════════════════════════════════════════════════════════════════════
   DISEÑO B — "MODELO ELEGANTE 2026" (recreación del modelo de referencia).
   ────────────────────────────────────────────────────────────────────────────
   Flujo vertical fiel al original: hero en arco → canción → mensaje →
   fecha/cuenta regresiva → padres → padrinos → frase/ubicación →
   ceremonia → recepción → itinerario → grupos musicales → confirmación →
   álbum → collage → pie.
   ══════════════════════════════════════════════════════════════════════════ */

export default function DesignB() {
  return (
    <SongProvider>
      <div className="min-h-dvh bg-bPaper">
        <BNav />
        <div className="b-root pt-11">
          <BHero />
          <BMessage />
          <BDateCountdown />
          {/*<BPases />*/}
          <BFamily />
          <BQuoteLocation />
          {/*<BDressCode />*/}
          <BItinerary />
          <BMusicGroups />
          {/*<BGifts />*/}
          {/*<BAdults />*/}
          {/*<BSharePhotos />*/}
          <BRsvp />
          <BAlbum />
          {/*<BFooterBar />*/}
        </div>
      </div>
    </SongProvider>
  )
}
