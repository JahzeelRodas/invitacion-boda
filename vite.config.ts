import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Si la invitación se publicará en un subdirectorio (p. ej. https://dominio.com/boda/),
// ajusta `base` a ese subdirectorio antes de compilar.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    cssMinify: true,
  },
})
