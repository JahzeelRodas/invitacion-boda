import { useState } from 'react'
import { designB } from '../../config/designB'
import { WaveBand } from '../../components/decor/bWaves'
import { BrandSeal } from '../../components/decor/bIcons'
import { Reveal, ScriptTitle, TintedPhoto, TapHint } from './bShared'

/* ════════════════════════════════════════════════════════════════════════════
   15 · CONFIRMACIÓN / SECCIÓN CENTRAL — espacio reservado y frase inspiradora.
   ══════════════════════════════════════════════════════════════════════════ */

export function BRsvp() {
  return (
    <TintedPhoto
      id="b-confirmacion"
      src={designB.rsvp.background}
      alt={designB.rsvp.photoAlt}
      overClass="bg-[#41525F]/75"
      position="center 38%"
    >
      <div className="px-5 pb-16 pt-12 text-center sm:px-8 sm:pb-20 sm:pt-14">
        {/* Espacio reservado con la misma altura que ocupaba el círculo para no encoger la foto */}
        <div aria-hidden="true" className="mx-auto h-[220px] w-[220px] sm:h-[250px] sm:w-[250px]" />

        {/* Frase no bíblica destacada */}
        <Reveal>
          <div className="mx-auto mt-6 max-w-[420px] px-4">
            <p className="font-bCardo text-[26px] leading-[1.45] text-white sm:text-[32px]">
              "El amor no se mira con los ojos, sino con el alma."
            </p>

          </div>
        </Reveal>
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
      <WaveBand id="b-album" band="navy" topWave bottomWave className="relative z-20 -mt-8 sm:-mt-12">
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