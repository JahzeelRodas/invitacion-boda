/* ════════════════════════════════════════════════════════════════════════════
   CONFIGURACIÓN DE LA INVITACIÓN — DISEÑO B ("MODELO ELEGANTE 2026")
   ────────────────────────────────────────────────────────────────────────────
   ⚠️  CONTENIDO DE EJEMPLO (DEMO)

   Igual que en el diseño A, toda la invitación se maneja desde este único
   archivo. Recorre pág. a pág. en orden vertical como en el original:

     1  Hero (foto en arco + nombres + fecha)      b.hero
     2  Mensaje de bienvenida (banda ondulada)     b.message
     3  Fecha + cuenta regresiva + agendado        b.date / b.countdown
     4  "¡Hemos reservado!" pases                  b.pases
     5  Bendición + padres                         b.family.parents
     6  Nuestros padrinos (religión / civil)       b.family.godparents
     7  Frase sobre foto + Ubicación               b.quote
     8  Ceremonia religiosa                        b.locations.ceremony
     9  Recepción social                           b.locations.reception
     10 Código de vestimenta                       b.dressCode
     11 Itinerario (línea vertical con iconos)     b.itinerary
     12 Sugerencia de regalos (sobres + QR)        b.gifts
     13 Solo adultos                               b.adults
     14 Subir fotos                                b.photos
     15 Confirmación de asistencia                 b.rsvp
     16 Álbum de fotos + collage                   b.album
     17 Pie de página                              b.footer
   ────────────────────────────────────────────────────────────────────────── */

export interface BLocation {
  /** Hora destacada a la izquierda del panel. */
  time: string
  /** Nombre del lugar (negrita) y dirección (regular). */
  venueName: string
  addressLines: string[]
  /** Enlace "Ver ubicación" (Google Maps). Vacío ⇒ botón apunta a maps genérico. */
  mapsUrl?: string
  /** Foto en marco de arco. */
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
}

export const designB = {
  isDemoContent: true,

  /* ── 1 · HERO ─────────────────────────────────────────────────────────── */
  hero: {
    /* Nombres tal como aparecen sobre la foto (soportan "&" o "y"). */
    namesLine: 'Alejandro & Margot',
    /** Monograma (se usa en el círculo de confirmación). */
    monogram: 'AyM',
    /** Fecha corta grande bajo los nombres. */
    dateShort: '21 . 11 . 26',
    /** Foto de fondo del arco (vertical, la cara queda arriba). */
    photo: '/images/principal.jpg',
    photoAlt: 'Los novios junto a la puerta azul',
  },

  /* ── 2 · MENSAJE ──────────────────────────────────────────────────────── */
  message:
    'Nos haría Felices contar con su presencia en este día tan importante, donde juntos celebramos el inicio de nuestra historia como esposos y compartiremos momentos que quedarán para siempre en nuestros corazones.',

  /* ── 3 · CANCIÓN ──────────────────────────────────────────────────────── */
song: {
  hint: 'Presiona el[]para escuchar nuestra canción',
  src: '/audio/disparo-al-corazon.mp3',
  audioSrc: '/audio/disparo-al-corazon.mp3',
},

  /* ── 4 · FECHA / CUENTA REGRESIVA / AGENDA ────────────────────────────── */
  date: {
    /** Fecha larga blanca sobre la foto. */
    longLine: 'Sábado, 21 de noviembre de 2026',
    short: '¡NOS CASAMOS!',
    /** Zona horaria del evento (Bolivia: America/La_Paz, UTC-4). */
    timeZone: 'America/La_Paz',
    /** Instante del evento en formato local. Se usa para la cuenta regresiva. */
    startLocal: '2026-11-21T11:30:00',
    labels: {
      before: 'Solo faltan…',
      days: 'Días',
      hours: 'Horas',
      minutes: 'Min.',
      seconds: 'Seg.',
    },
    /** Enlaces para añadir al calendario (iguales a los del original). */
    gcalUrls: [
      'https://calendar.app.google/xvUMzXYbACtGHo9a6',
      'https://calendar.app.google/CzMZgbgY5ekUPrYF7',
    ],
    //calendarLabel: 'Agendar en el calendario',
    countdownPhoto: '/images/9.jpg',
    photoAlt: 'Los novios entre ruinas de piedra',
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
        names: ['Orlando Molina Peréz', 'Julieta Marlón Hinojosa'],
        icon: 'church' as const,
      },
      {
        label: 'Padrinos de civil',
        names: ['Hector Martinez Vasco', 'Damaris Pilco Llusco'],
        icon: 'rings' as const,
      },
    ],
  },

  /* ── 7 · FRASE SOBRE FOTO ─────────────────────────────────────────────── */
  quote: {
    text: '“Entre cada risa, cada lágrima y cada abrazo, fuimos tejiendo nuestra historia, marcada por el amor y complicidad. Hoy, todo lo vivido nos ha llevado a este momento, donde nuestros corazones se entrelazan para escribir juntos el resto de nuestra historia.”',
    photo: '/images/15.jpg',
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
        'https://www.google.com/maps/place/Iglesia+de+la+Recoleta/@-17.3779533,-66.154731,730m/data=!3m2!1e3!4b1!4m6!3m5!1s0x93e3741aeab460b5:0x335b0c40ea737764!8m2!3d-17.3779533!4d-66.1521561!16s%2Fg%2F1tdkc4kd?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D',
      image: '/images/11.jpg',
      imageAlt: 'Fachada de la parroquia',
    },
    reception: {
      title: 'Recepción Social',
      time: '16:30 Hrs.',
      venueName: 'Salon de Eventos Golden Prime II',
      addressLines: ['Av. Bolivia entre calles 4 y 5, N°20 ', 'Zona Santiago II'],
      mapsUrl: 'https://maps.app.goo.gl/CoC2H4FGx12XPbRN8',
      image: '/images/9.jpg',
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
    { time: '16:30 Hrs.', label: 'Recepción\nSocial', icon: 'runway' },
    { time: '20:00 Hrs.', label: 'Cena', icon: 'dinner' },
    { time: '21:00 Hrs.', label: 'Torta', icon: 'dance' },
  ] as BItineraryItem[],
},

  /* ── 11b · GRUPOS MUSICALES (van justo tras el itinerario) ───────────── */
  /** Un grupo puede traer video (con póster) y/o fotografía; deja
      `video: null` o `photo: null` para omitir el material. */
  musicGroups: {
    title: 'Grupos musicales',
    intro: 'La recepción se vivirá al ritmo de:',
    groups: [
      {
        name: 'Jean Paul',
        detail: 'Y PASION PROHIBIDA',
        video: { src: '/video/grupo.mp4' }, //, poster: '/images/9.jpg'
        photo: null,
      },
      {
        name: 'Alma Andes',
        detail: '',
        video: null,
        photo: { src: '/images/alma.jpg', alt: 'El segundo grupo musical en escena' },
      },
    ],
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
      /** Imagen real del QR del usuario. Vacío ⇒ QR demo dibujado en SVG. */
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
    /** enlace del gestor de fotos del evento (weduploader u otro). */
    link: 'https://weduploader.com/upload/E8rZ4Pdtp1GSSe1V',
  },

  /* ── 15 · CONFIRMACIÓN ────────────────────────────────────────────────── */
  rsvp: {
    title: 'Confirmación de\nAsistencia',
    hint: 'Presiona el círculo para confirmar',
    //deadline: 'Apreciaríamos mucho su confirmación antes del 15 de octubre.',
    doubtTitle: '¿Tienes alguna duda?',
    writeLabel: 'Escríbenos',
    /** El círculo abre el formulario de confirmación. */
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSettPUUB6qLpsdD6KQ_9IdTaNqDXSfKDm-ZQj4_w7E0-z43mQ/viewform?usp=dialog',
    /** Botones de WhatsApp por invitado (grito personalizado por link). */
    guests: [
      { name: '¡Hola Alejandro!', href: 'https://wa.link/1p3ozl' },
      { name: '¡Hola Margot!', href: 'https://wa.link/ixg03e' },
    ],
    background: '/images/11.jpg',
    photoAlt: 'Los novios frente a la piedra tallada',
  },

  /* ── 16 · ÁLBUM + COLLAGE ─────────────────────────────────────────────── */
  album: {
    title: 'Álbum de Fotos',
    /** Fotos del carrusel-polaroid (máximo libre). */
    photos: ['/images/15.jpg', '/images/4.jpg', '/images/9.jpg', '/images/11.jpg'],
    collage: [
      { src: '/images/11.jpg', alt: 'Collage 1' },
      { src: '/images/4.jpg', alt: 'Collage 2' },
      { src: '/images/15.jpg', alt: 'Collage 3' },
      { src: '/images/9.jpg', alt: 'Collage 4' },
      { src: '/images/15.jpg', alt: 'Collage 5' },
      { src: '/images/11.jpg', alt: 'Collage 6' },
    ],
  },

  /* ── 17 · PIE ─────────────────────────────────────────────────────────── */
  footer: {
    /** Línea frontal encima del sello (opcional). */
    headline: '¿Te gustaría una invitación para tu evento?',
    contactLabel: 'Contáctanos',
    contactHref: 'https://wa.link/gvhorg',
    brandName: 'Tu Estudio',
    brandLine: 'Invitaciones digitales',
  },
}

export type DesignBConfig = typeof designB
