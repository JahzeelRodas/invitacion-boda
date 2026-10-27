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
    /** DEMO: reemplazar por los nombres reales. */
    brideName: 'Valentina',
    brideFullName: 'Valentina Ignacia Ríos Mendoza',
    groomName: 'Sebastián',
    groomFullName: 'Sebastián Andrés Fuentes Alcántara',
    /** Iniciales para el sello, favicon y detalles ornamentales. */
    initials: 'V·S',
    monogram: 'V & S',
    /** Si los novios tienen un hashtag, añádelo aquí (opcional). */
    hashtag: '',
  },

  /* ── FECHA DEL MATRIMONIO ────────────────────────────────────────────── */
  date: {
    /**
     * DEMO: fecha y hora local del evento, sin indicador de zona.
     * Formato: "YYYY-MM-DDTHH:mm:ss" (24 horas).
     */
    isoDateTime: '2026-12-05T17:30:00',
    /** Zona horaria IANA del lugar del evento (p. ej. "America/Santiago"). */
    timeZone: 'America/Santiago',
    /** Etiquetas de visualización. */
    displayLong: 'Sábado 5 de diciembre de 2026',
    displayShort: '05 · 12 · 2026',
    /** Ciudad o lugar resumido, para la portada. */
    place: 'Santiago, Chile',
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
    /** Reemplaza /public/images/hero-couple.svg por la fotografía real. */
    image: '/images/hero-couple.svg',
    alt: 'Fotografía principal de los novios, Valentina y Sebastián',
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
        image: '/images/story-1.svg',
        alt: 'Fotografía del primer momento de la historia de la pareja',
      },
      {
        label: 'Los años juntos',
        title: 'Viajes, risas y una vida en común',
        text: 'Texto de ejemplo: un párrafo sobre lo que han construido juntos. Sustituye por el texto real.',
        image: '/images/story-2.svg',
        alt: 'Fotografía del segundo momento de la historia de la pareja',
      },
      {
        label: 'La propuesta',
        title: 'La pregunta que nos trae hasta aquí',
        text: 'Texto de ejemplo: el momento de la propuesta. Sustituye por el texto real.',
        image: '/images/story-3.svg',
        alt: 'Fotografía del momento de la propuesta',
      },
    ] satisfies StoryMoment[],
  },

  /* ── GALERÍA (6 a 10 fotografías) ────────────────────────────────────── */
  gallery: {
    title: 'Momentos',
    eyebrow: 'Galería',
    images: [
      { src: '/images/gallery-1.svg', alt: 'Fotografía de ejemplo de los novios — vertical', width: 800, height: 1200 },
      { src: '/images/gallery-2.svg', alt: 'Fotografía de ejemplo de los novios — horizontal', width: 1000, height: 700 },
      { src: '/images/gallery-3.svg', alt: 'Fotografía de ejemplo de los novios — cuadrada', width: 900, height: 900 },
      { src: '/images/gallery-4.svg', alt: 'Fotografía de ejemplo de los novios — vertical', width: 900, height: 1250 },
      { src: '/images/gallery-5.svg', alt: 'Fotografía de ejemplo de los novios — horizontal', width: 1000, height: 720 },
      { src: '/images/gallery-6.svg', alt: 'Fotografía de ejemplo de los novios — vertical', width: 800, height: 1050 },
      { src: '/images/gallery-7.svg', alt: 'Fotografía de ejemplo de los novios — cuadrada', width: 950, height: 950 },
      { src: '/images/gallery-8.svg', alt: 'Fotografía de ejemplo de los novios — vertical', width: 880, height: 1180 },
    ] satisfies GalleryImage[],
  },

  /* ── INFORMACIÓN DEL EVENTO ──────────────────────────────────────────── */
  event: {
    eyebrow: 'El gran día',
    title: 'Ceremonia y celebración',
    ceremony: {
      label: 'Ceremonia',
      isoDateTime: '2026-12-05T17:30:00',
      timeLabel: '17:30 h',
      durationMinutes: 60,
      venueName: 'Parroquia Santa María de los Andes',
      address: 'Av. Providencia 1234, Providencia, Santiago',
      mapsQuery: 'Parroquia Santa María de los Andes, Providencia, Santiago de Chile',
    },
    reception: {
      label: 'Recepción',
      isoDateTime: '2026-12-05T20:00:00',
      timeLabel: '20:00 h',
      durationMinutes: 240,
      venueName: 'Hacienda Los Aromos',
      address: 'Camino Las Flores 567, Las Condes, Santiago',
      mapsQuery: 'Hacienda Los Aromos, Las Condes, Santiago de Chile',
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
      'Texto de ejemplo: te invitamos a vestir formal. Los tonos champagne, marfil y dorado acompañan la paleta de la celebración.',
    /** Paleta de colores sugerida para los invitados (opcional). */
    palette: [
      { name: 'Champagne', hex: '#D8C3A5' },
      { name: 'Dorado', hex: '#B49A67' },
      { name: 'Gris cálido', hex: '#77716A' },
      { name: 'Tinta', hex: '#292723' },
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
     * DEMO: pieza generada como marcador. Sustituye el archivo por una
     * canción propia o con licencia (p. ej. /public/audio/nuestra-cancion.mp3)
     * y actualiza `src`, `title` y `artist`.
     */
    src: '/audio/ambience-demo.wav',
    title: 'Pieza de demostración',
    artist: 'Sustituir en src/config/wedding.ts → music',
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
    mp4Src: '',
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
    image: '/images/closing.svg',
    alt: 'Fotografía de cierre de los novios',
  },
} as const

export type Wedding = typeof wedding
