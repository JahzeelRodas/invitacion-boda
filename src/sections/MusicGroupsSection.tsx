import { wedding, type MusicGroup } from '../config/wedding'
import { HeartShape } from '../components/decor/ornaments'

/**
 * Grupos musicales: material de cada grupo (el video que compartió uno de
 * ellos y la fotografía del otro) encuadrado en el estilo del diseño A.
 * Se configura en `wedding.musicGroups` (src/config/wedding.ts).
 */

function GroupMedia({ group }: { group: MusicGroup }) {
  return (
    <MediaCard>
      {group.video ? (
        <video
          controls
          preload="metadata"
          poster={group.video.poster}
          src={group.video.src}
          className="aspect-video w-full bg-abyss object-cover"
        />
      ) : null}
      {group.photo ? (
        <img
          src={group.photo.src}
          alt={group.photo.alt}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
      ) : null}
      <figcaption className="flex flex-col items-center gap-1.5 px-4 pb-5 pt-4 text-center">
        <span className="font-case text-[19px] text-navy md:text-[22px]">{group.name}</span>
        {group.detail ? (
          <span className="font-lora text-[12px] italic text-navy/60 md:text-[13px]">{group.detail}</span>
        ) : null}
      </figcaption>
    </MediaCard>
  )
}

function MediaCard({ children }: { children: React.ReactNode }) {
  return (
    <figure className="w-full overflow-hidden rounded-md border border-navy/20 bg-white shadow-[0_10px_30px_rgba(0,34,76,0.10)] md:rounded-sm">
      {children}
    </figure>
  )
}

export default function MusicGroupsSection() {
  const { musicGroups } = wedding
  if (!musicGroups.groups.length) return null

  return (
    <section id="musica" className="relative z-10 flex flex-col items-center gap-6 bg-cream px-6 py-12 md:py-16">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />

      <header className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-serif text-[22px] font-bold uppercase tracking-[0.14em] text-navy md:text-[28px]">
          {musicGroups.title}
        </h2>
        <p className="max-w-[330px] font-lora text-[13.5px] italic text-navy/70 md:text-[15px]">
          {musicGroups.intro}
        </p>
      </header>

      <div className="flex w-full max-w-[400px] flex-col gap-6">
        {musicGroups.groups.map((group) => (
          <GroupMedia key={group.name} group={group} />
        ))}
      </div>

      <HeartShape className="mt-2 block w-7 text-gold" />
    </section>
  )
}
