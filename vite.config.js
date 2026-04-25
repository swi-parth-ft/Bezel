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
        'guides/create-localization-ready-app-screenshot-template': resolve(__dirname, 'guides/create-localization-ready-app-screenshot-template.html'),
        'guides/create-iphone-mockup-variants-from-one-template': resolve(__dirname, 'guides/create-iphone-mockup-variants-from-one-template.html'),
        'guides/review-localized-app-store-screenshot-captions': resolve(__dirname, 'guides/review-localized-app-store-screenshot-captions.html'),
        'guides/create-localized-app-preview-video-variants': resolve(__dirname, 'guides/create-localized-app-preview-video-variants.html'),
        'guides/export-app-store-localization-delivery-pack': resolve(__dirname, 'guides/export-app-store-localization-delivery-pack.html'),
        'guides/use-bezel-ai-to-refine-a-canvas': resolve(__dirname, 'guides/use-bezel-ai-to-refine-a-canvas.html'),
        'guides/rewrite-app-store-screenshot-captions-with-bezel-ai': resolve(__dirname, 'guides/rewrite-app-store-screenshot-captions-with-bezel-ai.html'),
        'guides/adjust-app-screenshot-backgrounds-with-bezel-ai': resolve(__dirname, 'guides/adjust-app-screenshot-backgrounds-with-bezel-ai.html'),
        'guides/prepare-shortcut-ready-mockup-presets': resolve(__dirname, 'guides/prepare-shortcut-ready-mockup-presets.html'),
        'guides/reuse-layouts-across-projects': resolve(__dirname, 'guides/reuse-layouts-across-projects.html'),
        'guides/create-multi-device-promo-visuals': resolve(__dirname, 'guides/create-multi-device-promo-visuals.html'),
        'guides/review-app-store-screenshot-set-before-export': resolve(__dirname, 'guides/review-app-store-screenshot-set-before-export.html'),
        'guides/build-app-store-release-asset-kit': resolve(__dirname, 'guides/build-app-store-release-asset-kit.html'),
        'guides/style-app-store-captions': resolve(__dirname, 'guides/style-app-store-captions.html'),
        'guides/use-layers-and-3-axis-transforms': resolve(__dirname, 'guides/use-layers-and-3-axis-transforms.html'),
        'guides/create-sticker-assets-background-removal': resolve(__dirname, 'guides/create-sticker-assets-background-removal.html'),
        'guides/draw-callouts-with-pencilkit': resolve(__dirname, 'guides/draw-callouts-with-pencilkit.html'),
        'guides/export-stills-and-videos': resolve(__dirname, 'guides/export-stills-and-videos.html'),
        'guides/localize-screenshot-sets-apple-translate': resolve(__dirname, 'guides/localize-screenshot-sets-apple-translate.html'),
        'guides/create-app-store-preview-visuals-canvas-motion': resolve(__dirname, 'guides/create-app-store-preview-visuals-canvas-motion.html'),
        'guides/make-instant-mockups-with-shortcuts': resolve(__dirname, 'guides/make-instant-mockups-with-shortcuts.html'),
        'guides/clean-status-bars-in-device-frames': resolve(__dirname, 'guides/clean-status-bars-in-device-frames.html'),
        'guides/add-frame-reflections-to-device-mockups': resolve(__dirname, 'guides/add-frame-reflections-to-device-mockups.html'),
        'features/device-frames': resolve(__dirname, 'features/device-frames.html'),
        'features/clean-status-bar': resolve(__dirname, 'features/clean-status-bar.html'),
        'features/frame-reflections': resolve(__dirname, 'features/frame-reflections.html'),
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
