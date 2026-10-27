# Invitación Digital de Matrimonio — Luxury Editorial Wedding

Invitación web de una sola página con experiencia narrativa: sobre digital con sello de lacre, portada cinematográfica, historia de la pareja, galería editorial, cuenta regresiva, información del evento, código de vestimenta, video del grupo musical, confirmación de asistencia (RSVP) y cierre emocional.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide React

---

## 1. Puesta en marcha

```bash
npm install
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run build      # compilación de producción → carpeta dist/
npm run preview    # sirve dist/ localmente para verificarla
npm run typecheck  # verificación de TypeScript sin compilar
```

Requisitos: Node.js 18 o superior.

---

## 2. ⚠️ Estado del contenido

Los datos principales ya están configurados (nombres, fecha, lugares, fotografías, canción y video). Mientras `isDemoContent` esté en `true` (y salvo que se indique "texto de ejemplo"), la página muestra un aviso discreto al pie indicando que aún hay contenido de ejemplo pendiente.

**Pendiente de completar:** textos de la historia, nombre del grupo musical, número de WhatsApp real y poster del video.

## 3. Personalización — todo vive en un solo archivo

Edita **`src/config/wedding.ts`**. No es necesario tocar ningún componente.

### 3.1 Nombres e iniciales

```ts
couple: {
  brideName: 'Valentina',        // nombre de la novia (pantallas y textos)
  brideFullName: '...',          // nombre completo (reservado para usos futuros)
  groomName: 'Sebastián',
  groomFullName: '...',
  initials: 'V·S',               // sello de lacre
  monogram: 'V & S',             // monograma caligráfico
  hashtag: '',                   // opcional
}
```

### 3.2 Fecha, hora y zona horaria

```ts
date: {
  isoDateTime: '2026-12-05T17:30:00',  // hora LOCAL del evento, sin sufijo de zona
  timeZone: 'America/Santiago',        // zona horaria IANA del lugar
  displayLong: 'Sábado 5 de diciembre de 2026',
  displayShort: '05 · 12 · 2026',
  place: 'Santiago, Chile',
}
```

La cuenta regresiva, el calendario ICS y los textos se calculan con la zona horaria del evento (con corrección de horario de verano incluida).

### 3.3 Fotografías

Sustituye los archivos en **`public/images/`** manteniendo los mismos nombres (o cambia las rutas en la configuración):

| Archivo | Uso | Formato sugerido |
|---|---|---|
| `hero-couple.svg` | Portada | 1200×1600 (WebP/AVIF de la foto real) |
| `story-1/2/3.svg` | Nuestra historia | 900×1150 |
| `gallery-1…8.svg` | Galería (6–10 imágenes) | mezcla de verticales/horizontales |
| `band.svg` | Grupo musical | 1200×800 |
| `dress-1/2.svg` | Inspiración vestimenta | 700×900 |
| `closing.svg` | Cierre | 1200×1500 |

Recomendaciones: exporta en **WebP/AVIF**, ajusta `width`/`height` en la configuración de la galería (evitan saltos de carga) y escribe `alt` descriptivos.

### 3.4 Canción de fondo

La canción configurada es **«Disparo al Corazón» (Ricky Martin)** en `public/audio/disparo-al-corazon.mp3`:

```ts
music: {
  src: '/audio/disparo-al-corazon.mp3',
  title: 'Disparo al Corazón',
  artist: 'Ricky Martin',
  volume: 0.45,   // 0 a 1
}
```

- ⚠️ Es una **canción comercial**: asegúrate de contar con autorización para reproducirla, o sustitúyela por una versión propia o con licencia.
- Si `src` queda vacío, el reproductor no aparece. Si el archivo falla, la invitación funciona con normalidad y el reproductor lo indica discretamente.
- Para regenerar la antigua pieza de demostración (opcional): `npm run assets:audio`.

### 3.5 Ceremonia y recepción

```ts
event: {
  ceremony: {
    isoDateTime: '2026-12-05T17:30:00',
    timeLabel: '17:30 h',
    durationMinutes: 60,       // duración para el evento del calendario
    venueName: 'Parroquia…',
    address: 'Av. … 1234, Comuna, Ciudad',
    mapsQuery: 'texto exacto para Google Maps',
  },
  reception: { … },
  notes: [ '…' ],              // notas prácticas para invitados
}
```

Los botones «Ver ubicación», «Cómo llegar» y «Agregar al calendario» se generan de estos datos. El calendario descarga un `.ics` con ambos eventos.

### 3.6 Código de vestimenta

`dressCode.type`, `description`, `avoidNote` (vacío = se omite), `palette` (colores sugeridos) e `inspirationImages` (puede dejarse vacío `[]`).

### 3.7 Grupo musical y video

```ts
band: {
  name: 'Nombre del grupo',
  description: 'breve presentación',
  image: '/images/band.svg',
  youtubeVideoId: '',   // p. ej. "dQw4w9WgXcQ"
  mp4Src: '',           // o un MP4 propio en /public/video
}
```

- Con `youtubeVideoId`: se muestra la **miniatura oficial** de YouTube; el reproductor se carga solo al pulsar (sin autoplay).
- Con `mp4Src`: se usa el archivo local.
- Con ambos vacíos: se muestra el espacio de reserva con instrucciones.
- Al iniciar el video, **la música ambiental se pausa** automáticamente.

### 3.8 RSVP (confirmación de asistencia)

```ts
rsvp: {
  guestsAllowed: true,
  deadlineISO: '2026-11-05T23:59:59' | null,
  whatsappPhone: '569XXXXXXXXX',   // con código de país, solo dígitos
  endpoint: '',                    // o variable de entorno (ver abajo)
}
```

Dos modos de funcionamiento:

1. **Endpoint configurado** — variable de entorno `VITE_RSVP_ENDPOINT` (ver `.env.example`). Se hace `POST` JSON `{ name, attending, guests, message, submittedAt }`. El mensaje de éxito **solo** aparece si el servidor respondió correctamente; si falla, se muestra un error honesto y el enlace de WhatsApp.
2. **Sin endpoint (por defecto)** — el formulario abre WhatsApp con el mensaje preparado; el envío se completa en la app del invitado.

⚠️ No coloques claves ni secretos aquí: todo lo que empiece por `VITE_` queda público en el frontend.

### 3.9 Frases, historia y cierre

`phrases` (frases de la apertura, portada y cierre), `story` (titular, introducción y tres momentos), `closing`.

### 3.10 Compartir en redes (Open Graph)

Edita `index.html`:

- `og:title`, `og:description` — nombres y fecha.
- `og:image` — usa **URL absoluta** (`https://tudominio.com/og-image.png`); WhatsApp no siempre resuelve rutas relativas. Imagen 1200×630 (marcador generado con `npm run assets:og`; sustitúyelo por una foto real cuando la tengas).
- `og:url` + `link rel=canonical` — dominio final.
- El favicon (`public/favicon.svg`) y `apple-touch-icon.png` ya incluyen las iniciales; actualízalas si cambian.

---

## 4. Scripts de utilidades (opcional)

```bash
npm run assets:placeholders  # regenera las imágenes SVG de marcador
npm run assets:og            # regenera og-image.png y apple-touch-icon.png
npm run assets:audio         # regenera la pieza ambiental de demostración
```

## 5. Despliegue en Hostinger

El resultado de `npm run build` es un **sitio 100 % estático** en `dist/` (HTML, CSS, JS, imágenes, audio). No requiere base de datos ni backend. Hay dos caminos según el plan:

### Opción A — despliegue Git (planes con Node.js: hPanel → «Despliegue Git» o «Web Hosting con Node.js»)

1. Sube este repositorio a GitHub/GitLab (no se incluye `node_modules` ni secretos: ver `.gitignore`).
2. En hPanel: **Website → Git deployment** (o crear una **aplicación Node.js**).
3. Configura:
   - **Repositorio y rama de producción**: p. ej. `main`.
   - **Comando de construcción**: `npm run build`.
   - **Carpeta de salida (public)**: `dist`.
4. Si usas variables de entorno (RSVP), agrégalas en la sección de variables del despliegue: `VITE_RSVP_ENDPOINT=https://…`.
5. Cada `git push` a la rama de producción reconstruye el sitio automáticamente (verifica en tu plan si necesitas activar «auto-deploy on push»).

### Opción B — plan compartido sin despliegue Git directo

1. Ejecuta `npm run build` en tu máquina.
2. Sube **el contenido de `dist/`** a `public_html/` con FTP o el Administrador de archivos de hPanel (no subas la carpeta con su nombre, sino su contenido, para que `index.html` quede en la raíz).

### Detalles importantes

- **Dominio raíz vs. subcarpeta:** si publicarás en `dominio.com/boda/`, cambia `base: '/boda/'` en `vite.config.ts` antes de compilar.
- **URL única:** la invitación funciona en una sola ruta; no necesita reescrituras ni redirecciones SPA.
- **HTTPS:** activa el SSL gratuito de Hostinger (hPanel → SSL) y fuerza HTTPS; la música y el video funcionan igual en HTTP, pero el candado es esencial para compartir el enlace.
- **Cache:** Hostinger sirve los archivos estáticos con caché por defecto. Tras actualizar contenido, haz un *hard purge* de caché en hPanel o incrementa la versión (`?v=2`) de los recursos.

---

## 6. Notas de comportamiento

- La música inicia con el primer toque (al abrir el sobre), dentro del gesto del usuario, respetando las políticas de autoplay de iOS/Android.
- El reproductor flotante permite pausar/reanudar y silenciar; el estado persiste mientras el visitante permanece en la página.
- La apertura del sobre, las animaciones de scroll y el parallax respetan `prefers-reduced-motion`.
- El lightbox es navegable con teclado (Esc, ←, →) y las imágenes tienen texto alternativo.
- El formulario valida los campos antes de enviar y nunca simula un envío exitoso.

## 7. Estructura del proyecto

```
src/
  assets/                  (reservado; los medios editables viven en /public)
  components/
    animation/  Reveal · ParallaxImage
    audio/      MusicProvider · MusicPlayer
    gallery/    Lightbox (carga diferida)
    invitation/
    layout/     SectionHeader · ScrollProgress
  config/     wedding.ts      ← EDITA AQUÍ
  hooks/      useCountdown.ts
  sections/   InvitationOpening · Hero · OurStory · Gallery · Countdown ·
              EventDetails · DressCode · MusicBand · RSVP · Closing
  utils/      timezone.ts · ics.ts · links.ts
  App.tsx · main.tsx
public/
  images/  audio/  video/ (reservado)  favicon.svg  og-image.png
tools/     generadores de recursos de marcador
```

## 8. Licencias

- Código de la invitación: libre para el uso de los novios.
- Pieza ambiental de demostración: generada por script, sin derechos de terceros. **Sustitúyela por música propia o con licencia.**
- Tipografías: Cormorant Garamond, Inter y Great Vibes (SIL Open Font License, vía Google Fonts).
