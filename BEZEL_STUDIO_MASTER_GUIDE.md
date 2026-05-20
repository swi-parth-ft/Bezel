# Bezel Studio Master Guide

Last updated: 2026-05-20

This is the website-side master product reference for Bezel Studio. It is meant to guide the upcoming homepage redesign, App Store copy, screenshots, feature pages, and implementation planning.

This pass uses the app source in `/Users/parthantala/Code/Swift/Bzls` as the source of truth, not the older Markdown files. The app code now proves a larger product surface than the previous docs described.

## Current Product Definition

Bezel Studio is a native Apple-platform creative studio for building App Store screenshots, device mockups, localized screenshot sets, marketing visuals, and motion previews on iPhone, iPad, and native Mac.

The product is no longer just an iPhone/iPad mockup editor with a placeholder Mac target. The checked-in source now shows:

- A full iOS/iPadOS SwiftUI editor.
- A native Mac app with project gallery, canvas editor, inspector, export, localization, `.bezel` import/export, iCloud-backed project persistence, Quick Mockups, RevenueCat premium state, and Codex MCP automation.
- A separate Mac Quick Mockups helper/login item for menu bar drag-and-drop rendering.
- A Live Activity widget target for export progress.
- A large 2D device-frame catalog plus a current 3D USDZ frame catalog across iPhone, iPad, Mac, Studio Display, iMac, and Apple Watch.
- Same-project localization sets for screenshot text, not just one-off text translation.

In plain language: Bezel Studio is a serious native mockup and screenshot production workspace for people shipping Apple-platform apps.

## Platform Picture

The current Xcode project contains these app targets:

- `Bezel Studio`: iPhone/iPad app.
- `Bezel Studio Mac`: native macOS app.
- `Bezel Studio Quick Mockups Helper`: macOS helper/login item for the menu bar Quick Mockups dropper.
- `BzlsExportLiveActivity`: export progress Live Activity widget.

Important platform truth for marketing and website work:

- iPhone and iPad remain the primary touch-first editor surfaces.
- Mac is now a real native product surface, not a placeholder. It has its own SwiftUI workspace, sidebar, inspector, project store, export pipeline, localization flow, Quick Mockups support, and MCP server.
- Some capabilities are platform-specific. AR preview belongs to iOS/iPadOS code. The Mac MCP docs explicitly avoid advertising iOS-only AR actions or custom clean status bar text.
- "Localization" in the current code means localizing project canvas text inside a Bezel project. It is not evidence that the app interface itself is fully localized.

## Product Positioning

Bezel Studio should be positioned as:

- An App Store screenshot maker.
- A realistic Apple device mockup studio.
- A native Mac, iPad, and iPhone creative workflow.
- A multi-canvas project workspace for launch assets.
- A screenshot localization tool.
- A motion and video export tool for preview visuals and social assets.
- A fast automation tool through Quick Mockups, Shortcuts, Visual Intelligence, and Codex MCP.

The strongest value proposition is speed with control. Users can generate quick mockups from presets, or build detailed multi-canvas campaigns with precise frames, typography, backgrounds, 3D device scenes, localization, motion, and export settings.

## Source-Backed Runtime Architecture

The main app architecture is project-first:

```text
Project
  -> canvases
     -> frame overlays
     -> text overlays
     -> image overlays
     -> layer order
     -> canvas motion
     -> background, pattern, lighting, sizing
  -> optional localization state
     -> localized canvas sets
  -> encoded into SwiftData project record
  -> linked media stored in separate asset records
```

The important runtime split is:

- Main projects use `ProjectRecord` and `ProjectAssetRecord` with SwiftData and CloudKit.
- Frame videos and heavier assets are stored separately from the encoded project payload.
- Quick Mockup presets use separate storage, because they are reusable automation templates rather than normal CloudKit project documents.
- `.bezel` archives package a project plus linked assets for import/export.

Core files:

- [BzlsApp.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/BzlsApp.swift): iOS/iPadOS app entry, RevenueCat setup, CloudKit SwiftData container, onboarding, tips, import handling, export credit setup, MCP startup.
- [ProjectsRootView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectsRootView.swift): iOS/iPadOS project gallery, persistence, project import/export, Quick Mockup entry, project opening.
- [ProjectEditorView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectEditorView.swift): iOS/iPadOS project-to-canvas bridge and same-project localization host.
- [ContentView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ContentView.swift): main iOS/iPadOS canvas editor and export orchestrator.
- [CanvasModels.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasModels.swift): core project, canvas, background, motion, and localization models.
- [FrameTemplate.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/FrameTemplate.swift): 2D and 3D frame catalog.
- [BzlsMac/App/BezelStudioMacApp.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/App/BezelStudioMacApp.swift): native Mac app entry.
- [BzlsMac/Views/MacContentView.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Views/MacContentView.swift): native Mac main workspace shell.
- [BzlsMac/Views/MacEditorView.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Views/MacEditorView.swift): native Mac artboard editor.
- [BzlsMac/Stores/MacProjectStore.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Stores/MacProjectStore.swift): native Mac project state, persistence, export, translation, undo/redo, and editing actions.
- [CODEX_MCP.md](/Users/parthantala/Code/Swift/Bzls/CODEX_MCP.md): current local MCP feature contract.

## Main Workflows

### 1. Multi-Canvas Projects

Users create a project, choose a frame, canvas size, background, pattern, and lighting, then build one or more canvases inside that project.

Supported project workflows include:

- Create, rename, duplicate, delete, search, sort, and open projects.
- Manage many canvases in one campaign.
- Duplicate, reorder, and navigate canvases.
- Copy/paste individual layers or complete canvases.
- Save reusable canvas sizes and style decisions.
- Sync main projects through iCloud.
- Import/export complete `.bezel` project files.

This is the correct website story: Bezel Studio is not a one-image wrapper. It is a project workspace for a complete screenshot or campaign set.

### 2. Canvas Editing

Each canvas supports:

- Apple device frames.
- Screenshots and videos inside frames.
- Text overlays.
- Image overlays.
- Stickers and generated sticker-like assets.
- Drawing/PencilKit on iOS/iPadOS.
- Backgrounds, patterns, emoji backgrounds, transparent backgrounds, and blurred photo backgrounds.
- Lighting effects.
- Explicit layer ordering.
- Gesture transforms and rotation.
- Canvas motion and per-layer animation tracks.

The product should feel like a focused creative editor for app marketing, not a generic design app.

### 3. Device Frames

The frame system is now one of the strongest product pillars.

Current source-backed frame capabilities:

- Large 2D frame catalog covering iPhone, iPad, MacBook, iMac, Apple Watch, Apple TV, and modern Apple hardware families.
- 3D USDZ frame catalog under the top-level `3D Frames` group.
- Screenshots or videos placed inside frames.
- Clean Status Bar treatment for supported frame media.
- Frame touch cues for interaction callouts.
- Frame shadows.
- Floor reflections with blur, opacity, fade, and surface shadow controls.
- Emphasis callouts.
- 3D look controls for screen texture, device orientation, lighting, material, scale, offset, and export rendering.

The current 3D catalog includes 33 app-bundled realistic USDZ templates:

- iPhone Air: Cloud White, Light Gold, Sky Blue, Space Black.
- iPhone 17 Pro: Cosmic Orange, Deep Blue, Silver.
- iPhone 17 Pro Max: Cosmic Orange, Deep Blue, Silver.
- iPhone 17: Black, Lavender, Mist Blue, Sage, White.
- iPhone 17e: Black, Soft Pink, White.
- iPad Air M3: Blue with Magic Keyboard, Blue with Apple Pencil, Blue with Apple Pencil Portrait.
- iPad A16: Blue portrait and landscape.
- iPad mini: Purple with Pencil Pro portrait and landscape.
- Mac: MacBook Air 13 Sky Blue, MacBook Neo Citrus, MacBook Pro 14 Space Black, iMac 24 Blue with Keyboard and Mouse, Studio Display Standard Glass with Tilt Stand, Studio Display XDR with Tilt Stand.
- Apple Watch: Series 11 Rose Gold with Sport Band Light Blush, Ultra 3 Natural with Ocean Band Green.

Website wording should use "realistic 3D Apple-device frames" or "official-style 3D device frames" unless there is separate legal confirmation to call them official Apple assets.

### 4. Clean Status Bar

Clean Status Bar replaces messy captured status bars in supported framed screenshots and recordings with a clean Apple-style status bar treatment.

This is not only a preview filter. The frame overlay stores the clean status bar state, and export paths preserve it across supported still and video rendering.

Good public wording:

- Clean up captured status bars.
- Make raw screenshots and recordings presentation-ready.
- Keep frame exports consistent with the editor preview.

### 5. Reflections, Touch Cues, and Emphasis

The app supports more than placing screenshots inside a bezel:

- Frame reflections create mirrored depth under device mockups.
- Touch cues show taps or interactions inside framed media.
- Emphasis areas create callouts/highlights for parts of the framed screen.
- Shadows and lighting make scenes feel more dimensional.

These belong in the website because they explain polish, not just feature count.

### 6. Backgrounds and Visual Style

The background system supports:

- Preset themes.
- Custom gradients.
- Transparent backgrounds.
- Photo backgrounds with blur.
- Emoji backgrounds.
- Pattern overlays.
- Pattern animation and movement.
- Lighting effects.

The code includes broad pattern and lighting vocabularies. Current patterns include waves, topo, starfield, constellation, confetti, lattice, chevrons, checkerboard, bricks, grids, dots, circuit, weave, and more. Current lighting effects include soft spot, top glow, beams, studio light, slatted light, window bars, vignettes, side light, bottom glow, ring vignette, clouds, dappled light, edge glow, curtain rays, and more.

The website should show this as "deep native styling" rather than dumping every effect name.

### 7. Text, Images, Stickers, and Drawing

Text overlays support:

- Rich font choices and custom bundled font families.
- Weight, alignment, fill, gradient, stroke, shadow, and glass styling.
- Motion tracks.

Image overlays support:

- Import.
- Transform and rotation.
- Background removal.
- Sticker-style output with borders.
- Generated sticker assets through Image Playground.

Drawing is available in the iOS/iPadOS editor through PencilKit-style workflows.

### 8. Motion and Video

Motion is persisted in the canvas model. It is not only an editor preview.

The app supports:

- Canvas-level animation.
- Per-frame, per-text, and per-image animation tracks.
- Keyframes for position, scale, rotation, opacity, and timing.
- Embedded frame videos.
- Video export when a canvas has motion or video content.
- Background export progress and Live Activity updates.

This makes Bezel Studio useful for App Store preview visuals, social launch assets, and motion-driven product announcements.

### 9. Same-Project Localizations

The old docs under-described localization. Current code has actual project localization sets.

The source model includes `ProjectLocalizationState` and `ProjectLocalizationSet`. Each localization set stores:

- Language ID.
- Localized canvases.
- Selected canvas index or ID.
- Source text hashes by overlay ID.
- Created/updated timestamps.

Current iOS/iPadOS and Mac flows support:

- Original project view.
- Add localization.
- Select a localization.
- Update translation.
- Update all localizations.
- Copy base layout to one localization.
- Copy base layout to all localizations.
- Set a localization as default.
- Delete localization.
- Export using the active localization selection.

Current language menu coverage includes English, Spanish, French, German, Italian, Japanese, Korean, Portuguese, Chinese, Russian, Hindi, and Arabic. The app uses Apple Translation and NaturalLanguage to detect source language, resolve supported target languages, translate text overlays, and keep localized output editable.

Correct website story: Bezel Studio helps users keep localized screenshot variants inside the same project without rebuilding the layout from scratch.

### 10. Native Mac App

The Mac app is now a real native editor surface.

Source-backed Mac capabilities include:

- Native `BezelStudioMacApp` entry with main window, Quick Mockup window, and Settings scene.
- `NavigationSplitView` project workspace with sidebar, canvas sidebar, artboard editor, and inspector.
- Native Mac project store with CloudKit-backed project records and project assets.
- Project create, duplicate, rename, delete, import, export, and reload from CloudKit.
- Canvas creation, duplication, selection, layer editing, and undo/redo.
- Frame catalog browser with 2D and 3D templates.
- Mac inspector controls for canvas, background, frame, text, and image layers.
- Localization and translation using the same Apple Translation direction as iOS/iPadOS.
- Export current canvas or all canvases with export-credit checks.
- Video export using a GPU-first Metal/Core Image path with Core Graphics fallback.
- `.bezel` archive bridge between the shared archive format and native Mac models.
- Codex MCP server and builder for creating/updating/rendering/exporting Mac projects through local automation.

The website homepage can now confidently mention a native Mac app. It should still avoid saying every iOS-only feature exists on Mac unless the specific code path proves it.

### 11. Quick Mockups

Quick Mockups are a fast automation surface built on reusable canvas presets.

iOS/iPadOS:

- Quick Mockup presets are stored separately from normal projects.
- App Intents and Siri Shortcuts can accept image or movie input.
- The intent renders the selected preset and can save or return an output file.
- Visual Intelligence integration can produce mockup candidates from semantic content on supported systems.

Mac:

- Native Quick Mockup window exists in the Mac app.
- A separate Quick Mockups Helper app runs as an accessory/login item.
- The helper owns the menu bar dropper.
- Users can drop image or video files, choose presets, render outputs, and choose output folders.
- The helper can request paywall or settings actions from the main app.

This is a meaningful homepage feature because it turns Bezel Studio from an editor into a repeatable production shortcut.

### 12. Codex MCP Automation

Bezel Studio now exposes a local MCP server for Codex control on both iOS/iPadOS and native Mac.

Current endpoint:

- `http://127.0.0.1:29471/mcp`
- Streamable HTTP JSON-RPC over `POST /mcp`.
- Bearer-token protected.
- Loopback-only.
- Only one running Bezel app can bind the port at a time.

Current MCP tools include:

- `app_status`
- `list_projects`
- `canvas_capabilities`
- `create_canvas_project`
- `update_canvas_project`
- `render_canvas_previews`
- `export_project_screenshots`
- `new_project`
- `open_project`
- `quick_mockup`
- `show_settings`

This is mostly an advanced/internal/pro-facing story. It may fit the website as "local automation" or "Codex-ready workflows", but it should not overwhelm the main consumer homepage.

### 13. Export, Credits, and Rendering

The app has a real export system:

- Still image export.
- Video export.
- Current canvas or all canvases.
- Photos, files, and share-sheet oriented output.
- Export-credit gating.
- Background export continuation on iOS/iPadOS.
- Live Activity progress via `BzlsExportLiveActivity`.
- Mac GPU-first video export with fallback.
- Clean Status Bar, reflections, 3D frames, lighting, backgrounds, and motion included in render paths where supported.

Current export messaging should emphasize publish-ready stills and videos, not just "save image".

## Website Redesign Implications

The homepage should now lead with the current product:

1. Native App Store screenshot and mockup studio for iPhone, iPad, and Mac.
2. Realistic 3D Apple-device frames and multi-device scenes.
3. Same-project localizations for screenshot sets.
4. Full multi-canvas projects with iCloud and `.bezel` handoff.
5. Motion/video export, Clean Status Bar, reflections, touch cues, and polish controls.
6. Quick Mockups and automation for repeated outputs.

The previous website story likely underweights:

- Native Mac.
- 3D realistic device frames.
- Localization sets.
- Quick Mockups helper.
- MCP/local automation.
- Export depth.

The new homepage should avoid becoming a generic feature grid. The first screen should show the product output: a polished Apple-device screenshot campaign, ideally with realistic 3D frames and a hint of Mac/iPad/iPhone continuity.

## Recommended Information Architecture

Use this structure as the working product map for website content:

### A. Create

- Start a project.
- Pick canvas size and frame.
- Choose backgrounds, patterns, lighting, and device templates.

### B. Compose

- Add frames, screenshots, recordings, text, images, stickers, badges, and drawing.
- Arrange layers.
- Apply Clean Status Bar, reflections, touch cues, and emphasis.
- Use 2D or 3D frames.

### C. Localize

- Add localized versions inside the same project.
- Translate text overlays.
- Copy base layouts across languages.
- Export selected language variants.

### D. Animate

- Add Canvas Motion.
- Animate layers with keyframes.
- Export stills or videos.

### E. Automate

- Use Quick Mockups.
- Use Shortcuts and App Intents.
- Use Visual Intelligence where available.
- Use local Codex MCP for advanced workflows.

### F. Continue

- Sync projects through iCloud.
- Use native iPhone, iPad, and Mac surfaces.
- Import/export `.bezel` projects.

## Current Feature Inventory

Use this as the short checklist for content planning:

- Native iPhone editor.
- Native iPad editor.
- Native Mac editor.
- Mac menu bar Quick Mockups helper.
- Multi-canvas projects.
- iCloud project sync.
- `.bezel` import/export.
- 2D Apple device frames.
- 33 realistic 3D USDZ device frames.
- AR preview for 3D frames on iOS/iPadOS.
- Screenshots and videos inside frames.
- Clean Status Bar.
- Frame reflections.
- Touch cues.
- Emphasis/callout areas.
- Shadows and lighting.
- Custom backgrounds, photo blur, emoji, patterns, and transparent backgrounds.
- Rich typography.
- Image import, background removal, stickers, and Image Playground assets.
- Drawing/PencilKit on iOS/iPadOS.
- Layers, copy/paste, undo/redo.
- Canvas Motion and layer animation.
- Still export.
- Video export.
- Background export and Live Activity progress.
- Export credits and RevenueCat premium gating.
- Same-project localization sets.
- Apple Translation/NaturalLanguage-backed translation.
- Quick Mockups through Shortcuts/App Intents.
- Visual Intelligence mockup path where available.
- Local Codex MCP automation.

## Public Messaging Guardrails

- Do say native iPhone, iPad, and Mac app.
- Do say realistic 3D device frames.
- Do say localize screenshot sets inside a project.
- Do say import/export `.bezel` projects.
- Do say Quick Mockups and Shortcuts automation.
- Do say AI-assisted editing only when framed as structured canvas editing.
- Do not imply the app uploads to App Store Connect.
- Do not imply every AI feature is offline.
- Do not imply all features are available on every Apple platform.
- Do not call the app UI localized unless app-interface localization files are separately verified.
- Do not call the 3D frames "official Apple assets" in public copy unless licensing/legal confirmation exists.

## Source Basis

This guide is based on current code and docs in:

- `/Users/parthantala/Code/Swift/Bzls`
- [BZLS_APP_TECHNICAL_REPORT.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/BZLS_APP_TECHNICAL_REPORT.md)
- [APP_STORE_CONNECT_CONTEXT.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/APP_STORE_CONNECT_CONTEXT.md)
- [assets_description.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/iPhoneWebAssests/assets_description.md)

The technical report contains the detailed code-path map. This master guide is the product-level version for website and messaging work.
