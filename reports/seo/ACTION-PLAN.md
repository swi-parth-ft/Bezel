# Bezel Studio SEO Action Plan

Primary mode for `2026-05-06`: `conversion_path_optimization`

Reason: `app_store_click` rose to `7` and feature CTAs recovered, but guide CTA/download events remain `0`.

## Immediate

1. Watch whether early CTAs on the three active guide pages increase `guide_download_click`.
2. Watch whether guide-to-feature links increase feature-page visits from guide visitors.
3. Keep content expansion blocked until guide or deeper download intent improves.
4. Keep support operator on `follow_up_only`.

## Quick Wins

1. If the edited guide pages keep receiving visits but `guide_download_click` stays `0`, test CTA copy/order on the App Store button.
2. If guide-originated feature clicks rise but feature downloads do not, tighten the matching feature page CTA copy next.
3. If homepage CTR keeps improving but guide intent stays dead, keep routing work on guide templates instead of new pages.

## Deferred / External

1. Security headers still need host/CDN control.
2. PageSpeed failed during the deep audit; rerun later before performance claims.
3. New indexing/backlink asks stay deferred until existing 2026-04-15 submissions have outcomes.

## Success Check

- `npm run build` passes.
- `npm run seo:report -- --audit-origin http://127.0.0.1:4173` shows `0 / 46` on-page issues.
- `reports/seo/SEO-REPORT.html` exists and records the 2026-05-06 deep audit.
- Manual state remains `follow_up_only` with no broad new backlink or indexing queue.
