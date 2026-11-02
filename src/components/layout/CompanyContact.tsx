import { wedding } from '../../config/wedding'
import { designB } from '../../config/designB'

/* ════════════════════════════════════════════════════════════════════════════
   CONTACTO DEL ESTUDIO — pie muy discreto compartido por los dos diseños.
   ────────────────────────────────────────────────────────────────────────────
   Remate pequeño al final de la invitación: invita a los invitados del evento
   a pedir su propia invitación digital (boda, XV años, cumpleaños, etc.)
   escribiéndonos por WhatsApp.

   · Diseño A («minimalismo azul profundo») → CompanyContactA (dentro del pie)
   · Diseño B («modelo elegante 2026»)      → CompanyContactB (banda final)

   Textos y enlace se editan SOLO en la configuración:
   · wedding.ts → studio
   · designB.ts → footer
   ══════════════════════════════════════════════════════════════════════════ */

/** Glifo de WhatsApp en línea (12–14 px; hereda el color del texto). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  )
}

/* ── Diseño A: bloque discreto que se encaja al final del pie existente ── */

export function CompanyContactA() {
  const s = wedding.studio
  if (!s.contactHref) return null
  return (
    <div className="flex flex-col items-center">
      <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.3em] text-navy/40">
        {s.headline}
      </p>
      <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-navy/35">{s.eventsLine}</p>
      <a
        href={s.contactHref}
        target="_blank"
        rel="noreferrer"
        className="mt-3.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-gold/35 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-navy/55 transition-colors duration-300 hover:border-gold/75 hover:text-navy"
      >
        <WhatsAppIcon className="h-3 w-3" />
        {s.contactLabel}
      </a>
    </div>
  )
}

/* ── Diseño B: banda fina y tenue tras el collage, sin rojo ni sello ── */

export function CompanyContactB() {
  const f = designB.footer
  if (!f.contactHref) return null
  return (
    <footer className="border-t border-bSage/25 bg-bPaper px-6 pb-10 pt-7 text-center">
      <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-bBody/55">
        {f.brandName} · {f.brandLine}
      </p>
      <p className="mt-2 font-bCardo text-[16px] text-bInk/75">{f.headline}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-bBody/55">{f.eventsLine}</p>
      <a
        href={f.contactHref}
        target="_blank"
        rel="noreferrer"
        className="mt-3.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-bSage/40 px-4 py-1.5 font-bSans text-[11px] font-semibold uppercase tracking-[0.16em] text-bInk/70 transition-colors duration-300 hover:border-bSage hover:bg-bSage/10 hover:text-bNavy"
      >
        <WhatsAppIcon className="h-3.5 w-3.5" />
        {f.contactLabel}
      </a>
    </footer>
  )
}
