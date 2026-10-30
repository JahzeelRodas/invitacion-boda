import { designB } from '../../config/designB'
import { WaveBand } from '../../components/decor/bWaves'
import { Reveal } from './bShared'

/* ════════════════════════════════════════════════════════════════════════════
   11b · GRUPOS MUSICALES — el material de cada grupo (video y/o foto) en el
   ritmo del modelo: banda azul con guion + tarjetas con filete oliva.
   Config: `designB.musicGroups`.
   ══════════════════════════════════════════════════════════════════════════ */

/** Pentagrama dibujado a mano (icono junto a los nombres). */
function MusicNote({ className, stroke = '#98A26B' }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={`inline-block ${className ?? 'h-8 w-8'}`}>
      <path d="M24 44 L24 16 L46 10 L46 38" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
      <ellipse cx="18" cy="44" rx="6" ry="5" stroke={stroke} strokeWidth="2.4" />
      <ellipse cx="40" cy="38" rx="6" ry="5" stroke={stroke} strokeWidth="2.4" />
    </svg>
  )
}

export function BMusicGroups() {
  const { musicGroups } = designB
  if (!musicGroups.groups.length) return null

  return (
    <>
      <WaveBand id="b-grupos" band="navy" topWave bottomWave>
        <Reveal>
          <p className="mx-auto max-w-[430px] px-7 pb-12 pt-9 text-center font-bQuatt text-[20px] leading-[1.5] text-[#F1F1E7] sm:pb-14 sm:pt-11 sm:text-[23px]">
            {musicGroups.intro}
          </p>
        </Reveal>
      </WaveBand>

      <section className="bg-bPaper px-6 pb-16 pt-11 sm:pb-16 sm:pt-12">
        <div className="mx-auto flex max-w-[420px] flex-col gap-8 sm:gap-10">
          {musicGroups.groups.map((group) => (
            <Reveal key={group.name}>
              <figure className="overflow-hidden rounded-[20px] border-[1.5px] border-bWave/70 bg-white/60 p-2 shadow-[0_14px_34px_rgba(45,62,76,0.14)]">
                {group.video ? (
                  <video
                    controls
                    preload="metadata"
                    poster={group.video.poster}
                    src={group.video.src}
                    className="aspect-video w-full rounded-[14px] bg-[#2C3A47] object-cover"
                  />
                ) : null}
                {group.photo ? (
                  <img
                    src={group.photo.src}
                    alt={group.photo.alt}
                    loading="lazy"
                    className="aspect-video w-full rounded-[14px] object-cover"
                  />
                ) : null}
                <figcaption className="flex flex-col items-center gap-1 pb-3 pt-3 text-center">
                  <span className="flex items-center gap-2">
                    <MusicNote className="h-6 w-6" />
                    <span className="font-bQuatt text-[22px] font-bold text-bHead sm:text-[25px]">{group.name}</span>
                    <MusicNote className="h-6 w-6 -scale-x-100" />
                  </span>
                  {group.detail ? (
                    <span className="font-bQuatt text-[16px] text-bBody sm:text-[17px]">{group.detail}</span>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
