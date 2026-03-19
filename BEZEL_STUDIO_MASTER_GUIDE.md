# Bezel Studio Master Guide

This document is intended to be the highest-context reference for Bezel Studio. It combines:

- Product behavior described by the app creator
- Source-backed implementation context from [BZLS_APP_TECHNICAL_REPORT.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/BZLS_APP_TECHNICAL_REPORT.md)
- Existing image-story mapping from [assets_description.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/iPhoneWebAssests/assets_description.md)

Where useful, this guide distinguishes between:

- Product intent: what the app is meant to do
- Current code-backed implementation: what is visible in the checked-in source today

## Overview

Bezel Studio is a native Apple-platform creative tool for building App Store screenshots, device mockups, marketing visuals, and motion previews directly on iPhone, iPad, and Mac. It is designed to let users go from raw screenshots or recordings to polished promotional assets without leaving the Apple ecosystem.

The app supports static and animated compositions, full project-based canvas management, rich typography, advanced background styling, Apple device frames, stickers, image editing, PencilKit drawing, offline translation, AI-assisted editing, iCloud sync, and high-quality export.

At its core, Bezel Studio is not just a screenshot wrapper. It is a full canvas editor tailored for app marketing.

## Current Code-Backed Platform Picture

The current source in `/Users/parthantala/Code/Swift/Bzls` shows:

- A full iPhone and iPad editor implemented in SwiftUI
- A SwiftData + CloudKit project store for the main app
- A separate local-only SwiftData store for quick mockup presets
- RevenueCat-based premium gating
- Apple Translation integration
- Image Playground integration
- A Gemini-backed BezelAI pipeline
- Background export support with live activity updates

Important implementation note:

- The iOS and iPadOS app is the full production surface in this repo
- A separate `BzlsMac` target exists, but the checked-in macOS view currently appears minimal or placeholder rather than full editor parity

So the product story is multi-device, but the current repository most clearly proves a full iPhone/iPad experience, with Mac-related continuity and environment support present in parts of the codebase.

## Product Positioning

Bezel Studio should be understood as:

- An App Store screenshot maker
- A multi-device mockup studio
- A motion design tool for App Store preview visuals
- A project-based creative workspace for Apple platform marketing
- A native, on-device editor that works across iPhone, iPad, and Mac

Its core value is speed without sacrificing control. Users can generate fast mockups through presets and shortcuts, or build highly custom compositions with deep editing controls.

## Core User Model

The product structure is:

- A user creates a `Project`
- A project contains one or more `Canvases`
- Each canvas contains multiple editable `Items`
- Items can be reordered using layers and animated independently

This makes Bezel Studio suitable for both:

- Quick one-off screenshot generation
- Large multi-screen marketing campaigns with many assets in one project

## Source-Backed Runtime Architecture

At runtime, the checked-in app follows this high-level structure:

```text
App launch
  -> `BzlsApp`
     -> prepare background export support
     -> configure RevenueCat
     -> create SwiftData container for `ProjectRecord` + `ProjectAssetRecord`
     -> inject `PresetStore`
     -> gate onboarding, tips, paywall, and BezelAI intro
     -> open `ProjectsRootView`

Projects root
  -> load encoded `Project` payloads from SwiftData
  -> hydrate project models into memory
  -> show project gallery / search / sort / settings / export / translation
  -> navigate into `ProjectEditorView`

Project editor
  -> select current canvas
  -> open `ContentView`
  -> allow canvas switching, add-canvas flow, save/discard behavior

Canvas editor
  -> mutate `CanvasState`
  -> render frames, text, images, drawing, backgrounds, lighting, motion
  -> run translation / AI / export / quick actions
  -> persist project payload back to SwiftData
  -> persist frame-video binaries separately through `ProjectAssetRecord`
```

This matters because the app is not modeled as many tiny documents. It is modeled as an encoded `Project` payload with nested canvas state, while heavier media like frame videos can be stored separately.

## Core Technical Model

The current model hierarchy in code is:

```text
Project
  -> [CanvasState]
     -> [FrameOverlay]
     -> [TextOverlay]
     -> [ImageOverlay]
     -> [CanvasLayerID]
     -> CanvasAnimationTrack
```

Key implementation details:

- `Project` is encoded into `ProjectRecord.payload`
- `CanvasState` owns background, sizing, overlays, lighting, and canvas-wide animation
- Explicit z-order is stored as `CanvasLayerID` instead of being inferred from separate arrays
- Frame videos are persisted separately through `ProjectAssetRecord`
- Quick mockups are stored outside the main CloudKit-backed project store

This structure is a major reason the app can support copy/paste, multi-canvas projects, motion, export, and AI edits within a single consistent model.

## Main App Flow

When a user opens the app, they can create a new project. The project creation flow is one of the most important parts of the experience because it sets up the foundation for all later editing.

### New Project Creation

When the user taps `Create Project`, they can configure the following:

#### 1. Default Frame

The user can choose the default Apple device frame that should be added first. This helps the project start with the right device context immediately.

Examples:

- iPhone frame
- iPad frame
- Mac frame
- Apple Watch frame

#### 2. Canvas Size

The user can define canvas size in multiple ways:

- From presets
- From aspect ratio
- From exact pixel dimensions

The user can also save custom ratios or custom pixel sizes as presets for future use. This is important for repeatable production workflows and team consistency.

#### 3. Background System

The user can choose the default project background, and this can also be changed later. The background system is rich and highly customizable.

Supported background types include:

- Preset themes
- Transparent background
- Solid color
- Gradient background
- Emoji patterns
- Pattern overlays

Background customization includes:

- Custom gradient direction
- Custom colors
- Emoji choice
- Emoji size
- Emoji spacing
- Pattern color
- Pattern opacity
- Pattern animation
- Pattern movement
- Pattern color animation

#### 4. Lighting

Users can apply lighting effects during project creation and also modify them later. Lighting helps give device frames and compositions more depth and polish.

### Important Behavior

Everything configured during project creation remains editable later. The initial setup is not destructive or permanent. Users can revisit and modify frames, canvas size, background, lighting, and styling after the project is created.

## How Features Connect

One of the most important things to understand about Bezel Studio is that its features are not isolated tools. They are connected through shared canvas state, shared rendering, and shared export logic.

Examples of how systems connect:

- Project creation sets the initial `CanvasState`, which later powers editing, motion, export, quick mockups, and AI operations.
- Backgrounds, patterns, emoji systems, and lighting are part of the same canvas model that is used for both live preview and export rendering.
- Text, image, and frame items all participate in the same `layerOrder`, so manual editing, AI edits, copy/paste, and export share the same depth model.
- Motion is stored in persisted animation tracks, so it is not just a preview effect. The same motion data is consumed during video export.
- Quick Mockup presets are effectively stored `CanvasState` snapshots, which means the quick automation path reuses the full canvas model rather than a separate template language.
- Translation works on text overlays already inside the canvas model, so translated output remains part of the same editable composition.
- BezelAI acts on structured canvas actions, which means AI edits plug into the same underlying frame, text, image, background, layer, and motion systems used by the manual editor.
- Export uses the same compositing vocabulary as the live canvas, which helps keep preview and final output aligned.

## Project Structure

A single project can contain many canvases. This is essential because App Store presentation rarely involves just one image. A project is intended to hold an entire asset set.

Examples of what a project may include:

- Multiple App Store screenshots for a listing
- Alternative language versions
- Multiple device-specific layouts
- Motion preview variants
- Campaign variations with different backgrounds or copy

This project-based model lets users manage a complete visual campaign inside one workspace rather than splitting assets across separate files.

## Canvas System

Each project contains canvases, and each canvas is an independent composition surface.

Inside a canvas, the user can build layered visuals using frames, text, stickers, drawings, images, videos, and more.

### Grid Mode

Users can switch to `Grid Mode` to see all canvases in the current project in a grid layout.

This is useful for:

- Managing many canvases at once
- Reviewing consistency across a campaign
- Duplicating or reorganizing work
- Navigating quickly between screens

Grid mode turns the project into a broader management workspace rather than a single-canvas editor.

## Canvas Elements and Editing

Inside each canvas, the user can add and manipulate many kinds of content.

### 1. Frames

Users can add additional Apple device frames to the canvas at any time. A single canvas can contain one frame or many frames.

Supported use cases include:

- Single-device mockups
- Multi-device ecosystem scenes
- Side-by-side comparisons
- Watch, phone, tablet, and desktop combinations

Frames can contain either:

- Images
- Videos

This means users can build both static graphics and animated preview compositions.

### 2. Text

Text is a major part of the product and is fully customizable.

Text customization includes:

- Font selection
- Solid color fills
- Gradient text fills
- Custom gradient direction
- Shadows
- Borders
- Glass effect behind text

This allows users to create headline-driven App Store creatives, feature callouts, captions, and premium marketing layouts directly inside the app.

### 3. Stickers, Badges, and Decorative Assets

Users can add:

- Pre-added stickers
- Pre-added badges
- Decorative assets

These help call out features, add visual emphasis, and build more expressive marketing compositions.

### 4. Images

Users can add images into the canvas and use them in several ways.

Image-related capabilities include:

- Importing images into a canvas
- Saving imported images in-app for reuse later
- Removing image backgrounds
- Adding sticker-style borders
- Turning images into sticker-like elements

This makes the app useful not only for screenshot framing but also for flexible visual storytelling.

### 5. AI Sticker Generation with Image Playground

Users can generate new sticker assets using Image Playground. This expands the available visual library beyond built-in resources and lets users create custom assets on demand.

### 6. Drawing with PencilKit

Users can draw directly inside the canvas using PencilKit and access a full set of drawing tools and colors.

This enables:

- Hand-drawn annotations
- Highlighting UI details
- Freeform sketches
- Organic callouts

Drawing is part of the composition system, not a separate disconnected tool.

### 7. Layers

Users can rearrange every element on the canvas using layers to control what appears in front of or behind other elements.

This includes managing depth for:

- Frames
- Text
- Images
- Stickers
- Drawings
- Decorative items

Layer control is critical for precision layout and professional composition building.

## Transform and Gesture System

Users can directly manipulate canvas items using touch and gesture controls.

Supported interactions include:

- Drag
- Pinch
- Rotate

Users can also rotate items in all three axes, enabling more dynamic and spatial compositions.

This makes the editor feel tactile and expressive rather than limited to flat 2D placement.

## Motion Editing

Bezel Studio includes a dedicated motion workflow through `Canvas Motion`.

When the user opens motion editing, they can add keyframe animations to items individually. This allows them to build polished, animated marketing visuals and App Store preview content.

### Motion Capabilities

Users can animate:

- Visibility with show and hide behavior
- Position
- Rotation
- Scale or size

Animations can be different between keyframes, allowing expressive transitions and more professional motion output.

This is intended for creating beautiful visuals and dynamic previews, not just static screenshots.

## Translation

Bezel Studio includes an on-device translation feature powered by Apple Translate and designed to work fully offline.

Users can:

- Translate text in a single canvas
- Translate all canvases in a project

This is valuable for localization workflows, especially when generating App Store assets for multiple languages and regions.

Because the translation is offline and on-device, it aligns with the native Apple-first nature of the product.

Current code-backed note:

- The app uses Apple translation APIs plus language detection
- It supports translating the current canvas or all canvases in a project
- The implementation batches text entries, translates them together, then maps them back into the correct overlays

## Copy, Paste, and Cross-Project Reuse

Users can copy and paste:

- Individual items
- Entire canvases

Copy and paste works across projects, making it easy to reuse layouts, scenes, text treatments, and components without rebuilding them from scratch.

This is a key productivity feature for teams or creators producing large volumes of related assets.

## Undo and Redo

Undo and redo are supported throughout the product.

This is important because the app supports:

- Deep visual editing
- Layer management
- Gesture-based transforms
- Animation editing
- Background styling
- AI-assisted changes

Reliable undo and redo are essential to make experimentation safe.

## Media Support

Frames can contain either images or videos.

This means Bezel Studio supports:

- Static App Store screenshots
- Motion-based preview assets
- Hybrid creative workflows where stills and video are both part of a campaign

The product is not limited to static screen placement.

## BezelAI

BezelAI is an AI-powered editing mode that can be turned on for any canvas.

When enabled, the user can describe what they want to create, add, modify, or animate using natural language. The system then performs the requested changes.

Examples of requests include:

- Add a new visual element
- Redesign the canvas
- Change the layout
- Add or modify animations
- Adjust visual styling

BezelAI is meant to reduce manual effort and make advanced editing accessible through intent rather than only through controls.

Current code-backed note:

- The AI path is structured, not freeform
- The editor builds a `CanvasAIContext`
- The prompt is sent through a Gemini client
- The response is parsed into typed edit actions such as adding/updating text, frames, images, background, lighting, canvas size, and motion
- Those actions are then applied directly to the live canvas model

## iCloud Sync

Everything syncs through iCloud so users can work on their projects from anywhere across:

- iPhone
- iPad
- Mac

This continuity is a major part of the product story. A user can begin on one device and continue on another without losing context.

Typical workflow:

- Start a project on iPhone
- Refine layout on iPad
- Continue on Mac or return later on another device

Current code-backed note:

- Main projects are stored in SwiftData with CloudKit enabled
- Quick Mockup presets are stored in a separate local-only SwiftData store with CloudKit disabled

## Export and Render Quality

Bezel Studio is designed to render high-quality output suitable for shipping and publishing.

Output goals include:

- High-resolution image export
- High-quality video export
- Professional results suitable for App Store listings and marketing

Rendering quality is part of the product promise, especially for creators producing customer-facing promotional assets.

Current code-backed note:

- Still export and video export share the same canvas compositing concepts
- The app can switch to a video render path when canvas motion or frame video is present
- Background exports can continue with background-task and live-activity support
- Transparent export and layered lighting/pattern rendering are part of the export architecture

## Quick Mockup Feature

In addition to full project editing, Bezel Studio includes a `Quick Mockup` workflow designed to work with Shortcuts.

This is a fast, automation-oriented path for users who need mockups instantly without opening a full editing session.

### Quick Mockup Workflow

Users can create predefined quick mockups that contain a single frame. These act like reusable templates.

Then, through Shortcuts, users can:

- Take a screenshot on device
- Trigger a shortcut
- See a list of available quick mockups
- Choose one
- Automatically generate the mockup
- Save the final result to Photos

Users can also:

- Share a photo into the workflow
- Generate a mockup from the shared image

This makes Bezel Studio useful for automation-heavy creators, marketers, and rapid publishing workflows.

Current code-backed note:

- Quick Mockups are backed by a stored `CanvasState`
- Siri Shortcuts/App Intents can accept either an image or a movie
- The intent renders the preset canvas, optionally saves the output to Photos, and returns the generated file
- The quick-mockup store includes migration logic from older storage formats

## Hidden and Supporting Features

The checked-in code also reveals several less-obvious capabilities that are important context even if they are not always front-and-center in marketing:

- Keyboard commands exist for save/share, canvas navigation, insert actions, undo/redo, grid toggle, layers, and preview toggle
- Frame videos are stored separately from the main project payload to avoid forcing all media into one giant serialized blob
- The app has explicit support for background export continuation and live activity progress reporting
- Image insertion is optimized with downsampling and separate display/source handling to reduce memory pressure
- Background removal can check whether an image even has a removable subject before attempting a cutout
- Sticker generation includes border creation and preset save/unsave flows
- The frame system includes more than phones: watch, iPad, iPhone, MacBook, iMac, and Apple TV templates are present in the frame catalog
- iPad receives specialized floating-panel workflows and a broader workspace treatment
- Voice-driven AI editing is platform-gated and uses newer speech-analysis APIs rather than only a basic speech-to-text flow

## Technical Pseudocode Summary

Below is the most useful high-level pseudocode view of the app as a whole:

```text
create_project()
  canvas = CanvasState.newDefault()
  canvas.apply(default_frame)
  canvas.apply(canvas_size_choice)
  canvas.apply(background_choice)
  canvas.apply(pattern_choice)
  canvas.apply(lighting_choice)
  project = Project(name, canvases: [canvas])
  persist(project)

edit_canvas(project, canvas_index)
  canvas = project.canvases[canvas_index]
  while editor_open:
    if user_adds_text:
      canvas.textOverlays.append(new_text_overlay)
      canvas.layerOrder.insert(.text(id))
    if user_adds_image:
      canvas.imageOverlays.append(new_image_overlay)
      canvas.layerOrder.insert(.image(id))
    if user_adds_frame:
      canvas.frameOverlays.append(new_frame_overlay)
      canvas.layerOrder.insert(.frame(id))
    if user_reorders_layers:
      mutate(canvas.layerOrder)
    if user_animates_item:
      mutate(item.animationTrack)
    if user_animates_canvas:
      mutate(canvas.canvasAnimation)
    if user_uses_translation:
      translate(text_overlays_for_scope)
    if user_uses_ai:
      context = build_canvas_ai_context(canvas)
      plan = generate_edit_plan(context, prompt)
      apply(plan, to: canvas)
    persist(project)

export(project, scope)
  for canvas in selected_canvases:
    if canvas_has_video_or_motion:
      render_video(canvas)
    else:
      render_still(canvas)
  save_or_share(output)
```

## Important Files for Deep Understanding

These are the files that matter most if someone needs to rebuild the app’s mental model quickly:

- [BzlsApp.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/BzlsApp.swift)
- [ProjectsRootView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectsRootView.swift)
- [ProjectEditorView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectEditorView.swift)
- [ContentView.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ContentView.swift)
- [CanvasModels.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasModels.swift)
- [ProjectPersistence.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectPersistence.swift)
- [ProjectAssetRecord.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ProjectAssetRecord.swift)
- [CanvasAIAssistant.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/CanvasAIAssistant.swift)
- [GeminiLiveClient.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/GeminiLiveClient.swift)
- [QuickMockupDefaults.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/QuickMockupDefaults.swift)
- [ShortcutMockupIntent.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ShortcutMockupIntent.swift)
- [ImageBackgroundRemoval.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ImageBackgroundRemoval.swift)
- [ImageGeneration.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ImageGeneration.swift)
- [ExportLiveActivitySupport.swift](/Users/parthantala/Code/Swift/Bzls/Bzls/ExportLiveActivitySupport.swift)

## Functional Summary

In practical terms, Bezel Studio supports all of the following major workflows:

- Create a multi-canvas project
- Define custom canvas sizes and save presets
- Apply backgrounds, patterns, emoji systems, and lighting
- Add Apple device frames
- Insert images or videos into frames
- Add and style text deeply
- Add stickers, badges, and image-based assets
- Remove image backgrounds
- Generate stickers using Image Playground
- Draw with PencilKit
- Manage layers
- Use drag, pinch, and rotation gestures
- Rotate items in 3D axes
- Animate with keyframes in Canvas Motion
- Translate one canvas or many canvases offline
- Copy and paste items or full canvases across projects
- Use undo and redo throughout the experience
- Sync everything with iCloud
- Export high-quality final assets
- Generate fast mockups through Shortcuts
- Use BezelAI for natural-language editing and motion requests

## Information Architecture Recommendation

If this app is being documented for product, marketing, onboarding, or engineering alignment, the cleanest conceptual structure is:

### A. Project Creation

- Default frame
- Canvas sizing
- Backgrounds
- Patterns
- Emoji systems
- Lighting
- Saved presets

### B. Project Management

- Multi-canvas projects
- Grid mode
- Project-wide organization

### C. Canvas Editing

- Frames
- Text
- Stickers and badges
- Images
- Background removal
- Drawing
- Layers
- Gesture controls
- 3-axis transforms

### D. Motion

- Canvas Motion
- Keyframes
- Show and hide behavior
- Position, scale, and rotation animation

### E. Intelligence and Automation

- BezelAI
- Image Playground
- Quick Mockups
- Shortcuts support

### F. Localization and Sync

- Offline translation with Apple Translate
- iCloud continuity

### G. Output

- High-quality export
- Static and video deliverables

## Image Resource Mapping

The existing image resource document in [assets_description.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/iPhoneWebAssests/assets_description.md) describes the meaning of the current showcase assets. Those resources represent the following product stories:

### 1. iCloud Syncing

Files:

- `icloud.png`
- `icloud-bg.png`
- `icloud-ipad.png`

Meaning:

- Shows continuity between iPhone and iPad
- Communicates seamless project syncing and multi-device editing

### 2. Dynamic Backgrounds

Files:

- `backgrounds.png`
- `backgrounds-bg.png`
- `backgrounds-ipad.png`

Meaning:

- Shows gradient, pattern, emoji, and image-driven background customization

### 3. Bezel AI

Files:

- `bezelAI.png`
- `bezelAI-bg.png`
- `bezelAI-ipad.png`

Meaning:

- Shows conversational AI editing and command-driven creation

### 4. Canvas Management

Files:

- `canvasMangement.png`
- `canvasMangement-bg.png`
- `canvasMangement-ipad.png`

Meaning:

- Shows multi-canvas organization and grid-style project management

### 5. Image Playground and Stickers

Files:

- `imagePlayground.png`
- `imagePlayground-bg.png`
- `imagePlayground-ipad.png`

Meaning:

- Shows AI-assisted sticker generation and image cutout workflows

### 6. Layer Hierarchy

Files:

- `layers.png`
- `layers-bg.png`
- `layers-ipad.png`

Meaning:

- Shows precise front-to-back arrangement and composition control

### 7. Pro Layouts and Multi-Device Frames

Files:

- `prolayput.png`
- `prolayput-bg.png`
- `prolayput-ipad.png`

Meaning:

- Shows ecosystem compositions containing multiple Apple devices in one canvas

### 8. Canvas Motion and Keyframes

Files:

- `CanvasMotion.png`
- `CanvasMotion-bg.png`
- `CanvasMotion-ipad.png`

Meaning:

- Shows item-based animation and keyframe editing

### 9. Typography

Files:

- `typography.png`
- `typography-bg.png`
- `typography-ipad.png`

Meaning:

- Shows premium caption design and text styling flexibility

### 10. Translate Assets

Files:

- `translate.png`
- `translate-bg.png`
- `translate-ipad.png`

Meaning:

- Shows offline translation for localized screenshot production

## Plain-Language Product Definition

Bezel Studio is a native Apple creative studio for building screenshot-based marketing assets. It lets users create multi-canvas projects, place images and videos into Apple device frames, style backgrounds and typography in depth, manage layers, draw with PencilKit, animate individual items with keyframes, translate content offline, sync work across devices with iCloud, export high-quality deliverables, and automate fast single-frame mockup generation through Shortcuts. On top of this manual control, BezelAI allows users to describe edits and animations in natural language and have the canvas update automatically.

## Suggested Use of This Document

This file can serve as:

- A master internal product description
- A base document for marketing copy
- A product spec starting point
- A reference for designers or developers
- A source document for generating website, App Store, or onboarding content

## Notes

- This guide is based on the current repository context plus the detailed product behavior described by the app creator.
- It now also includes source-backed implementation notes from the checked-in `Bzls` app code.
- The deepest source analysis lives in [BZLS_APP_TECHNICAL_REPORT.md](/Users/parthantala/Code/Swift/Websites/BezelStudio/BZLS_APP_TECHNICAL_REPORT.md).
