# Bezel Studio SEO Action Plan

Primary mode for `2026-05-08`: `measurement_repair`

Reason: `app_store_click` fell to `5` while feature-depth events improved, and the report lacked source rows for conversion events. The repaired report now shows `/features/device-frames.html` produced `3` App Store clicks and `/` produced `2`.

## Immediate

1. Keep content expansion blocked until guide or deeper download intent improves.
2. Preserve the working homepage -> device frames -> App Store path.
3. Use the new event-source table next run before changing guide CTA copy again.
4. Keep support operator on `follow_up_only`.

## Quick Wins

1. If `/features/device-frames.html` keeps producing App Store clicks, strengthen adjacent links into that page from high-traffic guide and homepage sections.
2. If guide pages keep receiving visits but still have no source rows for `guide_download_click`, test the early guide App Store CTA copy/order.
3. If homepage CTR keeps improving but guide intent stays dead, favor commercial feature routing over new guide content.

## Deferred / External

1. Security headers still need host/CDN control.
2. PageSpeed failed during the deep audit; rerun later before performance claims.
3. New indexing/backlink asks stay deferred until existing 2026-04-15 submissions have outcomes.

## Success Check

- `npm run build` passes.
- `npm run seo:report -- --audit-origin http://127.0.0.1:4173` shows `0 / 46` on-page issues.
- `reports/seo/SEO-REPORT.html` exists and records the 2026-05-08 deep audit.
- Manual state remains `follow_up_only` with no broad new backlink or indexing queue.
