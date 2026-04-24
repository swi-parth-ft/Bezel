# Action Plan

Date: 2026-04-24
Primary mode: `conversion_path_optimization`
Support operator: `follow_up_only`

## Immediate

1. Watch whether homepage title/description changes improve CTR for the homepage Search Console opportunity page.
2. Watch whether the new above-fold BezelAI feature link raises `feature_page_click` from `0`.
3. Watch whether the new above-fold starter-guide link raises `guide_cta_click` and guide page views from `0`.
4. Keep the guide hub and top guides pointed at install CTA paths, but do not publish new content until deeper funnel events move.
5. Treat security headers as host/CDN work, not repo work.

## Next Run Decision Gates

1. If `feature_download_click > 0` persists, keep optimizing the strongest feature page path before publishing new content.
2. If `feature_page_click` rises but `feature_download_click` stays flat, run page-specific CTA experiments on the highest-traffic feature page.
3. If support-feature pages still look underlinked, add one small contextual link layer from the most relevant guides or feature pages.
4. If indexing follow-up shows commercial pages still not crawled after the current wait window, support operator can resume a small manual queue.
5. If security headers remain missing, leave them to the host/CDN owner.
6. If `app_store_click` stays flat or worse next run, run deeper strategy review before shipping more page changes.

## Explicit Non-Goals

- No broad new guide cluster next run unless measurement and commercial routing improve first.
- No new backlink queue while submitted targets still await live URLs or outcomes.
- No repeated URL Inspection requests inside the current recheck window.
- No content expansion until deeper download intent shows movement.

## Completed Since Audit

- Report and shared-state files were refreshed with the 2026-04-24 live metrics.
- Deep audit confirmed crawlability, `llms.txt`, broken links, and redirects are fine.
- Deep audit scored `80/100`; PageSpeed was blocked by Google API rate limiting.
- Homepage meta tags were adjusted around `BezelAI`, the current query leader.
- Above-fold homepage routing now links to BezelAI and the first screenshot guide.
