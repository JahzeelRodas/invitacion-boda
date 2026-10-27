import Reveal from '../animation/Reveal'

/** Separador ornamental: línea — rombo — línea. */
export function HairDivider({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className={`h-px w-14 ${light ? 'bg-azure/60' : 'bg-electric/50'}`} />
      <span className={`block h-1.5 w-1.5 rotate-45 border ${light ? 'border-azure' : 'border-electric/80'}`} />
      <span className={`h-px w-14 ${light ? 'bg-azure/60' : 'bg-electric/50'}`} />
    </div>
  )
}

interface SectionHeaderProps {
  eyebrow: string
  title: string
  className?: string
  /** true para secciones sobre fondo oscuro. */
  light?: boolean
}

/** Encabezado editorial de sección: antetítulo, titular y filete. */
export function SectionHeader({ eyebrow, title, className = '', light = false }: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <Reveal>
        <p className={`text-[11px] font-medium uppercase tracking-[0.35em] ${light ? 'text-azure' : 'text-electric'}`}>
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`mt-4 font-serif text-3xl font-medium md:text-[2.9rem] md:leading-tight ${light ? 'text-silk' : 'text-ink'}`}>
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <HairDivider className="mt-7" light={light} />
      </Reveal>
    </div>
  )
}
