# Bezel Studio Master Asset Guide

This document is the authoritative reference for the website asset library.

The production asset root is `public/assets/`.
Anything under `public/assets/source/` is retained as source, legacy, or working material and is not intended to be the primary runtime path unless explicitly wired into the site later.
The source archive has also been converted to WebP so the library remains future-usable without carrying oversized PNG exports.

## Directory Map

| Folder | Purpose |
| --- | --- |
| `public/assets/brand` | Brand identity assets used sitewide |
| `public/assets/devices/bezels` | Transparent Apple hardware bezel renders |
| `public/assets/stickers` | Sticker-style floating art used in feature cards and reserved marketing scenes |
| `public/assets/showcase/iphone` | iPhone workflow carousel assets used on the homepage |
| `public/assets/showcase/ipad` | iPad workflow carousel assets used on the homepage |
| `public/assets/power-features/iphone` | iPhone mode imagery for the Power Features section |
| `public/assets/power-features/ipad` | iPad mode imagery for the Power Features section |
| `public/assets/feature-pages` | Feature-specific hero artwork for deep-dive feature pages |
| `public/assets/feature-covers` | Reusable static cover art used by generated and hand-authored feature pages |
| `public/assets/media` | Non-image media such as video |
| `public/assets/source` | Source PNG/WebP exports, legacy naming, and documentation |

## Production Assets

### Brand

| File | Role | Current Usage |
| --- | --- | --- |
| `public/assets/brand/bezel-studio-logo.png` | Primary app/logo image | Header, footer, Apple touch icon, social metadata |
| `public/assets/brand/app-store-logo.svg` | App Store badge icon | CTA buttons on homepage and feature pages |
| `public/assets/brand/favicon.svg` | Browser favicon | Page favicon |

### Device Bezels

| File | Role | Current Usage |
| --- | --- | --- |
| `public/assets/devices/bezels/iphone.png` | Transparent iPhone bezel | Ambient hero art and device-stack scene |
| `public/assets/devices/bezels/ipad.png` | Transparent iPad bezel | Ambient hero art and device-stack scene |
| `public/assets/devices/bezels/imac.png` | Transparent iMac bezel | Ambient hero art and device-stack scene |
| `public/assets/devices/bezels/macbook.png` | Transparent MacBook bezel | Ambient hero art and device-stack scene |
| `public/assets/devices/bezels/apple-watch.png` | Transparent Apple Watch bezel | Ambient hero art and device-stack scene |

### Stickers

These are small, floating visual accents and UI-themed cutouts.

| File | Role | Current Usage |
| --- | --- | --- |
| `public/assets/stickers/typography.png` | Typography-themed sticker | Homepage feature card |
| `public/assets/stickers/translate.png` | Translation-themed sticker | Homepage feature card |
| `public/assets/stickers/draw.png` | Drawing sticker | Homepage feature card |
| `public/assets/stickers/layers.png` | Layers artwork | Homepage feature card |
| `public/assets/stickers/swift.png` | Swift sticker | Homepage sticker cluster |
| `public/assets/stickers/hello.png` | Hello sticker | Homepage sticker cluster |
| `public/assets/stickers/xcode.png` | Xcode sticker | Homepage sticker cluster |
| `public/assets/stickers/apple-park.png` | Apple Park sticker | Homepage sticker cluster |
| `public/assets/stickers/mac.png` | Mac sticker | Homepage sticker cluster |
| `public/assets/stickers/dog.png` | Dog sticker | Homepage sticker cluster |
| `public/assets/stickers/apple-intelligence.png` | Apple Intelligence sticker | Library only, not currently wired |
| `public/assets/stickers/icloud.png` | iCloud sticker | Library only, not currently wired |
| `public/assets/stickers/image-playground.png` | Image Playground sticker | Library only, not currently wired |
| `public/assets/stickers/metal.png` | Metal sticker | Library only, not currently wired |
| `public/assets/stickers/swiftui.png` | SwiftUI sticker | Library only, not currently wired |

### Homepage Showcase Carousel

These are the polished WebP assets used in the device-toggle workflow carousel on the homepage.

#### iPhone

| File | Represents |
| --- | --- |
| `public/assets/showcase/iphone/icloud-sync.webp` | iCloud Sync |
| `public/assets/showcase/iphone/custom-backgrounds.webp` | Custom backgrounds |
| `public/assets/showcase/iphone/bezel-ai.webp` | Bezel AI |
| `public/assets/showcase/iphone/canvas-management.webp` | Canvas management |
| `public/assets/showcase/iphone/image-playground.webp` | Image Playground |
| `public/assets/showcase/iphone/precision-layers.webp` | Precision layers |
| `public/assets/showcase/iphone/pro-layouts.webp` | Pro layouts |
| `public/assets/showcase/iphone/canvas-motion.webp` | Canvas motion |
| `public/assets/showcase/iphone/typography.webp` | Typography |
| `public/assets/showcase/iphone/translation.webp` | Translation |

#### iPad

| File | Represents |
| --- | --- |
| `public/assets/showcase/ipad/icloud-sync.webp` | iCloud Sync |
| `public/assets/showcase/ipad/custom-backgrounds.webp` | Custom backgrounds |
| `public/assets/showcase/ipad/bezel-ai.webp` | Bezel AI |
| `public/assets/showcase/ipad/image-playground.webp` | Image Playground |
| `public/assets/showcase/ipad/precision-layers.webp` | Precision layers |
| `public/assets/showcase/ipad/pro-layouts.webp` | Pro layouts |
| `public/assets/showcase/ipad/canvas-motion.webp` | Canvas motion |
| `public/assets/showcase/ipad/typography.webp` | Typography |
| `public/assets/showcase/ipad/translation.webp` | Translation |

Note: there is currently no separate `canvas-management` WebP in the iPad production showcase set.

### Power Features

These assets are switched at runtime based on the iPhone/iPad toggle in the homepage Power Features section.

#### iPhone

| File | Feature |
| --- | --- |
| `public/assets/power-features/iphone/canvas-motion.png` | Canvas motion |
| `public/assets/power-features/iphone/transforms-3-axis.png` | 3-axis transforms |
| `public/assets/power-features/iphone/copy-paste-projects.png` | Copy and paste across projects |
| `public/assets/power-features/iphone/undo-redo.png` | Undo and redo everywhere |
| `public/assets/power-features/iphone/glass-caption-styling.png` | Glass-backed caption styling |
| `public/assets/power-features/iphone/animated-patterns-lighting.png` | Animated patterns and lighting |
| `public/assets/power-features/iphone/bezel-ai-shortcuts.png` | BezelAI and Shortcuts |

#### iPad

| File | Feature |
| --- | --- |
| `public/assets/power-features/ipad/canvas-motion.png` | Canvas motion |
| `public/assets/power-features/ipad/transforms-3-axis.png` | 3-axis transforms |
| `public/assets/power-features/ipad/copy-paste-projects.png` | Copy and paste across projects |
| `public/assets/power-features/ipad/undo-redo.png` | Undo and redo everywhere |
| `public/assets/power-features/ipad/glass-caption-styling.png` | Glass-backed caption styling |
| `public/assets/power-features/ipad/animated-patterns-lighting.png` | Animated patterns and lighting |
| `public/assets/power-features/ipad/bezel-ai-shortcuts.png` | BezelAI and Shortcuts |

### Feature Page Hero Art

These are the feature-specific image assets used by deep-dive pages.

| File | Page |
| --- | --- |
| `public/assets/feature-pages/canvas-motion.png` | `features/canvas-motion.html` |
| `public/assets/feature-pages/transforms-3-axis.png` | `features/transforms-3-axis.html` |
| `public/assets/feature-pages/copy-paste-projects.png` | `features/copy-paste-projects.html` |
| `public/assets/feature-pages/undo-redo.png` | `features/undo-redo.html` |
| `public/assets/feature-pages/bezel-ai-shortcuts.png` | `features/bezel-ai-shortcuts.html` |

### Feature Covers

These are broader promotional cover images used by generated or semi-generated feature pages.

| File | Page |
| --- | --- |
| `public/assets/feature-covers/device-frames.webp` | `features/device-frames.html` |
| `public/assets/feature-covers/canvas-styling.webp` | `features/canvas-styling.html` |
| `public/assets/feature-covers/typography.webp` | `features/typography.html` |
| `public/assets/feature-covers/images-stickers.webp` | `features/images-stickers.html` |
| `public/assets/feature-covers/draw-doodle.webp` | `features/draw-doodle.html` |
| `public/assets/feature-covers/translation.webp` | `features/translation.html` |
| `public/assets/feature-covers/layers-precision.webp` | `features/layers-precision.html` |
| `public/assets/feature-covers/projects-presets.webp` | `features/projects-presets.html` |
| `public/assets/feature-covers/export-share.webp` | `features/export-share.html` |
| `public/assets/feature-covers/shared-projects-translation.webp` | Shared spare cover retained for future use |

### Media

| File | Role |
| --- | --- |
| `public/assets/media/hero-video.mp4` | General website video/media asset |

## Source and Legacy Assets

`public/assets/source/` stores older exports, raw variants, and naming-history material that may still be useful for regeneration, reference, or future asset improvements.

### Source Showcase Sets

- `public/assets/source/showcase/iphone`
- `public/assets/source/showcase/ipad`

These folders contain source or older showcase exports, now standardized as WebP, including raw variants such as:

- `backgrounds-raw.png`
- `icloud-sync-raw.png`
- `image-playground-raw.png`
- `translation-raw.png`
- `typography-raw.png`
- `canvas-motion-legacy.webp`

### Source Showcase WebP Archive

- `public/assets/source/showcase/webp/iphone`

This folder holds older WebP exports that are no longer the canonical runtime files after the `public/assets/showcase/...` rename cleanup.

### Notes

| File | Purpose |
| --- | --- |
| `public/assets/source/notes/assets-description.md` | This master asset guide |

## Naming Rules

Use these rules for future additions:

1. Put production-ready website assets in `public/assets/...`.
2. Use lowercase kebab-case names.
3. Name by content and usage, not by temporary export order.
4. Keep device variants in parallel folders when a section toggles by device.
5. Put raw exports, alternates, or uncertain keepers in `public/assets/source/...`.

## Current Status

- The website now reads from `public/assets/` instead of the old mixed folders.
- The old `iPhoneWebAssests` location is no longer the canonical website asset path.
- The source archive has been converted from PNG-heavy exports to WebP to keep future-use assets much lighter.
- This file should be updated whenever assets are moved, renamed, added, or deprecated.
