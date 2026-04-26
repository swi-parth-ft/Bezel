# Bezel Studio SEO Action Plan

Primary mode for `2026-04-26`: `measurement_repair`

Reason: Sunday audit found four live pages with missing GA4 loader coverage. Until repaired, page-specific CTA and download signals from those URLs were incomplete.

## Immediate

1. Ship GA4 loader restoration on the four affected clean-status/reflection pages.
2. Ship missing Twitter metadata on those same pages.
3. Rebuild site and rerun `npm run seo:report -- --audit-origin http://127.0.0.1:4173`.

## Quick Wins

1. Watch repaired pages for new `feature_cta_click`, `feature_download_click`, `guide_cta_click`, or `guide_download_click` activity over the next 1-2 runs.
2. Re-run the Sunday audit and confirm on-page issue count returns to `0 / 46`.
3. Keep support operator on `follow_up_only`; do not create a new indexing or backlink queue.

## Strategic Next

1. Return to `conversion_path_optimization` if repaired measurement stays clean.
2. Improve homepage CTR on `https://bezelstudio.app/`, the only meaningful Search Console opportunity page this run.
3. Reduce homepage concentration by improving routes from homepage and guide hub into commercial feature pages.
4. Add more internal links into the `8` underlinked pages found in the Sunday crawl.

## Deferred / External

1. Recheck PageSpeed later; this run was rate-limited.
2. Fix missing security headers through hosting or CDN controls, not repo code.
3. Replace legacy `HowTo` schema on the two clean-status/reflection guides in a future technical cleanup run.

## Success Check

- `reports/seo/latest.md` shows `Pages with on-page audit issues: 0 / 46`
- `reports/seo/SEO-REPORT.html` exists and documents the Sunday audit
- Shared manual-state files reflect `measurement_repair` + `follow_up_only`
- Remote branch contains validated changes
