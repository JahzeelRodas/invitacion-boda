/* ════════════════════════════════════════════════════════════════════════════
   ORNAMENTOS SVG
   Ilustraciones vectoriales propias usadas por toda la invitación:
   pétalos que caen, ramas florales grabadas, filetes dorados, sello de lacre,
   sobre, castillos lineales de fondo, caja de regalos e iconos del programa.
   ════════════════════════════════════════════════════════════════════════════ */

import type { CSSProperties } from 'react'

/* ── Flor de seis pétalos (partícula de la portada) ──────────────────────── */
export function PetalFlower({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" className={className} style={style} aria-hidden="true">
      <g>
        <ellipse cx="12" cy="5.2" rx="2.1" ry="4.3" />
        <ellipse cx="12" cy="5.2" rx="2.1" ry="4.3" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="5.2" rx="2.1" ry="4.3" transform="rotate(120 12 12)" />
        <ellipse cx="12" cy="5.2" rx="2.1" ry="4.3" transform="rotate(180 12 12)" />
        <ellipse cx="12" cy="5.2" rx="2.1" ry="4.3" transform="rotate(240 12 12)" />
        <ellipse cx="12" cy="5.2" rx="2.1" ry="4.3" transform="rotate(300 12 12)" />
      </g>
      <circle cx="12" cy="12" r="1.7" fillOpacity="0.45" />
    </svg>
  )
}

/* ── Rama floral grabada (decoración flotante) ───────────────────────────── */
export function FlowerBranch({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" width="1em" height="1em" className={className} style={style} aria-hidden="true">
      {/* tallo principal */}
      <path d="M18 104 C 34 86, 44 68, 52 48 C 57 36, 60 26, 62 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      {/* hojas */}
      <path d="M40 74 C 28 70, 22 60, 22 52 C 32 54, 40 62, 40 74 Z" fill="currentColor" opacity="0.9" />
      <path d="M38 76 C 47 74, 55 66, 57 58 C 47 58, 39 66, 38 76 Z" fill="currentColor" opacity="0.55" />
      <path d="M52 46 C 44 40, 42 30, 46 23 C 53 28, 56 38, 52 46 Z" fill="currentColor" opacity="0.8" />
      {/* flor superior (cinco pétalos) */}
      <g fill="none" stroke="currentColor" strokeWidth="2.2">
        <ellipse cx="62" cy="14" rx="3.4" ry="7" transform="rotate(-12 62 14)" />
        <ellipse cx="62" cy="14" rx="3.4" ry="7" transform="rotate(35 62 14)" />
        <ellipse cx="62" cy="14" rx="3.4" ry="7" transform="rotate(105 62 14)" />
        <ellipse cx="62" cy="14" rx="3.4" ry="7" transform="rotate(170 62 14)" />
        <ellipse cx="62" cy="14" rx="3.4" ry="7" transform="rotate(-50 62 14)" />
      </g>
      <circle cx="62" cy="14" r="2.6" fill="currentColor" />
      {/* botón lateral */}
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="30" cy="40" r="7" />
        <path d="M30 33 C 33 36, 33 44, 30 47 C 27 44, 27 36, 30 33 Z" fill="currentColor" opacity="0.5" />
      </g>
      {/* puñado de puntitos (polen) */}
      <g fill="currentColor">
        <circle cx="74" cy="30" r="1.4" />
        <circle cx="44" cy="24" r="1.2" />
        <circle cx="70" cy="60" r="1.3" />
      </g>
    </svg>
  )
}

/* ── Filete dorado ornamental (separador) ────────────────────────────────── */
export function GoldenOrnament({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 26" fill="none" className={className} style={style} aria-hidden="true">
      <g stroke="#C9A24A" strokeWidth="1.6" strokeLinecap="round">
        <path d="M2 13 H 40" />
        <path d="M80 13 H 118" />
        <path d="M40 13 C 46 13, 49 7, 53 7 C 57 7, 58 11, 60 11" />
        <path d="M80 13 C 74 13, 71 7, 67 7 C 63 7, 62 11, 60 11" />
        <path d="M60 11 L 60 15" />
      </g>
      <path d="M60 19 L 63.5 13 L 60 7 L 56.5 13 Z" fill="#C9A24A" />
      <circle cx="47" cy="9" r="1.4" fill="#C9A24A" />
      <circle cx="73" cy="9" r="1.4" fill="#C9A24A" />
      <circle cx="2" cy="13" r="1.6" fill="#C9A24A" />
      <circle cx="118" cy="13" r="1.6" fill="#C9A24A" />
    </svg>
  )
}

/* ── Corazón (sello de lacre y calendario) ───────────────────────────────── */
export function HeartShape({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 22" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
    </svg>
  )
}

/* ── Parte trasera del sobre (donde apoyan las fotos) ────────────────────── */
export function EnvelopeBack({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 283 328" fill="none" className={className} style={style} aria-hidden="true">
      <rect x="2" y="2" width="279" height="324" rx="10" fill="#EDE7DA" stroke="#00224C" strokeOpacity="0.25" strokeWidth="2.5" />
      <rect x="12" y="12" width="259" height="304" rx="6" fill="none" stroke="#C9A24A" strokeOpacity="0.55" strokeWidth="1.4" />
      {/* sutil abertura superior */}
      <path d="M12 12 H 271" stroke="#00224C" strokeOpacity="0.10" strokeWidth="3" />
      {/* esquinas doradas */}
      <g stroke="#C9A24A" strokeWidth="1.6" strokeLinecap="round" opacity="0.8">
        <path d="M22 34 V 22 H 34" />
        <path d="M261 34 V 22 H 249" />
        <path d="M22 294 V 306 H 34" />
        <path d="M261 294 V 306 H 249" />
      </g>
      {/* rayitas de papelería */}
      <g stroke="#00224C" strokeOpacity="0.06" strokeWidth="1">
        <path d="M0 90 H 283" />
        <path d="M0 240 H 283" />
      </g>
    </svg>
  )
}

/* ── Solapa frontal del sobre (cubre la mitad inferior) ──────────────────── */
export function EnvelopeFlap({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 283 180" fill="none" className={className} style={style} aria-hidden="true">
      <defs>
        <clipPath id="flap-clip">
          <path d="M0 0 H 283 V 124 C 233 168 180 180 141 180 C 103 180 50 168 0 124 Z" />
        </clipPath>
      </defs>
      <path
        d="M0 0 H 283 V 124 C 233 168 180 180 141 180 C 103 180 50 168 0 124 Z"
        fill="#EFE9DD"
        stroke="#00224C"
        strokeOpacity="0.32"
        strokeWidth="2.5"
      />
      <g clipPath="url(#flap-clip)">
        {/* líneas de guilloché doradas */}
        <g stroke="#C9A24A" strokeWidth="1" opacity="0.5">
          <path d="M-10 40 H 293" />
          <path d="M-10 58 H 293" />
          <path d="M-10 76 H 293" />
        </g>
        <rect x="12" y="-8" width="259" height="220" fill="none" stroke="#00224C" strokeOpacity="0.16" strokeWidth="1.6" />
      </g>
      {/* obliga el borde interior dorado */}
      <path
        d="M8 -4 V 122 C 56 164 106 176 141.5 176 C 177 176 227 164 275 122 V -4"
        fill="none"
        stroke="#C9A24A"
        strokeWidth="1.4"
        opacity="0.85"
      />
      {/* pequeño sello */}
      <circle cx="141.5" cy="118" r="17" fill="#00224C" />
      <circle cx="141.5" cy="118" r="13.5" fill="none" stroke="#ECE4D8" strokeOpacity="0.55" strokeWidth="1" />
      <path
        d="M141.5 124.6 C 140 123.2 134.6 119.3 134.6 115.4 C 134.6 113.4 136.2 112 138 112 C 139.1 112 140.2 112.5 141.5 113.6 C 142.8 112.5 143.9 112 145 112 C 146.8 112 148.4 113.4 148.4 115.4 C 148.4 119.3 143 123.2 141.5 124.6 Z"
        fill="#ECE4D8"
      />
    </svg>
  )
}

/* ── Castillo lineal de fondo (dos variantes) ────────────────────────────── */
export function CastleArt({
  variant = 1,
  className,
  style,
}: {
  variant?: 1 | 2
  className?: string
  style?: CSSProperties
}) {
  return variant === 1 ? (
    <svg viewBox="0 0 300 200" fill="none" className={className} style={style} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* muro con almenas */}
        <path d="M40 190 V 128 H 92 V 190" />
        <path d="M42 128 V 120 M 55 128 V 120 M 68 128 V 120 M 81 128 V 120" />
        <path d="M18 190 H 130 V 164 H 18 Z" fill="none" />
        <path d="M20 164 V 156 M 38 164 V 156 M 56 164 V 156 M 74 164 V 156 M 92 164 V 156 M 110 164 V 156 M 126 164 V 156" />
        {/* torre central */}
        <path d="M96 190 V 96 H 142 V 190" />
        <path d="M98 96 V 86 M 112 96 V 86 M 126 96 V 86 M 140 96 V 86" />
        <path d="M96 84 L 119 40 L 142 84 Z" />
        <path d="M119 40 V 26 M 119 26 L 132 30 L 119 34" />
        {/* torre lateral alta */}
        <path d="M160 190 V 118 H 196 V 190" />
        <path d="M162 118 V 108 M 178 118 V 108 M 194 118 V 108" />
        <path d="M160 106 L 178 66 L 196 106 Z" />
        <path d="M178 66 V 52 M 178 52 L 191 56 L 178 60" />
        {/* puerta + ventanas */}
        <path d="M108 158 V 190 A 11 11 0 0 1 130 190 V 158" />
        <path d="M105 118 h10 M 123 118 h10 M 114 138 h10" />
      </g>
    </svg>
  ) : (
    <svg viewBox="0 0 300 200" fill="none" className={className} style={style} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 190 V 110 H 108 V 190" />
        <path d="M62 110 V 100 M 79 110 V 100 M 96 110 V 100 M 106 110 V 100" />
        <path d="M60 98 L 84 58 L 108 98 Z" />
        <path d="M84 58 V 44 M 84 44 L 97 48 L 84 52" />
        <path d="M176 190 V 132 H 232 V 190" />
        <path d="M178 132 V 122 M 202 132 V 122 M 226 132 V 122" />
        <path d="M204 132 V 96 H 240 V 190" />
        <path d="M206 96 V 86 M 223 96 V 86 M 238 96 V 86" />
        <path d="M204 84 L 222 48 L 240 84 Z" />
        <path d="M222 48 V 36 M 222 36 L 235 40 L 222 44" />
        <path d="M70 130 h8 M 88 130 h8 M 70 150 h8 M 88 150 h8 M 214 118 h12 M 214 140 h12 M 184 150 h12 M 208 150 h12" />
        <path d="M140 190 H 152" />
      </g>
    </svg>
  )
}

/* ── Caja de regalos ilustrada ───────────────────────────────────────────── */
export function GiftBoxArt({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 180 190" fill="none" className={className} style={style} aria-hidden="true">
      {/* sombra base */}
      <ellipse cx="90" cy="182" rx="52" ry="5" fill="rgba(0,0,0,0.28)" />
      {/* cuerpo */}
      <rect x="28" y="86" width="124" height="90" rx="8" fill="#00224C" />
      {/* tapa */}
      <path d="M22 88 C 22 80 28 74 36 74 H 144 C 152 74 158 80 158 88 V 96 H 22 Z" fill="#033163" />
      <rect x="22" y="92" width="156" height="8" rx="3" fill="#00224C" />
      {/* cinta vertical */}
      <rect x="78" y="74" width="24" height="102" fill="#C9A24A" opacity="0.92" />
      <rect x="78" y="92.5" width="24" height="4" fill="#B58B2F" />
      {/* lazo */}
      <g fill="none" stroke="#C9A24A" strokeWidth="7" strokeLinecap="round">
        <path d="M90 70 C 64 66 56 44 74 40 C 86 38 90 54 90 70" />
        <path d="M90 70 C 116 66 124 44 106 40 C 94 38 90 54 90 70" />
      </g>
      <circle cx="90" cy="70" r="6" fill="#B58B2F" />
      {/* brillo de tapa */}
      <path d="M36 80 H 144" stroke="#ECE4D8" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
      {/* costura decorativa del cuerpo */}
      <g stroke="#ECE4D8" strokeOpacity="0.18" strokeWidth="1.4" strokeLinecap="round">
        <path d="M34 104 H 72" />
        <path d="M108 104 H 146" />
        <path d="M34 116 H 72" />
        <path d="M108 116 H 146" />
        <path d="M34 128 H 72" />
        <path d="M108 128 H 146" />
      </g>
    </svg>
  )
}

/* ── Iconos pequeños del programa del día (línea, color actual) ──────────── */
export function ProgramIcon({ name, className }: { name: string; className?: string }) {
  const common = {
    className,
    fill: 'none' as const,
    stroke: 'currentColor' as const,
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  }

  switch (name) {
    case 'church': // iglesia con cruz
      return (
        <svg {...common}>
          <path d="M4 20 H 20" />
          <path d="M7 20 V 12 C 7 9 9 7 12 7 C 15 7 17 9 17 12 V 20" />
          <path d="M12 7 V 3 M 10.5 4.5 H 13.5" />
          <path d="M12 15 A 2.2 2.8 0 0 0 12 20.2" />
        </svg>
      )
    case 'toast': // copa alzada
      return (
        <svg {...common}>
          <path d="M8 3 L 10 9 C 10.6 11 9.4 12.4 8 12.4 C 6.6 12.4 5.4 11 6 9 Z" />
          <path d="M16 3 L 18 9 C 18.6 11 17.4 12.4 16 12.4 C 14.6 12.4 13.4 11 14 9 Z" />
          <path d="M8 12.5 V 19 M 16 12.5 V 19 M 6 19 H 10 M 14 19 H 18" />
          <path d="M12 3 L 12 6" />
        </svg>
      )
    case 'entrance': // aros de novios
      return (
        <svg {...common}>
          <circle cx="9" cy="14" r="6" />
          <circle cx="15.5" cy="14" r="6" />
          <path d="M12 5 L 13.6 3 L 12 1.6 L 10.4 3 Z" fill="currentColor" />
        </svg>
      )
    case 'dinner': // torta de tres pisos
      return (
        <svg {...common}>
          <path d="M5 20 H 19" />
          <path d="M6 20 V 16.5 H 18 V 20" />
          <path d="M7.5 16.5 V 13.5 H 16.5 V 16.5" />
          <path d="M9 13.5 V 10.5 H 15 V 13.5" />
          <path d="M12 10.5 V 8" />
          <path d="M12 6.8 A 1.1 1.1 0 1 0 12.01 6.8" fill="currentColor" />
        </svg>
      )
    case 'dance': // nota musical
      return (
        <svg {...common}>
          <path d="M9 18.5 A 2.4 2.4 0 1 1 9 13.7 A 2.4 2.4 0 1 1 9 18.5 Z" fill="currentColor" />
          <path d="M11.4 16.2 V 5.5 L 19 4 V 15" />
          <path d="M16.6 17.4 A 2.4 2.4 0 1 1 16.6 12.6 A 2.4 2.4 0 1 1 16.6 17.4 Z" fill="currentColor" />
        </svg>
      )
    case 'party': // bola disco (hora loca)
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="6" />
          <path d="M12 6 A 6 6 0 0 1 12 18 M 8.5 8.2 A 9 9 0 0 1 15.5 8.2 M 8.5 15.8 A 9 9 0 0 0 15.5 15.8 M 6 12 H 18" />
          <path d="M12 18 V 21 M 12 3 V 6" />
        </svg>
      )
    case 'star':
    default: // destello de fiesta
      return (
        <svg {...common}>
          <path d="M12 3 L 13.7 9.2 L 20 11 L 13.7 12.8 L 12 19 L 10.3 12.8 L 4 11 L 10.3 9.2 Z" fill="currentColor" />
        </svg>
      )
  }
}
