# Bezel Studio Technical Report

Last updated: 2026-05-20

Scope: source-based analysis of `/Users/parthantala/Code/Swift/Bzls` for the website redesign and product-documentation refresh. I did not modify the app source. Claims below are based on code paths inspected during this pass.

## 1. Project Targets

The Xcode project currently exposes these first-party targets:

- `Bezel Studio`: iOS/iPadOS app.
- `Bezel Studio Mac`: native macOS app.
- `Bezel Studio Quick Mockups Helper`: macOS helper/login item for menu bar Quick Mockups.
- `BzlsExportLiveActivity`: ActivityKit widget bundle for export progress.

The package graph includes `RevenueCat`, `RevenueCatUI`, `Drops`, `LiquidDropsKit`, and `CardStack`.

Important correction from older docs: the native Mac target is no longer a placeholder. The current Mac source has a native app entry, project store, editor, inspector, export pipeline, localization support, Quick Mockups support, RevenueCat state, and Codex MCP server.

## 2. Runtime Entry Points

### iOS / iPadOS

Primary files:

- [BzlsApp.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/BzlsApp.swift)
- [ProjectsRootView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectsRootView.swift)
- [ProjectEditorView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectEditorView.swift)
- [ContentView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ContentView.swift)

Launch flow:

```text
BzlsAppDelegate
  -> prepare background export support

BzlsApp
  -> configure RevenueCat
  -> initialize SwiftData model container
       ProjectRecord
       ProjectAssetRecord
  -> refresh export credit state
  -> prepare Quick Mockup defaults
  -> handle onboarding, tips, paywall, BezelAI intro, whats-new flows
  -> start Codex MCP server if enabled
  -> render ProjectsRootView
```

The root view owns project hydration, project persistence, import/export, gallery UI, Quick Mockup entry, navigation into the editor, and several global share/export flows.

### Native Mac

Primary files:

- [BzlsMac/App/BezelStudioMacApp.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/App/BezelStudioMacApp.swift)
- [BzlsMac/Views/MacContentView.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Views/MacContentView.swift)
- [BzlsMac/Views/MacEditorView.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Views/MacEditorView.swift)
- [BzlsMac/Views/MacInspectorView.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Views/MacInspectorView.swift)
- [BzlsMac/Stores/MacProjectStore.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Stores/MacProjectStore.swift)

Launch flow:

```text
BezelStudioMacApp
  -> register remote notifications when not running as helper
  -> create MacProjectStore
  -> configure RevenueCat
  -> start MacSubscriptionStore
  -> register help book
  -> render welcome screen or MacContentView
  -> expose Quick Mockup window and Settings scene
  -> reload from CloudKit when active
  -> start/stop Mac Codex MCP server based on premium state
```

`MacContentView` is a real native workspace. It uses `NavigationSplitView`, a canvas sidebar, `HSplitView`, `MacEditorView`, and `MacInspectorSidebarHost`. It presents save/discard alerts, export-current/export-all choices, insufficient-credit alerts, translation alerts, frame catalog sheets, tip guides, copy/paste toolbar actions, export status, translation status, and inspector controls.

`MacEditorView` renders scrollable artboards with zoom, all-canvas view, alignment guides, keyboard nudge behavior, localization menu, 3D frame rotation mode, and canvas motion timeline/preview controls.

### Mac Quick Mockups Helper

Primary files:

- [BzlsMacQuickMockupsHelper/QuickMockupsHelperApp.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMacQuickMockupsHelper/QuickMockupsHelperApp.swift)
- [BzlsMac/Stores/MacQuickMockupDropperStore.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Stores/MacQuickMockupDropperStore.swift)
- [BzlsMac/Services/MacQuickMockupStatusItemController.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Services/MacQuickMockupStatusItemController.swift)
- [BzlsMac/Support/MacQuickMockupRuntime.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Support/MacQuickMockupRuntime.swift)

The helper runs as an accessory app, starts the menu bar dropper, accepts dropped image/video files, lets users choose presets, renders outputs, tracks progress, stores output-folder bookmarks, and can open the main app for settings or paywall requests. It uses `SMAppService` login item management and a lock file to prevent duplicate helpers.

### Live Activity Widget

Primary file:

- [BzlsExportLiveActivity/ExportLiveActivityWidget.swift](/Users/parthantala/Code/Swift/Bzls/BzlsExportLiveActivity/ExportLiveActivityWidget.swift)

The widget defines `ExportLiveActivityAttributes` with progress, status text, completion, and failure state. It renders Lock Screen and Dynamic Island export progress UI.

## 3. Core Data Model

Shared iOS/iPadOS model files:

- [CanvasModels.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasModels.swift)
- [Overlays/FrameOverlay.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/Overlays/FrameOverlay.swift)
- [Overlays/TextOverlay.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/Overlays/TextOverlay.swift)
- [Overlays/ImageOverlay.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/Overlays/ImageOverlay.swift)
- [ProjectPersistence.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectPersistence.swift)
- [ProjectAssetRecord.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectAssetRecord.swift)

Core hierarchy:

```text
Project
  -> [CanvasState]
     -> [FrameOverlay]
     -> [TextOverlay]
     -> [ImageOverlay]
     -> [CanvasLayerID]
     -> CanvasAnimationTrack
  -> ProjectLocalizationState?
```

Key implementation details:

- `ProjectRecord.payload` stores the encoded project model.
- `ProjectAssetRecord.payload` stores heavier linked assets, especially frame-video data.
- Layer order is explicit through `CanvasLayerID`, not inferred from array order.
- Canvas, frame, text, and image motion data is persisted as animation tracks.
- Main project persistence is CloudKit-backed. Quick Mockup preset storage is separate.

Native Mac has parallel model types in [BzlsMac/Models/MacCanvasProject.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Models/MacCanvasProject.swift), including `MacCanvasProject`, `MacCanvasState`, `MacFrameOverlay`, `MacTextOverlay`, `MacImageOverlay`, `MacCanvasMotionTrack`, `MacFrameThreeDState`, and `MacProjectLocalizationState`.

The Mac bridge in [BzlsMac/Services/MacBezelArchiveBridge.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Services/MacBezelArchiveBridge.swift) maps the shared archive/project format into Mac-native models and back.

## 4. Project Gallery and Persistence

Confirmed iOS/iPadOS behavior:

- Create, rename, duplicate, delete, search, sort, and open projects.
- Hydrate projects from SwiftData records into in-memory `Project` values.
- Re-encode project payloads on save.
- Persist linked frame-video assets through `ProjectAssetRecord`.
- Import and export `.bezel` files.
- Handle quick-action launch into Quick Mockup.

Confirmed Mac behavior:

- `MacProjectStore` maintains `projects`, `selectedProjectID`, dirty project tracking, undo/redo stacks, import/export state, translation state, export state, and frame catalog requests.
- It configures a CloudKit-backed store for persisted projects and a quick-mockup mode for ephemeral preset editing.
- It can reload from CloudKit, replace projects, create projects from MCP specs, and map `.bezel` archives through `MacBezelArchiveBridge`.

## 5. Canvas Editor

The iOS/iPadOS editor is centered on `ContentView`, with `ProjectEditorView` bridging project-level state. The Mac editor uses `MacContentView`, `MacEditorView`, `MacCanvasArtboard`, and `MacInspectorView`.

Confirmed editor capabilities:

- Multi-canvas editing.
- Frame, text, and image overlays.
- Layer ordering.
- Copy/paste.
- Undo/redo.
- Canvas and overlay transforms.
- Background settings.
- Pattern and lighting effects.
- Motion/keyframe editing.
- Screenshot/video placement inside frames.
- Frame edit sheets or inspectors.
- Export preview and rendering.
- Localization selection and translation.

The Mac version is architecturally separate rather than a thin Catalyst wrapper. It has Mac-specific stores, models, views, inspector panels, menu commands, and render services.

## 6. Frame and Mockup System

Primary files:

- [FrameTemplate.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/FrameTemplate.swift)
- [Overlays/FrameOverlay.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/Overlays/FrameOverlay.swift)
- [Control Sheets/FrameEditSheet.swift](</Users/parthantala/Code/Swift/Bzls/Bzls/Control Sheets/FrameEditSheet.swift>)
- [FrameTouchCue.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/FrameTouchCue.swift)
- [ThreeDPhoneFrameSceneView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ThreeDPhoneFrameSceneView.swift)
- [SharedThreeDFrameCanvasSceneView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/SharedThreeDFrameCanvasSceneView.swift)
- [ThreeDFrameARView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ThreeDFrameARView.swift)
- [ThreeDPhoneFrameSnapshotRenderer.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ThreeDPhoneFrameSnapshotRenderer.swift)

Confirmed capabilities:

- 2D frame catalog spans Apple TV, Apple Watch, iMac, iPad, iPhone, MacBook, and related families.
- 3D frame catalog contains 33 definitions under `topLevelGroup: "3D Frames"`.
- 3D definitions point at USDZ model names through `threeDModelName`.
- 3D assets are present under `Bzls/3DiPhone/` and thumbnails under asset catalogs.
- Frame overlays can store screenshots, videos, asset IDs, clean status bar settings, touch cues, shadows, reflections, 2D transforms, 3D state, emphasis areas, and animation.
- iOS/iPadOS supports AR viewing for 3D frames.
- Current iOS editor limits each canvas to three 3D frames.

Current 3D frame families:

- iPhone Air.
- iPhone 17, 17e, 17 Pro, 17 Pro Max.
- iPad Air M3, iPad A16, iPad mini.
- MacBook Air, MacBook Neo, MacBook Pro.
- iMac 24.
- Studio Display and Studio Display XDR.
- Apple Watch Series 11 and Ultra 3.

## 7. Clean Status Bar, Reflections, Touch Cues, and Emphasis

Primary files:

- [Utils/DynamicIslandStatusBarNormalizer.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/Utils/DynamicIslandStatusBarNormalizer.swift)
- [Overlays/FrameOverlay.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/Overlays/FrameOverlay.swift)
- [FrameTouchCue.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/FrameTouchCue.swift)
- [Control Sheets/FrameEditSheet.swift](</Users/parthantala/Code/Swift/Bzls/Bzls/Control Sheets/FrameEditSheet.swift>)

Confirmed capabilities:

- Clean Status Bar replaces supported captured status bars with a clean Apple-style treatment.
- The state is part of the frame overlay and participates in preview and export.
- Frame reflections mirror rendered frame content below the device and expose blur, opacity, fade, and surface shadow controls.
- Touch cues can show tap/drag/pointer-style interaction moments.
- Emphasis areas support callout/highlight behavior inside frame content.

## 8. Backgrounds, Patterns, Lighting, Text, and Images

Primary files:

- [BackgroundStyles.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/BackgroundStyles.swift)
- [BackgroundPatterns.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/BackgroundPatterns.swift)
- [CanvasModels.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasModels.swift)
- [Overlays/TextOverlay.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/Overlays/TextOverlay.swift)
- [Overlays/ImageOverlay.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/Overlays/ImageOverlay.swift)
- [ImageBackgroundRemoval.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ImageBackgroundRemoval.swift)
- [ImageGeneration.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ImageGeneration.swift)

Confirmed capabilities:

- Canvas sizes include story, portrait, square, and landscape presets.
- Background styles include themes, custom/photo backgrounds, transparent backgrounds, and emoji/pattern systems.
- Pattern catalog is broad and includes animated/motion-capable styles.
- Lighting catalog includes glows, beams, vignettes, window shadows, cloud/dapple effects, edge glow, and more.
- Text overlays support rich styling, custom fonts, shadows, gradients, stroke, glass-style presentation, and animation.
- Image overlays support import, transform, rotation, background removal, and sticker-like output.
- Image Playground can generate sticker assets.

## 9. Motion and Export

Primary files:

- [CanvasExportView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasExportView.swift)
- [CanvasVideoOverlayView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasVideoOverlayView.swift)
- [CanvasVideoMaskView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasVideoMaskView.swift)
- [ExportLiveActivitySupport.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ExportLiveActivitySupport.swift)
- [BzlsMac/Services/MacCanvasVideoExporter.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Services/MacCanvasVideoExporter.swift)
- [BzlsMac/Services/MacGPUCanvasVideoExporter.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Services/MacGPUCanvasVideoExporter.swift)

Confirmed capabilities:

- Still-image export.
- Video export when canvas motion, overlay motion, or frame video requires it.
- Current canvas or all canvases.
- Share, file, and photo-library oriented output.
- Background export continuation on iOS/iPadOS.
- Live Activity export progress.
- Export-credit checks.
- Mac GPU-first video export through Metal/Core Image, with fallback.
- 3D frame snapshot/render support for export.
- Clean Status Bar and reflection preservation in supported export paths.

## 10. Same-Project Localizations

Primary files:

- [CanvasModels.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasModels.swift)
- [ProjectEditorView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectEditorView.swift)
- [BzlsMac/Stores/MacProjectStore.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Stores/MacProjectStore.swift)
- [BzlsMac/Views/MacEditorView.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Views/MacEditorView.swift)
- [BzlsMac/Support/MacTranslationSupport.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Support/MacTranslationSupport.swift)

Current model:

```text
ProjectLocalizationState
  -> baseLanguageID
  -> defaultLanguageID
  -> [ProjectLocalizationSet]

ProjectLocalizationSet
  -> languageID
  -> localized canvases
  -> selected canvas
  -> source text hashes by overlay ID
```

Confirmed user actions:

- Add localization.
- Select localization.
- Update translation.
- Update all localizations.
- Copy base layout to one localization.
- Copy base layout to all localizations.
- Set localization as default.
- Delete localization.
- Export the active localization.

The feature uses Apple Translation and NaturalLanguage. It is project-level screenshot-text localization, not evidence of full app UI localization.

## 11. AI, Shortcuts, Visual Intelligence, and Automation

Primary files:

- [CanvasAIAssistant.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasAIAssistant.swift)
- [GeminiLiveClient.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/GeminiLiveClient.swift)
- [CanvasSpeechController.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasSpeechController.swift)
- [QuickMockupDefaults.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/QuickMockupDefaults.swift)
- [QuickMockupSettingsView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/QuickMockupSettingsView.swift)
- [QuickMockupEditorView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/QuickMockupEditorView.swift)
- [ShortcutMockupIntent.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ShortcutMockupIntent.swift)
- [VisualIntelligenceMockupIntent.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/VisualIntelligenceMockupIntent.swift)

Confirmed capabilities:

- BezelAI builds a structured canvas context and applies typed edit plans.
- Gemini client powers natural-language canvas edit planning.
- Speech-driven AI mode exists behind platform and premium gating.
- Quick Mockup presets wrap reusable canvas states.
- App Intents/Shortcuts can render image or movie input through a preset.
- Visual Intelligence integration can render mockup candidates from semantic content where the framework is available.

## 12. Codex MCP

Primary files:

- [CODEX_MCP.md](/Users/parthantala/Code/Swift/Bzls/CODEX_MCP.md)
- [CodexMCPServer.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CodexMCPServer.swift)
- [BzlsMac/Services/MacCodexMCPServer.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Services/MacCodexMCPServer.swift)
- [BzlsMac/Services/MacCodexMCPCanvasBuilder.swift](/Users/parthantala/Code/Swift/Bzls/BzlsMac/Services/MacCodexMCPCanvasBuilder.swift)

Current contract:

- Endpoint: `http://127.0.0.1:29471/mcp`.
- Transport: streamable HTTP JSON-RPC over `POST /mcp`.
- Auth: bearer token from Bezel Studio settings.
- Loopback-only.
- iOS/iPadOS and native Mac have separate server implementations.
- Only one running app can bind the port at a time.

Current tools:

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

The Mac MCP builder supports native Mac canvases, backgrounds, patterns, lighting, 2D/3D frames, screenshots, videos, text, images, layer order, animations, touch cues, emphasis callouts, reflections, and 3D frame tuning.

## 13. Monetization and Export Credits

Confirmed source areas:

- `SubscriptionManager.swift` and paywall files on iOS/iPadOS.
- `MacRevenueCatConfiguration`, `MacSubscriptionStore`, `MacPaywallView`, and Mac export-credit checks on Mac.
- Export credits are refreshed at launch and checked before exports that require credits.

Safe technical conclusion: Bezel Studio has RevenueCat-backed premium state and export-credit gating across current app surfaces. Exact prices and package names should be taken from live App Store / RevenueCat state, not from this report.

## 14. Website-Relevant Technical Conclusions

The website docs and homepage should now treat the following as source-backed:

- Native Mac app exists and is meaningful.
- 3D frames are a broad USDZ catalog, not one prototype template.
- Same-project localization is a real model and workflow.
- Quick Mockups now include both iOS Shortcuts/App Intents and a native Mac menu bar/helper workflow.
- Codex MCP is a real local automation surface on iOS/iPadOS and Mac.
- Export includes stills, videos, export credits, background progress, Live Activity, 3D rendering paths, and Mac GPU-first video export.

The website should still avoid these claims unless separately verified:

- Full feature parity across iPhone, iPad, and Mac.
- App UI localization.
- Official Apple-provided 3D assets.
- Fully offline AI.
- App Store Connect upload automation.
- Exact App Store availability, prices, and OS support.
