import { useEffect, useState } from 'react'
import { wedding } from '../config/wedding'
import { FlowerBranch } from '../components/decor/ornaments'

interface GuestMessage {
  name: string
  message: string
  date: string
}

const STORAGE_KEY = 'boda-guestbook'

/**
 * Libro de visitas: formulario de nombre + deseo y la lista de mensajes.
 * Los mensajes propios se guardan en localStorage; a continuación aparecen
 * los textos semilla del config mientras no existan mensajes reales.
 */
export default function GuestbookSection() {
  const { guestbook } = wedding
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [entries, setEntries] = useState<GuestMessage[]>([])
  const [error, setError] = useState('')

  /* Carga inicial (solo cliente) */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setEntries(JSON.parse(raw) as GuestMessage[])
    } catch {
      /* almacenamiento no disponible: solo se ven los mensajes semilla */
    }
  }, [])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedMessage = message.trim()
    if (trimmedName.length < 2 || trimmedMessage.length < 2) {
      setError('Necesitamos tu nombre y un mensajito, por favor.')
      return
    }
    setError('')
    const next: GuestMessage = { name: trimmedName, message: trimmedMessage, date: new Date().toISOString() }
    const updated = [next, ...entries]
    setEntries(updated)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      /* sin persistencia igual mostramos el mensaje agregado */
    }
    setName('')
    setMessage('')
  }

  const seeds: GuestMessage[] = guestbook.seedMessages.map((item, i) => ({
    name: item.name,
    message: item.message,
    date: new Date(Date.UTC(2026, 5, 18 + i, 9 + i, 0, 0)).toISOString(),
  }))
  const all = [...entries, ...seeds].slice(0, 10)

  return (
    <section className="relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      {/* rama flotante abajo a la izquierda */}
      <span aria-hidden="true" className="pointer-events-none absolute bottom-[-2%] left-[-10%] z-0 block w-[32%] md:left-[-12%]">
        <span className="block" style={{ animation: 'dbFloat 5.8s ease-in-out 0.5s infinite', willChange: 'transform' }}>
          <FlowerBranch className="block w-full rotate-180 -scale-y-100 text-navy/40 drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" />
        </span>
      </span>

      <div className="relative overflow-hidden rounded-[10px] bg-white px-4 py-8 shadow-card">
        <div className="text-center">
          <h2 className="text-[20px] font-bold uppercase tracking-[0.03em] font-serif text-navy md:text-[24px]">
            {guestbook.title}
          </h2>
        </div>

        <form className="mx-auto mt-6 w-full max-w-[248px] md:max-w-[380px]" onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={guestbook.nameLabel}
              maxLength={80}
              aria-label={guestbook.nameLabel}
              className="field-navy"
            />
          </div>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={guestbook.messageLabel}
            rows={4}
            maxLength={1000}
            aria-label={guestbook.messageLabel}
            className="field-navy h-[70px] resize-none md:h-[110px]"
          />
          {error && <p className="mt-2 text-center text-xs text-[#8C4A3C]">{error}</p>}
          <div className="mt-4 flex items-center justify-end">
            <button
              type="submit"
              className="rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: '#00224C' }}
            >
              {guestbook.submitLabel}
            </button>
          </div>
        </form>

        {/* lista de deseos */}
        <div className="mx-auto mt-8 max-h-[500px] w-full space-y-3 overflow-y-auto pr-2">
          {all.map((entry) => {
            const isSeed = !entries.some((e) => e.name === entry.name && e.message === entry.message)
            return (
              <article key={`${entry.name}-${entry.date}`} className="rounded-[8px] border p-4 text-sm" style={{ borderColor: 'rgba(0,34,76,0.2)', backgroundColor: 'rgba(0,34,76,0.03)' }}>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-navy">{entry.name}</span>
                  <span className="text-xs opacity-70">
                    {new Date(entry.date).toLocaleString('es', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    {isSeed ? '' : ''}
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-navy/85">{entry.message}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
