# Action Plan

Date: 2026-04-22
Primary mode: `conversion_path_optimization`
Support operator: `follow_up_only`

## Immediate

1. Keep homepage routes pointed at the strongest commercial feature page and watch whether `feature_page_click` rises.
2. Watch whether `device-frames` becomes the main commercial entry and whether any feature page starts producing `feature_download_click`.
3. Keep the guide hub and top guides pointed at install CTA paths, but do not publish new content until deeper funnel events move.
4. Treat security headers as host/CDN work, not repo work.

## Next Run Decision Gates

1. If `feature_download_click > 0`, keep optimizing the strongest feature page path before publishing new content.
2. If `feature_page_click` rises but `feature_download_click` stays `0`, run page-specific CTA experiments on the highest-traffic feature page.
3. If support-feature pages still look underlinked, add one small contextual link layer from the most relevant guides or feature pages.
4. If indexing follow-up shows commercial pages still not crawled after the current wait window, support operator can resume a small manual queue.
5. If security headers remain missing, leave them to the host/CDN owner.

## Explicit Non-Goals

- No broad new guide cluster next run unless measurement and commercial routing improve first.
- No new backlink queue while submitted targets still await live URLs or outcomes.
- No repeated URL Inspection requests inside the current recheck window.
- No content expansion until deeper download intent shows movement.

## Completed Since Audit

- Report and shared-state files were refreshed with the 2026-04-22 live metrics.
- Deep audit confirmed crawlability, `llms.txt`, broken links, and redirects are fine.
- Deep audit confirmed the real blocker is still funnel depth, not a fresh technical fault.
