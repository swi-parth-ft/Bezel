# App Store Connect Context

This file is the starting context for App Store Connect metadata, review notes, and listing copy for Bezel Studio.

It is based only on the Markdown documentation currently present in this repository:

- `BEZEL_STUDIO_MASTER_GUIDE.md`
- `BZLS_APP_TECHNICAL_REPORT.md`
- `public/assets/source/notes/assets-description.md`

If future App Store metadata, screenshots, or review notes conflict with this file, the live app build and current product decisions should win.

## Product Summary

Bezel Studio is a native Apple creative studio for building App Store screenshots, device mockups, marketing visuals, and motion previews. The strongest source-backed product story is an iPhone and iPad app for turning screenshots, recordings, and visual assets into polished promotional creatives without leaving the Apple ecosystem.

The product is not positioned as a simple screenshot wrapper. The docs consistently describe it as a full canvas editor built for app marketing workflows.

Current release-backed additions that should now be treated as source-backed:

- Photo backgrounds can be blurred directly inside the canvas workflow.
- Clean Status Bar can replace messy captured status bars in supported framed screenshots and recordings with a clean Apple-style 9:41 status bar treatment.
- Frame Reflections can add mirrored depth to supported device mockups with blur, opacity, fade, and surface shadow controls.
- Translation flows have been improved while staying on-device and editable in-place.
- Full projects can now be imported from and exported to `.bezel` files.

## Core Positioning

Bezel Studio should be framed as:

- An App Store screenshot maker
- A multi-device mockup studio
- A project-based creative workspace for app marketing
- A motion-capable tool for preview visuals
- A native Apple workflow for screenshot localization and export
- A frame-polish workflow for Clean Status Bar, reflections, and touch cues
- A reusable project-file workflow through `.bezel` import and export

The clearest value proposition from the docs is speed without losing creative control: users can generate fast mockups through presets and Shortcuts, or build more advanced multi-canvas campaigns with deep editing tools.

## Source-Backed Feature Pillars

### 1. Project-Based Multi-Canvas Editing

The app is organized around projects containing one or more canvases. This matters because the docs explicitly position Bezel Studio as suitable for complete screenshot sets, not just one-off images.

Source-backed ideas to carry into metadata:

- Multi-canvas projects
- Grid-style canvas management
- Reuse across a full screenshot campaign
- Copy and paste of items or full canvases across projects

### 2. Device Frames and Marketing Composition

The docs describe a frame system for Apple hardware mockups, including single-device and multi-device scenes. Confirmed frame categories include iPhone, iPad, Apple Watch, MacBook, iMac, and Apple TV templates.

Relevant metadata language:

- Apple device mockups
- Multi-device compositions
- Screenshot placement inside device frames
- Static and video content inside frames
- Clean Status Bar cleanup for supported screenshots and recordings inside frames
- Frame Reflections for supported device mockups
- Touch cues for framed interaction callouts

### 3. Rich Visual Editing

The Markdown docs describe a full editing surface with:

- Text overlays
- Custom fonts
- Gradient fills
- Stroke and shadow styling
- Glass-style text presentation
- Images and stickers
- Background images
- Background photo blur controls
- Gradients, patterns, emoji backgrounds, and lighting
- Layer ordering
- Gesture-based transforms and 3-axis rotation
- PencilKit drawing

This supports positioning the app as a creative editor, not only a mockup exporter.

### 4. Motion and Video Output

Bezel Studio includes a motion workflow called `Canvas Motion`, with keyframe-based animation for visibility, position, rotation, and scale. The docs also confirm that export can render images or videos depending on whether motion or embedded frame video is present.

Safe claims:

- Animate App Store preview visuals
- Create motion-ready marketing layouts
- Export stills and videos

### 5. Localization

The docs explicitly describe translation as on-device and offline, powered by Apple translation APIs. Users can translate the current canvas or all canvases in a project.

This is one of the strongest differentiated claims in the current Markdown set:

- Localize screenshot sets
- Translate one canvas or an entire project
- Use improved on-device translation flows
- Keep translated output editable inside the same canvas workflow

### 6. Project Import and Export

The current source now includes a `.bezel` project archive format with import coordination, archive encoding/decoding, and Info.plist document-type registration.

Safe claims:

- Import complete `.bezel` project files
- Export full projects for reuse or handoff
- Preserve project assets, including frame-video data, inside the archive flow

### 7. AI and Automation

The docs describe two different intelligence/automation tracks:

- BezelAI for natural-language canvas edits
- Quick Mockups for Shortcut-driven automation

BezelAI is described as a structured editing system that can modify text, images, frames, backgrounds, lighting, canvas size, and motion. Quick Mockups are described as reusable presets that can be run from Siri Shortcuts or App Intents, including image or movie input.

Customer-facing wording should stay high level:

- AI-assisted editing
- Natural-language creative changes
- Fast mockup automation with Shortcuts

## Best-Fit User Jobs

The Markdown docs support these primary use cases:

- Build a full App Store screenshot set inside one project
- Turn a raw screenshot into a polished iPhone or iPad mockup
- Clean up captured status bars in supported framed screenshots or recordings
- Add frame reflections and touch cues to supported mockups
- Create localized screenshot variants for different languages or regions
- Move full projects with `.bezel` import and export
- Build motion-driven preview visuals
- Generate fast one-frame mockups through Shortcuts
- Reuse layouts, styles, and canvases across campaigns

## Target Users

The best-supported audience from the docs is:

- Indie app developers
- App marketers and growth teams
- Designers producing App Store creatives
- Creators managing repeated Apple-platform launch assets

## Platform Context and Guardrails

This is the most important section for keeping App Store copy accurate.

Source-backed platform picture from the Markdown docs:

- iPhone and iPad are the clearly supported full editor surfaces
- Main project data uses SwiftData with CloudKit sync
- Quick Mockup presets are stored separately and locally
- A macOS target exists in the codebase context described by the docs
- The checked-in macOS view is described as minimal or placeholder, not full editor parity

Practical rule for ASC copy:

- Do describe the product as native to the Apple ecosystem
- Do describe iPhone and iPad editing confidently
- Do not claim full Mac editor parity unless that is separately verified in the shipping build

## Differentiators Worth Emphasizing

The docs repeatedly suggest that Bezel Studio stands out because it combines:

- Full project and canvas management instead of one-image editing
- Native Apple-device-focused mockup workflows
- Clean Status Bar cleanup for supported frame media
- Frame Reflection depth controls for supported mockups
- Rich typography and styling tools
- Motion support for preview visuals
- Offline translation for localization workflows
- Full-project `.bezel` import/export
- iCloud continuity for main projects
- Shortcut-based quick mockup automation
- AI-assisted editing on top of manual control

## Internal Implementation Context That Informs Messaging

These details should shape messaging, even if they are not all customer-facing:

- Main projects are persisted with SwiftData and CloudKit-backed sync
- The app treats projects as nested canvas payloads rather than isolated single documents
- Export supports background continuation and live activity progress
- Clean Status Bar normalization is part of supported frame-media rendering
- Frame reflection state is part of frame overlay rendering and `.bezel` archive preservation
- Frame videos are stored separately from the main project payload
- Image handling is optimized through downsampling
- Background removal and sticker creation are part of the image workflow

These details reinforce a message of a serious native tool built for repeated production use.

## Monetization Context

The docs describe premium gating via RevenueCat and a paywall flow. They also explicitly state that microphone-driven AI mode is premium-gated on supported devices.

What this means for ASC context:

- The app supports in-app purchase based premium access
- Exact subscription names, pricing, and offer structure should be taken from the live product, not inferred from these docs alone

## Screenshot and Creative Direction Context

The asset guide maps the current visual storytelling to these product themes:

- iCloud syncing and continuity
- Dynamic backgrounds
- Photo background blur
- Clean Status Bar
- Frame Reflections
- BezelAI
- Canvas management
- Image Playground and stickers
- Layer hierarchy
- Pro layouts and multi-device frames
- Canvas Motion and keyframes
- Typography
- Translation for localized assets

This is useful when deciding which App Store screenshots should communicate the product story first.

## Messaging Priorities for ASC

If space is limited, the docs suggest leading with these ideas first:

1. Create App Store screenshots and mockups on iPhone and iPad
2. Build full multi-canvas campaigns, not just single images
3. Add device frames, Clean Status Bar cleanup, frame reflections, typography, backgrounds, layers, and motion
4. Localize screenshot sets with improved on-device translation
5. Import or export full `.bezel` projects when reuse matters
6. Export high-quality stills and videos
7. Use AI edits and Shortcuts for faster workflows

## Words and Phrases That Match the Docs

Strong phrases:

- App Store screenshots
- Apple device mockups
- Multi-canvas projects
- Preview visuals
- Localization workflows
- On-device translation
- Photo background blur
- Clean Status Bar
- Frame Reflections
- touch cues
- status bar cleanup
- `.bezel` project import/export
- Quick mockups
- Native creative workspace
- Motion-ready export

Phrases to use carefully:

- Mac editing
- Offline AI
- Fully automated screenshot generation
- Team collaboration

Those ideas are either only partially supported or not clearly proven by the Markdown sources alone.

## Claims To Avoid Without Separate Verification

- Full Mac editor parity
- Any exact OS version support
- Specific subscription pricing or package names
- Privacy nutrition label details
- Review-safe statements about every third-party service in the live build
- Claims that all AI features are on-device or offline
- Claims that the app replaces App Store Connect upload itself

## Draft Metadata Direction

This is not final copy. It is the direction supported by the Markdown docs.

### One-Sentence Positioning

Bezel Studio is a native Apple creative studio for making App Store screenshots, device mockups, localized assets, and motion-ready preview visuals.

### Short Description Ingredients

Use combinations of:

- App Store screenshot maker
- iPhone and iPad mockup creator
- multi-canvas project workflow
- clean status bar cleanup
- frame reflections
- typography, backgrounds, and layers
- motion and video export
- on-device translation
- AI-assisted editing
- Shortcuts quick mockups

## Draft App Store Connect Listing Copy

Use this as the current recommended listing direction. It intentionally uses `Clean Status Bar` as the feature name because it is direct, product-like, and easy to understand in screenshots, release notes, and search.

### Subtitle

App screenshots, made clean

### Promotional Text

New Clean Status Bar helps polish framed screenshots and screen recordings, and frame reflections add more depth to supported mockups.

### Keywords

app screenshots,mockups,device frames,clean status bar,screen recordings,app preview,reflection

### Full Description

Create clean, App Store-ready screenshots and device mockups directly on iPhone and iPad.

Bezel Studio turns raw screenshots, screen recordings, and visual assets into polished marketing creatives with Apple device frames, rich text, layered backgrounds, motion, and export tools built for launch workflows.

Add realistic frame reflections with blur, opacity, fade, and surface shadow controls to give supported mockups more depth without changing the main frame composition.

Clean Status Bar

Make framed screenshots and recordings feel presentation-ready. Clean Status Bar helps replace captured status bar clutter with a cleaner Apple-style 9:41 status bar treatment in supported frame media, so your app screens look cleaner inside iPhone and iPad mockups.

Frame Reflections

Add realistic frame reflections with blur, opacity, fade, and surface shadow controls to give supported mockups more depth without changing the main frame composition.

Build Full Screenshot Sets

Work in multi-canvas projects instead of one image at a time. Create a full App Store screenshot campaign, duplicate layouts, reuse styles, and keep every screen in one editable workspace.

Apple Device Mockups

Place screenshots or videos inside iPhone, iPad, Apple Watch, Mac, Apple TV, and multi-device frames. Adjust scale, rotation, layers, lighting, and perspective to create professional product visuals.

Canvas Motion

Animate frames, text, images, and canvas elements with keyframes. Export motion-ready preview visuals and social assets from the same project you use for still screenshots.

Design Tools for App Marketing

Add custom typography, gradient text, glass-style captions, stickers, drawings, photo backgrounds, blur, animated patterns, and lighting. Use layers and precise transforms to control every part of the composition.

Localization

Translate screenshot text with Apple translation APIs and keep the result editable inside the canvas. Localize one canvas or an entire project without rebuilding each layout from scratch.

Project Import and Export

Move complete projects with `.bezel` files, including linked frame-video assets. Reuse launch assets, hand off projects, or keep campaign versions organized.

Automation and AI

Use Quick Mockups with Shortcuts for fast one-frame mockups, or use BezelAI to describe edits and apply structured changes to your canvas.

Bezel Studio is built for indie developers, app marketers, designers, and creators who need polished screenshots, clean device mockups, localized assets, and motion-ready visuals for App Store Connect and beyond.

### What's New

Clean Status Bar is here.

Polish framed screenshots and screen recordings with a cleaner status bar treatment for supported device frames.

Add realistic frame reflections with blur and opacity controls for more dimensional mockups.

Also included: performance improvements and bug fixes.

### Screenshot Caption Ideas

- Clean Status Bar
- Polish captured app screens
- Remove status bar clutter
- Make framed recordings cleaner
- App Store-ready mockups
- Clean screenshots and videos

### Feature Callout Copy

Clean Status Bar helps turn raw app captures into cleaner, presentation-ready mockups. Apply it to supported screenshots and screen recordings inside device frames, then export stills or videos with the same polished look.

Frame Reflections add more depth to supported device mockups with mirrored reflections and adjustable blur, opacity, fade, and surface shadow controls.

### Tone

Preferred tone:

- Professional
- Native
- Creative
- Precise
- Workflow-oriented

Avoid sounding like:

- A generic AI art app
- A social template app
- A web screenshot wrapper

## App Review Context Starters

If App Review notes are needed later, these source-backed points are likely useful:

- The app is designed for creating screenshot-based marketing assets and mockups
- Main projects sync through iCloud/CloudKit-backed persistence
- Quick Mockups integrate with Siri Shortcuts/App Intents
- Translation is built on Apple translation APIs
- The app includes AI-assisted editing and premium-gated features

Any actual review note should still be verified against the shipping build and current entitlements.

## Open Questions Before Final ASC Submission

These are not answered reliably by the Markdown docs alone:

- Final App Store app name and subtitle
- Exact supported device and OS matrix
- Whether Mac distribution is included in the release being submitted
- Final in-app purchase lineup
- Final privacy answers and data use disclosures
- Whether AI/provider naming should appear in customer-facing metadata
- Which screenshot set should be primary for first impression

## Source Basis

This document is derived from:

- [BEZEL_STUDIO_MASTER_GUIDE.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/BEZEL_STUDIO_MASTER_GUIDE.md)
- [BZLS_APP_TECHNICAL_REPORT.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/BZLS_APP_TECHNICAL_REPORT.md)
- [assets-description.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/public/assets/source/notes/assets-description.md)
