/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endpoint opcional para el envío del formulario de RSVP. */
  readonly VITE_RSVP_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.svg' {
  const src: string
  export default src
}
