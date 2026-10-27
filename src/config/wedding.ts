/* ════════════════════════════════════════════════════════════════════════════
   CONFIGURACIÓN DE LA INVITACIÓN
   ────────────────────────────────────────────────────────────────────────────
   ⚠️  CONTENIDO DE EJEMPLO (DEMO)

   Todos los datos de este archivo son placeholders. Los novios pueden
   personalizar la invitación completa editando SOLO este archivo — no es
   necesario tocar ningún componente.

   Guía rápida:
   · Nombres, iniciales y monograma      → couple
   · Fecha, hora y zona horaria          → date
   · Frases y textos                     → phrases, story, closing
   · Fotografías                         → rutas en /public/images/*
   · Canción de fondo                    → music.src (MP3 en /public/audio)
   · Ceremonia y recepción               → event
   · Código de vestimenta                → dressCode
   · Grupo musical y video               → band
   · Confirmación de asistencia          → rsvp
   ────────────────────────────────────────────────────────────────────────── */

export interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface StoryMoment {
  label: string
  title: string
  text: string
  image: string
  alt: string
}

export interface EventVenue {
  label: string
  isoDateTime: string
  timeLabel: string
  durationMinutes: number
  venueName: string
  address: string
  /** Texto libre para buscar en Google Maps (dirección exacta o nombre + comuna). */
  mapsQuery: string
}

export const wedding = {
  /**
   * Marca TRUE mientras uses contenido de ejemplo: muestra un aviso discreto
   * al pie de la página. Cambia a `false` cuando los datos sean reales.
   */
  isDemoContent: true,

  /* ── PAREJA ──────────────────────────────────────────────────────────── */
  couple: {
    brideName: 'Margot',
    brideFullName: 'Margarita Ríos Mendoza',
    groomName: 'Alejandro',
    groomFullName: 'Alejandro Fuentes Alcántara',
    /** Iniciales para el sello, favicon y detalles ornamentales. */
    initials: 'M·A',
    monogram: 'M & A',
    /** Si los novios tienen un hashtag, añádelo aquí (opcional). */
    hashtag: '',
  },

  /* ── FECHA DEL MATRIMONIO ────────────────────────────────────────────── */
  date: {
    /** Fecha y hora local del evento, sin indicador de zona. Formato: "YYYY-MM-DDTHH:mm:ss". */
    isoDateTime: '2026-11-21T11:30:00',
    /** Zona horaria IANA del lugar del evento (p. ej. "America/Santiago"). */
    timeZone: 'America/La Paz',
    /** Etiquetas de visualización. */
    displayLong: 'Sábado 21 de noviembre de 2026',
    displayShort: '21 · 11 · 2026',
    /** Ciudad o lugar resumido, para la portada. */
    place: 'La Paz, Bolivia',
  },

  /* ── FRASES ──────────────────────────────────────────────────────────── */
  phrases: {
    opening: 'Tenemos una historia que celebrar',
    openingHint: 'Toca el sello para abrir',
    heroKicker: '¡Nos casamos!',
    heroQuote: 'Y así comenzó lo nuestro… y así seguirá, para siempre.',
    closing: 'El comienzo de nuestra historia para siempre',
    closingNote: 'Gracias por ser parte de esta historia. Nos vemos el gran día.',
  },

  /* ── PORTADA ─────────────────────────────────────────────────────────── */
  hero: {
    image: '/images/4.jpg',
    alt: 'Margot y Alejandro mostrando su anillo de compromiso',
    /** Encuadre de la fotografía en la portada (CSS object-position). */
    position: 'center 38%',
  },

  /* ── NUESTRA HISTORIA ────────────────────────────────────────────────── */
  story: {
    title: 'Dos caminos, una misma historia',
    intro:
      'Texto de ejemplo: aquí va un párrafo breve que cuente cómo se conocieron y por qué decidieron dar este paso. Lo esencial, contado con calma y con el corazón.',
    moments: [
      {
        label: 'El primer encuentro',
        title: 'Un día cualquiera que lo cambió todo',
        text: 'Texto de ejemplo: el relato breve del primer encuentro. Sustituye este párrafo por la anécdota real de los novios.',
        image: '/images/11.jpg',
        alt: 'Margot y Alejandro bailando tomados de las manos en el parque',
      },
      {
        label: 'Los años juntos',
        title: 'Viajes, risas y una vida en común',
        text: 'Texto de ejemplo: un párrafo sobre lo que han construido juntos. Sustituye por el texto real.',
        image: '/images/15.jpg',
        alt: 'Margot y Alejandro abrazados en el mirador junto a la laguna',
      },
      {
        label: 'La propuesta',
        title: 'La pregunta que nos trae hasta aquí',
        text: 'Texto de ejemplo: el momento de la propuesta. Sustituye por el texto real.',
        image: '/images/9.jpg',
        alt: 'Margot y Alejandro abrazados bajo la pérgola de madera',
      },
    ] satisfies StoryMoment[],
  },

  /* ── GALERÍA (6 a 10 fotografías) ────────────────────────────────────── */
  gallery: {
    title: 'Momentos',
    eyebrow: 'Galería',
    images: [
      { src: '/images/4.jpg', alt: 'El anillo de compromiso — ceremonia civil', width: 1200, height: 1600 },
      { src: '/images/9.jpg', alt: 'Abrazo bajo la pérgola de madera', width: 1200, height: 1600 },
      { src: '/images/11.jpg', alt: 'Bailando tomados de las manos en el parque', width: 1200, height: 1600 },
      { src: '/images/15.jpg', alt: 'Juntos frente a la laguna, bajo un cielo azul', width: 1200, height: 1600 },
    ] satisfies GalleryImage[],
  },

  /* ── INFORMACIÓN DEL EVENTO ──────────────────────────────────────────── */
  event: {
    eyebrow: 'El gran día',
    title: 'Ceremonia y celebración',
    ceremony: {
      label: 'Ceremonia',
      isoDateTime: '2026-11-21T11:30:00',
      timeLabel: '11:30 h',
      durationMinutes: 60,
      venueName: 'Catedral Metropolitana Nuestra Señora de La Paz',
      address: 'Plaza Murillo Km 0, La Paz',
      mapsQuery: 'Catedral Metropolitana Nuestra Señora de La Paz, La Paz',
    },
    reception: {
      label: 'Recepción',
      isoDateTime: '2026-11-21T16:00:00',
      timeLabel: '16:00 h',
      durationMinutes: 240,
      venueName: 'Golden Prime II',
      address: 'Av. Bolivia entre calles 4 y 5, N°20 Zona Santiago II, El Alto',
      mapsQuery: 'Av. Bolivia entre calles 4 y 5, N°20 Zona Santiago II, El Alto',
    },
    /** Notas prácticas para los invitados (editables). */
    notes: [
      'Estacionamiento disponible en el recinto.',
      'La recepción es al aire libre — te sugerimos un abrigo ligero para la noche.',
      'Por favor, confirma tu asistencia antes del 5 de noviembre.',
    ],
  },

  /* ── CÓDIGO DE VESTIMENTA ────────────────────────────────────────────── */
  dressCode: {
    eyebrow: 'Código de vestimenta',
    type: 'Formal elegante',
    headline: 'Elegancia para una noche inolvidable',
    description:
      'Texto de ejemplo: te invitamos a vestir formal. Los tonos azul eléctrico, marfil y azulado acompañan la paleta de la celebración.',
    /** Paleta de colores sugerida para los invitados (opcional). */
    palette: [
      { name: 'Azul eléctrico', hex: '#1F51FF' },
      { name: 'Azul pálido', hex: '#C9D8F2' },
      { name: 'Gris azulado', hex: '#6F7580' },
      { name: 'Tinta', hex: '#191C24' },
    ],
    /** Nota opcional sobre tonos a evitar (vacío para omitir). */
    avoidNote: 'Te pedimos evitar tonos blanco y marfil, reservados para la novia.',
    /** Fotografías de inspiración (opcional). */
    inspirationImages: [
      { src: '/images/dress-1.svg', alt: 'Inspiración de vestimenta — look femenino elegante' },
      { src: '/images/dress-2.svg', alt: 'Inspiración de vestimenta — look masculino elegante' },
    ],
  },

  /* ── MÚSICA AMBIENTAL ────────────────────────────────────────────────── */
  music: {
    /**
     * Canción configurada por los novios: "Disparo al Corazón" (Ricky Martin).
     * ⚠️ Es una canción comercial: asegúrate de tener autorización para
     * reproducirla, o sustitúyela por una versión propia/licenciada.
     */
    src: '/audio/disparo-al-corazon.mp3',
    title: 'Disparo al Corazón',
    artist: 'Ricky Martin',
    /** Volumen entre 0 y 1. */
    volume: 0.45,
  },

  /* ── GRUPO MUSICAL ───────────────────────────────────────────────────── */
  band: {
    /** DEMO: nombre real del grupo contratado. */
    name: 'Grupo musical (por configurar)',
    description:
      'Agrega aquí una breve presentación del grupo que animará la celebración, junto con su video oficial.',
    image: '/images/band.svg',
    /**
     * Video de presentación (opcional):
     * · youtubeVideoId → p. ej. "dQw4w9WgXcQ" (se usa la miniatura oficial).
     * · Si prefieres un archivo propio, colócalo en /public/video y usa
     *   mp4Src en lugar del video de YouTube.
     * Deja ambos vacíos para mostrar el espacio de reserva.
     */
    youtubeVideoId: '',
    mp4Src: '/video/grupo.mp4',
  },

  /* ── CONFIRMACIÓN DE ASISTENCIA (RSVP) ───────────────────────────────── */
  rsvp: {
    eyebrow: 'Confirmación',
    title: '¿Contamos contigo?',
    intro:
      'Por favor, confírmame tu asistencia. Tu presencia es lo que convierte este día en inolvidable.',
    /** ¿Se permiten acompañantes? */
    guestsAllowed: true,
    /** Fecha límite ISO opcional, p. ej. "2026-11-05T23:59:59". Null = sin límite. */
    deadlineISO: null as string | null,
    /** Número de WhatsApp de los novios (con código de país, solo dígitos). DEMO. */
    whatsappPhone: '56900000000',
    /**
     * Endpoint opcional para guardar las confirmaciones. Se puede configurar
     * mediante la variable de entorno VITE_RSVP_ENDPOINT (ver .env.example).
     * Si queda vacío, se usa el enlace de WhatsApp.
     */
    endpoint: import.meta.env.VITE_RSVP_ENDPOINT ?? '',
  },

  /* ── CIERRE ──────────────────────────────────────────────────────────── */
  closing: {
    image: '/images/15.jpg',
    alt: 'Margot y Alejandro abrazados frente a la laguna, bajo un cielo azul',
  },
} as const

export type Wedding = typeof wedding
