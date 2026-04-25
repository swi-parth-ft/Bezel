# Bezel Studio Technical Report

Scope: source-based analysis of `/Users/parthantala/Code/Swift/Bzls`. I did not modify app source files. Where behavior is inferred from callers or file structure rather than directly observed, I label it as an inference.

## 1. End-to-End App Flow

### Launch and Root Bootstrap

```text
App start
  -> `BzlsAppDelegate.application(_:didFinishLaunchingWithOptions:)`
     -> `ExportBackgroundTaskCoordinator.shared.prepareForLaunch()`
  -> `BzlsApp`
     -> configure RevenueCat with a hardcoded API key
     -> read `Purchases.shared.customerInfo()` and store `isPremium`
     -> initialize SwiftData container with schema:
          `ProjectRecord`
          `ProjectAssetRecord`
     -> inject `PresetStore`
     -> render `ProjectsRootView`
     -> show onboarding / tips / paywall / Bezel AI intro based on `@AppStorage` flags
```

Confirmed in `BzlsApp.swift`, the app starts with SwiftData + CloudKit-backed persistence for projects and project assets, while RevenueCat entitlement state is mapped to the global `isPremium` flag. The root view is `ProjectsRootView`, which is the gallery, project launcher, and persistence coordinator.

### Project Open / Edit / Persist Loop

```text
`ProjectsRootView`
  -> load stored project records from SwiftData
  -> hydrate project payloads into `Project` models
  -> normalize assets / video references / layer references
  -> show list or grid of projects
  -> user selects project
     -> `ProjectEditorHost(project: hydratedProject)`
        -> `ProjectEditorView(project: ...)`
           -> `ContentView(canvas: ..., project: ...)`
              -> canvas UI, toolbars, sheets, gestures, AI, translation, export
  -> on change:
     -> persist canvas/project payloads back to `ProjectRecord`
     -> persist frame videos to `ProjectAssetRecord`
     -> clean unused frame-video assets
```

`ProjectEditorView.swift` is the bridge between project-level state and the canvas editor. It creates `ContentView` for the selected canvas, supports canvas switching, and decides whether closing should save or discard. In `ProjectsRootView.swift`, project writes are funneled through persistence helpers that encode `Project` into the SwiftData record payload.

### Canvas Interaction Loop

```text
`ContentView`
  -> user adds/edits text, images, frames, backgrounds, motion, drawing, translation, AI actions
  -> editor mutates `CanvasState` and nested overlay models
  -> command center mirrors available editor actions into app commands
  -> save/share/export paths render the current canvas or canvases into images/video
```

The editor is intentionally state-heavy. The source shows `ContentView` owns selection state, sheet state, preview state, AI state, translation state, undo/redo state, animation editor state, and platform-specific presentation state. The view composes a large tree of overlays and sheets rather than pushing each capability into a separate coordinator.

## 2. User-Facing Features

### Project Gallery

Confirmed in `ProjectsRootView.swift`, users can create projects, rename them, duplicate them, delete them, search them, sort them, switch between grid/list layouts, and open project settings or the paywall from the gallery toolbar. The project list also exposes a "find projects" command through `ProjectCommandCenter`.

The same root also now owns project archive export/import entry points for `.bezel` files, including export file creation and pending-import consumption.

Internally, the gallery reads `ProjectRecord` objects from SwiftData, decodes them into `Project`, and keeps a hydrated in-memory array. On save, it re-encodes the project back into the record payload. The root also manages live translation state and export/share sheets at the project level.

### Canvas Editor

Confirmed in `ProjectEditorView.swift` and `ContentView.swift`, the editor supports multiple canvases per project, canvas switching, a canvas grid/overview, and a canvas toolbar that changes behavior for iPad, iPhone, and quick-mockup mode.

Users can:
- Add text, frames, images, and drawings.
- Open text, frame, image, layer-order, canvas settings, rotation, and motion editors.
- Move, rotate, scale, and reorder overlays.
- Use undo/redo and clipboard copy/paste on supported overlays.
- Switch canvases and enable a mission-control style arrangement mode on iPad.

Internally, those actions mutate `CanvasState`, `TextOverlay`, `ImageOverlay`, and `FrameOverlay` instances, with layer ordering tracked by `CanvasLayerID`. `CanvasToolbarView` wires the visible toolbar buttons to those actions and uses `ProjectCommandCenter` so macOS-style menu commands can trigger the same handlers.

### Text Overlay Editing

Confirmed from `TextOverlay.swift`, `TextEditorSheet.swift` call sites, and `ContentView`, text overlays support:
- Custom text content.
- Font family selection, including bundled custom fonts such as `Amatic`, `Bangers`, `Caveat`, `Chewy`, `Fredoka`, `Grandstander`, `HennyPenny`, `Hurricane`, `Lobster`, `LuckiestGuy`, `Monoton`, `Nunito`, `Pacifico`, `Poppins`, and `SourGummy`.
- Weight, design, alignment, fill/gradient, stroke, shadow, and glass-style presentation.
- Per-text animation tracks.

Internally, text overlays are stored as model objects and rendered by `TextOverlayRenderedView` in export paths and in the live editor. `CanvasExportView` scales font, shadow, stroke, and glass padding to the output canvas size before rendering.

### Image Overlay Editing

Confirmed from `ImageOverlay.swift`, users can insert images from the picker or from generated/sticker sources, move them, scale them, rotate them, and open a 3D rotation sheet for some edits.

Internally, `ImageOverlay.newDefault(...)` down-samples a display image to keep interactive memory usage lower than the source image. The overlay retains both the original image and a display image. `ImageOverlayView` handles gesture-driven transforms, selection outline display, and interaction state.

### Frame / Mockup Editing

Confirmed from `FrameOverlay.swift`, `FrameTemplate.swift`, `CanvasVideoOverlayView.swift`, `CanvasVideoMaskView.swift`, `FrameTouchCue.swift`, and `DynamicIslandStatusBarNormalizer.swift`, users can add device frames, place screenshots or videos inside them, edit frame placement/rotation/scale, replace messy captured status bars with a clean Apple-style 9:41 status bar treatment, add adjustable frame reflections, and use touch cues. There is also explicit support for 3D frames, including a special template named `3D iPhone Frame`.

Internally, frame overlays store the template, screenshot, video URL, optional exported video asset ID, clean status bar state, touch cues, touch cue appearance, shadow state, floor reflection state/style, 2D transform state, and 3D state. Video frames are backed by a separate `FrameVideoStore` that writes files into Documents/FrameVideos, and `ProjectAssetRecord` persists those frame-video payloads for deduplication and restore.

`FrameFloorReflectionContainer` mirrors the rendered frame content below the device and applies blur, top opacity, fade distance, rotation compensation, and optional surface shadow styling. `FrameEditSheet` exposes `Show Reflection` plus blur, opacity, and fade controls.

### Canvas Backgrounds and Lighting

Confirmed from `CanvasModels.swift`, `CanvasExportView.swift`, `CanvasVideoOverlayView.swift`, and `CanvasSettingsSheet.swift`, the canvas background can be themed, custom gradient, emoji-based, photo-based, or transparent. Lighting overlays are separate and can be layered on top of a non-transparent background.

Users can adjust:
- Background preset.
- Gradient colors and direction.
- Emoji background composition.
- Background images.
- Background image blur.
- Background patterns and their animation.
- Lighting effect and opacity.

Internally, `CanvasState` owns the background model, and the live/export renderers recompose the background separately from foreground overlays. `BackgroundPhotoView.swift` and `CanvasExportView.swift` confirm the current implementation supports blurred photo backgrounds through `canvas.backgroundImageBlur`. Pattern animation and lighting are toggles that can affect both live preview and export.

### Drawing Mode

Confirmed in `ContentView.swift` and `CanvasToolbarView.swift`, users can enter drawing mode, sketch on the canvas, then commit or cancel the drawing. The toolbar suppresses many other actions while drawing is active.

Internally, drawing is represented as image overlays with `isDrawing = true`. The editor manages a drawing lifecycle with start, cancel, and commit steps, and it uses separate hit-testing and selection suppression during the active gesture.

### Layer Ordering

Confirmed in `LayerOrderSheet.swift` call sites and the model structure, users can reorder text, image, and frame layers explicitly.

Internally, the order is serialized as `[CanvasLayerID]` in `CanvasState.layerOrder`. Export and preview rendering iterate that order rather than inferring z-order from separate arrays.

### Motion / Animation

Confirmed in `CanvasModels.swift`, `ContentView.swift`, `CanvasMotionStyleSliderView.swift`, and the export paths, both the canvas and individual overlays can have animation tracks with keyframes, easing, opacity, scale, offset, and rotation.

Users can:
- Open the canvas animation editor.
- Add, remove, and reset keyframes.
- Adjust duration and easing.
- Preview motion on-canvas.
- Export motion as rendered video.

Internally, `CanvasAnimationTrack` stores duration, keyframes, and easing. `CanvasAnimationTransform` interpolates position, scale, and rotation components. The editor and exporter both reuse those models so what users see in preview is intended to match render output.

### Translation

Confirmed in `ProjectsRootView.swift`, `ContentView.swift`, and `CanvasToolbarView.swift`, text can be translated either for the current canvas or across all canvases. The app uses Apple’s translation APIs with a `.translationTask`.

User flow:
- Pick a target language from the Translate menu.
- Choose scope: current canvas or all canvases.
- The app detects the source language automatically.
- The translated strings are written back into the canvas or project.

Internally, the app concatenates text entries with `\n---\n`, uses `NLLanguageRecognizer` to detect the dominant source language, configures a `TranslationSession`, and then splits the translated response back into corresponding overlays.

Current checked-in changes also show active work to improve the translation flow while keeping the same on-device architecture and editable write-back model.

### AI Assistant

Confirmed in `CanvasAIAssistant.swift`, `GeminiLiveClient.swift`, and `ContentView.swift`, the app has a typed AI editing assistant and a microphone-driven AI mode. The AI can propose structured canvas edits rather than freeform prose.

Users can:
- Type a prompt.
- Or, on supported devices and with premium access, speak into a mic mode.
- Receive direct edits to text, images, frames, background, lighting, canvas size, and motion.

Internally, `ContentView` collects a `CanvasAIContext` snapshot of the current canvas, including sampled text/image/frame entries and layer order. It sends the prompt to `GeminiLiveClient.generatePlan(...)`, receives a `CanvasAIEditPlan`, and applies it in `applyAIEditPlan`.

### Quick Mockups

Confirmed in `QuickMockupSettingsView.swift`, `QuickMockupEditorView.swift`, `QuickMockupDefaults.swift`, and `ShortcutMockupIntent.swift`, the app has a separate quick-mockup preset system.

Users can:
- Open saved quick mockups from Settings.
- Create, rename, and delete presets.
- Edit a preset’s canvas directly.
- Use the preset from Siri Shortcuts.

Internally, presets are stored in a separate SwiftData container with legacy migration support. A quick mockup preset is a named wrapper around a `CanvasState`, and the editor persists preset changes on dismiss.

### Project Import and Export

Confirmed in `ProjectsRootView.swift`, `ProjectArchive.swift`, `ProjectImportCoordinator.swift`, and `Info.plist`, the app now supports `.bezel` project archive import/export.

Users can:
- Export a complete project into a `.bezel` file.
- Import a `.bezel` file into the gallery.
- Carry archived frame-video assets with the project payload.

Internally, `BezelProjectArchive` encodes the `Project` plus archived assets, `ImportedBezelProjectPayload` remaps imported IDs into a new project, and the custom `UTType` is registered as `com.parthant.bzls.project`.

### Export, Save, Share

Confirmed in `ProjectsRootView.swift`, `ContentView.swift`, `SaveShareSheet.swift`, `CanvasExportView.swift`, `CanvasVideoOverlayView.swift`, and `ExportLiveActivitySupport.swift`, the app can export:
- Images.
- Videos.
- Multiple canvases.
- Photos-library saves.
- File exports.
- Shared output through the system share sheet.

The export UI previews either a single canvas image or a stack of canvases. For export, the app decides whether the canvas needs video rendering based on animation/video content and then chooses an appropriate render path. Clean status bar state is part of frame rendering and must be preserved in still export, animated canvas export, and frame-video export paths. The app shows progress, can continue background rendering, and updates a live activity when available.

### Onboarding, Tips, Settings, Paywall

Confirmed in `Onboarding.swift`, `Tips/TipsViewiPhone.swift`, `Tips/TipsViewiPad.swift`, `SettingsView.swift`, and `Control Sheets/PayWall.swift`, the app has first-launch onboarding, device-specific tips flows, settings, and a paywall.

Internally:
- Onboarding is controlled with `@AppStorage` flags in `BzlsApp`.
- Tips are split into iPhone and iPad video walkthroughs.
- Settings includes app metadata, review/share links, developer notes, quick mockups, and other apps by the developer.
- The paywall uses RevenueCat offering/package data and auto-selects a likely annual or lifetime package when possible.

## 3. Hidden Features, Less-Obvious Capabilities, Supporting Systems

- `ProjectArchive.swift` and `ProjectImportCoordinator.swift` add a full `.bezel` archive path for importing and exporting complete projects with linked assets.
- `ProjectAssetRecord.swift` stores frame-video blobs separately from the project payload so the app can deduplicate and restore media assets independently of the canvas JSON.
- `FrameVideoStore` in `FrameOverlay.swift` keeps embedded frame videos under Documents/FrameVideos and can resolve stale URLs by file name.
- `FrameFloorReflectionStyle` stores frame reflection blur, opacity, fade, and surface shadow values, and `ProjectArchive.swift` preserves them during `.bezel` import/export.
- `FrameTouchCue.swift` and the frame edit sheets support touch cues as reusable interaction callouts inside framed media.
- `QuickMockupDefaultsStore` has a legacy migration path from user defaults and JSON into a dedicated SwiftData store. This is a hidden compatibility layer, not a visible feature.
- `ExportBackgroundTaskCoordinator` and `ExportLiveActivityManager` support long-running exports that continue in the background and surface progress in a live activity. This is not obvious from the UI alone.
- `ProjectCommandCenter` and `ProjectCommands` expose editor actions into app menu commands. That is why toolbar actions, keyboard shortcuts, and menu commands can share the same implementation path.
- `CanvasExportView` and `CanvasVideoOverlayView` deliberately separate background, pattern overlay, content overlays, lighting, and watermarking so live preview and export can share a compositing model.
- `CanvasExportView.debugGlassTextBackgroundEnabled` is a debug switch for the text glass effect in export output.
- `ImageOverlay.newDefault(...)` and `UIImage.codableData(...)` downsample large assets before storage/rendering to keep memory and payload size lower.
- `BackgroundRemover` in `ImageBackgroundRemoval.swift` can detect whether an image has a removable subject and can produce stickers with a border using Vision + Core Image.
- `ImageGeneration.swift` uses `ImagePlayground` to generate sticker-like images and can save them into presets.
- `ShortcutMockupIntent.swift` turns a shared photo or video into a rendered mockup via an App Intent, which makes the app shortcut-friendly without requiring the app to open.
- `CanvasSpeechController.swift` uses iOS 26 SpeechAnalyzer APIs, not a legacy speech-recognition text pipeline. The voice mode is therefore intentionally platform-gated.
- `Motion` is not just preview-only. Motion keyframes and canvas-wide animation are part of the persisted canvas model and are consumed by export rendering.
- `CanvasVideoMaskView.swift` and the procedural mask fallback indicate the app can extract the screen opening from a frame template and use it as a video matte.
- `FrameTemplate.swift` includes a broad library of Apple device templates, not just phones. The catalog spans watch, iPad, iPhone, MacBook, iMac, and Apple TV.

## 4. Architecture Overview

### Entry Points

Confirmed entry points are:
- `BzlsApp.swift` for iOS/iPadOS.
- `BzlsMac/BzlsMacApp.swift` for the macOS target.
- `BzlsAppDelegate` in `BzlsApp.swift` for launch-time preparation of background export support.

The macOS target currently launches `MacContentView`, which is a simple placeholder surface rather than the full iOS editor. That is confirmed by `BzlsMac/MacContentView.swift`.

### State and Data Models

Confirmed core model files:
- `CanvasModels.swift` owns `CanvasState`, `Project`, `CanvasAnimationTrack`, `CanvasAnimationKeyframe`, `CanvasAnimationTransform`, `CanvasLayerID`, and a set of enums for backgrounds, lighting, sizing, and animation.
- `Overlays/TextOverlay.swift` owns text style enums and the text styling vocabulary.
- `Overlays/ImageOverlay.swift` owns `ImageOverlay`.
- `Overlays/FrameOverlay.swift` owns `FrameOverlay`, `FrameOverlayThreeDState`, and `FrameVideoStore`.
- `FrameTemplate.swift` owns the frame template catalog and screen-opening metadata.
- `QuickMockupDefaults.swift` owns `QuickMockupPreset` and `QuickMockupPresetRecord`.

Important model relationships:
- `Project` contains one or more `CanvasState` values.
- `CanvasState` contains text, image, and frame overlays plus layer order and animation track.
- Each overlay can carry its own animation track.
- `CanvasLayerID` provides stable serialization for explicit z-order.

### Persistence and Sync

Confirmed persistence stack:
- SwiftData with CloudKit auto-sync for `ProjectRecord` and `ProjectAssetRecord`.
- Separate SwiftData store for quick mockup presets, with CloudKit disabled.
- `ProjectRecord.payload` stores an encoded `Project`.
- `ProjectAssetRecord.payload` stores binary asset payloads, currently used for frame video.

Confirmed sync behavior:
- The main project store is configured with `cloudKitContainerIdentifier` and automatic sync.
- Quick mockups are local-only in their dedicated store.

Inference:
- The app appears to rely on record payload encoding rather than normalized tables for most project state, likely to keep schema migration simpler and preserve full canvas fidelity.

### Rendering and Export

Confirmed render layers:
- `CanvasExportView` for still-image export.
- `CanvasVideoOverlayView` for composition of background, frame bezels, overlay layers, pattern animation, lighting, and watermark.
- `CanvasVideoMaskView` for frame screen masks.
- `DynamicIslandStatusBarNormalizer` for clean status bar treatment on supported frame screenshots and videos.
- `FrameFloorReflectionContainer` for mirrored frame reflections in live preview and export renderers.
- `LightingOverlayView`, `CanvasPatternOverlayView`, `BackgroundPresetView`, `CustomGradientView`, and `EmojiPatternBackgroundView` for background construction.

Confirmed export behavior:
- The app can export stills, photo-library assets, files, and share-sheet content.
- It chooses a video export path when frames contain video or when canvas/overlay animation requires it.
- It preserves clean status bar rendering for supported frame screenshots and videos.
- It preserves frame reflection rendering for supported mockups.
- It supports transparent exports and special 3D frame rendering.

Inference:
- The export stack is intentionally layered so one compositing vocabulary can feed preview, still export, video export, and quick mockup rendering.

### AI

Confirmed AI files:
- `CanvasAIAssistant.swift` defines the action vocabulary and context snapshot.
- `GeminiLiveClient.swift` translates user prompts into structured edit plans.

Confirmed AI runtime:
- `ContentView` builds the prompt context.
- `GeminiLiveClient` calls Google’s Gemini generate-content endpoint.
- The response is normalized into `CanvasAIEditPlan`.
- `applyAIEditPlan` mutates the canvas through typed action handlers.

Inference:
- The code intentionally uses a constrained action schema to reduce hallucinated edits and keep canvas modifications deterministic.

### Shortcuts

Confirmed shortcut files:
- `ShortcutMockupIntent.swift`
- `QuickMockupDefaults.swift`

Confirmed behavior:
- There is an App Intent named `CreateMockupFromPhotoIntent`.
- It accepts image or movie input, uses a quick mockup preset, renders a mockup, optionally saves it to Photos, and returns an `IntentFile`.
- `BzlsShortcutsProvider` exposes a ready-made shortcut phrase set.

### Motion

Confirmed motion model:
- `CanvasAnimationTrack` is persisted inside `CanvasState`.
- Each text/image/frame overlay also has an animation track.
- Easing options include linear, ease-in, ease-out, ease-in-out, and bounce.

Confirmed runtime:
- The editor’s animation timeline and preview UI drive those tracks.
- Export uses the same tracks to render frame-by-frame output when needed.

### Translation

Confirmed translation runtime:
- `NLLanguageRecognizer` detects the source language.
- `TranslationSession` performs the translation.
- The app supports translating the current canvas or all canvases.

Inference:
- The delimiter-based batching approach suggests the app is optimized for translating many text overlays in one pass and then restoring the text-to-overlay mapping afterward.

### Platform-Specific Pieces

Confirmed iPad behavior:
- The editor uses floating panels for many sheets when `UIDevice.isiPad` is true.
- The toolbar exposes additional canvas navigation and mission-control controls on iPad.

Confirmed iPhone behavior:
- The editor relies more on sheets and a bottom toolbar.
- The tips flow has separate iPhone video walkthroughs.

Confirmed macOS/Catalyst-adjacent behavior:
- `SaveShareSheet` checks `ProcessInfo.processInfo.isiOSAppOnMac`.
- `BzlsMac` has a separate minimal app entry point.

Confirmed iOS 26+ gating:
- SpeechAnalyzer-based AI mic mode requires iOS 26.
- Continued background export processing also uses iOS 26 background task APIs when available.

## 5. File / Module Map

- `BzlsApp.swift`: app entry, SwiftData container setup, RevenueCat init, onboarding/paywall gating, environment wiring.
- `ProjectsRootView.swift`: project gallery, project persistence pipeline, project-level export/share, root translation handling, navigation into the editor, and `ProjectEditorHost`.
- `ProjectEditorView.swift`: project-to-canvas bridge, canvas switching, add-canvas flow, close/save behavior.
- `ContentView.swift`: main canvas editor, toolbar wiring, sheets, gestures, selection, drawing, AI, translation, motion editor, and export orchestration.
- `CanvasModels.swift`: core data model definitions for projects, canvases, layers, backgrounds, lighting, and motion.
- `Overlays/TextOverlay.swift`: text style vocabulary and font/design/alignment options.
- `Overlays/ImageOverlay.swift`: image overlay model and interactive image editing view.
- `Overlays/FrameOverlay.swift`: frame overlay model, 3D frame state, frame-video store, and frame editing view.
- `FrameTemplate.swift`: device frame catalog and asset lookup rules.
- `FrameTouchCue.swift`: touch cue model and rendered interaction callouts for framed media.
- `Control Sheets/FrameEditSheet.swift`: frame transform, status bar, reflection, shadow, and touch cue controls.
- `Utils/DynamicIslandStatusBarNormalizer.swift`: clean status bar normalization for supported screenshots and frame videos.
- `CanvasExportView.swift`: still-image compositor for export and quick mockup rendering.
- `CanvasVideoOverlayView.swift`: layered video export compositor with optional pattern animation, lighting, bezels, and watermark.
- `CanvasVideoMaskView.swift`: screen-opening mask renderer for frame videos.
- `CanvasAIAssistant.swift`: structured AI action schema, context snapshot, and enum mappings.
- `GeminiLiveClient.swift`: Gemini HTTP client, prompt builder, JSON/function-call parsing, plan recovery logic.
- `CanvasSpeechController.swift`: speech/audio capture and SpeechAnalyzer integration for AI mic mode.
- `SubscriptionManager.swift`: RevenueCat status, entitlement flags, purchase/restore/trial eligibility handling.
- `Control Sheets/PayWall.swift`: paywall UI and package selection logic.
- `SettingsView.swift`: settings hub, app metadata, developer links, quick mockups entry, and app discovery.
- `QuickMockupDefaults.swift`: quick mockup preset store and legacy migration.
- `QuickMockupSettingsView.swift`: preset list/editor launcher and shortcut launcher.
- `QuickMockupEditorView.swift`: preset editor wrapper and persistence-on-dismiss.
- `ShortcutMockupIntent.swift`: App Intents, quick mockup preset entity/query, shortcut rendering pipeline.
- `ExportLiveActivitySupport.swift`: background export persistence, background-task handoff, and live activity updates.
- `SaveShareSheet.swift`: save/share/export choice UI and preview UI.
- `ImageGeneration.swift`: Image Playground-based sticker generation and preset save/unsave integration.
- `ImageBackgroundRemoval.swift`: Vision/Core Image background removal and sticker border generation.
- `ProjectPersistence.swift`: SwiftData record for project payload persistence.
- `ProjectAssetRecord.swift`: SwiftData record for binary project assets, currently frame videos.
- `ProjectCommandCenter.swift`: command registration/dispatch hub.
- `ProjectCommands.swift`: app command menus and keyboard shortcuts.
- `Notifications.swift`: canvas-history clear notification name.
- `HapticManager.swift`: small haptic utility.
- `BzlsMac/BzlsMacApp.swift`: macOS app entry.
- `BzlsMac/MacContentView.swift`: placeholder macOS view.

## Gaps / Unverified Areas

- I did not fully inspect every control sheet file, so some fine-grained editor UI behavior is inferred from call sites and type names rather than traced line-by-line.
- I confirmed the Gemini transport and parser, but I did not exhaustively trace every helper in `GeminiLiveClient.swift`; the high-level AI pipeline is solid, while some recovery heuristics are summarized from the implementation shape.
- I did not fully inspect `PresetStore`, `CanvasSettingsSheet`, `TextEditorSheet`, `FrameEditSheet`, `ImagePlacementSheet`, `LayerOrderSheet`, `CanvasAxisRotationSheet`, or `BadgePickerSheet`, so their internal widget layout is unverified here.
- The macOS target appears minimal compared with the iOS/iPadOS app; I confirmed the placeholder entry point, but not any future/full macOS parity plans.
