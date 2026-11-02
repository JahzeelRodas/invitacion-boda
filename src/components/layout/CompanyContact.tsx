import { useState, type ReactNode } from 'react'
import { wedding } from '../../config/wedding'
import { designB } from '../../config/designB'

/* ════════════════════════════════════════════════════════════════════════════
   CONTACTO DEL ESTUDIO — pie muy discreto compartido por los dos diseños.
   ────────────────────────────────────────────────────────────────────────────
   Remate pequeño al final de la invitación: invita a los invitados del evento
   a pedir su propia invitación digital (boda, XV años, cumpleaños, etc.)
   escribiéndonos por WhatsApp.

   · Plegable con un clic: pulsar la línea de la marca (diseño B) o el
     titular (diseño A) pliega el resto del pie en una franja fina de ~25 px;
     otro clic lo despliega de nuevo (transición suave, estado de la sesión).
     Al desplegar, la página baja sola hasta el final para que el pie entero
     quede a la vista sin hacer scroll.
   · Se oculta por completo desde la configuración:
     wedding.ts → studio.visible · designB.ts → footer.visible (o contactHref '')
   ══════════════════════════════════════════════════════════════════════════ */

/** Glifo de WhatsApp en línea (12 px; hereda el color del texto). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  )
}

/** Chevecita tenue que anuncia el plegado (apunta abajo plegado, arriba abierto). */
function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`transition-transform duration-300 ${open ? 'rotate-180' : ''} ${className ?? ''}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/** Panel plegable con animación de altura (0fr → 1fr); sale también del foco. */
function CollapsePanel({
  open,
  id,
  children,
}: {
  open: boolean
  id: string
  children: ReactNode
}) {
  return (
    <div
      id={id}
      style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      className="grid transition-[grid-template-rows] duration-300 ease-out"
    >
      <div
        className="min-h-0 overflow-hidden"
        style={{
          visibility: open ? 'visible' : 'hidden',
          transition: `visibility 0s linear ${open ? '0s' : '300ms'}`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* Tras desplegar, la página baja sola hasta el final: el asa del pie suele
   quedar pegada al borde inferior de la pantalla y, sin este ajuste, el
   resto del pie se abriría por debajo del pliegue y habría que hacer
   scroll para verlo. Se desliza cuando termina la animación de altura. */
let expandScrollTimer: number | undefined

function scrollFooterIntoViewAfterExpand(ms = 300) {
  window.clearTimeout(expandScrollTimer)
  expandScrollTimer = window.setTimeout(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }, ms)
}

/** Cierra o abre el pie; si se abre, ajusta el scroll al final de la página. */
function useFooterToggle() {
  const [open, setOpen] = useState(true)
  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) scrollFooterIntoViewAfterExpand()
  }
  return [open, toggle] as const
}

/* ── Diseño A: la línea del titular es el asa; debajo se pliega lo demás ── */

export function CompanyContactA() {
  const s = wedding.studio
  const [open, toggle] = useFooterToggle()
  if (!s.visible || !s.contactHref) return null
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="company-contact-a"
        className="flex cursor-pointer items-center gap-1.5 py-2"
      >
        <span className="text-[9px] font-medium uppercase leading-none tracking-[0.28em] text-navy/40">
          {s.headline}
        </span>
        <Chevron open={open} className="h-2.5 w-2.5 text-navy/35" />
      </button>

      <CollapsePanel open={open} id="company-contact-a">
        <div className="flex flex-col items-center px-6 pb-3">
          <p className="text-[9.5px] uppercase leading-[1.25] tracking-[0.2em] text-navy/35">
            {s.eventsLine}
          </p>
          <a
            href={s.contactHref}
            target="_blank"
            rel="noreferrer"
            className="mt-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-gold/35 px-3.5 py-1 text-[10px] font-medium uppercase leading-[1.2] tracking-[0.2em] text-navy/55 transition-colors duration-300 hover:border-gold/75 hover:text-navy"
          >
            <WhatsAppIcon className="h-3 w-3" />
            {s.contactLabel}
          </a>
        </div>
      </CollapsePanel>
    </div>
  )
}

/* ── Diseño B: la línea de marca es el asa; debajo se pliega lo demás ── */

export function CompanyContactB() {
  const f = designB.footer
  const brandText = [f.brandName, f.brandLine].filter(Boolean).join(' · ')
  const [open, toggle] = useFooterToggle()
  if (!f.visible || !f.contactHref) return null
  return (
    <footer className="border-t border-bSage/25 bg-bPaper text-center">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="company-contact-b"
        className="flex w-full cursor-pointer items-center justify-center gap-2 px-6 pt-2 pb-1.5"
      >
        {brandText ? (
          <span className="text-[9px] font-medium uppercase leading-none tracking-[0.26em] text-bBody/55">
            {brandText}
          </span>
        ) : null}
        <Chevron open={open} className="h-2.5 w-2.5 text-bBody/50" />
      </button>

      <CollapsePanel open={open} id="company-contact-b">
        <div className="px-6 pb-3">
          <p className="font-bCardo text-[15px] leading-[1.2] text-bInk/75">{f.headline}</p>
          <p className="mt-0.5 text-[9.5px] uppercase leading-[1.25] tracking-[0.2em] text-bBody/55">
            {f.eventsLine}
          </p>
          <a
            href={f.contactHref}
            target="_blank"
            rel="noreferrer"
            className="mt-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-bSage/40 px-3.5 py-1 font-bSans text-[10.5px] font-semibold uppercase tracking-[0.15em] text-bInk/70 transition-colors duration-300 hover:border-bSage hover:bg-bSage/10 hover:text-bNavy"
          >
            <WhatsAppIcon className="h-3 w-3" />
            {f.contactLabel}
          </a>
        </div>
      </CollapsePanel>
    </footer>
  )
}
