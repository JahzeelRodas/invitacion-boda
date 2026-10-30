import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { wedding } from '../../config/wedding'
import { whatsappUrl } from '../../utils/links'
import { formatInZone, zonedTimeToUtc } from '../../utils/timezone'

export interface RSVPModalProps {
  open: boolean
  onClose: () => void
}

type SubmitState = 'idle' | 'sending' | 'endpointSent' | 'whatsappPrepared' | 'error'

interface FormData {
  name: string
  attending: 'yes' | 'no' | null
  guests: number
  message: string
}

const INITIAL_FORM: FormData = { name: '', attending: null, guests: 0, message: '' }

function buildWhatsAppMessage(form: FormData): string {
  const { couple } = wedding
  const attendingText =
    form.attending === 'yes'
      ? `¡Confirmo mi asistencia${form.guests > 0 ? ` con ${form.guests} acompañante(s)` : ''}!`
      : 'Lamentablemente no podré asistir.'

  return [
    `¡Hola, ${couple.brideName} y ${couple.groomName}!`,
    `Soy ${form.name}.`,
    attendingText,
    form.message.trim() ? `Mensaje: ${form.message.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

/**
 * Confirmación de asistencia como ventana deslizante: el botón
 * "CONFIRMAR ASISTENCIA" de la tarjeta de recepción la descubre.
 * · Con endpoint configurado (VITE_RSVP_ENDPOINT): envío real vía POST.
 * · Sin endpoint: abre WhatsApp con el mensaje preparado.
 */
export default function RSVPModal({ open, onClose }: RSVPModalProps) {
  const { rsvp, couple, date } = wedding
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [state, setState] = useState<SubmitState>('idle')
  const [errors, setErrors] = useState<Partial<Record<'name' | 'attending' | 'guests', string>>>({})

  const deadline = useMemo(() => {
    if (!rsvp.deadlineISO) return null
    try {
      return zonedTimeToUtc(rsvp.deadlineISO, date.timeZone)
    } catch {
      return null
    }
  }, [rsvp.deadlineISO, date.timeZone])

  const deadlinePassed = deadline !== null && deadline.getTime() < Date.now()
  const deadlineLabel = deadline ? formatInZone(deadline, date.timeZone) : ''

  /* Bloquear el scroll del fondo cuando el modal está abierto */
  useEffect(() => {
    if (!open) return
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const validate = (): boolean => {
    const next: typeof errors = {}
    if (form.name.trim().length < 2) next.name = 'Escribe tu nombre completo.'
    if (!form.attending) next.attending = 'Indica si podrás asistir.'
    if (form.attending === 'yes' && (!Number.isInteger(form.guests) || form.guests < 0 || form.guests > 20)) {
      next.guests = 'Ingresa un número válido (0–20).'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) return

    if (rsvp.endpoint) {
      try {
        setState('sending')
        const response = await fetch(rsvp.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name.trim(),
            attending: form.attending,
            guests: form.attending === 'yes' ? form.guests : 0,
            message: form.message.trim(),
            submittedAt: new Date().toISOString(),
          }),
        })
        if (!response.ok) throw new Error(`Respuesta ${response.status}`)
        setState('endpointSent')
      } catch {
        setState('error')
      }
      return
    }

    const url = whatsappUrl(rsvp.whatsappPhone, buildWhatsAppMessage(form))
    const opened = window.open(url, '_blank', 'noopener,noreferrer')
    setState('whatsappPrepared')
    if (!opened) {
      window.location.href = url
    }
  }

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setState('idle')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={rsvp.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        >
          {/* fondo */}
          <button
            type="button"
            aria-label="Cerrar confirmación"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-navy/85 backdrop-blur-sm"
          />

          {/* panel */}
          <motion.div
            className="relative z-10 max-h-[88vh] w-full max-w-md overflow-y-auto bg-cream text-navy shadow-cover"
            initial={{ opacity: 0, y: 42, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 42, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-navy/60 transition-colors hover:bg-navy/10 hover:text-navy"
            >
              <X size={18} strokeWidth={1.6} aria-hidden="true" />
            </button>

            <div className="px-6 pt-8 pb-6 text-left">
              <h2 className="text-center font-serif text-[20px] font-bold uppercase tracking-[0.03em]">
                {rsvp.title}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed text-navy/70">
                {rsvp.intro}
              </p>

              {deadlinePassed ? (
                <div className="mt-6 border border-navy/20 bg-navy/5 px-4 py-3 text-center text-sm leading-relaxed">
                  El plazo de confirmación venció{deadlineLabel ? ` el ${deadlineLabel}` : ''}. Escríbenos por
                  WhatsApp para coordinar.
                  <a
                    href={whatsappUrl(rsvp.whatsappPhone, `¡Hola! Quiero coordinar mi asistencia a la boda.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-navy underline underline-offset-4"
                  >
                    Abrir chat
                  </a>
                </div>
              ) : state === 'endpointSent' ? (
                <div className="mt-8 text-center">
                  <p className="font-display text-4xl">¡Gracias!</p>
                  <p className="mx-auto mt-3 max-w-xs text-sm text-navy/70">
                    Recibimos tu confirmación
                    {form.attending === 'yes' ? ' — esperamos verte ahí' : ''}.
                  </p>
                </div>
              ) : state === 'whatsappPrepared' ? (
                <div className="mt-8 text-center">
                  <p className="font-serif text-2xl">Mensaje preparado</p>
                  <p className="mx-auto mt-3 max-w-xs text-sm text-navy/70">
                    Se abrió WhatsApp con tu confirmación lista. Envíalo desde la app para completar tu respuesta.
                  </p>
                </div>
              ) : (
                <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="rsvp-name" className="field-label block text-[10px] font-medium uppercase tracking-[0.12em] text-navy/70">
                      Nombre completo
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Tu nombre y apellido"
                      aria-invalid={Boolean(errors.name)}
                      className="field-navy mt-2"
                    />
                    {errors.name && <p className="mt-1 text-xs text-[#8C4A3C]">{errors.name}</p>}
                  </div>

                  <fieldset>
                    <legend className="block text-[10px] font-medium uppercase tracking-[0.12em] text-navy/70">
                      ¿Podrás asistir?
                    </legend>
                    <div className="mt-2 flex flex-wrap gap-3">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="attending"
                          value="yes"
                          checked={form.attending === 'yes'}
                          onChange={() => setForm((current) => ({ ...current, attending: 'yes' }))}
                          className="sr-only peer"
                        />
                        <span className="inline-block rounded-full border border-navy/40 px-5 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-navy/70 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-mist">
                          Sí, asistiré
                        </span>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="attending"
                          value="no"
                          checked={form.attending === 'no'}
                          onChange={() => setForm((current) => ({ ...current, attending: 'no' }))}
                          className="sr-only peer"
                        />
                        <span className="inline-block rounded-full border border-navy/40 px-5 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-navy/70 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-mist">
                          No podré ir
                        </span>
                      </label>
                    </div>
                    {errors.attending && <p className="mt-1 text-xs text-[#8C4A3C]">{errors.attending}</p>}
                  </fieldset>

                  {rsvp.guestsAllowed && form.attending === 'yes' && (
                    <div>
                      <label htmlFor="rsvp-guests" className="block text-[10px] font-medium uppercase tracking-[0.12em] text-navy/70">
                        Número de acompañantes (sin incluirte)
                      </label>
                      <input
                        id="rsvp-guests"
                        type="number"
                        min={0}
                        max={20}
                        step={1}
                        value={form.guests}
                        onChange={(event) => setForm((current) => ({ ...current, guests: Number(event.target.value) }))}
                        className="field-navy mt-2 max-w-[7rem]"
                      />
                      {errors.guests && <p className="mt-1 text-xs text-[#8C4A3C]">{errors.guests}</p>}
                    </div>
                  )}

                  <div>
                    <label htmlFor="rsvp-message" className="block text-[10px] font-medium uppercase tracking-[0.12em] text-navy/70">
                      Mensaje para los novios (opcional)
                    </label>
                    <textarea
                      id="rsvp-message"
                      rows={3}
                      maxLength={500}
                      value={form.message}
                      onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                      placeholder={`Unas palabras para ${couple.brideName} y ${couple.groomName}`}
                      className="field-navy mt-2 h-20 resize-none"
                    />
                  </div>

                  {state === 'error' && (
                    <p className="border border-[#8C4A3C]/30 bg-[#8C4A3C]/5 px-4 py-3 text-xs leading-relaxed text-[#8C4A3C]">
                      No pudimos enviar tu confirmación. Inténtalo de nuevo o escríbenos por WhatsApp.
                    </p>
                  )}

                  <div className="flex flex-col items-center gap-3 pt-1">
                    <button type="submit" disabled={state === 'sending'} className="btn-navy--sm w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto">
                      <span className="relative z-10">{state === 'sending' ? 'Enviando…' : 'Enviar confirmación'}</span>
                      <span aria-hidden="true" className="btn-shine" />
                    </button>
                    {rsvp.endpoint ? (
                      <a
                        href={whatsappUrl(rsvp.whatsappPhone, buildWhatsAppMessage(form))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-medium uppercase tracking-[0.2em] text-navy/70 underline underline-offset-4"
                      >
                        Confirmar por WhatsApp
                      </a>
                    ) : (
                      <p className="text-[10px] uppercase tracking-[0.2em] text-navy/50">
                        Se abrirá WhatsApp con tu mensaje listo
                      </p>
                    )}
                  </div>
                </form>
              )}

              {(state === 'endpointSent' || state === 'whatsappPrepared') && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-[10px] font-medium uppercase tracking-[0.2em] text-navy/60 underline underline-offset-4 transition-colors hover:text-navy"
                  >
                    Enviar otra confirmación
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
