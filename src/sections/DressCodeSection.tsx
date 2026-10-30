import { wedding } from '../config/wedding'

/**
 * Código de vestimenta: título, subtítulo y paleta de colores sugeridos
 * como círculos con sombra.
 */
export default function DressCodeSection() {
  const { dressCode } = wedding

  return (
    <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-10 md:py-12">
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-center text-[20px] font-bold uppercase tracking-[0.03em] font-serif text-navy md:text-[26px]">
          {dressCode.title}
        </h2>
        <p className="whitespace-pre-line text-center font-serif text-sm md:text-base text-navy">
          {dressCode.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {dressCode.palette.map((color) => (
          <div
            key={color.hex}
            title={color.name}
            aria-label={`Color sugerido: ${color.name}`}
            className="h-10 w-10 rounded-full shadow-md md:h-12 md:w-12"
            style={{
              backgroundColor: color.hex,
              border: color.hex.toLowerCase() === '#fff1dd' ? '1.5px solid rgba(0,34,76,0.19)' : 'none',
            }}
          />
        ))}
      </div>

      {dressCode.note && (
        <p className="max-w-[300px] text-center text-[11px] leading-relaxed text-navy/60 md:text-xs">
          {dressCode.note}
        </p>
      )}
    </div>
  )
}
