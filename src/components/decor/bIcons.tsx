import type { CSSProperties, ReactNode } from 'react'

/* ════════════════════════════════════════════════════════════════════════════
   ICONOGRAFÍA del diseño B — dibujo propio, trazo fino tipo marcador,
   imitando el lenguaje del original (línea 2px, esquinas redondeadas).
   Todos aceptan `stroke` para recolorearse.
   ══════════════════════════════════════════════════════════════════════════ */

interface IconProps {
  className?: string
  stroke?: string
  strokeWidth?: number
  /** Color de relleno para los iconos sólidos. */
  fill?: string
}

const base = (className?: string) => `inline-block ${className ?? 'h-12 w-12'}`

/* ── Corazones ──────────────────────────────────────────────────────────── */

/** Corazón contorneado (doodle sobre las fotos del hero). */
export function HeartOutline({ className, stroke = '#fff', strokeWidth = 2.6 }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={base(className)}>
      <path
        d="M30 55 C22 48 8 38 8 24 C8 15 15 9 22 12 C26 14 29 18 30 21 C31 18 34 14 38 12 C45 9 52 15 52 24 C52 38 42 46 35 53 Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Corazón relleno (botón de música y puntos del itinerario). */
export function HeartFill({ className, fill = '#fff' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={base(className)}>
      <path
        d="M30 55 C22 48 8 38 8 24 C8 15 15 9 22 12 C26 14 29 18 30 21 C31 18 34 14 38 12 C45 9 52 15 52 24 C52 38 42 46 35 53 Z"
        fill={fill}
      />
    </svg>
  )
}

/** Estilos inline para escalonar las animaciones de trazo (propiedades CSS). */
const sketchStyle = (dur: string, delay: string) =>
  ({ '--draw-dur': dur, '--draw-delay': delay }) as CSSProperties

/**
 * Corazón "dibujado a lápiz": doble contorno imperfecto con repunte en el
 * cierre, sombreado suave tipo crayón y pequeñas rayas de hatching — fiel al
 * lenguaje de trazo fino del resto de la iconografía. Se dibuja solo cuando
 * el contenedor recibe `b-sketch-in` (usa `pathLength={1}` + dasharray).
 */
export function HeartSketch({ className, stroke = '#B50F15', strokeWidth = 3 }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={base(className)}>
      {/* Velo interior como lápiz de color */}
      <path
        className="b-sketch-veil"
        d="M30 55 C22 48 8 38 8 24 C8 15 15 9 22 12 C26 14 29 18 30 21 C31 18 34 14 38 12 C45 9 52 15 52 24 C52 38 42 46 35 53 Z"
        fill={stroke}
        fillOpacity={0.13}
        style={sketchStyle('0.8s', '0.95s')}
      />
      {/* Rayas cortas de sombreado (hatching) */}
      <path
        className="b-sketch-line b-sketch-line--shade"
        d="M19.4 22.3 C20.2 25.2 22.2 28.3 24.8 30.6"
        stroke={stroke}
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
        pathLength={1}
        style={sketchStyle('0.25s', '1.0s')}
      />
      <path
        className="b-sketch-line b-sketch-line--shade"
        d="M23.6 27.1 C24.5 30.3 26.6 33.4 29.2 35.6"
        stroke={stroke}
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
        pathLength={1}
        style={sketchStyle('0.25s', '1.15s')}
      />
      <path
        className="b-sketch-line b-sketch-line--shade"
        d="M27.9 31.9 C28.9 34.4 30.9 37.2 33.4 39.2"
        stroke={stroke}
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
        pathLength={1}
        style={sketchStyle('0.25s', '1.3s')}
      />
      {/* Primera pasada del contorno, con repunte (overshoot) en el cierre */}
      <path
        className="b-sketch-line"
        d="M29.6 54.3 C21.6 47.6 8.4 38.6 8.7 24.5 C9 15.3 15.7 9.2 22.5 12.3 C26.5 14.2 29.3 18.3 30.3 21.4 C31.5 18.5 34.7 14.4 38.7 12.5 C45.9 9.3 51.8 15.7 51.7 24.6 C51.6 38.3 42 46.5 35.3 52.7 C33.4 54.4 31.4 55 29.6 54.3"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
      />
      {/* Segunda pasada: más tenue y desviada, como repasar a lápiz */}
      <path
        className="b-sketch-line b-sketch-line--echo"
        d="M30.5 53.3 C22.9 47.1 10.2 39 10.5 25 C10.7 16.5 16.5 10.5 23.1 13.3 C26.7 14.9 29.5 18.7 30.4 21.7 C31.3 18.9 35.1 15.1 40.5 13.5 C46.5 11.8 51 17 50.9 24.9 C50.8 37.7 42.5 45.9 36.1 51.8"
        stroke={stroke}
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        pathLength={1}
        style={sketchStyle('0.7s', '0.45s')}
      />
    </svg>
  )
}

/** Dibujo del par de corazones del hero (uno dentro de otro). */
export function HeartsDoodle({ className, stroke = '#fff', strokeWidth = 2.2 }: IconProps) {
  return (
    <svg viewBox="0 0 96 84" fill="none" aria-hidden="true" className={base(className)}>
      <path
        d="M34 66 C24 58 8 46 8 30 C8 19 16 12 24 15 C29 17 32 22 34 26 C36 22 39 17 44 15 C52 12 60 19 60 30 C60 46 50 56 40 64 Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62 74 C57 70 48 62 48 52 C48 45 53 41 58 43 C60 44 62 47 63 49 C64 47 66 44 68 43 C73 41 78 45 78 52 C78 62 71 68 66 72 Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Reproductor ────────────────────────────────────────────────────────── */

export function PrevIcon({ className, stroke = '#808871', strokeWidth = 3 }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={base(className)}>
      <rect x="10" y="12" width="5" height="24" rx="2" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M38 12 L20 24 L38 36 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
}

export function NextIcon({ className, stroke = '#808871', strokeWidth = 3 }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={base(className)}>
      <rect x="33" y="12" width="5" height="24" rx="2" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M10 12 L28 24 L10 36 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
}

/* ── Curry / manos ──────────────────────────────────────────────────────── */

/** Manita apuntando (dibujo del original junto a sus botones). */
export function TapCursor({ className, stroke = '#808871', strokeWidth = 2.4 }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={base(className)}>
      <path
        d="M24 30 L24 14 C24 11 27 9 29 11 C31 13 31 18 31 22 M31 22 L31 13 C31 10 34 8 36 10 C38 12 38 18 38 23 M38 23 L38 16 C38 13 41 11 43 13 C45 15 45 21 45 26 M45 26 L45 30 C45 40 40 48 32 50 C26 52 21 47 19 42 L15 33 C14 30 17 27 20 28 L24 30 Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Manita con ondas "tocar aquí". */
export function TapPulse({ className, stroke = '#ccc', strokeWidth = 2.2 }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={base(className)}>
      {[34, 24, 14].map((r) => (
        <path
          key={r}
          d={`M14 ${64 - r - 8} A ${r} ${r} 0 0 1 ${14 + r * 1.28} 14`}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      ))}
      <path d="M36 36 L36 22 C36 20 39 18 41 20 C43 22 42 28 42 34 C46 36 50 40 48 46 C46 52 40 54 35 52 C30 50 27 45 27 41 L27 38 C27 36 30 35 32 36 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
}

/* ── Etiquetas y calendario ─────────────────────────────────────────────── */

/** Etiqueta de pase (marca colgante con corazón). */
export function TagIcon({ className, stroke = '#fff', strokeWidth = 2.4 }: IconProps) {
  return (
    <svg viewBox="0 0 72 72" fill="none" aria-hidden="true" className={base(className)}>
      <path
        d="M14 34 L34 14 L58 14 L58 38 L38 58 C35 61 30 61 27 58 Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <circle cx="48" cy="24" r="4" stroke={stroke} strokeWidth={strokeWidth} />
      <path
        d="M36.5 44 C34 42 30 39 30 35 C30 32 33 30 35 32 L36.5 34 L38 32 C40 30 43 32 43 35 C43 39 39 42 36.5 44 Z"
        fill={stroke}
      />
    </svg>
  )
}

/** Calendario con corazón (botón agendar). */
export function CalendarHeart({ className, stroke = '#293C4B', strokeWidth = 2.6 }: IconProps) {
  return (
    <svg viewBox="0 0 72 72" fill="none" aria-hidden="true" className={base(className)}>
      <rect x="12" y="16" width="48" height="44" rx="7" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M24 10 L24 22 M48 10 L48 22 M12 30 L60 30" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M36 54 C30 50 25 46 25 41 C25 37 29 35 32 37 L36 40 L40 37 C43 35 47 37 47 41 C47 46 42 50 36 54 Z" fill={stroke} />
    </svg>
  )
}

/* ── Lugares ────────────────────────────────────────────────────────────── */

/** Iglesia (línea). */
export function ChurchIcon({ className, stroke = '#A6AA79', strokeWidth = 2.2 }: IconProps) {
  return (
    <svg viewBox="0 0 88 88" fill="none" aria-hidden="true" className={base(className)}>
      <rect x="16" y="40" width="26" height="38" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M29 26 L29 40 M24 30 C24 34 29 34 29 30 M24 30 L24 26 L29 26 L29 30" stroke={stroke} strokeWidth={strokeWidth - 0.4} strokeLinecap="round" />
      <path d="M16 40 L37 26 L58 40" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M14 40 L42 18 L70 40" stroke={stroke} strokeWidth={strokeWidth - 0.2} strokeLinecap="round" />
      <path d="M50 32 L64 32 M50 44 L64 44 M50 56 L64 56" stroke={stroke} strokeWidth={strokeWidth - 0.4} strokeLinecap="round" />
      <rect x="50" y="46" width="14" height="32" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M22 50 C22 46 28 46 28 50 L28 60 L22 60 Z" stroke={stroke} strokeWidth={strokeWidth - 0.4} />
      <path d="M58 78 C58 70 64 70 64 78" stroke={stroke} strokeWidth={strokeWidth - 0.4} />
    </svg>
  )
}

/** Aros entrelazados con diamante. */
export function RingsIcon({ className, stroke = '#A6AA79', strokeWidth = 2.2 }: IconProps) {
  return (
    <svg viewBox="0 0 88 88" fill="none" aria-hidden="true" className={base(className)}>
      <circle cx="34" cy="52" r="18" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="54" cy="52" r="18" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M28 24 L34 14 L40 24 L34 30 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M39 22 L45 22 M29 22 L23 22" stroke={stroke} strokeWidth={strokeWidth - 0.4} strokeLinecap="round" />
    </svg>
  )
}

/* ── Vestimenta / adultos ───────────────────────────────────────────────── */

/** Bustos de novio / novia en círculos (iconos del código de vestimenta). */
export function GroomBadge({ className, stroke = '#A6AA79', strokeWidth = 2.2 }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={base(className)}>
      <circle cx="60" cy="60" r="57" stroke="#4A5E6B" strokeWidth="1.6" />
      <circle cx="60" cy="34" r="10" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M60 44 L60 58" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M36 103 C38 74 46 62 60 62 C74 62 82 74 84 103" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M51 64 L60 74 L69 64" stroke={stroke} strokeWidth={strokeWidth - 0.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 74 L60 92 M57 74 C59 72 61 72 63 74" stroke={stroke} strokeWidth={strokeWidth - 0.2} strokeLinecap="round" />
      <path d="M50 64 C48 76 48 90 49 101 M70 64 C72 76 72 90 71 101" stroke={stroke} strokeWidth={strokeWidth - 0.4} strokeLinecap="round" />
    </svg>
  )
}

export function BrideBadge({ className, stroke = '#A6AA79', strokeWidth = 2.2 }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={base(className)}>
      <circle cx="60" cy="60" r="57" stroke="#4A5E6B" strokeWidth="1.6" />
      <circle cx="69" cy="25" r="4.6" stroke={stroke} strokeWidth={strokeWidth - 0.2} />
      <circle cx="60" cy="36" r="9.4" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M60 45.5 L60 53" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M66 30 C76 40 80 56 78 72 M54 30 C50 42 49 52 50 60" stroke={stroke} strokeWidth={strokeWidth - 0.5} strokeLinecap="round" />
      <path d="M60 53 C51 58 46 70 42 100 L78 100 C74 70 69 58 60 53 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M54 55 Q60 60.5 66 55" stroke={stroke} strokeWidth={strokeWidth - 0.3} strokeLinecap="round" />
    </svg>
  )
}

/** Pareja pequeña (solo adultos). */
export function KidsIcon({ className, stroke = '#A6AA79', strokeWidth = 2.4 }: IconProps) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" className={base(className)}>
      <path d="M20 30 C20 20 34 16 38 26 C40 32 38 40 34 44 C28 50 20 46 20 38 Z" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M38 26 L46 18 L40 30" stroke={stroke} strokeWidth={strokeWidth - 0.4} strokeLinejoin="round" />
      <path d="M24 60 C24 54 30 52 34 56 C38 52 44 54 44 60 L44 66 L24 66 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M56 34 C56 22 76 20 78 32 C79 42 74 50 68 52 C60 54 56 44 56 34 Z" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M56 34 C56 26 62 20 70 20 L70 28 C66 28 62 30 60 34" stroke={stroke} strokeWidth={strokeWidth - 0.4} />
      <path d="M54 62 C54 56 60 54 64 58 C68 54 76 56 76 62 L76 70 L54 70 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M30 58 L32 58 M60 62 L63 62" stroke={stroke} strokeWidth={strokeWidth - 0.6} strokeLinecap="round" />
    </svg>
  )
}

/* ── Regalos / fotos ────────────────────────────────────────────────────── */

/** Sobre con corazón lluvia de sobres. */
export function EnvelopeHeart({ className, stroke = '#fff', strokeWidth = 2.4 }: IconProps) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" className={base(className)}>
      <rect x="18" y="26" width="60" height="44" rx="4" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M18 30 L48 52 L78 30" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M48 40 C44 37 40 34 40 30 C40 27 43 25 45 27 L48 29 L51 27 C53 25 56 27 56 30 C56 34 52 37 48 40 Z" fill={stroke} />
    </svg>
  )
}

/** Cámara retro (subir fotos). */
export function CameraIcon({ className, stroke = '#A6AA79', strokeWidth = 2.6 }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={base(className)}>
      <rect x="18" y="34" width="72" height="52" rx="7" stroke={stroke} strokeWidth={strokeWidth} transform="rotate(-8 54 60)" />
      <path d="M28 36 L34 24 L62 24 L66 34" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" transform="rotate(-8 54 60)" />
      <circle cx="49" cy="61" r="15" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="49" cy="61" r="7" stroke={stroke} strokeWidth={strokeWidth - 0.4} />
      <circle cx="79" cy="53" r="3.4" fill={stroke} />
      <rect x="88" y="40" width="10" height="52" rx="2.5" stroke={stroke} strokeWidth={strokeWidth - 0.2} />
    </svg>
  )
}

/* ── Itinerario ─────────────────────────────────────────────────────────── */

function LineArt({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" className={base(className)}>
      {children}
    </svg>
  )
}

function strokeProps(stroke: string) {
  return { stroke, strokeWidth: 2.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
}

/** Iglesia pequeña blanca (itinerario). */
export function IChurch({ className }: IconProps) {
  return (
    <LineArt className={className}>
      <path d="M34 82 L34 44 L48 30 L62 44 L62 82 Z M26 82 L26 50 L34 44 M70 82 L70 50 L62 44" {...strokeProps('#fff')} />
      <path d="M48 24 L48 16 M44 20 L52 20" {...strokeProps('#fff')} />
      <path d="M40 82 L40 66 C40 60 44 60 44 66 L44 82" {...strokeProps('#fff')} />
      <path d="M54 70 C54 64 58 64 58 70 L58 82 L54 82 Z" {...strokeProps('#fff')} />
      <circle cx="42" cy="52" r="4.5" {...strokeProps('#fff')} strokeWidth={2} />
    </LineArt>
  )
}

/** Barreras con cuerda de terciopelo (recepción social). */
export function IRunway({ className }: IconProps) {
  return (
    <LineArt className={className}>
      <path d="M30 32 L30 76 M66 32 L66 76" {...strokeProps('#fff')} />
      <circle cx="30" cy="27" r="4.6" {...strokeProps('#fff')} strokeWidth={2.2} />
      <circle cx="66" cy="27" r="4.6" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M22 78 L38 78 M58 78 L74 78" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M30 38 C40 48 56 48 66 38" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M30 54 C40 64 56 64 66 54" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M44 49 L48 46.5 L52 49 L48 51.5 Z" {...strokeProps('#fff')} strokeWidth={1.8} />
    </LineArt>
  )
}

/** Pareja bailando vals (manos unidas, brazo alzado). */
export function IDance({ className }: IconProps) {
  return (
    <LineArt className={className}>
      <circle cx="35" cy="20" r="6" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M35 26 C34 34 34 42 36 50" {...strokeProps('#fff')} />
      <path d="M35 31 C28 27 24 21 24 14" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M36 32 C43 29 50 29 55 31" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M36 50 L29 80 M36 50 Q41 58 45 78" {...strokeProps('#fff')} strokeWidth={2.2} />
      <circle cx="63" cy="26" r="5.4" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M63 32 C62 38 62 43 61 47" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M63 34 C59.5 33.5 57 32.5 55 31" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M63 33 C69 30 72 25 73 19" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M61 47 C67 51 70 57 69 61 L56 62 C55 56 57 50 61 47 Z" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M58 64 L54 82 M67 63 L70 81" {...strokeProps('#fff')} strokeWidth={2.2} />
    </LineArt>
  )
}

/** Tenedor, plato y cuchillo (cena). */
export function IDinner({ className }: IconProps) {
  return (
    <LineArt className={className}>
      <path d="M20 24 L20 33 M25 24 L25 33 M30 24 L30 33" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M20 33 C20 40 30 40 30 33" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M25 39 L25 78" {...strokeProps('#fff')} strokeWidth={2.2} />
      <circle cx="58" cy="55" r="15" {...strokeProps('#fff')} strokeWidth={2.2} />
      <circle cx="58" cy="55" r="6.4" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M78 24 C73 32 72.5 41 76.8 46.8 C78.6 49 78 51 77.4 52 L77.4 78" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M79.4 24 L79.4 78" {...strokeProps('#fff')} strokeWidth={2.2} />
    </LineArt>
  )
}

/** Copas brindis. */
export function IGlasses({ className }: IconProps) {
  return (
    <LineArt className={className}>
      <path d="M24 24 L40 24 C40 38 36 44 32 44 C28 44 24 38 24 24 Z M32 44 L32 74 M26 74 L38 74" {...strokeProps('#fff')} />
      <path d="M56 30 L72 30 C72 44 68 50 64 50 C60 50 56 44 56 30 Z M64 50 L64 80 M58 80 L70 80" {...strokeProps('#fff')} />
    </LineArt>
  )
}

/** Ramo lanzado. */
export function IBouquet({ className }: IconProps) {
  return (
    <LineArt className={className}>
      <path d="M48 88 L40 70 L56 70 Z" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M40 66 L44 74 M52 72 L56 64" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M34 44 C34 36 42 34 44 40 C46 34 54 34 54 42 C60 34 70 40 64 48 C70 50 66 58 58 58 C58 64 50 66 46 62 C44 68 34 66 34 44 Z" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M44 40 C48 32 56 34 54 42 M34 46 C30 38 36 32 42 36" {...strokeProps('#fff')} strokeWidth={2.2} />
    </LineArt>
  )
}

/** Torta de bodas (pastel). */
export function ICake({ className }: IconProps) {
  return (
    <LineArt className={className}>
      <path d="M20 78 L76 78" {...strokeProps('#fff')} strokeWidth={2.4} />
      <path d="M26 56 L70 56 L70 78 L26 78 Z" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M34 38 L62 38 L62 56 L34 56 Z" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M48 24 L48 38 M44 28 C44 24 52 24 52 28" {...strokeProps('#fff')} strokeWidth={2} />
      <path d="M34 44 Q41 48 48 44 Q55 48 62 44 M26 64 Q37 68 48 64 Q59 68 70 64" {...strokeProps('#fff')} strokeWidth={1.8} />
    </LineArt>
  )
}

/** Novio y novia tomados de la mano. */
export function ICouple({ className }: IconProps) {
  return (
    <LineArt className={className}>
      <circle cx="34" cy="24" r="5.5" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M34 30 L34 52" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M34 35 L24 44 M34 35 L44 42" {...strokeProps('#fff')} strokeWidth={2} />
      <path d="M34 52 L27 78 M34 52 L41 78" {...strokeProps('#fff')} strokeWidth={2.2} />
      
      <circle cx="62" cy="24" r="5.5" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M62 18.5 C65 17 68 20 66 22" {...strokeProps('#fff')} strokeWidth={1.8} />
      <path d="M62 30 L52 78 L72 78 Z" {...strokeProps('#fff')} strokeWidth={2.2} />
      <path d="M62 35 L52 42 M62 35 L44 42" {...strokeProps('#fff')} strokeWidth={2} />
      
      <circle cx="44" cy="42" r="2" fill="#fff" />
    </LineArt>
  )
}

/* ── WhatsApp ───────────────────────────────────────────────────────────── */

/** Burbuja de teléfono (línea) para los botones "¡Hola X!". */
export function PhoneBubble({ className, stroke = '#fff', strokeWidth = 2.4 }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={base(className)}>
      <path
        d="M32 10 C20 10 11 19 11 30 C11 34 12 38 14 41 L11 53 L23 49 C26 50 29 51 32 51 C44 51 53 42 53 30 C53 19 44 10 32 10 Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M24 24 C24 30 28 36 34 39 L37 37 C39 36 41 38 40 40 C39 43 36 44 33 43 C27 41 21 35 19 29 C18 26 20 24 22 24 L24 24 Z"
        fill={stroke}
      />
    </svg>
  )
}

/** Iso logo genérico "estudio" para el pie (reemplazable desde la config). */
export function BrandSeal({ className, stroke = '#fff', strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" className={base(className)}>
      <circle cx="48" cy="48" r="40" stroke={stroke} strokeWidth={strokeWidth} />
      <path
        d="M40 62 C34 56 28 48 28 38 C28 32 33 28 38 30 C41 32 43 35 44 38 C45 35 47 32 50 30 C55 28 60 32 60 38 C60 48 54 54 52 58 Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path d="M32 66 C48 72 62 66 68 58" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}