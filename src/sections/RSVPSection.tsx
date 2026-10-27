import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Send } from 'lucide-react'
import { wedding } from '../config/wedding'
import { whatsappUrl } from '../utils/links'
import { formatInZone, zonedTimeToUtc } from '../utils/timezone'
import Reveal from '../components/animation/Reveal'
import { HairDivider, SectionHeader } from '../components/layout/SectionHeader'

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
 * Confirmación de asistencia.
 * · Con endpoint configurado (VITE_RSVP_ENDPOINT): envío real vía POST.
 * · Sin endpoint: abre WhatsApp con el mensaje preparado; el éxito se
 *   informa con honestidad (el envío se completa en la app del invitado).
 */
export default function RSVPSection() {
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
    <section id="rsvp" className="bg-silk py-24 md:py-32" aria-labelledby="rsvp-title">
      <div className="mx-auto max-w-xl px-6 text-center">
        <SectionHeader eyebrow={rsvp.eyebrow} title={rsvp.title} />

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-md text-sm leading-[1.9] text-warm md:text-[15px]">{rsvp.intro}</p>
        </Reveal>

        {deadlinePassed && (
          <Reveal delay={0.12}>
            <p className="mt-8 border border-gold/30 bg-champagne/10 px-5 py-4 text-sm leading-relaxed text-ink/80">
              El plazo de confirmación venció{deadlineLabel ? ` el ${deadlineLabel}` : ''}. Si aún deseas acompañarnos,{' '}
              <a
                href={whatsappUrl(rsvp.whatsappPhone, `¡Hola, ${couple.brideName} y ${couple.groomName}! Quisiera confirmar mi asistencia.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-4"
              >
                escríbenos por WhatsApp
              </a>
              .
            </p>
          </Reveal>
        )}

        {state === 'endpointSent' ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-10">
            <Heart size={20} strokeWidth={1.4} className="mx-auto text-gold" aria-hidden="true" />
            <p className="mt-5 font-script text-4xl text-gold">¡Gracias!</p>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-warm">
              Hemos recibido tu confirmación
              {form.attending === 'yes' ? ' — esperamos verte ahí' : ''}. {wedding.phrases.closingNote}
            </p>
            <HairDivider className="mt-8" />
          </motion.div>
        ) : state === 'whatsappPrepared' ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-10">
            <MessageCircle size={20} strokeWidth={1.4} className="mx-auto text-gold" aria-hidden="true" />
            <p className="mt-5 font-serif text-2xl text-ink">Mensaje preparado</p>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-warm">
              Se abrió WhatsApp con tu confirmación lista. Envíalo desde la app para completar tu respuesta — si no se
              abrió,
              <a
                href={whatsappUrl(rsvp.whatsappPhone, buildWhatsAppMessage(form))}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-4"
              >
                &nbsp;ábrelo aquí
              </a>
              .
            </p>
            <HairDivider className="mt-8" />
          </motion.div>
        ) : (
          !deadlinePassed && (
            <Reveal delay={0.18}>
              <form onSubmit={handleSubmit} noValidate className="mt-12 space-y-9 text-left">
                <div>
                  <label htmlFor="rsvp-name" className="field-label">
                    Nombre completo
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder={`Tu nombre y apellido`}
                    aria-invalid={Boolean(errors.name)}
                    className="field-input mt-2"
                  />
                  {errors.name && <p className="mt-2 text-xs text-[#8C4A3C]">{errors.name}</p>}
                </div>

                <fieldset>
                  <legend className="field-label">¿Podrás asistir?</legend>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={form.attending === 'yes'}
                        onChange={() => setForm((current) => ({ ...current, attending: 'yes' }))}
                        className="sr-only peer"
                      />
                      <span className="inline-block border border-gold/40 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-warm transition-colors peer-checked:border-gold peer-checked:bg-gold/10 peer-checked:text-ink">
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
                      <span className="inline-block border border-gold/40 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-warm transition-colors peer-checked:border-gold peer-checked:bg-gold/10 peer-checked:text-ink">
                        No podré ir
                      </span>
                    </label>
                  </div>
                  {errors.attending && <p className="mt-2 text-xs text-[#8C4A3C]">{errors.attending}</p>}
                </fieldset>

                {rsvp.guestsAllowed && form.attending === 'yes' && (
                  <div>
                    <label htmlFor="rsvp-guests" className="field-label">
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
                      className="field-input mt-2 max-w-[7rem]"
                    />
                    {errors.guests && <p className="mt-2 text-xs text-[#8C4A3C]">{errors.guests}</p>}
                  </div>
                )}

                <div>
                  <label htmlFor="rsvp-message" className="field-label">
                    Mensaje para los novios (opcional)
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    maxLength={500}
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    placeholder={`Unas palabras para ${couple.brideName} y ${couple.groomName}`}
                    className="field-input mt-2 resize-none"
                  />
                </div>

                {state === 'error' && (
                  <p className="border border-[#8C4A3C]/30 bg-[#8C4A3C]/5 px-4 py-3 text-xs leading-relaxed text-[#8C4A3C]">
                    No pudimos enviar tu confirmación en este momento. Inténtalo nuevamente o escríbenos directamente por
                    WhatsApp.
                  </p>
                )}

                <div className="flex flex-col items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="btn-hairline w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                  >
                    <Send size={13} strokeWidth={1.5} aria-hidden="true" />
                    {state === 'sending' ? 'Enviando…' : 'Enviar confirmación'}
                  </button>

                  {rsvp.endpoint ? (
                    <a
                      href={whatsappUrl(rsvp.whatsappPhone, buildWhatsAppMessage(form))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-warm underline underline-offset-4 transition-colors hover:text-gold"
                    >
                      <MessageCircle size={12} strokeWidth={1.5} aria-hidden="true" />
                      Confirmar por WhatsApp
                    </a>
                  ) : (
                    <p className="text-[10px] uppercase tracking-[0.25em] text-warm/80">
                      Se abrirá WhatsApp con tu mensaje listo
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          )
        )}

        {(state === 'endpointSent' || state === 'whatsappPrepared') && (
          <button
            type="button"
            onClick={resetForm}
            className="mt-8 text-[10px] font-medium uppercase tracking-[0.25em] text-warm underline underline-offset-4 transition-colors hover:text-gold"
          >
            Enviar otra confirmación
          </button>
        )}
      </div>
    </section>
  )
}
