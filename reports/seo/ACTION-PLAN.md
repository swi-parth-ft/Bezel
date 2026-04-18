# Action Plan

Date: 2026-04-18
Primary mode: `conversion_path_optimization`
Support operator: `follow_up_only`

## Immediate

1. Measure whether homepage commercial-path clicks rise after the feature-first hero CTA change.
2. Watch whether `device-frames` becomes the strongest commercial entry and whether `feature_page_click` rises from `2`.
3. Watch whether any traffic reaches `device-frames`, `projects-presets`, `translation`, `canvas-motion`, or `export-share` and then produces `feature_download_click`.
4. Recheck guide hub App Store clicks after the new homepage routing balance and supporting-tools links.

## Next Run Decision Gates

1. If `feature_download_click > 0`, keep optimizing strongest feature page path before publishing new content.
2. If `feature_page_click` rises but `feature_download_click` stays `0`, run page-specific CTA experiments on the highest-traffic feature page.
3. If support-feature pages still look underlinked, add one small contextual link layer from the most relevant guides or feature pages.
4. If indexing follow-up shows commercial pages still not crawled after the current wait window, support operator can resume a small manual queue.
5. If security headers remain missing, treat them as host/CDN work, not repo work.

## Explicit Non-Goals

- No broad new guide cluster next run unless measurement and commercial routing improve first.
- No new backlink queue while submitted targets still await live URLs or outcomes.
- No repeated URL Inspection requests inside the current recheck window.
- No content expansion until deeper download intent shows movement.

## Completed Since Audit

- Homepage hero now routes primary attention to the iPhone mockup generator feature page.
- Homepage now keeps a direct App Store CTA as the secondary option.
- Homepage now includes a small support-link row for underlinked feature pages.
- Local production build passes with the homepage routing change in place.
