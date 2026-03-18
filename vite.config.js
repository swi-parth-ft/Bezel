import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: true, // Listen on all local IPs
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        'features/device-frames': resolve(__dirname, 'features/device-frames.html'),
        'features/canvas-styling': resolve(__dirname, 'features/canvas-styling.html'),
        'features/typography': resolve(__dirname, 'features/typography.html'),
        'features/images-stickers': resolve(__dirname, 'features/images-stickers.html'),
        'features/draw-doodle': resolve(__dirname, 'features/draw-doodle.html'),
        'features/translation': resolve(__dirname, 'features/translation.html'),
        'features/layers-precision': resolve(__dirname, 'features/layers-precision.html'),
        'features/projects-presets': resolve(__dirname, 'features/projects-presets.html'),
        'features/export-share': resolve(__dirname, 'features/export-share.html'),
      }
    }
  }
})
