import { wedding } from '../config/wedding'
import { mapsDirectionsUrl } from '../utils/links'

/**
 * "Lugar de la Recepción": dirección y mapa de Google embebido (sin API key,
 * vía /maps?output=embed) con el botón "Cómo llegar".
 */
export default function VenueSection() {
  const { venue } = wedding

  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(venue.mapsQuery)}&z=15&output=embed`

  return (
    <div className="relative z-10 overflow-x-clip">
      <section className="relative z-10 flex w-full flex-col items-center px-6 pb-8 pt-8">
        <div className="relative text-center">
          <h3 className="text-center font-serif text-[20px] font-bold uppercase tracking-[0.03em] text-navy">
            {venue.title}
          </h3>
          <p className="mx-auto mt-2 max-w-[250px] whitespace-pre-line text-center text-[12px] leading-relaxed text-navy/70 md:max-w-[440px] md:text-[14px]">
            {venue.addressLines}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center gap-4 md:gap-5">
          <iframe
            className="mt-3 h-[268px] w-full max-w-[338px] overflow-hidden rounded-[15px] md:h-[380px] md:max-w-[560px]"
            style={{ border: '1px solid rgba(0,34,76,0.35)' }}
            src={embedSrc}
            loading="lazy"
            title={venue.title}
            allowFullScreen
          />
          <a
            href={mapsDirectionsUrl(venue.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-navy/70 transition-transform hover:scale-[1.03] md:text-base"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 shrink-0">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            <span>{venue.directionsLabel}</span>
          </a>
        </div>
      </section>
    </div>
  )
}
