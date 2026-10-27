import { Church, Clock, GlassWater, MapPin, CalendarPlus, Navigation, Info, type LucideIcon } from 'lucide-react'
import { wedding } from '../config/wedding'
import { mapsDirectionsUrl, mapsSearchUrl } from '../utils/links'
import { buildICS, downloadICS, type ICSOptions } from '../utils/ics'
import Reveal from '../components/animation/Reveal'
import { SectionHeader } from '../components/layout/SectionHeader'

interface VenueBlockProps {
  icon: LucideIcon
  label: string
  timeLabel: string
  venueName: string
  address: string
  mapsQuery: string
  delay: number
}

function VenueBlock({ icon: Icon, label, timeLabel, venueName, address, mapsQuery, delay }: VenueBlockProps) {
  return (
    <Reveal delay={delay}>
      <article className="flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/45 text-gold" aria-hidden="true">
          <Icon size={19} strokeWidth={1.4} />
        </span>

        <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.35em] text-warm">{label}</p>
        <h3 className="mt-3 font-serif text-2xl font-medium text-ink md:text-[1.7rem]">{venueName}</h3>

        <p className="mt-4 flex items-center gap-2 text-sm text-ink/80">
          <Clock size={13} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
          {timeLabel}
        </p>
        <p className="mt-1.5 flex items-center gap-2 text-sm text-warm">
          <MapPin size={13} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
          {address}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a href={mapsSearchUrl(mapsQuery)} target="_blank" rel="noopener noreferrer" className="btn-hairline !px-5 !py-2.5">
            <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
            Ver ubicación
          </a>
          <a href={mapsDirectionsUrl(mapsQuery)} target="_blank" rel="noopener noreferrer" className="btn-hairline !px-5 !py-2.5">
            <Navigation size={13} strokeWidth={1.5} aria-hidden="true" />
            Cómo llegar
          </a>
        </div>
      </article>
    </Reveal>
  )
}

/** Datos del matrimonio con botones de mapas y calendario. */
export default function EventDetailsSection() {
  const { event, couple } = wedding

  const addToCalendar = () => {
    const options: ICSOptions = {
      title: `Boda de ${couple.brideName} y ${couple.groomName}`,
      timeZone: wedding.date.timeZone,
      venues: [
        {
          label: event.ceremony.label,
          isoDateTime: event.ceremony.isoDateTime,
          durationMinutes: event.ceremony.durationMinutes,
          venueName: event.ceremony.venueName,
          address: event.ceremony.address,
          description: `Ceremonia del matrimonio de ${couple.brideName} y ${couple.groomName}.`,
        },
        {
          label: event.reception.label,
          isoDateTime: event.reception.isoDateTime,
          durationMinutes: event.reception.durationMinutes,
          venueName: event.reception.venueName,
          address: event.reception.address,
          description: `Recepción del matrimonio de ${couple.brideName} y ${couple.groomName}.`,
        },
      ],
    }
    downloadICS('invitacion-boda.ics', buildICS(options))
  }

  return (
    <section id="evento" className="bg-silk py-24 md:py-32" aria-labelledby="evento-title">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow={event.eyebrow} title={event.title} />

        <div className="relative mt-16 grid gap-16 md:mt-20 md:grid-cols-2 md:gap-0">
          {/* Filete vertical divisoria en escritorio */}
          <span aria-hidden="true" className="absolute left-1/2 top-2 hidden h-[calc(100%-1rem)] w-px bg-gold/25 md:block" />

          <VenueBlock
            icon={Church}
            label={event.ceremony.label}
            timeLabel={event.ceremony.timeLabel}
            venueName={event.ceremony.venueName}
            address={event.ceremony.address}
            mapsQuery={event.ceremony.mapsQuery}
            delay={0}
          />
          <VenueBlock
            icon={GlassWater}
            label={event.reception.label}
            timeLabel={event.reception.timeLabel}
            venueName={event.reception.venueName}
            address={event.reception.address}
            mapsQuery={event.reception.mapsQuery}
            delay={0.1}
          />
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col items-center">
            <button type="button" onClick={addToCalendar} className="btn-hairline">
              <CalendarPlus size={14} strokeWidth={1.5} aria-hidden="true" />
              Agregar al calendario
            </button>
          </div>
        </Reveal>

        {event.notes.length > 0 && (
          <Reveal delay={0.2}>
            <aside className="mx-auto mt-14 max-w-2xl border-t border-gold/25 pt-8 text-center">
              <p className="flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-gold">
                <Info size={12} strokeWidth={1.5} aria-hidden="true" />
                Información para invitados
              </p>
              <ul className="mt-5 space-y-2.5">
                {event.notes.map((note) => (
                  <li key={note} className="text-sm leading-relaxed text-warm">
                    {note}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        )}
      </div>
    </section>
  )
}
