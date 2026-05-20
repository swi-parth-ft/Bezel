# App Store Connect Context

Last updated: 2026-05-20

This file is the working App Store Connect and public-marketing context for Bezel Studio. It has been refreshed from the current app source in `/Users/parthantala/Code/Swift/Bzls`, then aligned with the website docs in this folder.

If this file conflicts with the live shipping build, App Store Connect state, RevenueCat state, or current product decisions, those live sources should win.

## Product Summary

Bezel Studio is a native Apple creative studio for making App Store screenshots, realistic device mockups, localized screenshot sets, and motion-ready marketing visuals on iPhone, iPad, and Mac.

The current product story is broader than the older docs:

- Native iPhone and iPad editor.
- Native Mac app with a real editor, inspector, export workflow, localization, iCloud-backed projects, `.bezel` import/export, Quick Mockups, and Codex MCP automation.
- Realistic 3D Apple-device frame catalog using app-bundled USDZ models.
- Same-project screenshot localization sets.
- Quick Mockups through Shortcuts/App Intents and a Mac menu bar/helper workflow.
- Still and video export with export-credit gating and Live Activity progress.

Bezel Studio should not be described as a simple screenshot wrapper. It is a project-based creative workspace for Apple app marketing.

## Core Positioning

Use these product anchors:

- App Store screenshot maker.
- Apple device mockup studio.
- Native iPhone, iPad, and Mac creative workflow.
- Multi-canvas project workspace.
- Same-project screenshot localization.
- Realistic 2D and 3D device frames.
- Motion and video export.
- Quick Mockups automation.
- AI-assisted editing with manual control.

Best one-sentence positioning:

Bezel Studio helps app makers create polished App Store screenshots, realistic device mockups, localized screenshot sets, and motion-ready visuals on iPhone, iPad, and Mac.

## Source-Backed Feature Pillars

### 1. Multi-Canvas Projects

The app is organized around projects containing one or more canvases.

Safe claims:

- Build full screenshot sets in one project.
- Manage multiple canvases for a campaign.
- Duplicate and reuse layouts.
- Copy and paste layers or canvases.
- Sync main projects with iCloud.
- Import and export complete `.bezel` project files.

### 2. Device Frames and 3D Mockups

The source includes a large 2D frame catalog and 33 realistic 3D USDZ frame templates under `3D Frames`.

Safe claims:

- Place screenshots or videos inside Apple device frames.
- Create iPhone, iPad, Mac, Apple Watch, iMac, Studio Display, and Apple TV-style mockups.
- Use realistic 3D device frames for more dimensional scenes.
- Adjust scale, rotation, lighting, shadows, reflections, and layers.
- Use AR preview for supported 3D frame workflows on iOS/iPadOS.

Use care:

- Public copy should say "realistic 3D device frames" or "official-style 3D device frames" unless there is separate legal confirmation to say "official Apple assets".

### 3. Frame Polish

The frame system includes:

- Clean Status Bar for supported framed screenshots and recordings.
- Frame Reflections with blur, opacity, fade, and surface shadow.
- Touch cues for interaction callouts.
- Emphasis/highlight areas.
- Shadows and lighting.

Safe claims:

- Polish raw screenshots and recordings.
- Clean up captured status bars in supported frames.
- Add mirrored reflections and interaction callouts.
- Export the polished result as stills or videos.

### 4. Rich Visual Editing

The app supports:

- Text overlays with typography, gradients, stroke, shadow, and glass styling.
- Images and stickers.
- Background removal.
- Image Playground sticker generation.
- Photo backgrounds with blur.
- Gradients, patterns, emoji backgrounds, transparent backgrounds, and lighting.
- Layers, transforms, and undo/redo.
- Drawing/PencilKit on iOS/iPadOS.

Safe claims:

- Design App Store-ready layouts without jumping between tools.
- Style backgrounds, captions, layers, stickers, and device frames in one workspace.

### 5. Motion and Video Output

The app persists motion tracks in the canvas model and uses them for export.

Safe claims:

- Animate frames, text, images, and canvas elements.
- Create motion-ready preview visuals and social launch assets.
- Export still images or videos.
- Export a single canvas or a full canvas set.
- Track background export progress with Live Activity where available.

### 6. Same-Project Localization

The current code has `ProjectLocalizationState` and `ProjectLocalizationSet`, not just one-off translation.

Safe claims:

- Localize screenshot sets inside the same project.
- Add multiple language versions without rebuilding the layout.
- Translate text overlays with Apple Translation.
- Update all localizations or only changed translations.
- Copy a base layout into localized versions.
- Keep translated text editable.

Use care:

- This is screenshot/project localization. Do not claim the app interface itself is localized unless app UI localization files are separately verified.

### 7. Native Mac App

The native Mac app is now source-backed.

Safe claims:

- Bezel Studio is available as a native Mac app.
- Continue projects across iPhone, iPad, and Mac through iCloud-backed project storage.
- Use a desktop editor with sidebar, canvas workspace, inspector, frame catalog, export, localization, and Quick Mockups.
- Use Mac Quick Mockups from a menu bar/helper workflow.

Use care:

- Do not imply every iOS-only capability exists on Mac. AR preview is an iOS/iPadOS code path.

### 8. Quick Mockups and Automation

Source-backed automation surfaces:

- Quick Mockup presets.
- Shortcuts/App Intents for image or movie input.
- Visual Intelligence mockup candidates where available.
- Native Mac menu bar/helper dropper.
- Local Codex MCP server on iOS/iPadOS and native Mac.

Safe customer-facing claims:

- Create repeatable mockups from presets.
- Turn screenshots or recordings into mockups faster.
- Use Shortcuts for quick exports.
- Use the Mac menu bar workflow for drag-and-drop mockup creation.

Codex MCP is probably better as advanced/pro documentation unless the homepage gets a specific "automation" section.

## Best-Fit User Jobs

Use these as messaging foundations:

- Build a complete App Store screenshot set.
- Turn raw screenshots and screen recordings into polished device mockups.
- Create realistic 3D Apple-device scenes.
- Localize screenshot text into multiple languages inside one project.
- Create still and motion assets for launch pages, social posts, and App Store previews.
- Reuse projects and layouts across releases.
- Generate fast mockups through Shortcuts or the Mac menu bar helper.
- Move full projects between devices or collaborators with `.bezel` files.

## Target Users

Best-supported audience:

- Indie app developers.
- App marketers and growth teams.
- Designers creating App Store assets.
- Founders preparing launches.
- Creators who repeatedly publish Apple-platform product visuals.

## Platform Context and Guardrails

Current platform picture:

- iPhone and iPad have the primary touch editor.
- Mac has a native editor, not a placeholder.
- Main projects use SwiftData and CloudKit-backed sync.
- Quick Mockups use separate preset storage.
- Mac Quick Mockups helper can run as an accessory/menu bar workflow.
- iOS/iPadOS and Mac both expose local Codex MCP implementations.

ASC copy rules:

- Do describe iPhone, iPad, and Mac as native app surfaces.
- Do describe 3D frames, localization sets, Quick Mockups, `.bezel` files, and motion export.
- Do not claim exact cross-platform feature parity.
- Do not claim app-interface localization from the current code pass.
- Do not claim all AI is on-device or offline.
- Do not claim the app uploads assets into App Store Connect.
- Do not mention exact pricing, package names, or offer structures without live RevenueCat/App Store verification.

## Differentiators Worth Emphasizing

The strongest differentiators now are:

- Native Apple-platform workflow across iPhone, iPad, and Mac.
- Full multi-canvas projects rather than one-off images.
- Realistic 3D device frames across current Apple device families.
- Same-project screenshot localization.
- Clean Status Bar, reflections, touch cues, and emphasis controls.
- Motion/video export from the same editable project.
- Quick Mockups through Shortcuts and Mac menu bar drag-and-drop.
- `.bezel` project handoff.
- iCloud continuity.
- AI-assisted editing layered on top of manual control.

## Messaging Priorities

If space is tight, lead in this order:

1. Create App Store screenshots and realistic device mockups on iPhone, iPad, and Mac.
2. Use 2D and 3D Apple-device frames.
3. Build full multi-canvas screenshot campaigns.
4. Localize screenshot sets inside the same project.
5. Polish frames with Clean Status Bar, reflections, touch cues, backgrounds, typography, and lighting.
6. Animate and export stills or videos.
7. Use Quick Mockups and automation for repeated outputs.

## Words and Phrases That Match the Product

Strong phrases:

- App Store screenshots.
- Apple device mockups.
- Realistic 3D device frames.
- Native Mac app.
- Multi-canvas projects.
- Same-project localization.
- Screenshot localization.
- Clean Status Bar.
- Frame Reflections.
- Touch cues.
- Motion-ready visuals.
- Quick Mockups.
- `.bezel` projects.
- iCloud continuity.
- Shortcuts automation.

Phrases to use carefully:

- Official frames.
- Fully localized.
- Fully automated.
- Offline AI.
- Full Mac parity.
- Team collaboration.

## Draft App Store Connect Listing Direction

This is not final metadata. It is a source-backed copy direction for the current product.

### Subtitle

App screenshots, frames, motion

### Promotional Text

Create polished App Store screenshots, realistic 3D device mockups, localized screenshot sets, and motion-ready visuals on iPhone, iPad, and Mac.

### Keywords

app screenshots,mockups,device frames,3d frames,app preview,localization,mac mockups

### Short Description Ingredients

Use combinations of:

- App Store screenshot maker.
- Native iPhone, iPad, and Mac app.
- Realistic 3D device frames.
- Multi-canvas project workflow.
- Clean Status Bar and frame reflections.
- Screenshot localization.
- Motion and video export.
- Quick Mockups with Shortcuts.

## Draft Full Description

Create App Store-ready screenshots, realistic device mockups, localized screenshot sets, and motion-ready visuals directly on iPhone, iPad, and Mac.

Bezel Studio turns raw screenshots, screen recordings, and visual assets into polished marketing creatives with Apple device frames, 3D mockups, rich typography, layered backgrounds, motion tools, and export workflows built for app launches.

Build Complete Screenshot Sets

Work in multi-canvas projects instead of one image at a time. Create a full App Store screenshot campaign, duplicate layouts, reuse styles, and keep every screen in one editable workspace.

Realistic Device Mockups

Place screenshots or videos inside iPhone, iPad, Apple Watch, Mac, iMac, Studio Display, Apple TV, and multi-device frames. Use realistic 3D device frames for dimensional scenes, then adjust scale, rotation, lighting, shadows, and layout.

Native Mac App

Continue your mockup workflow on Mac with a native desktop editor, project sidebar, canvas workspace, inspector, frame catalog, exports, localizations, and Quick Mockups.

Clean Status Bar and Frame Polish

Make framed screenshots and recordings feel presentation-ready. Clean Status Bar helps replace captured status bar clutter in supported frame media, while reflections, touch cues, emphasis callouts, shadows, and lighting help polish the final composition.

Same-Project Localization

Create localized screenshot versions inside the same project. Translate text overlays with Apple Translation, copy a base layout across languages, update changed translations, and keep localized text editable.

Canvas Motion

Animate frames, text, images, and canvas elements with keyframes. Export motion-ready preview visuals and social assets from the same project you use for still screenshots.

Design Tools for App Marketing

Add custom typography, gradient text, glass-style captions, stickers, drawings, photo backgrounds, blur, animated patterns, transparent backgrounds, and lighting. Use layers and precise transforms to control every part of the composition.

Quick Mockups and Automation

Save reusable mockup presets, run them with Shortcuts, or use the Mac menu bar helper for fast drag-and-drop mockup creation. BezelAI can also help apply structured creative edits to your canvas.

Project Import and Export

Move complete projects with `.bezel` files, including linked frame-video assets. Reuse launch assets, hand off projects, or keep campaign versions organized.

Bezel Studio is built for indie developers, app marketers, designers, and creators who need polished screenshots, realistic device mockups, localized assets, and motion-ready visuals for App Store Connect and beyond.

## Draft What's New Direction

Use a single-paragraph version when App Store Connect requires compact copy:

Bezel Studio now includes a native Mac app, realistic 3D device frames, same-project screenshot localizations, faster Quick Mockups workflows, and improved export polish for App Store screenshots, mockups, and motion-ready visuals.

## Screenshot Caption Ideas

- Native screenshots on Mac, iPad, and iPhone
- Realistic 3D device frames
- Localize every screenshot set
- Build full App Store campaigns
- Clean up captured status bars
- Add reflections and touch cues
- Animate product visuals
- Quick Mockups from presets
- Export stills and videos
- Move projects with `.bezel` files

## Feature Callout Copy

3D Frames

Create more realistic product scenes with 3D Apple-device mockups across iPhone, iPad, Mac, Studio Display, iMac, and Apple Watch styles.

Same-Project Localization

Keep localized screenshot versions inside one project. Translate text, copy layouts across languages, and export the version you need.

Native Mac

Design with a desktop workspace, inspector, project sidebar, exports, Quick Mockups, and iCloud-backed project continuity.

Clean Status Bar

Turn supported raw screenshots and recordings into cleaner, presentation-ready mockups by replacing captured status bar clutter inside device frames.

Quick Mockups

Save reusable mockup presets, run them with Shortcuts, or use the Mac menu bar helper for fast drag-and-drop output.

## Tone

Preferred tone:

- Professional.
- Native.
- Precise.
- Creative.
- Workflow-oriented.
- Built for shipping.

Avoid sounding like:

- A generic AI art app.
- A social template app.
- A web screenshot wrapper.
- A one-click-only automation toy.

## App Review Context Starters

If App Review notes are needed later, verify the live build first, then these source-backed points may help:

- The app creates screenshot-based marketing assets and device mockups.
- Main projects sync through iCloud/CloudKit-backed persistence.
- Quick Mockups integrate with Shortcuts/App Intents.
- Translation uses Apple Translation APIs for screenshot text.
- Premium access and export credits are handled through RevenueCat-backed purchase flows.
- AI-assisted editing exists, but not all AI features should be described as on-device.

## Open Questions Before Final ASC Submission

Verify these live before submission:

- Final app name, subtitle, and platform availability.
- Exact supported OS and device matrix.
- Whether the Mac app is included in the specific release being submitted.
- Final in-app purchase lineup and prices.
- Privacy labels and provider disclosures.
- Whether to mention Codex MCP publicly.
- Which screenshot set should lead the first impression.
- Whether "official" can be used for any 3D frame assets.

## Source Basis

This context is derived from current source inspection plus the refreshed website docs:

- [BEZEL_STUDIO_MASTER_GUIDE.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/BEZEL_STUDIO_MASTER_GUIDE.md)
- [BZLS_APP_TECHNICAL_REPORT.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/BZLS_APP_TECHNICAL_REPORT.md)
- [assets-description.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/public/assets/source/notes/assets-description.md)
- `/Users/parthantala/Code/Swift/Bzls`
