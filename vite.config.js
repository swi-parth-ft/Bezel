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
        404: resolve(__dirname, '404.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        'guides/index': resolve(__dirname, 'guides/index.html'),
        'guides/create-first-app-store-screenshot-project': resolve(__dirname, 'guides/create-first-app-store-screenshot-project.html'),
        'guides/make-clean-iphone-mockup': resolve(__dirname, 'guides/make-clean-iphone-mockup.html'),
        'guides/build-full-app-store-screenshot-set': resolve(__dirname, 'guides/build-full-app-store-screenshot-set.html'),
        'guides/create-reusable-app-screenshot-templates': resolve(__dirname, 'guides/create-reusable-app-screenshot-templates.html'),
        'guides/style-app-store-captions': resolve(__dirname, 'guides/style-app-store-captions.html'),
        'guides/use-layers-and-3-axis-transforms': resolve(__dirname, 'guides/use-layers-and-3-axis-transforms.html'),
        'guides/create-sticker-assets-background-removal': resolve(__dirname, 'guides/create-sticker-assets-background-removal.html'),
        'guides/draw-callouts-with-pencilkit': resolve(__dirname, 'guides/draw-callouts-with-pencilkit.html'),
        'guides/export-stills-and-videos': resolve(__dirname, 'guides/export-stills-and-videos.html'),
        'guides/localize-screenshot-sets-apple-translate': resolve(__dirname, 'guides/localize-screenshot-sets-apple-translate.html'),
        'guides/create-app-store-preview-visuals-canvas-motion': resolve(__dirname, 'guides/create-app-store-preview-visuals-canvas-motion.html'),
        'guides/make-instant-mockups-with-shortcuts': resolve(__dirname, 'guides/make-instant-mockups-with-shortcuts.html'),
        'features/device-frames': resolve(__dirname, 'features/device-frames.html'),
        'features/canvas-styling': resolve(__dirname, 'features/canvas-styling.html'),
        'features/canvas-motion': resolve(__dirname, 'features/canvas-motion.html'),
        'features/transforms-3-axis': resolve(__dirname, 'features/transforms-3-axis.html'),
        'features/copy-paste-projects': resolve(__dirname, 'features/copy-paste-projects.html'),
        'features/undo-redo': resolve(__dirname, 'features/undo-redo.html'),
        'features/bezel-ai-shortcuts': resolve(__dirname, 'features/bezel-ai-shortcuts.html'),
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
