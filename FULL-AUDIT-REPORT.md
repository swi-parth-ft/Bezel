# Bezel Studio SEO Audit

Scope: full-site operating audit with live GA4/Search Console refresh, local production-preview audit, and conversion-path review on `2026-04-30`.

Overall rating: `72/100`
Score confidence: `medium`

Primary mode: `conversion_path_optimization`

Reason: measurement is clean at `0 / 46` on-page issues and `app_store_click` rose to `6`, but homepage concentration is worse at `52 / 55` tracked page views and guide intent is still `0`.

Top 3 issues:
- Homepage owns almost all tracked attention: `home=52`, `features=2`, `guides=1`.
- Deeper guide intent is still dead: `guide_cta_click=0`, `guide_download_click=0`.
- Homepage Search Console CTR fell to `1.89%` on `53` impressions even though average position improved to `7.4`.

Top 3 opportunities:
- Route homepage visitors into the active `bezel ai` commercial feature path above the fold.
- Give `/guides/` a direct above-fold guide action so guide visits can produce `guide_cta_click`.
- Keep App Store click growth under review because the proxy rose from `4` to `6`, but mostly as homepage download intent.

## Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| Conversion path | Warning | Confirmed | Homepage concentration is still too high for a site trying to drive installs. | GA4 7d mix: `home=52`, `features=2`, `guides=1`. | Add stronger above-fold routes from home into active commercial feature pages. |
| Download proxy | Warning | Confirmed | Download proxy improved, but remains shallow. | `app_store_click=6`, `home_download_click=6`, `feature_download_click=1`, `guide_download_click=0`. | Push users into feature and guide paths before App Store handoff. |
| Guide path | Warning | Confirmed | Guide discovery exists, but guide CTA and guide download signals are still zero. | `/guides/` has `1` page view; `guide_cta_click=0`, `guide_download_click=0`. | Add a top guide-hub CTA to the first screenshot guide. |
| Homepage CTR | Warning | Confirmed | Search result opportunity is still homepage-only and CTR weakened. | `https://bezelstudio.app/` shows `53` impressions, `1` click, `1.89%` CTR, average position `7.4`. | Keep homepage copy aligned to `App Store Screenshot Maker`, `iPhone mockup generator`, and `BezelAI`. |
| Measurement integrity | Pass | Confirmed | On-page audit remains clean after prior repairs. | `reports/seo/latest.md` shows `0 / 46` pages with issues. | Keep measurement repair closed unless new event gaps appear. |
| Deep audit | Warning | Confirmed | Technical dashboard stayed at `72/100`. | `reports/seo/SEO-REPORT.html`; PageSpeed errored/rate-limited, security headers missing, internal-link script flagged shallow crawl issues. | Treat security as host/CDN work; keep internal-link cleanup secondary to conversion path. |

## Shipped Response

- Added a prominent homepage hero route to `/features/bezel-ai-shortcuts.html`.
- Added an above-fold guide-hub CTA to `/guides/create-first-app-store-screenshot-project.html`.
- Corrected guide hub UI count from `25` to `27` live guides.
- Refreshed `reports/seo/latest.md`, `reports/seo/2026-04-30.md`, `reports/seo/SEO-REPORT.html`, and manual handoff files.

## Self-Review

Latest work appears to be helping download proxy at homepage level, but not deeper funnel depth yet.

Content expansion stays blocked. Next run should watch whether the new BezelAI hero route raises `feature_page_click` and whether the guide-hub first-guide CTA raises `guide_cta_click`.

App Store installs remain unavailable in automation, so `app_store_click` is only a proxy.

## Artifacts

- HTML dashboard: `reports/seo/SEO-REPORT.html`
- Live metrics report: `reports/seo/latest.md`
- Dated report: `reports/seo/2026-04-30.md`
- Shared support-worker handoff: `reports/seo/manual-indexing-backlink-ledger.md` and `reports/seo/manual-indexing-backlink-state.json`
