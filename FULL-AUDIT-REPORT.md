# Bezel Studio SEO Audit

Scope: full-site operating audit with live GA4/Search Console refresh, local on-page validation, and deep SEO dashboard on `2026-05-27`.

Overall rating: `80/100`
Score confidence: `medium`

Primary mode: `conversion_path_optimization`

Reason: App Store installs are unavailable in this environment, so `app_store_click` is only a proxy. The proxy improved from `5` on 2026-05-08 to `25`, but `23 / 25` App Store clicks came from the homepage, homepage traffic remains above the 70% concentration gate, and commercial feature pages have Search Console impressions with zero clicks.

Top 3 issues:
- Homepage still dominates the funnel: `388 / 513` tracked page views and `23 / 25` App Store clicks came from `/`.
- Feature-depth and guide-depth downloads remain weak: `feature_download_click=2`, `guide_download_click=0`.
- Search Console shows commercial feature pages with impressions but zero clicks, led by `/features/bezel-ai-shortcuts.html` at `45` impressions, `0` clicks, average position `6.8`.

Top 3 opportunities:
- Improve commercial feature-page snippets before adding more pages.
- Keep the homepage App Store path intact while increasing qualified feature-page entry.
- Keep support-worker effort on existing indexing/backlink follow-up instead of opening a broad new queue.

## Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| Download proxy | Warning | Confirmed | Total proxy improved, but remains homepage-heavy. | `app_store_click=25`; source rows show `/` produced `23`. | Optimize commercial feature SERP paths and preserve homepage App Store handoff. |
| Feature SERP CTR | Warning | Confirmed | Feature pages have impressions but no clicks. | `/features/bezel-ai-shortcuts.html`: `45` impressions, `0` clicks, average position `6.8`. | Updated title/meta/social snippets around `BezelAI App Screenshot Editor`. |
| On-page hygiene | Warning | Confirmed | One feature page title exceeded local audit limits. | `/features/images-stickers.html` title was `68` characters. | Shortened title/social/schema name to `48` characters. |
| Guide path | Warning | Confirmed | Guide CTA improved, but no guide download intent. | `guide_cta_click=6`, `guide_download_click=0`. | Do not add new guides; continue watching guide-to-feature handoff. |
| Deep audit | Warning | Confirmed | Technical dashboard scored `80/100`; PageSpeed failed in the audit environment. | `reports/seo/SEO-REPORT.html`; robots, security headers, social meta, redirects, `llms.txt`, broken links, internal links, entity, link profile, hreflang, duplicate-content, parse, readability, and article checks completed. | Treat PageSpeed as environment-limited today; security headers remain host/CDN-level. |

## Shipped Response

- Updated `/features/bezel-ai-shortcuts.html` title, meta description, Open Graph/Twitter metadata, and social image alt text.
- Shortened `/features/images-stickers.html` title, Open Graph title, Twitter title, and JSON-LD page name.
- Refreshed `reports/seo/latest.md` and `reports/seo/2026-05-27.md`.
- Regenerated `reports/seo/SEO-REPORT.html`.
- Updated manual indexing/backlink handoff files with `follow_up_only`.

## Self-Review

Latest work appears to help qualified feature-page discovery and on-page hygiene, not proven downloads yet.

Content expansion stays blocked. The next run should watch whether `/features/bezel-ai-shortcuts.html` CTR and feature-source App Store clicks move; if not, optimize `/features/typography.html` and `/features/clean-status-bar.html` snippets next.

App Store installs remain unavailable in automation, so `app_store_click` is only a proxy.

## Artifacts

- HTML dashboard: `reports/seo/SEO-REPORT.html`
- Live metrics report: `reports/seo/latest.md`
- Dated report: `reports/seo/2026-05-27.md`
- Shared support-worker handoff: `reports/seo/manual-indexing-backlink-ledger.md` and `reports/seo/manual-indexing-backlink-state.json`
