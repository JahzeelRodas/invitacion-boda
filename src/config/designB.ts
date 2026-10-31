/* ════════════════════════════════════════════════════════════════════════════
   CONFIGURACIÓN DE LA INVITACIÓN — DISEÑO B ("MODELO ELEGANTE 2026")
   ──────────────────────────────────────────────────────────────────────────── */

export interface BLocation {
  time: string
  venueName: string
  addressLines: string[]
  mapsUrl?: string
  image: string
  imageAlt: string
}

export interface BItineraryItem {
  time: string
  label: string
  icon:
    | 'church'
    | 'runway'
    | 'dance'
    | 'dinner'
    | 'glasses'
    | 'bouquet'
    | 'cake'
    | 'couple'
}

export interface BMusicGroup {
  name: string
  detail?: string
  video?: {
    src: string
    poster?: string
  } | null
  photo?: {
    src: string
    alt: string
  } | null
}

export const designB = {
  isDemoContent: false,

  /* ── 1 · HERO ─────────────────────────────────────────────────────────── */
  hero: {
    namesLine: 'Alejandro & Margot',
    monogram: 'AyM',
    dateShort: '21 . 11 . 26',
    photo: '/images/inicio.jpg',
    photoAlt: 'Los novios junto a la puerta azul',
  },

  /* ── 2 · MENSAJE ──────────────────────────────────────────────────────── */
  message:
    'Nos haría Felices contar con su presencia en este día tan importante, donde juntos celebramos el inicio de nuestra historia como esposos y compartiremos momentos que quedarán para siempre en nuestros corazones.',

  /* ── 3 · CANCIÓN ──────────────────────────────────────────────────────── */
  song: {
    hint: 'Presiona el botón para escuchar nuestra canción',
    src: '/audio/disparo-al-corazon.mp3',
    audioSrc: '/audio/disparo-al-corazon.mp3',
  },

  /* ── 4 · FECHA / CUENTA REGRESIVA / AGENDA ────────────────────────────── */
  date: {
    longLine: 'Sábado, 21 de noviembre de 2026',
    short: '¡NOS CASAMOS!',
    timeZone: 'America/La_Paz',
    startLocal: '2026-11-21T11:30:00',
    labels: {
      before: 'Solo faltan…',
      days: 'Días',
      hours: 'Horas',
      minutes: 'Min.',
      seconds: 'Seg.',
    },
    gcalUrls: [
      'https://calendar.app.google/xvUMzXYbACtGHo9a6',
      'https://calendar.app.google/CzMZgbgY5ekUPrYF7',
    ],
    countdownPhoto: '/images/principal.jpg',
    photoAlt: 'Los novios entre ruinas de piedra',
    //calendarLabel: 'Añadir al Calendario',
  },

  /* ── 4b · CALENDARIO DEL MES ─────────────────────────────────────────── */
  /** Rejilla del mes del enlace; el día destacado se toma de date.day
      (21) y se marca con un corazón. */
  calendar: {
    title: '¿Nuestra Fecha Especial?',
    /** Año, mes (1 = enero … 12 = diciembre) y día del enlace destacado. */
    year: 2026,
    monthName: 'Noviembre',
    month: 11,
    day: 21,
    /** Color del corazón que marca la fecha. */
    heart: '#24333E',
    note: 'Aparta este día en tu calendario. ¡Te esperamos!',
  },

  /* ── 5 · PASES ────────────────────────────────────────────────────────── */
  pases: {
    title: '¡Hemos reservado!',
    amount: '2',
    label: 'Pases para ti',
  },

  /* ── 6 · FAMILIA ──────────────────────────────────────────────────────── */
  family: {
    blessingTitle: 'Con la bendición de Dios y nuestros padres',
    parents: {
      groomLabel: 'Padres del novio',
      groomNames: ['Cruz José Catari Mamani', 'Avigaid Quilo de Catari'],
      brideLabel: 'Padres de la novia',
      brideNames: ['Natalio Huchani Choque', 'Francisca Tinta de Huchani'],
    },
    godparentsTitle: 'Nuestros padrinos',
    godparents: [
      {
        label: 'Padrinos de religión',
        names: ['Dr. Benjamin Hugo Bolivar Morales', 'Dra. Janet Nieves Pablo de Bolivar'],
        icon: 'church' as const,
      },
      
    ],
  },

  /* ── 7 · FRASE SOBRE FOTO ─────────────────────────────────────────────── */
  quote: {
    text: '“Entre cada risa, cada lágrima y cada abrazo, fuimos tejiendo nuestra historia, marcada por el amor y complicidad. Hoy, todo lo vivido nos ha llevado a este momento, donde nuestros corazones se entrelazan para escribir juntos el resto de nuestra historia.”',
    photo: '/images/9.jpg',
    photoAlt: 'Los novios mirando el valle',
  },

  /* ── 8/9 · UBICACIONES ────────────────────────────────────────────────── */
  locations: {
    sectionTitle: 'Ubicación',
    ceremony: {
      title: 'Ceremonia Religiosa',
      time: '11:30 Hrs.',
      venueName: 'Catedral Metropolitana "Nuestra Señora de La Paz"',
      addressLines: ['Plaza Murillo'],
      mapsUrl:
        'https://maps.app.goo.gl/umzpXg2Akg1d6tFd6',
      image: '/images/11.jpg',
      imageAlt: 'Fachada de la parroquia',
    },
    reception: {
      title: 'Recepción Social',
      time: '16:30 Hrs.',
      venueName: 'Salon de Eventos Golden Prime II',
      addressLines: ['Av. Bolivia entre calles 4 y 5, N°20 ', 'Zona Santiago II'],
      mapsUrl: 'https://maps.app.goo.gl/KJc7Ghd4V89znymS6',
      image: '/images/18.jpg',
      imageAlt: 'Salón de eventos con pasillo rojo',
    },
  },

  /* ── 10 · CÓDIGO DE VESTIMENTA ────────────────────────────────────────── */
  dressCode: {
    title: 'Código de Vestimenta',
    label: 'Formal',
    note: '(El color blanco está reservado para la novia)',
  },

  /* ── 11 · ITINERARIO ──────────────────────────────────────────────────── */
  itinerary: {
    title: 'Itinerario',
    background: '#24333E',
    photoAlt: 'Los novios bailando',
    items: [
      { time: '11:30 Hrs.', label: 'Ceremonia\nReligiosa', icon: 'church' },
      { time: '16:00 Hrs.', label: 'Recepción\nSocial', icon: 'runway' },
      { time: '20:00 Hrs.', label: 'Cena', icon: 'dinner' },
      { time: '21:30 Hrs.', label: 'Torta', icon: 'cake' },
      { time: '22:00 Hrs.', label: 'Fiesta', icon: 'dance' },
      { time: '22:50 Hrs.', label: 'Despedida\nde\nlos\nnovios', icon: 'couple' },
    ] as BItineraryItem[],
  },

  /* ── 11b · GRUPOS MUSICALES ───────────────────────────────────────────── */
  musicGroups: {
    title: 'Grupos musicales',
    intro: 'La recepción se vivirá al ritmo de:',
    groups: [
      {
        name: 'Jean Paul',
        detail: 'Y PASION PROHIBIDA',
        video: { src: '/video/grupo.mp4', poster: '/images/jeanpaul.jpg' },
        photo: null,
      },
      {
        name: 'Alma Andes',
        detail: '',
        video: null,
        photo: { src: '/images/alma.jpg', alt: 'El segundo grupo musical en escena' },
      },
    ] as BMusicGroup[],
  },

  /* ── 12 · REGALOS ─────────────────────────────────────────────────────── */
  gifts: {
    sectionTitle: 'Sugerencia de\nRegalos',
    intro:
      'Su presencia es nuestro mayor regalo, sin embargo si gustan ser parte de esta nueva aventura juntos, pueden hacerlo a través de algunas de\nlas siguientes opciones:',
    photo: '/images/11.jpg',
    photoAlt: 'Calle iluminada con faroles',
    envelopes: {
      title: 'Lluvia de sobres',
      text: '“La lluvia de sobres, es la tradición de regalar dinero en efectivo en un sobre el día del evento”',
    },
    transfer: {
      title: 'Transferencia',
      text: 'Para tu comodidad hemos creado un código Qr. para recibir los regalos.',
      qrImage: '',
    },
  },

  /* ── 13 · SOLO ADULTOS ────────────────────────────────────────────────── */
  adults: {
    title: 'SOLO ADULTOS',
    note: 'Amamos a los pequeños, pero deseamos una celebración solo para adultos. ¡Gracias por su comprensión!',
  },

  /* ── 14 · SUBIR FOTOS ─────────────────────────────────────────────────── */
  photos: {
    title: 'Subir Fotos',
    note: 'Presiona el botón para subir o enviarnos las fotos cuando creas que es el mejor momento de la boda.',
    buttonLabel: 'Tomar foto',
    link: 'https://weduploader.com/upload/E8rZ4Pdtp1GSSe1V',
  },

  /* ── 15 · CONFIRMACIÓN ────────────────────────────────────────────────── */
  rsvp: {
    title: 'Confirmación de\nAsistencia',
    hint: 'Presiona el círculo para confirmar',
    doubtTitle: '¿Tienes alguna duda?',
    writeLabel: 'Escríbenos',
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSettPUUB6qLpsdD6KQ_9IdTaNqDXSfKDm-ZQj4_w7E0-z43mQ/viewform?usp=dialog',
    guests: [
      { name: '¡Hola Alejandro!', href: 'https://wa.link/1p3ozl' },
      { name: '¡Hola Margot!', href: 'https://wa.link/ixg03e' },
    ],
    background: '/images/4.jpg',
    photoAlt: 'Los novios frente a la piedra tallada',
    deadline: 'Confirmar hasta el 10 de noviembre de 2026',
  },

  /* ── 16 · ÁLBUM + COLLAGE ─────────────────────────────────────────────── */
  album: {
    title: 'Álbum de Fotos',
    photos: ['/images/15.jpg', '/images/4.jpg', '/images/9.jpg', '/images/11.jpg'],
    collage: [
      { src: '/images/inicio.jpg', alt: 'Collage 1' },
      { src: '/images/principal.jpg', alt: 'Collage 2' },
      { src: '/images/11.jpg', alt: 'Collage 3' },
      { src: '/images/9.jpg', alt: 'Collage 4' },
      { src: '/images/18.jpg', alt: 'Collage 5' },
      { src: '/images/8.jpg', alt: 'Collage 6' },
      { src: '/images/15.jpg', alt: 'Collage 5' },
      { src: '/images/19.jpg', alt: 'Collage 6' },
      { src: '/images/5.jpg', alt: 'Collage 5' },
      { src: '/images/20.jpg', alt: 'Collage 6' },
      { src: '/images/4.jpg', alt: 'Collage 5' },
      { src: '/images/21.jpg', alt: 'Collage 6' },
    ],
  },

  /* ── 17 · PIE ─────────────────────────────────────────────────────────── */
  footer: {
    headline: '¿Te gustaría una invitación para tu evento?',
    contactLabel: 'Contáctanos',
    contactHref: 'https://wa.link/gvhorg',
    brandName: 'Rovelbots',
    brandLine: 'Invitaciones digitales',
  },
}

export type DesignBConfig = typeof designB