/* ════════════════════════════════════════════════════════════════════════════
   CONFIGURACIÓN DE LA INVITACIÓN — ESTILO "MINIMALISMO AZUL PROFUNDO"
   ────────────────────────────────────────────────────────────────────────────
   ⚠️  CONTENIDO DE EJEMPLO (DEMO)

   Todos los datos de este archivo son placeholders. Los novios pueden
   personalizar la invitación completa editando SOLO este archivo — no es
   necesario tocar ningún componente. Para reemplazar las imágenes basta
   copiar tus fotos en /public/images y actualizar las rutas.

   Guía rápida:
   · Nombres completos y padres             → couple
   · Fecha, zona horaria y textos de fecha  → date
   · Portada (dos polaroids flotantes)      → heroPhotos
   · Anuncio de la ceremonia y recepción    → announcement
   · Galería (carrusel 3D)                  → gallery
   · Código de vestimenta y paleta          → dressCode
   · Programa del día (cronología)          → schedule
   · Lugar de la recepción y mapa           → venue
   · Libro de visitas (mensajes semilla)    → guestbook
   · Caja de regalos (cuentas / QR)         → gifts
   · Canción de fondo                       → music
   ────────────────────────────────────────────────────────────────────────── */

export interface GalleryImage {
  src: string
  alt: string
}

export interface ScheduleItem {
  time: string
  label: string
  icon?: 'church' | 'toast' | 'entrance' | 'dinner' | 'dance' | 'party' | 'star'
}

export interface GiftMethod {
  label: string
  holder?: string
  detailLines: string[]
  note?: string
  /** Ruta a una imagen QR (p. ej. "/images/qr-novios.png"); vacío = placeholder */
  qrImage?: string
  /** Enlace para pagar o transferir (opcional) */
  link?: { href: string; label: string }
}

/** Un grupo musical: puede tener video, foto o ambos. */
export interface MusicGroup {
  /** Nombre del grupo (se muestra bajo el material). */
  name: string
  /** Nota adicional: género, horario de presentación, etc. */
  detail?: string
  /** Video compartido por el grupo. */
  video?: { src: string; poster?: string }
  /** Fotografía del grupo. */
  photo?: { src: string; alt: string }
}

export const wedding = {
  /**
   * Marca TRUE mientras uses contenido de ejemplo: muestra un aviso discreto
   * al pie de la página. Cambia a `false` cuando los datos sean reales.
   */
  isDemoContent: false,

  /* ── PAREJA ──────────────────────────────────────────────────────────── */
  couple: {
    brideName: 'Margot',
    brideFullName: 'Margot Huchani Tinta',
    groomName: 'Alejandro',
    groomFullName: 'Alejandro Catari Quilo',
    /** Padres de la novia (columna izquierda). */
    brideParents: {
      label: 'Sr. y Sra.',
      father: 'Natalio Huchani Choque',
      mother: 'Francisca Tinta de Huchani',
    },
    /** Padres del novio (columna derecha). */
    groomParents: {
      label: 'Sr. y Sra.',
      father: 'Cruz José Catari Mamani',
      mother: 'Avigaid Quilo Catari',
    },
  },

  /* ── FECHA DEL MATRIMONIO ────────────────────────────────────────────── */
  date: {
    /** Fecha y hora de la RECEPCIÓN (el evento completo) sin indicador de zona. */
    isoDateTime: '2026-11-21T19:00:00',
    timeZone: 'America/La Paz',
    /** Día y mes en número, para la tarjeta grande y el calendario. */
    day: 21,
    monthName: 'NOVIEMBRE',
    year: 2026,
    weekday: 'SÁBADO',
    /** Texto largo para la portada. */
    displayLong: '21 de noviembre de 2026',
    displayShort: '21 · 11 · 2026',
    place: 'La Paz, Bolivia',
  },

  /* ── HORARIOS ────────────────────────────────────────────────────────── */
  schedule: {
    /** Título de la tarjeta azul. */
    prefix: 'INFO DE LA CEREMONIA',
    /** Texto del anuncio (los \n crean saltos de línea). */
    announce: 'Con la bendición de Dios y\nnuestra mayor alegría anunciamos',
    ceremony: {
      label: 'CEREMONIA RELIGIOSA',
      venueName: 'Catedral Metropolitana Nuestra Señora de La Paz',
      timeLabel: 'A LAS 11:30',
      isoDateTime: '2026-11-21T11:30:00',
      durationMinutes: 60,
    },
    reception: {
      label: 'RECEPCIÓN',
      venueName: 'Golden Prime II',
      address: 'Av. Bolivia entre calles 4 y 5, N°20, Zona Santiago II, El Alto',
      timeLabel: 'A LAS 16:00',
      isoDateTime: '2026-11-21T16:00:00',
      durationMinutes: 240,
    },
    /* Detalle dentro de la tarjeta de recepción. */
    receptionCard: {
      title: 'INFO DE LA RECEPCIÓN',
      intro: 'La recepción se llevará a cabo a las:',
      welcomeLabel: 'Bienvenida',
      welcomeTime: '20:30',
      entranceLabel: 'Entrada de los novios',
      entranceTime: '22:30',
      countdownLabel: 'Cuenta Regresiva',
      //calendarLinkLabel: 'Añadir al Calendario',
      rsvpLabel: 'CONFIRMAR ASISTENCIA',
    },
    /* Cronología desplegada (iconos opcionales). */
    timeline: [
      { time: '11:30', label: 'Ceremonia religiosa', icon: 'church' },
      { time: '16:30', label: 'Cóctel de bienvenida', icon: 'toast' },
      { time: '20:00', label: 'Cena', icon: 'dinner' },
      { time: '21:30', label: 'Torta', icon: 'dance' },
    ] satisfies ScheduleItem[],
  },

  /* ── GRUPOS MUSICALES (la fiesta en vivo) ────────────────────────────── */
  /** Se muestra justo después del programa del día. Cada grupo admite
      video (con póster) y/o fotografía; deja `video: null / photo: null`
      —o los objetos fuera— para omitirlos. */
  musicGroups: {
    title: 'Grupos Musicales',
    /** Frase introductoria (vacío = se omite). */
    intro: 'La recepción se vivirá al ritmo de:',
    groups: [
      {
        name: 'Jean Paul',
        detail: 'Y Pasion Prohibida',
        video: { src: '/video/grupo.mp4' },
      },
      {
        name: 'Alma Andes',
        detail: '',
        photo: { src: '/images/alma.jpg', alt: 'El segundo grupo musical en escena' },
      },
    ] satisfies MusicGroup[],
  },

  /* ── PORTADA (HERO) ──────────────────────────────────────────────────── */
  hero: {
    kicker: 'Nuestra Boda',
    /** El sobre digital se abre desde aquí. */
    opening: {
      title: 'Les invitamos cordialmente',
      button: 'Abrir',
    },
    /** Dos fotografías verticales que "sobresalen" del sobre. */
    photos: [
      { src: '/images/15.jpg', alt: 'Margot y Alejandro frente a la laguna', position: 'center 45%' },
      { src: '/images/9.jpg', alt: 'Abrazo bajo la pérgola de madera', position: 'center 38%' },
    ],
  },

  /* ── GALERÍA (carrusel 3D) ───────────────────────────────────────────── */
  gallery: {
    title: 'Galería de Fotos',
    images: [
      { src: '/images/15.jpg', alt: 'Juntos frente a la laguna' },
      { src: '/images/9.jpg', alt: 'Abrazo bajo la pérgola' },
      { src: '/images/11.jpg', alt: 'Bailando en el parque' },
      { src: '/images/4.jpg', alt: 'El anillo de compromiso' },
      { src: '/images/15.jpg', alt: 'Un día inolvidable' },
      { src: '/images/9.jpg', alt: 'Sonrisas compartidas' },
    ] satisfies GalleryImage[],
  },

  /* ── CÓDIGO DE VESTIMENTA ────────────────────────────────────────────── */
  dressCode: {
    title: 'Dress Code',
    subtitle: 'Vestimenta para la fiesta',
    /** Nota opcional (vacío para omitir). */
    note: 'Te pedimos evitar tonos blanco y marfil, reservados para la novia.',
    /** Paleta de colores sugerida (círculos mostrados). */
    palette: [
      { name: 'Marrón table', hex: '#71513D' },
      { name: 'Café suave', hex: '#997965' },
      { name: 'Marfil cálido', hex: '#FFF1DD' },
    ],
  },

  /* ── LUGAR DE LA RECEPCIÓN (MAPA) ────────────────────────────────────── */
  venue: {
    title: 'Lugar de la Recepción',
    addressLines: 'Golden Prime II\nSantiago II, El Alto',
    /** Texto libre para Google Maps (mapa embebido + botón "Cómo llegar"). */
    mapsQuery: 'Avenida Bolivia 20, Santiago II, El Alto, Bolivia',
    directionsLabel: 'Cómo llegar',
  },

  /* ── LIBRO DE VISITAS ────────────────────────────────────────────────── */
  guestbook: {
    title: 'Libro de Visitas',
    nameLabel: 'Ingresa tu nombre*',
    messageLabel: 'Escribe tus deseos*',
    submitLabel: 'ENVIAR DESEOS',
    /** Mensajes de ejemplo (demo) que aparecen hasta que existan mensajes reales. */
    seedMessages: [
      { name: 'Las tías de Cochabamba', message: 'Abundante pan, risas y abrazos largos para su nuevo hogar.' },
      { name: 'Papá Manuel', message: 'Orgulloso de ustedes. Que el camino que hoy empiezan sea de luz.' },
      { name: 'Andrea y Martín', message: 'Gracias por invitarnos a celebrar su felicidad. ¡Salud!' },
      { name: 'Los primos de Tarija', message: 'Brindamos por esa misma chispa en cada aniversario.' },
      { name: 'Camila', message: 'Que la vida les devuelva multiplicado todo lo que ustedes regalan.' },
      { name: 'Equipo de fútbol del barrio', message: 'Hoy la cancha es suya. ¡Que vivan los novios!' },
    ],
  },

  /* ── CAJA DE REGALOS ─────────────────────────────────────────────────── */
  gifts: {
    title: 'Caja de Regalos',
    hint: 'Toca para abrir',
    modalTitle: 'Caja de Regalos',
    methods: [
      {
        label: 'Novio · Cuenta bancaria',
        holder: 'Alejandro Fuentes',
        detailLines: ['Cuenta: 10000012345678', 'Banco de demostración (reemplazar)'],
        note: 'Puedes transferir desde la app de tu banco a la cuenta indicada.',
      },
      {
        label: 'Novia · Código QR',
        holder: 'Margot Ríos',
        detailLines: ['Alias: margot.boda.demo', 'Banco de demostración (reemplazar)'],
        note: 'Escanea el código con tu app bancaria o usa el alias.',
        /* qrImage: '/images/qr-novia.png' — coloca tu QR real en /public/images. */
      },
    ] as GiftMethod[],
    /**
     * Nota de cierre de la invitación (pie de página).
     */
    footnote: 'Su presencia será el mejor regalo que podríamos recibir.',
  },

  /* ── MÚSICA AMBIENTAL ────────────────────────────────────────────────── */
  music: {
    /**
     * Canción configurada por los novios.
     * ⚠️ Si es una canción comercial, asegúrate de tener autorización
     * para reproducirla, o sustitúyela por una versión propia/licenciada.
     */
    src: '/audio/disparo-al-corazon.mp3',
    title: 'Disparo al Corazón',
    artist: 'Ricky Martin',
    /** Volumen entre 0 y 1. */
    volume: 0.45,
  },

  /* ── CONFIRMACIÓN DE ASISTENCIA (RSVP) ───────────────────────────────── */
  rsvp: {
    title: 'Confirmar asistencia',
    intro: 'Por favor confirma tu asistencia. Tu presencia es lo que hace inolvidable este día.',
    /** ¿Se permiten acompañantes? */
    guestsAllowed: true,
    /** Fecha límite ISO opcional, p. ej. "2026-11-05T23:59:59". Null = sin límite. */
    deadlineISO: null as string | null,
    /** Número de WhatsApp de los novios (con código de país, solo dígitos). DEMO. */
    whatsappPhone: '59170000000',
    /** Endpoint opcional para guardar confirmaciones. Si se define, se usa POST. */
    endpoint: import.meta.env.VITE_RSVP_ENDPOINT ?? '',
  },
} as const

export type Wedding = typeof wedding
