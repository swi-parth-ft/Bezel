# Full Audit Report

Date: 2026-04-24
Mode under review: `conversion_path_optimization`

## Audit Trigger

Deep audit ran because:

- homepage traffic concentration remains too high
- `app_store_click` fell from `5` to `2`
- `feature_page_click=0`
- `guide_download_click=0`
- `guide_cta_click=0`
- internal link depth still leaves several support pages weakly linked

Install data is unavailable here, so `app_store_click` is only a download proxy.

## Evidence

- 7d traffic mix: `home=15`, `features=2`, `guides=0`
- 7d conversion proxy: `app_store_click=2`
- 7d CTA events: `home_download_click=1`, `feature_download_click=1`, `guide_download_click=0`, `feature_page_click=0`, `feature_cta_click=1`, `guide_cta_click=0`
- Search Console opportunity page: homepage only, `3` clicks / `39` impressions / `7.69%` CTR / position `7.1`
- Trending Search Console query leader: `bezel ai`
- Robots check: `200`, sitemap declared, AI crawler management explicitly allowed
- `llms.txt` check: `200`, `llms-full.txt` present, recommended starting pages curated
- Broken link check: `35` links tested, `0` broken, `2` redirected
- Redirect check: `0` internal hops
- Internal link crawl sample: `33` pages crawled, `42` unique pages found, `257` internal links, `6` potential orphan candidates
- Security headers check: `25/100`, with `6` missing headers
- PageSpeed: rate-limited by Google API, so no fresh CWV numbers this run
- Generated audit dashboard: `reports/seo/SEO-REPORT.html`, overall score `80/100`

## Findings

| Severity | Finding | Evidence | Impact | Fix |
| --- | --- | --- | --- | --- |
| High | Homepage still carries too much commercial load | Search opportunity page remains homepage-only; traffic mix is `home=15` vs `features=2` and `guides=0` | Users and crawlers keep starting and ending too shallow | Keep pushing stronger routes into commercial feature pages and starter guides from the homepage |
| High | Download proxy weakened this run | `app_store_click` moved from `5` to `2`; home download clicks fell from `5` to `1` | Latest structure work is not yet translating into install proxy growth | Prioritize homepage CTR and above-fold routing over new content |
| Medium | BezelAI query demand is not reflected strongly enough on the homepage | `bezel ai` is the trending query leader while the homepage title did not mention BezelAI before this run | Search-result alignment may suppress CTR and route quality for the one visible opportunity page | Add BezelAI to homepage meta tags and above-fold feature routing |
| Medium | Guide path is currently dead in analytics | `guides=0`, `guide_cta_click=0`, `guide_download_click=0` | Existing guides cannot support downloads if homepage users never enter them | Add a top-of-page starter-guide path from the homepage |
| Medium | Feature discovery is still thin on supporting pages | Internal link crawl found `6` potential orphan candidates, all low-link support pages | Supporting feature pages may stay under-discovered and under-reinforced | Add contextual links later only if commercial paths keep improving |
| Medium | Technical foundations are mostly adequate, but security headers are missing | Robots, llms, broken links, and redirects passed; security score was `25/100` | Strategy should not hide behind technical excuses, but host/CDN hardening still matters | Treat routing and intent alignment as primary; escalate headers to host/CDN owner |
| Unknown | PageSpeed status still unresolved | Google API rate-limited again | Could hide performance issues, but not confirmed | Retry later with available quota or add an API key |

## Strategy Read

Current strategy still needs conversion correction, not expansion.

- Prior runs improved structure and homepage intent.
- This run shows one feature download and one feature CTA click, but the overall App Store proxy weakened.
- New guide publishing would still be low-signal.
- Best move remains stronger homepage search-result alignment and above-fold routing into BezelAI, commercial feature pages, and the strongest starter guide.

## Shipped Response

- Homepage title, OG title, and Twitter title now include `BezelAI`.
- Homepage meta, OG, and Twitter descriptions now mention BezelAI edits.
- Hero quick links now include `/features/bezel-ai-shortcuts.html`.
- Hero quick links now include `/guides/create-first-app-store-screenshot-project.html`.
- Report and shared-state files were refreshed.

## Conclusion

Latest work appears to help search-result alignment and routing, not downloads yet.

This run keeps the bias on conversion routing, not content expansion.

## Post-Audit Note

- On 2026-04-16, the homepage title, OG title, and Twitter title were shortened in the local build, and preview validation cleared the only on-page issue the audit had flagged.
- On 2026-04-18, the homepage CTA balance was reworked to push more visitors into the iPhone mockup feature before the App Store handoff.
- On 2026-04-22, the live run still showed flat deeper-funnel events, so the strategy stayed conversion-first.
- On 2026-04-24, `app_store_click` weakened but feature CTA/download events finally registered `1`; strategy stays conversion-first and avoids content expansion.
