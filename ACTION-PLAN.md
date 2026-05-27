# Bezel Studio SEO Action Plan

Primary mode for `2026-05-27`: `conversion_path_optimization`

Reason: `app_store_click` rose to `25`, but App Store installs are unavailable in this environment so that remains only a proxy. The proxy is still homepage-heavy (`23 / 25` App Store clicks from `/`), homepage traffic remains above the 70% concentration gate, and feature pages now have Search Console impressions with zero clicks.

## Immediate

1. Keep content expansion blocked until guide or deeper feature download intent improves.
2. Watch whether `/features/bezel-ai-shortcuts.html` moves from impressions to clicks after the snippet update.
3. Preserve the working homepage App Store path while improving commercial feature-page CTR.
4. Keep support operator on `follow_up_only`.

## Quick Wins

1. If `/features/bezel-ai-shortcuts.html` stays at `0` CTR, test a second title/description variant.
2. If `/features/typography.html` and `/features/clean-status-bar.html` keep impressions with no clicks, update their snippets next.
3. If feature-source App Store clicks rise, strengthen matching internal links into those feature pages.

## Deferred / External

1. Security headers still need host/CDN control.
2. PageSpeed failed during the deep audit; rerun later before performance claims.
3. New indexing/backlink asks stay deferred until existing 2026-04-15 submissions have outcomes.

## Success Check

- `npm run build` passes.
- `npm run seo:report -- --audit-origin http://127.0.0.1:4173` shows `0 / 47` on-page issues.
- `reports/seo/SEO-REPORT.html` exists and records the 2026-05-27 deep audit.
- Manual state remains `follow_up_only` with no broad new backlink or indexing queue.
