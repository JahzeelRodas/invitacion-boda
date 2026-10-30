import { useState } from 'react'
import { motion } from 'framer-motion'
import { wedding } from '../config/wedding'
import { GiftBoxArt, CastleArt } from '../components/decor/ornaments'

interface ConfettiPiece {
  id: number
  color: string
  dx: number
  dy: number
  rot: number
  shape: 'rect' | 'circle' | 'triangle'
  size: number
}

const CONFETTI_COLORS = ['#C9A24A', '#EC4899', '#22C55E', '#3B82F6', '#A855F7', '#FACC15', '#F97316', '#00224C']
const BURST_KEY = 'gift-burst'

/**
 * "Caja de Regalos": castillos lineales de fondo, caja flotante con
 * brillos que salta al tocarla y despliega el mini-carrusel de cuenta atrás
 * 3D + estallido de confeti, y abre el modal con cuentas / QR de regalo.
 */
export default function GiftsSection() {
  const { gifts } = wedding
  const [open, setOpen] = useState(false)
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const openBox = () => {
    setOpen(true)
    burst()
  }

  const burst = () => {
    const pieces: ConfettiPiece[] = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      dx: (i - 7.5) * 26 + (i % 3) * 9,
      dy: 200 + ((i * 37) % 70),
      rot: 200 + i * 31,
      shape: i % 4 === 0 ? 'circle' : i % 4 === 1 ? 'rect' : 'triangle',
      size: 8 + (i % 4) * 2,
    }))
    setConfetti(pieces)
    window.setTimeout(() => setConfetti([]), 1_500)
  }

  const copyDetail = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey(null), 1_800)
    } catch {
      /* el portapapeles puede fallar en algunos navegadores: silencio */
    }
  }

  return (
    <div className="relative z-10 overflow-x-clip">
      {/* castillos lineales de fondo */}
      <CastleArt
        variant={1}
        className="pointer-events-none absolute left-[52%] top-[-14%] w-[62%] text-navy opacity-30"
      />
      <CastleArt
        variant={2}
        className="pointer-events-none absolute left-[22%] top-[-18%] w-[64%] text-navy opacity-20"
      />

      <div className="relative z-20 flex flex-col items-center justify-center px-6 pb-10 pt-8">
        <h2 className="mb-4 text-center text-[20px] font-bold uppercase tracking-[0.03em] font-serif text-navy">
          {gifts.title}
        </h2>

        {/* la caja */}
        <button
          type="button"
          onClick={openBox}
          aria-label="Abrir caja de regalos"
          className="group relative cursor-pointer border-none bg-transparent outline-none"
          style={{ width: 260, height: 280 }}
        >
          {/* brillos */}
          <span aria-hidden="true" className="pointer-events-none absolute left-[14%] top-[8%] z-20 text-[22px] text-gold-antique" style={{ animation: 'giftSparkle 1.8s ease-in-out infinite' }}>
            ✦
          </span>
          <span aria-hidden="true" className="pointer-events-none absolute right-[10%] top-[18%] z-20 text-[16px] text-gold-antique" style={{ animation: 'giftSparkle 2.2s ease-in-out 0.5s infinite' }}>
            ✦
          </span>
          <span aria-hidden="true" className="pointer-events-none absolute left-[5%] top-[32%] z-20 text-[14px] text-gold-antique" style={{ animation: 'giftSparkle 2s ease-in-out 1s infinite' }}>
            ✦
          </span>
          <span aria-hidden="true" className="pointer-events-none absolute right-[5%] top-[26%] z-20 text-[14px] text-gold-antique" style={{ animation: 'giftSparkle 1.6s ease-in-out 1.4s infinite' }}>
            ✦
          </span>

          {/* confeti al abrir */}
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 bottom-[86px] h-0 w-0">
            {confetti.map((piece) => (
              <span
                key={piece.id}
                className="absolute"
                style={{
                  ['--dx' as string]: `${piece.dx}px`,
                  ['--dy' as string]: `${piece.dy}px`,
                  ['--rot' as string]: `${piece.rot}deg`,
                  left: -piece.size / 2,
                  top: -piece.size / 2,
                  width: piece.shape === 'triangle' ? 0 : piece.size,
                  height: piece.shape === 'triangle' ? 0 : piece.size / (piece.shape === 'rect' ? 2 : 1),
                  backgroundColor: piece.shape === 'triangle' ? undefined : piece.color,
                  borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'rect' ? 2 : 0,
                  borderLeft: piece.shape === 'triangle' ? '5px solid transparent' : undefined,
                  borderRight: piece.shape === 'triangle' ? '5px solid transparent' : undefined,
                  borderBottom: piece.shape === 'triangle' ? `10px solid ${piece.color}` : undefined,
                  animation: `confettiOut 1.15s ${piece.id * 0.05}s ease-out both`,
                }}
              />
            ))}
          </span>

          {/* caja flotante */}
          <div className="relative left-1/2 bottom-0 h-[220px] w-[200px] -translate-x-1/2" style={{ animation: 'giftBob 3.4s ease-in-out infinite', willChange: 'transform' }}>
            <GiftBoxArt className="h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.25)]" />
          </div>

          <p className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-navy" style={{ animation: 'hintPulse 2s ease-in-out infinite' }}>
            {gifts.hint}
          </p>
        </button>
      </div>

      {/* lightbox modal de regalo */}
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={gifts.modalTitle}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button type="button" aria-label="Cerrar" className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-cream sm:rounded-2xl sm:max-w-xl"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* cabecera azul */}
            <div className="relative px-6 pb-4 pt-6 text-center" style={{ backgroundColor: '#00224C' }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-[20px] font-bold uppercase tracking-[0.03em] font-serif text-white">
                {gifts.modalTitle}
              </h2>
            </div>

            {/* tarjetas de regalo */}
            <div className="flex flex-wrap items-start justify-center gap-6 p-4 sm:p-6 sm:flex-row sm:flex-wrap text-navy">
              {gifts.methods.map((method, i) => {
                const key = `${BURST_KEY}-${i}`
                return (
                  <div key={key} className="flex max-w-[220px] flex-1 flex-col items-center sm:max-w-none">
                    <h3 className="mb-2 text-xs font-medium text-center text-navy">{method.label}</h3>

                    {method.qrImage ? (
                      <div className="mt-1 flex h-40 w-40 justify-center rounded-xl bg-white p-2 shadow-lg" style={{ border: '2px solid rgba(0,34,76,0.13)' }}>
                        <img src={method.qrImage} alt={`QR de ${method.holder ?? method.label}`} className="h-full w-full object-contain" />
                      </div>
                    ) : (
                      <div className="flex h-40 w-40 flex-col items-center justify-center rounded-xl bg-white/70 p-3 text-center shadow-inner" style={{ border: '2px dashed rgba(0,34,76,0.25)' }}>
                        <span className="text-[10px] uppercase tracking-[0.12em] text-navy/50">Espacio reservado</span>
                        <span className="mt-1 text-[10px] text-navy/40">Coloca tu QR real en /public/images<br />y apóntalo en wedding.ts</span>
                      </div>
                    )}

                    <div className="mt-2 space-y-0.5 text-center">
                      {method.holder && <p className="text-[11px] font-semibold">{method.holder}</p>}
                      {method.detailLines.map((line) => (
                        <p key={line} className="break-all font-mono text-[11px] text-navy">
                          {line}
                        </p>
                      ))}
                      {method.note && <p className="mt-1 text-[10px] leading-snug text-navy/60">{method.note}</p>}
                    </div>

                    <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => copyDetail(key, method.detailLines.join('\n'))}
                        className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors"
                        style={{ backgroundColor: 'rgba(0,34,76,0.08)', color: '#00224C' }}
                      >
                        {copiedKey === key ? '¡Copiado!' : 'Copiar datos'}
                      </button>
                      {method.link && (
                        <a
                          href={method.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium"
                          style={{ backgroundColor: '#00224C', color: '#ECE4D8' }}
                        >
                          {method.link.label}
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
