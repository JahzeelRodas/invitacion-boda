import { useEffect, useState } from 'react'
import { designB } from '../../config/designB'
import { HeartOutline } from '../../components/decor/bIcons'

/* ════════════════════════════════════════════════════════════════════════════
   Barra superior con menú hamburguesa (anclas de la invitación).
   ══════════════════════════════════════════════════════════════════════════ */

const SEGMENTS: { href: string; label: string }[] = [
  { href: '#b-hero', label: 'Inicio' },
  { href: '#b-mensaje', label: 'Bienvenida' },
  { href: '#b-fecha', label: 'Fecha y cuenta regresiva' },
  { href: '#b-padres', label: 'Nuestros padres' },
  { href: '#b-padrinos', label: 'Nuestros padrinos' },
  { href: '#b-ubicacion', label: 'Ubicación' },
  { href: '#b-itinerario', label: 'Itinerario' },
  { href: '#b-grupos', label: 'Grupos musicales' },
  { href: '#b-confirmacion', label: 'Confirmación' },
  { href: '#b-album', label: 'Álbum de fotos' },
]

export function BNav() {
  const [open, setOpen] = useState(false)
  const { hero } = designB

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const jump = (hash: string) => {
    setOpen(false)
    const el = document.querySelector(hash)
    if (el && 'scrollIntoView' in el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-11 items-center justify-between border-b border-black/5 bg-bPaper/95 px-3 backdrop-blur-sm">
        <span className="pl-2 font-bHand text-[20px] text-[#31495A]">{hero.monogram}</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú de la invitación"
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-md hover:bg-black/5"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path d="M4 7 H20 M4 12 H20 M4 17 H14" stroke="#31495A" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {/* panel */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)} className="absolute inset-0 cursor-pointer bg-black/40" />
        <nav
          className="absolute right-0 top-0 flex h-full w-[78%] max-w-[300px] flex-col gap-1 overflow-y-auto bg-bPaper px-6 py-16 shadow-[-12px_0_36px_rgba(20,30,40,0.2)]"
          style={{ transform: open ? 'translateX(0)' : 'translateX(105%)', transition: 'transform .3s ease' }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full hover:bg-black/5"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path d="M6 6 L18 18 M18 6 L6 18" stroke="#31495A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <HeartOutline className="mx-auto mb-4 w-10" stroke="#98A26B" strokeWidth={3} />
          {SEGMENTS.map((seg) => (
            <button
              key={seg.href}
              type="button"
              onClick={() => jump(seg.href)}
              className="cursor-pointer rounded-lg py-2.5 text-left font-bQuatt text-[18px] text-[#31495A] transition-colors hover:bg-[#EFEADB]"
            >
              {seg.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
