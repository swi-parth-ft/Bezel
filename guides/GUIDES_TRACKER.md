# Bezel Studio Guide Tracker

This file tracks which how-to guides already exist in the site, which ones are still planned, and what production work is still missing for each guide.

## Current Status

- Archive page exists: `guides/index.html`
- Live guide pages created: `12`
- Cover images: added for all live guides
- Step screenshot placeholders: present in local/dev only
- Real step-by-step screenshots: still needed for every live guide

## Live Guides

| Status | Guide Title | File | Cover Asset | Step Screenshots |
| --- | --- | --- | --- | --- |
| Live | How to create your first App Store screenshot project on iPhone. | `guides/create-first-app-store-screenshot-project.html` | Added | Pending |
| Live | How to make a clean iPhone mockup from a raw screenshot. | `guides/make-clean-iphone-mockup.html` | Added | Pending |
| Live | How to build a full App Store screenshot set in one project. | `guides/build-full-app-store-screenshot-set.html` | Added | Pending |
| Live | How to localize screenshot sets with Apple Translate. | `guides/localize-screenshot-sets-apple-translate.html` | Added | Pending |
| Live | How to create App Store preview visuals with Canvas Motion. | `guides/create-app-store-preview-visuals-canvas-motion.html` | Added | Pending |
| Live | How to make instant mockups with Quick Mockups and Shortcuts. | `guides/make-instant-mockups-with-shortcuts.html` | Added | Pending |
| Live | How to create reusable App Store screenshot templates. | `guides/create-reusable-app-screenshot-templates.html` | Added | Pending |
| Live | How to style App Store captions with gradients, shadows, strokes, and glass text. | `guides/style-app-store-captions.html` | Added | Pending |
| Live | How to use layers and 3-axis transforms to build more dimensional compositions. | `guides/use-layers-and-3-axis-transforms.html` | Added | Pending |
| Live | How to turn imported images into sticker assets with background removal. | `guides/create-sticker-assets-background-removal.html` | Added | Pending |
| Live | How to draw callouts and annotations with PencilKit. | `guides/draw-callouts-with-pencilkit.html` | Added | Pending |
| Live | How to export high-quality stills and videos from the same project. | `guides/export-stills-and-videos.html` | Added | Pending |

## Next Guides To Create

These are the strongest next additions because they deepen the product story without repeating the existing setup, localization, motion, and automation flows.

| Priority | Guide Title | Primary Product Area | Suggested Slug | Status |
| --- | --- | --- | --- | --- |
| High | How to reuse layouts across projects with copy and paste. | Project reuse | `guides/reuse-layouts-across-projects.html` | Not created |
| Medium | How to use BezelAI to redesign or refine a canvas. | BezelAI | `guides/use-bezel-ai-to-refine-a-canvas.html` | Not created |
| Medium | How to create multi-device promo visuals with iPhone, iPad, and Apple Watch. | Multi-device composition | `guides/create-multi-device-promo-visuals.html` | Not created |

## Screenshot Production Checklist

Use this checklist whenever a planned guide moves into production.

1. Choose the final guide title and slug.
2. Assign one existing feature or showcase asset as the cover image.
3. Capture the finished result image first.
4. Capture the setup state.
5. Capture the key editing steps in order.
6. Capture the export or final output state.
7. Replace local placeholder blocks with real screenshots.
8. Confirm the guide still reads cleanly in both desktop and mobile layouts.

## Recommended Capture Pattern

For most guides, the screenshot structure should be:

| Asset Type | Count | Notes |
| --- | --- | --- |
| Final result image | 1 | Use this as the strongest visual for the article |
| Setup image | 1 | Show the project or canvas before the workflow starts |
| Process images | 3-4 | Focus on the actual state changes, not generic full-screen captures |
| Tool or panel image | 1 | Useful when the workflow depends on a menu, sheet, or inspector |
| Export image | 1 | Show the final rendered still, video, or save/share state |

## Notes

- Live guide pages are already included in the site build and sitemap.
- Placeholder screenshot descriptions are hidden on the live website and only shown in local/dev.
- This file should be updated whenever a new guide page is created, renamed, or fully illustrated with real screenshots.
