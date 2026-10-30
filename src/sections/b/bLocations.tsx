import { designB, type BLocation } from '../../config/designB'
import { WaveBand } from '../../components/decor/bWaves'
import { FrostCard, Reveal, ScriptTitle, TapHint } from './bShared'

/* ════════════════════════════════════════════════════════════════════════════
   7 · UBICACIÓN — frase en vidrio sobre foto + tarjetas de arco de cada
       evento (ceremonia religiosa y recepción social).
   ══════════════════════════════════════════════════════════════════════════ */

export function BQuoteLocation() {
  const { quote, locations } = designB
  return (
    <>
      {/* Foto con tarjeta opaca y la frase de los novios */}
      <section className="relative isolate">
        <img
          src={quote.photo}
          alt={quote.photoAlt}
          loading="lazy"
          className="h-[440px] w-full object-cover sm:h-[540px]"
          style={{ objectPosition: 'center 35%' }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-14 sm:px-8">
          <FrostCard className="mx-auto max-w-[440px]">
            <Reveal>
              <p className="font-bQuatt text-[19px] leading-[1.55] text-white sm:text-[22px]">{quote.text}</p>
            </Reveal>
          </FrostCard>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bPaper/90 to-transparent" />
      </section>

      {/* 🟢 Agregamos -mt-6 sm:-mt-10 y relative z-20 para que la banda azul suba y cubra el espacio blanco de la foto */}
      <WaveBand id="b-ubicacion" band="navy" topWave bottomWave className="relative z-25 -mt-6 sm:-mt-10">
        <ScriptTitle text={locations.sectionTitle} />
      </WaveBand>

      <LocationCard location={locations.ceremony} />
      <LocationCard location={locations.reception} />
    </>
  )
}

function LocationCard({ location }: { location: BLocation & { title: string } }) {
  return (
    <section className="bg-bPaper px-6 pb-14 pt-12 text-center sm:pb-16 sm:pt-14">
      {/* Foto en arco con filete oliva */}
      <Reveal>
        <div className="mx-auto max-w-[330px]">
          <div className="rounded-t-full border-[1.5px] border-bWave/70 p-2">
            <div className="overflow-hidden rounded-t-full">
              <img
                src={location.image}
                alt={location.imageAlt}
                loading="lazy"
                className="h-[330px] w-full object-cover sm:h-[380px]"
                style={{ objectPosition: 'center 40%' }}
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h3 className="mt-4 font-bParis text-[36px] text-bHead sm:text-[44px]">{location.title}</h3>
      </Reveal>

      <Reveal delay={160}>
        <div className="mx-auto mt-5 flex max-w-[400px] flex-row items-stretch justify-center gap-4 text-center">
          <p className="flex items-center font-bQuatt text-[27px] font-bold text-bHead sm:text-[30px]">{location.time}</p>
          <span aria-hidden="true" className="w-px self-stretch bg-bWave/70" />
          <p className="text-left font-bQuatt leading-[1.4]">
            <span className="text-[21px] font-bold text-bHead sm:text-[23px]">{location.venueName}</span>
            {location.addressLines.map((line) => (
              <span key={line} className="block text-[19px] text-bHead sm:text-[21px]">
                {line}
              </span>
            ))}
          </p>
        </div>
      </Reveal>

      <Reveal delay={210}>
        <div className="relative mx-auto mt-7 w-fit">
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[26px] rounded-br-[56px] bg-bNavy px-8 py-3 font-bQuatt text-[19px] text-[#F2F4EC] transition-colors hover:bg-[#1e2c37] sm:text-[21px]"
          >
            Ver Ubicación
          </a>
          <TapHint className="absolute -right-11 -bottom-3" />
        </div>
      </Reveal>
    </section>
  )
}