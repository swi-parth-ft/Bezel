# Bezel Studio SEO Action Plan

Primary mode for `2026-04-30`: `conversion_path_optimization`

Reason: measurement is clean and `app_store_click` rose, but homepage traffic concentration is still `52 / 55` tracked page views and guide CTA/download events remain `0`.

## Immediate

1. Watch whether the new homepage BezelAI hero route increases `feature_page_click`.
2. Watch whether the new guide-hub first-guide CTA increases `guide_cta_click`.
3. Keep content expansion blocked until deeper feature or guide intent improves.
4. Keep support operator on `follow_up_only`.

## Quick Wins

1. If `/features/bezel-ai-shortcuts.html` gets more page views but no feature download growth, improve BezelAI feature CTA copy next.
2. If `/guides/` gets views but `guide_cta_click` remains `0`, test stronger guide-hub CTA hierarchy.
3. If homepage CTR stays below `2%`, revisit title/meta around the highest-impression homepage query.

## Deferred / External

1. Security headers still need host/CDN control.
2. PageSpeed was rate-limited during the deep audit; rerun later before performance claims.
3. Internal-link cleanup can wait unless money-page discovery fails again.

## Success Check

- `npm run build` passes.
- `npm run seo:report -- --audit-origin http://127.0.0.1:4173` shows `0 / 46` on-page issues.
- `reports/seo/SEO-REPORT.html` exists and records the 2026-04-30 deep audit.
- Manual state remains `follow_up_only` with no broad new backlink or indexing queue.
