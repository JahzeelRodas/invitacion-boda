import { useRef, useState } from 'react'
import { designB } from '../../config/designB'
import { WaveBand } from '../../components/decor/bWaves'
import { HeartsDoodle, PhoneBubble, BrandSeal } from '../../components/decor/bIcons'
import { Reveal, ScriptTitle, TintedPhoto, TapHint } from './bShared'

/* ════════════════════════════════════════════════════════════════════════════
   15 · CONFIRMACIÓN — círculo con monograma que abre el formulario + los
        botones de WhatsApp por invitado.
   ══════════════════════════════════════════════════════════════════════════ */

export function BRsvp() {
  const { rsvp, hero } = designB
  const pressed = useRef(false)

  const openForm = () => {
    if (pressed.current) return
    pressed.current = true
    window.setTimeout(() => {
      pressed.current = false
    }, 400)
    if (rsvp.formUrl) {
      window.open(rsvp.formUrl, '_blank', 'noopener')
    }
  }

  return (
    <TintedPhoto
      id="b-confirmacion"
      src={rsvp.background}
      alt={rsvp.photoAlt}
      overClass="bg-[#41525F]/75"
      position="center 38%"
    >
      <div className="px-5 pb-16 pt-12 text-center sm:px-8 sm:pb-20 sm:pt-14">
        {/* Círculo principal */}
        <Reveal>
          <div className="relative mx-auto h-[290px] w-[290px] sm:h-[320px] sm:w-[320px]">
            <button
              type="button"
              onClick={openForm}
              aria-label={`${rsvp.hint}. Confirmar asistencia de ${hero.namesLine}`}
              className="absolute inset-0 grid cursor-pointer place-items-center rounded-full bg-[#33495A]/75 backdrop-blur-[3px] transition-transform active:scale-[0.97]"
            >
              <span className="px-6">
                <span className="block font-bParis text-[92px] leading-none text-white sm:text-[104px]">{hero.monogram}</span>
                <span className="mx-auto mt-4 block max-w-[220px] font-bQuatt text-[18px] leading-[1.35] text-white/95 sm:text-[20px]">
                  {rsvp.hint}
                </span>
              </span>
            </button>
            {/* anillo exterior fino */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[10px] rounded-full border-[1.5px] border-[#C9CFA8]/70"
            />
            <TapHint className="absolute -right-4 top-1/2" stroke="#fff" />
            <HeartsDoodle className="absolute -bottom-2 left-1 w-10 opacity-90" />
          </div>
        </Reveal>



        <Reveal delay={180}>
          <p className="mt-10 font-bCardo text-[34px] text-white sm:text-[40px]">{rsvp.doubtTitle}</p>
          <p className="mt-1 font-serif text-[21px] text-white/95 sm:text-[24px]">{rsvp.writeLabel}</p>
        </Reveal>

        <div className="mx-auto mt-7 flex max-w-[340px] flex-col gap-4">
          {rsvp.guests.map((guest, i) => (
            <Reveal key={guest.name} delay={200 + i * 90}>
              <div className="relative">
                <a
                  href={guest.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-4 rounded-[24px] bg-[#33495A]/60 px-6 py-3.5 backdrop-blur-[2px] transition-colors hover:bg-[#33495A]/80"
                >
                  <PhoneBubble className="h-11 w-11 shrink-0" />
                  <span className="font-bCardo text-[27px] text-white sm:text-[30px]">{guest.name}</span>
                </a>
                <TapHint className="absolute -right-4 -bottom-4" stroke="#fff" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </TintedPhoto>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   16 · ÁLBUM — banda guion, polaroid con carrusel de puntos y collage.
   ══════════════════════════════════════════════════════════════════════════ */

export function BAlbum() {
  const { album } = designB
  const [page, setPage] = useState(0)
  const total = album.photos.length

  return (
    <>
      <WaveBand id="b-album" band="navy" topWave bottomWave>
        <ScriptTitle text={album.title} />
      </WaveBand>

      {/* Polaroid inclinada con carrusel */}
      <section className="bg-bPaper px-6 pb-14 pt-12 sm:pb-16 sm:pt-14">
        <Reveal>
          <figure className="mx-auto max-w-[350px] rotate-[-4deg] rounded-[20px] border-[1.5px] border-[#C9CFA8]/80 bg-[#FFFDF7] p-3 shadow-[0_18px_40px_rgba(40,55,68,0.18)] sm:max-w-[390px]">
            <div className="overflow-hidden rounded-[14px]">
              {album.photos.map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={`Foto ${i + 1} del álbum`}
                  loading="lazy"
                  className={`h-[360px] w-full rounded-[14px] object-cover transition-opacity duration-500 ${i === page ? 'opacity-100' : 'hidden opacity-0'}`}
                  style={{ objectPosition: 'center 32%' }}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-2.5 pb-1 pt-4" role="tablist" aria-label="Páginas del álbum">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === page}
                  aria-label={`Ver foto ${i + 1}`}
                  onClick={() => setPage(i)}
                  className={`h-4 w-4 cursor-pointer rounded-full transition-colors ${i === page ? 'bg-[#98A26B]' : 'bg-[#D6D9BC] hover:bg-[#B9C09B]'}`}
                />
              ))}
            </div>
          </figure>
        </Reveal>
      </section>

      {/* Collage en mosaico escalonado */}
      <section className="bg-bPaper px-4 pb-16 sm:px-5 sm:pb-18">
        <div className="mx-auto grid max-w-[460px] grid-cols-3 gap-2.5 sm:gap-3">
          {album.collage.map((photo, i) => (
            <Reveal key={photo.src + i} delay={i * 70} className={i % 3 === 1 ? 'mt-6 sm:mt-8' : ''}>
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-[158px] w-full rounded-[16px] object-cover sm:h-[178px]"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   17 · PIE — banda roja con el sello del estudio y el contacto.
   ══════════════════════════════════════════════════════════════════════════ */

export function BFooterBar() {
  const { footer } = designB
  return (
    <WaveBand band="red" topWave bottomWave={false}>
      <div className="bg-bFooter px-6 pb-8 pt-9 text-center">
        <Reveal>
          <BrandSeal className="mx-auto h-16 w-16" stroke="#F6EFE4" strokeWidth={1.8} />
          <p className="mt-3 font-serif text-[17px] tracking-[0.3em] text-[#F6EFE4]">{footer.brandName?.toUpperCase()}</p>
          <p className="text-[12px] font-medium uppercase tracking-[0.26em] text-[#EFD9CB]/90">{footer.brandLine}</p>
        </Reveal>

        <Reveal delay={110}>
          <p className="mx-auto mt-6 max-w-[380px] font-bSans text-[16px] text-[#fff]">{footer.headline}</p>
          {footer.contactHref ? (
            <div className="relative mx-auto mt-4 w-fit">
              <a
                href={footer.contactHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[22px] bg-[#fffdfa] px-8 py-2.5 font-bSans text-[16px] font-semibold text-[#27313A] transition-colors hover:bg-white"
              >
                {footer.contactLabel}
              </a>
              <TapHint className="absolute -right-11 -bottom-3" stroke="#F6EFE4" />
            </div>
          ) : null}
        </Reveal>

        {designB.isDemoContent ? (
          <p className="mt-7 text-[9px] font-medium uppercase tracking-[0.3em] text-[#F3DED3]/75">
            Contenido de ejemplo — personaliza la invitación en src/config/designB.ts
          </p>
        ) : null}
      </div>
    </WaveBand>
  )
}
