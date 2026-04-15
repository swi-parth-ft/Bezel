# Action Plan

Date: 2026-04-15
Primary mode: `conversion_path_optimization`
Support operator: `follow_up_only`

## Immediate

1. Measure whether homepage commercial-path clicks rise after this deploy.
2. Watch whether any traffic reaches `device-frames`, `projects-presets`, `translation`, `canvas-motion`, or `export-share` and then produces `feature_download_click`.
3. Recheck guide hub App Store clicks after new top and bottom CTA rows.

## Next Run Decision Gates

1. If `feature_download_click > 0`, keep optimizing strongest feature page path before publishing new content.
2. If `feature_page_click` rises but `feature_download_click` stays `0`, run page-specific CTA experiments on highest-traffic feature page.
3. If guide hub App Store clicks stay `0`, strengthen guide-card-to-feature routing further and reduce guide-loop bias.
4. If indexing follow-up shows commercial pages still not crawled after the current wait window, support operator can resume small manual queue.

## Explicit Non-Goals

- No broad new guide cluster next run unless measurement and commercial routing improve first.
- No new backlink queue while submitted targets still await live URLs or outcomes.
- No repeated URL Inspection requests inside current recheck window.
