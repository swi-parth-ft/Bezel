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

## Core Positioning

Bezel Studio should be framed as:

- An App Store screenshot maker
- A multi-device mockup studio
- A project-based creative workspace for app marketing
- A motion-capable tool for preview visuals
- A native Apple workflow for screenshot localization and export

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

### 3. Rich Visual Editing

The Markdown docs describe a full editing surface with:

- Text overlays
- Custom fonts
- Gradient fills
- Stroke and shadow styling
- Glass-style text presentation
- Images and stickers
- Background images
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
- Keep translated output editable inside the same canvas workflow

### 6. AI and Automation

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
- Create localized screenshot variants for different languages or regions
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
- Rich typography and styling tools
- Motion support for preview visuals
- Offline translation for localization workflows
- iCloud continuity for main projects
- Shortcut-based quick mockup automation
- AI-assisted editing on top of manual control

## Internal Implementation Context That Informs Messaging

These details should shape messaging, even if they are not all customer-facing:

- Main projects are persisted with SwiftData and CloudKit-backed sync
- The app treats projects as nested canvas payloads rather than isolated single documents
- Export supports background continuation and live activity progress
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
3. Add device frames, typography, backgrounds, layers, and motion
4. Localize screenshot sets with on-device translation
5. Export high-quality stills and videos
6. Use AI edits and Shortcuts for faster workflows

## Words and Phrases That Match the Docs

Strong phrases:

- App Store screenshots
- Apple device mockups
- Multi-canvas projects
- Preview visuals
- Localization workflows
- On-device translation
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
- typography, backgrounds, and layers
- motion and video export
- on-device translation
- AI-assisted editing
- Shortcuts quick mockups

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
