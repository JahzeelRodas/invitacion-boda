import { designB } from '../../config/designB'
import { WaveBand } from '../../components/decor/bWaves'
import { EnvelopeHeart, KidsIcon, CameraIcon } from '../../components/decor/bIcons'
import { FrostCard, Reveal, ScriptTitle, TintedPhoto, TapHint } from './bShared'

/* ════════════════════════════════════════════════════════════════════════════
   12 · SUGERENCIA DE REGALOS — banda con intro y tarjeta de vidrio con las
        dos opciones (lluvia de sobres y QR de transferencia).
   ══════════════════════════════════════════════════════════════════════════ */

export function BGifts() {
  const { gifts } = designB
  const titleLines = gifts.sectionTitle.split('\n')
  const introLines = gifts.intro.split('\n')
  return (
    <>
      <WaveBand id="b-regalos" band="navy" topWave bottomWave>
        <div className="mx-auto max-w-[440px] px-7 pb-13 pt-10 text-center sm:pb-16 sm:pt-12">
          <Reveal>
            <p className="whitespace-pre-line font-bQuatt text-[20px] leading-[1.5] text-[#F1F1E7] sm:text-[23px]">
              {introLines.join('\n')}
            </p>
          </Reveal>
        </div>
      </WaveBand>

      <TintedPhoto src={gifts.photo} alt={gifts.photoAlt} overClass="bg-[#41525F]/45" position="center 60%">
        <div className="px-4 py-14 sm:px-8 sm:py-18">
          {/* Título del bloque */}
          <Reveal>
            <h2 className="text-center font-bParis text-[40px] leading-[1.06] text-white sm:text-[52px]">
              {titleLines.map((t) => (
                <span key={t} className="block">
                  {t}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div aria-hidden="true" className="mx-auto mt-5 h-px w-4/5 bg-white/50" />
          </Reveal>

          <FrostCard className="mx-auto mt-7 max-w-[440px]">
            {/* Opción 1: lluvia de sobres */}
            <Reveal>
              <h3 className="font-bQuatt text-[26px] text-white sm:text-[30px]">{gifts.envelopes.title}</h3>
              <EnvelopeHeart className="mx-auto my-4 h-24 w-24 opacity-95 sm:h-28 sm:w-28" stroke="#F4F3EA" />
              <p className="font-bQuatt text-[18px] leading-[1.5] text-[#F3F2E9] sm:text-[20px]">{gifts.envelopes.text}</p>
            </Reveal>

            <Reveal delay={100}>
              <div aria-hidden="true" className="mx-auto my-8 h-px w-11/12 bg-white/35" />
            </Reveal>

            {/* Opción 2: transferencia con QR */}
            <Reveal>
              <h3 className="font-bQuatt text-[26px] text-white sm:text-[30px]">{gifts.transfer.title}</h3>
              <p className="mt-3 font-bQuatt text-[18px] leading-[1.5] text-[#F3F2E9] sm:text-[20px]">{gifts.transfer.text}</p>
              <div className="mx-auto mt-5 max-w-[280px] rounded-xl bg-white/90 p-3 shadow-[0_10px_30px_rgba(15,25,35,0.35)]">
                <div className="relative">
                  {gifts.transfer.qrImage ? (
                    <img src={gifts.transfer.qrImage} alt="Código QR para regalo" className="block h-auto w-full rounded-md" />
                  ) : (
                    <DemoQr />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-bPaper bg-[#22313C]"
                  >
                    <span className="font-bAlice text-[26px] leading-none text-bPaper">$</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </FrostCard>
        </div>
      </TintedPhoto>
    </>
  )
}

/** QR "demo" dibujado a mano: mosaico pseudo-aleatorio — reemplázalo desde
 *  la configura (gifts.transfer.qrImage) con tu QR real. */
function DemoQr() {
  /* patrón semilla fijo: mismas "corridas" siempre */
  const cells: boolean[] = []
  let seed = 42
  for (let i = 0; i < 21 * 21; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648
    cells.push((seed >> 16) % 5 < 2)
  }
  const side = 21
  const finderSquare = (cx: number, cy: number) => {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const border = x === 0 || y === 0 || x === 6 || y === 6
        const core = x >= 2 && y >= 2 && x <= 4 && y <= 4
        cells[cy * side + cx + y * side + x] = border || core
      }
    }
  }
  finderSquare(0, 0)
  finderSquare(14, 0)
  finderSquare(0, 14)
  return (
    <svg viewBox="0 0 21 21" className="block h-auto w-full" role="img" aria-label="QR de ejemplo (reemplazar por el QR real)">
      <rect width="21" height="21" fill="#fff" />
      {cells.map((on, i) =>
        on ? <rect key={i} x={i % side} y={Math.floor(i / side)} width="1.02" height="1.02" fill="#1C2731" /> : null,
      )}
    </svg>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   13 · SOLO ADULTOS.
   ══════════════════════════════════════════════════════════════════════════ */

export function BAdults() {
  const { adults } = designB
  return (
    <section id="b-adultos" className="bg-bPaper px-6 pb-16 pt-15 text-center sm:pb-20 sm:pt-18">
      <Reveal>
        <KidsIcon className="mx-auto h-28 w-28 sm:h-32 sm:w-32" />
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-6 font-bQuatt text-[26px] font-bold tracking-[0.08em] text-[#5E7068] sm:text-[30px]">{adults.title}</p>
        <p className="mx-auto mt-3 max-w-[400px] font-bQuatt text-[20px] leading-[1.5] text-bBody sm:text-[22px]">{adults.note}</p>
      </Reveal>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   14 · SUBIR FOTOS — banda guion + cámara + botón hacia el álbum del evento.
   ══════════════════════════════════════════════════════════════════════════ */

export function BSharePhotos() {
  const { photos } = designB
  return (
    <>
      <WaveBand id="b-fotos" band="navy" topWave bottomWave>
        <ScriptTitle text={photos.title} />
      </WaveBand>
      <section className="bg-bPaper px-6 pb-16 pt-14 text-center sm:pb-18 sm:pt-16">
        <Reveal>
          <CameraIcon className="mx-auto h-32 w-32 sm:h-36 sm:w-36" />
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-6 max-w-[380px] font-bQuatt text-[20px] leading-[1.5] text-bBody sm:text-[23px]">{photos.note}</p>
        </Reveal>
        <Reveal delay={160}>
          <div className="relative mx-auto mt-8 w-fit">
            <a
              href={photos.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[28px] rounded-br-[54px] border border-bWave/60 bg-gradient-to-br from-[#5F7381] to-[#2E4454] px-9 py-3 font-bAlice text-[20px] text-white shadow-[0_10px_26px_rgba(35,50,62,0.35)] transition-transform hover:scale-[1.03] sm:text-[22px]"
            >
              {photos.buttonLabel}
            </a>
            <TapHint className="absolute -right-12 -bottom-4" />
          </div>
        </Reveal>
      </section>
    </>
  )
}
