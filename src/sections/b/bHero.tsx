import { designB } from '../../config/designB'
import { WaveBand } from '../../components/decor/bWaves'
import { useSong } from '../../components/audio/SongProvider'
import { HeartsDoodle, HeartFill, PrevIcon, NextIcon } from '../../components/decor/bIcons'
import { Reveal, TapHint } from './bShared'

/* ════════════════════════════════════════════════════════════════════════════
   1 · HERO — foto en arco con nombres + fecha, y la barra de la canción.
   ══════════════════════════════════════════════════════════════════════════ */

export function BHero() {
  const { hero } = designB
  return (
    <header id="b-hero" className="relative bg-bPaper">
      {/* Foto con recorte en arco (borde inferior cóncavo) */}
      <div className="relative isolate px-0">
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: '0 0 52% 52% / 0 0 17% 17%' }}
        >
          <img
            src={hero.photo}
            alt={hero.photoAlt}
            className="h-[520px] w-full object-cover sm:h-[620px]"
            style={{ objectPosition: 'center 30%' }}
            fetchPriority="high"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-bInk/25" />
          {/* veladura inferior para que los nombres reposen sobre la foto */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#24333E]/80 via-[#24333E]/30 to-transparent" />
          {/* corazones dibujados arriba */}
          <HeartsDoodle className="absolute left-1/2 top-8 w-20 -translate-x-1/2 opacity-90" />
        </div>

        {/* Nombres y fecha en flujo, solapando el bajo del arco (la caja del
            arco no recorta: es su contenedor, sin overflow ocultando). */}
        <div className="pointer-events-none relative z-10 -mt-[150px] pb-3 sm:-mt-[195px]">
          <Reveal delay={140}>
            <p className="px-2 text-center font-bHand text-[44px] leading-[1.05] text-white drop-shadow-[0_2px_10px_rgba(20,30,40,0.55)] sm:text-[58px]">
              {hero.namesLine}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-2 text-center font-bAlice text-[20px] tracking-[0.22em] text-white drop-shadow-[0_2px_8px_rgba(20,30,40,0.55)] sm:text-[26px]">
              {hero.dateShort}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Barra de la canción */}
      <SongStrip />
    </header>
  )
}


function SongStrip() {
  const { song } = designB
  const { playing, toggle } = useSong()

  const hintParts = song.hint.split('[]')

  // El control del <audio> vive en <SongProvider>; aquí solo se consulta
  // el estado (playing) y se alterna reproducción/pausa (toggle), así las
  // pausas desde los videos de los grupos se reflejan en este botón.
  const press = () => {
    if (song.audioSrc) {
      toggle()
      return
    }

    if (song.src) {
      window.open(song.src, '_blank', 'noopener')
    }
  }

  return (
    <div className="pb-6 pt-9 text-center">

      <Reveal>
        <p className="mx-auto inline-block pb-2 font-bQuatt text-[20px] leading-snug text-bSage sm:text-[23px]">
          {hintParts[0]}
          <HeartFill
            className="mx-2 inline-block h-6 w-6 self-center -translate-y-[2px] align-middle"
            fill="#98A26B"
          />
          {hintParts[1]}
        </p>

        <div
          aria-hidden="true"
          className="mx-auto h-px w-3/5 bg-bWave/70"
        />
      </Reveal>

      <Reveal delay={120}>
        <div
          className="mt-5 flex items-center justify-center gap-6"
          role="group"
          aria-label="Reproductor de la canción"
        >
          <button
            type="button"
            aria-label="Canción anterior"
            className="cursor-pointer opacity-60 hover:opacity-100"
          >
            <PrevIcon className="h-8 w-8" />
          </button>

          <button
            type="button"
            onClick={press}
            aria-label={playing ? 'Pausar canción' : 'Reproducir canción'}
            aria-pressed={playing}
            className="group relative grid h-[52px] w-[52px] cursor-pointer place-items-center rounded-full bg-bSage2/90 shadow-[0_4px_14px_rgba(128,136,113,0.45)] transition-transform active:scale-95"
          >
            <HeartFill
              className="h-7 w-7 transition-transform group-active:scale-90"
              fill="#ffffff"
            />

            <span
              className={`pointer-events-none absolute inset-0 rounded-full ${
                playing ? 'animate-bPulse' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            aria-label="Canción siguiente"
            className="cursor-pointer opacity-60 hover:opacity-100"
          >
            <NextIcon className="h-8 w-8" />
          </button>

          <TapHint className="-ml-9 mt-7 -mr-4" />
        </div>
      </Reveal>
    </div>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
   2 · MENSAJE — banda azul ondulada con el texto de bienvenida.
   ══════════════════════════════════════════════════════════════════════════ */

export function BMessage() {
  return (
    <WaveBand id="b-mensaje" topWave bottomWave className="mt-2">
      <div className="mx-auto max-w-[430px] px-7 pb-12 pt-10 text-center sm:pb-14 sm:pt-12">
        <Reveal>
          <p className="font-bQuatt text-[21px] leading-[1.45] text-[#F5F4EC] sm:text-[24px]">{designB.message}</p>
        </Reveal>
      </div>
    </WaveBand>
  )
}
