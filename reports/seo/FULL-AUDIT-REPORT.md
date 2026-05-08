# Bezel Studio SEO Audit

Scope: full-site operating audit with live GA4/Search Console refresh, deep SEO dashboard, and measurement-source repair on `2026-05-08`.

Overall rating: `80/100`
Score confidence: `medium`

Primary mode: `measurement_repair`

Reason: App Store installs are unavailable in this environment, so `app_store_click` is only a proxy. The proxy fell from `7` to `5`, feature-path depth improved to `feature_download_click=3`, and guide-originated download intent stayed at `0`. The report did not show which pages produced the proxy events, so today’s highest-confidence move was to repair reporting fidelity before more conversion copy or content work.

Top 3 issues:
- Guide download intent is still dead: `guide_cta_click=0`, `guide_download_click=0`.
- Download proxy fell from `7` to `5`, though feature-path depth improved.
- Search Console opportunity remains homepage-only: `https://bezelstudio.app/` has `73` impressions, `4` clicks, and `5.48%` CTR.

Top 3 opportunities:
- Preserve the working path now proven by source reporting: homepage -> `/features/device-frames.html` -> App Store.
- Use event-source reporting next run to decide whether guide-page CTAs need copy/order work or whether guide discovery is simply too thin.
- Keep support-worker effort on existing indexing/backlink follow-up instead of opening a broad new queue.

## Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| Measurement fidelity | Warning | Confirmed | Aggregate event counts hid which pages were producing App Store clicks. | Before this run, the report had `app_store_click=5` but no page-source table. | Added GA4 `eventName` + `pagePath` source reporting to `scripts/seo_operator.py`. |
| Download proxy | Warning | Confirmed | App Store click proxy softened from the last run. | `app_store_click=5` today vs `7` on 2026-05-06. | Do not publish content; use source reporting to protect and improve the working feature route. |
| Feature path | Pass | Confirmed | Feature depth improved despite lower total proxy clicks. | `feature_page_click=5`, `feature_cta_click=3`, `feature_download_click=3`. Event source table shows `/features/device-frames.html` produced `3` App Store clicks. | Keep device-frames as the strongest commercial route. |
| Guide path | Warning | Confirmed | Guide pages received visits but no guide download intent. | Four guide pages have `1` view each; `guide_download_click=0` and no guide rows appear in the App Store source table. | Reassess guide CTA copy/order next run only if guide traffic persists. |
| Deep audit | Warning | Confirmed | Technical dashboard scored `80/100`; PageSpeed failed in the audit environment. | `reports/seo/SEO-REPORT.html`; robots, social meta, redirects, `llms.txt`, broken links, internal links, entity, hreflang, duplicate-content, parse, readability, and article checks completed. | Treat PageSpeed as environment-limited today; security headers remain host/CDN-level. |

## Shipped Response

- Added event-source reporting to `scripts/seo_operator.py`.
- Refreshed `reports/seo/latest.md` and `reports/seo/2026-05-08.md`.
- Regenerated `reports/seo/SEO-REPORT.html`.
- Updated manual indexing/backlink handoff files with `follow_up_only`.

## Self-Review

Latest work helps measurement fidelity, not downloads directly yet.

Content expansion stays blocked. The next run should watch whether source rows continue to show `/features/device-frames.html` as the only feature download path and whether guide rows remain absent.

App Store installs remain unavailable in automation, so `app_store_click` is only a proxy.

## Artifacts

- HTML dashboard: `reports/seo/SEO-REPORT.html`
- Live metrics report: `reports/seo/latest.md`
- Dated report: `reports/seo/2026-05-08.md`
- Shared support-worker handoff: `reports/seo/manual-indexing-backlink-ledger.md` and `reports/seo/manual-indexing-backlink-state.json`
