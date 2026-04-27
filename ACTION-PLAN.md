# Bezel Studio SEO Action Plan

Primary mode for `2026-04-27`: `conversion_path_optimization`

Reason: measurement repair held, but homepage still owns most tracked attention and deeper guide intent remains zero.

## Immediate

1. Tighten homepage title/description and social copy around `App Store Screenshot Maker` + `iPhone mockups`.
2. Add an above-the-fold commercial route block on the homepage.
3. Rebuild site and rerun `npm run seo:report -- --audit-origin http://127.0.0.1:4173`.
4. Re-run Sunday deep audit and refresh `reports/seo/SEO-REPORT.html`.

## Quick Wins

1. Watch for movement in `feature_page_click`, `feature_cta_click`, and `guide_cta_click` over the next 1-2 runs.
2. Keep support operator on `follow_up_only`; do not open a new indexing or backlink queue.
3. Keep content expansion blocked until deeper download intent improves.

## Strategic Next

1. If feature discovery still stays near `1`, challenge homepage above-the-fold strategy harder.
2. If guide hub still gets views with `guide_cta_click=0`, tighten guide-hub commercial CTA hierarchy next.
3. If two more runs stay flat, propose a prompt/strategy upgrade instead of publishing more content.

## Deferred / External

1. Recheck PageSpeed later; current audit was rate-limited.
2. Fix security headers through host/CDN controls, not repo code.
3. Clean up underlinked secondary guides in a later internal-link pass if conversion routing starts working.

## Success Check

- `reports/seo/latest.md` still shows `0 / 46` pages with on-page audit issues.
- `reports/seo/SEO-REPORT.html` exists for the Sunday deep audit.
- Shared manual-state files reflect `conversion_path_optimization` + `follow_up_only`.
- Remote branch contains validated homepage route changes.
