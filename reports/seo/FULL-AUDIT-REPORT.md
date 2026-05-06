# Bezel Studio SEO Audit

Scope: full-site operating audit with live GA4/Search Console refresh, local production-preview audit, and conversion-path review on `2026-05-06`.

Overall rating: `72/100`
Score confidence: `medium`

Primary mode: `conversion_path_optimization`

Reason: measurement is clean at `0 / 46` on-page issues and `app_store_click` improved to `7`, but guide handoff is still `0` for both `guide_cta_click` and `guide_download_click`.

Top 3 issues:
- Guide download intent is still dead: `guide_cta_click=0`, `guide_download_click=0`.
- Homepage still owns the largest share of tracked attention: `home=23`, `features=6`, `guides=4`.
- Search Console opportunity remains homepage-only: `https://bezelstudio.app/` has `67` impressions, `3` clicks, and `4.48%` CTR.

Top 3 opportunities:
- Convert the guides that already received traffic into App Store or feature-page handoff paths earlier in the page.
- Keep the recovered feature funnel moving: `feature_page_click=4`, `feature_cta_click=2`, and `feature_download_click=2`.
- Keep support-worker effort on existing indexing/backlink follow-up instead of opening a broad new queue.

## Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| Guide path | Warning | Confirmed | Guide discovery exists, but guide CTA and guide download signals are still zero. | GA4 7d: four guide pages have `1` page view each, while `guide_cta_click=0` and `guide_download_click=0`. | Add early guide-page CTAs to the active guide pages with direct App Store and matching feature-page handoffs. |
| Download proxy | Info | Confirmed | Download proxy improved and deeper feature intent recovered. | `app_store_click=7`, `feature_page_click=4`, `feature_cta_click=2`, `feature_download_click=2`. | Keep conversion work focused on the remaining weak guide path, not new content. |
| Traffic mix | Warning | Confirmed | Homepage concentration improved but remains the largest attention bucket. | GA4 7d mix: `home=23`, `features=6`, `guides=4`. | Keep homepage-to-money-page routes in place and watch whether guide CTAs begin firing. |
| Search visibility | Info | Confirmed | Search Console is still sparse and homepage-led. | Homepage opportunity: `67` impressions, `3` clicks, `4.48%` CTR, avg position `7.2`. | Do not publish new pages until existing money pages and guide handoff show stronger conversion signals. |
| Measurement integrity | Pass | Confirmed | On-page audit remains clean after local preview validation. | `reports/seo/latest.md` shows `0 / 46` pages with issues. | Keep measurement repair closed unless new event coverage gaps appear. |
| Deep audit | Warning | Confirmed | Technical dashboard scored `72/100`; PageSpeed failed in the audit environment. | `reports/seo/SEO-REPORT.html`; robots, social meta, redirects, `llms.txt`, broken links, internal links, entity, hreflang, duplicate-content, parse, readability, and article checks completed. | Treat PageSpeed as environment-limited today; continue conversion path work. |

## Shipped Response

- Added early CTA rows to `/guides/create-multi-device-promo-visuals.html`.
- Added early CTA rows to `/guides/review-app-store-screenshot-set-before-export.html`.
- Added early CTA rows to `/guides/use-bezel-ai-to-refine-a-canvas.html`.
- Refreshed `reports/seo/latest.md`, `reports/seo/2026-05-06.md`, `reports/seo/SEO-REPORT.html`, and manual handoff files.

## Self-Review

Latest work appears to be helping download proxy and feature-path depth, but not guide downloads yet.

Content expansion stays blocked. Next run should watch whether the three active guide-page CTAs raise `guide_download_click` and whether matching feature-page links raise guide-originated `feature_page_click`.

App Store installs remain unavailable in automation, so `app_store_click` is only a proxy.

## Artifacts

- HTML dashboard: `reports/seo/SEO-REPORT.html`
- Live metrics report: `reports/seo/latest.md`
- Dated report: `reports/seo/2026-05-06.md`
- Shared support-worker handoff: `reports/seo/manual-indexing-backlink-ledger.md` and `reports/seo/manual-indexing-backlink-state.json`
