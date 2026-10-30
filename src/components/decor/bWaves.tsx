import type { ReactNode } from 'react'

/* ════════════════════════════════════════════════════════════════════════════
   BANDAS ONDULADAS del diseño B.
   Ondas propias dibujadas en SVG: una base oliva (filete) y la banda
   pizarra encima, con dos amplitudes para que se sientan hechas a mano.
   ══════════════════════════════════════════════════════════════════════════ */

type WaveKind = 'navy' | 'sage' | 'cream' | 'red' | 'photoFrost'

interface WaveBandProps {
  /** Sección interior que la banda envuelve (p. ej. el mensaje). */
  children?: ReactNode
  band?: WaveKind
  /** Onda superior con filete oliva. */
  topWave?: boolean
  /** Onda inferior con filete oliva. */
  bottomWave?: boolean
  className?: string
  id?: string
}

const BAND_BG: Record<WaveKind, string> = {
  navy: '#293C4B',
  sage: '#ECE8DC',
  cream: '#fffdfa',
  red: '#860D11',
  photoFrost: 'transparent',
}

/** Un solo borde ondulado — base `fill` y colorido sobre él. */
function WaveEdge({
  side,
  fillBase,
  fillTop,
  className,
}: {
  side: 'top' | 'bottom'
  fillBase?: string
  fillTop?: string
  className?: string
}) {
  const flip = side === 'bottom'
  return (
    <svg
      viewBox="0 0 1440 74"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-[34px] w-full sm:h-[46px] ${flip ? 'rotate-180' : ''} ${className ?? ''}`}
    >
      {fillBase ? <path d={WAVE_SOFT} fill={fillBase} /> : null}
      <path d={WAVE_MAIN} fill={fillTop ?? 'none'} />
    </svg>
  )
}

/* Onda principal: sube y baja dos crestas irregulares. */
const WAVE_MAIN =
  'M0,58 C90,30 190,16 320,26 C470,37 560,62 700,54 C850,45 930,12 1080,20 C1230,28 1320,52 1440,42 L1440,74 L0,74 Z'
/* Filete oliva: desplazado ~6px y más plano — remata la cresta. */
const WAVE_SOFT =
  'M0,60 C110,36 220,24 350,32 C500,42 590,66 730,58 C880,50 960,18 1100,26 C1250,34 1340,56 1440,48 L1440,74 L0,74 Z'

/**
 * Banda con fondo plano + ondas arriba/abajo (mensajes, títulos).
 * Ejemplo de uso:
 *   <WaveBandTop><div class="bg-bNavy">…</div></WaveBandTop>
 */
export function WaveBand({
  children,
  band = 'navy',
  topWave = true,
  bottomWave = true,
  className,
  id,
}: WaveBandProps) {
  const bg = BAND_BG[band]
  return (
    <section id={id} className={`relative isolate ${className ?? ''}`}>
      {topWave ? <WaveEdge side="top" fillBase={band === 'navy' || band === 'red' ? '#98A26B' : undefined} fillTop={bg} /> : null}
      <div style={{ backgroundColor: bg }}>{children}</div>
      {bottomWave ? <WaveEdge side="bottom" fillBase={band === 'navy' || band === 'red' ? '#98A26B' : undefined} fillTop={bg} /> : null}
    </section>
  )
}

/** Onda / filete sueltos (para unir fotos con crema sin banda intermedia). */
export function WaveOnly({
  side,
  color,
}: {
  side: 'top' | 'bottom'
  color: string
}) {
  return <WaveEdge side={side} fillTop={color} />
}

/* ════════════════════════════════════════════════════════════════════════════
   GLIFOS con corazón y cursor (algunos botones del original llevan una
   manita "tocando" el botón). Se recrean aparte en bIcons.
   ══════════════════════════════════════════════════════════════════════════ */

/** Botón rectangular asimétrico estilo "hoja" del original. */
export function LeafButton({
  href,
  children,
  tone = 'navy',
  className,
}: {
  href: string
  children: ReactNode
  tone?: 'navy' | 'ghost'
  className?: string
}) {
  const styles =
    tone === 'navy'
      ? 'bg-bNavy text-[#F3F6EA] hover:bg-[#1f2e39]'
      : 'bg-white/15 text-white border border-white/70 backdrop-blur-md hover:bg-white/25'
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-[26px] rounded-br-[52px] px-7 py-3 text-center font-bQuatt text-[17px] leading-tight transition-colors sm:text-[19px] ${styles} ${className ?? ''}`}
    >
      {children}
    </a>
  )
}
