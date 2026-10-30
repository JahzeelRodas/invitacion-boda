import { type ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

/* ════════════════════════════════════════════════════════════════════════════
   Piezas compartidas entre las secciones del diseño B.
   ══════════════════════════════════════════════════════════════════════════ */

/** Envoltorio con aparición suave (sube + fundido). */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'p' | 'h2' | 'h3' | 'span' | 'figure' | 'section'
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <Tag
      ref={ref as never}
      className={`b-reveal ${shown ? 'b-reveal-in' : ''} ${className ?? ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

/** Foto a todo lo ancho con tinte pizarra (secciones oscuras del original). */
export function TintedPhoto({
  src,
  alt,
  id,
  className,
  overClass = 'bg-bInk/55',
  position = 'center 38%',
  children,
}: {
  src: string
  alt: string
  id?: string
  className?: string
  overClass?: string
  position?: string
  children?: ReactNode
}) {
  return (
    <div id={id} className={`relative isolate overflow-hidden ${className ?? ''}`}>
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: position }} />
      <div aria-hidden="true" className={`absolute inset-0 ${overClass}`} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

/** Vidrio esmerilado (frosted) para citaciones sobre fotos. */
export function FrostCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[22px] border border-white/25 bg-white/20 px-5 py-6 text-center backdrop-blur-md sm:rounded-[26px] sm:px-8 ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

/** Manita animada que "toca" los botones, como en el original. */
export function TapHint({ className, stroke = '#98A26B' }: { className?: string; stroke?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <span ref={ref} className={`inline-block ${shown ? 'animate-bTap' : 'opacity-0'} ${className ?? ''}`}>
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-9 w-9">
        {stroke === '#fff' ? (
          <>
            <path d="M44 18 A 26 26 0 0 0 18 26" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M50 26 A 34 34 0 0 0 26 12" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.55" />
          </>
        ) : (
          <>
            <path d="M44 18 A 26 26 0 0 0 18 26" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M50 26 A 34 34 0 0 0 26 12" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.55" />
          </>
        )}
        <path
          d="M26 34 L26 22 C26 20 29 18 31 20 C33 22 32 28 32 33 C36 35 40 39 38 45 C36 51 30 53 25 51 C20 49 17 44 17 39 L17 36 C17 34 20 33 22 34 Z"
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  )
}

/** Título guion con id de ancla para la navegación. */
export function ScriptTitle({ text, id }: { text: string; id?: string }) {
  const lines = text.split('\n')
  return (
    <Reveal>
      <h2 id={id} className="px-6 pt-2 font-bParis text-[42px] leading-[1.05] text-white sm:text-[52px]">
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>
    </Reveal>
  )
}
