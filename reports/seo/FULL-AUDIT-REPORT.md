# Full Audit Report

Date: 2026-04-22
Mode under review: `conversion_path_optimization`

## Audit Trigger

Deep audit ran because:

- homepage traffic concentration remains too high
- `feature_download_click=0`
- `guide_download_click=0`
- `feature_cta_click=0`
- internal link depth still leaves several support pages weakly linked

Install data is unavailable here, so `app_store_click` is only a download proxy.

## Evidence

- 7d traffic mix: `home=38`, `features=3`, `guides=3`
- 7d conversion proxy: `app_store_click=5`
- 7d CTA events: `home_download_click=5`, `feature_download_click=0`, `guide_download_click=0`, `feature_page_click=2`, `feature_cta_click=0`, `guide_cta_click=3`
- Search Console opportunity page: homepage only, `3` clicks / `36` impressions / `8.33%` CTR / position `7.5`
- Robots check: `200`, sitemap declared, AI crawler management explicitly allowed
- `llms.txt` check: `200`, `llms-full.txt` present, recommended starting pages curated
- Broken link check: `35` links tested, `0` broken, `2` redirected
- Redirect check: `0` internal hops
- Internal link crawl sample: `21` pages crawled, `42` unique pages found, `187` internal links, `7` potential orphan candidates
- Security headers check: `25/100`, with `6` missing headers
- PageSpeed: rate-limited by Google API, so no fresh CWV numbers this run

## Findings

| Severity | Finding | Evidence | Impact | Fix |
| --- | --- | --- | --- | --- |
| High | Homepage still carries too much commercial load | Search opportunity page remains homepage-only; traffic mix is `home=38` vs `features=3` | Users and crawlers keep starting and ending too shallow | Keep pushing stronger routes into commercial feature pages from the homepage and guide hub |
| High | Deeper download intent remains unproven | `feature_download_click=0`, `guide_download_click=0`, `feature_cta_click=0` | Existing content is not yet demonstrating install-path health | Prioritize routing and CTA path changes over new content |
| Medium | Feature discovery is still thin on supporting pages | Internal link crawl found `7` potential orphan candidates, all low-link support pages | Supporting feature pages may stay under-discovered and under-reinforced | Add a small support-link layer from homepage and related feature pages |
| Medium | Technical foundations are mostly adequate, but security headers are missing | Robots, llms, broken links, and redirects passed; security score was `25/100` | Strategy should not hide behind technical excuses, but host/CDN hardening still matters | Treat routing and intent alignment as primary; escalate headers to host/CDN owner |
| Unknown | PageSpeed status still unresolved | Google API rate-limited again | Could hide performance issues, but not confirmed | Retry later with available quota or add an API key |

## Strategy Read

Current strategy still needs correction, not expansion.

- Prior runs improved structure and homepage intent.
- They did not prove deeper conversion health.
- New guide publishing would still be low-signal.
- Best move remains stronger homepage routing into commercial feature pages, then keeping App Store handoff visible.

## Shipped Response

- No site code shipped this audit run.
- Report and shared-state files were refreshed.

## Conclusion

Latest work appears to help structure and feature discovery, not downloads yet.

This run keeps the bias on conversion routing, not content expansion.

## Post-Audit Note

- On 2026-04-16, the homepage title, OG title, and Twitter title were shortened in the local build, and preview validation cleared the only on-page issue the audit had flagged.
- On 2026-04-18, the homepage CTA balance was reworked to push more visitors into the iPhone mockup feature before the App Store handoff.
- On 2026-04-22, the live run still showed flat deeper-funnel events, so the strategy stays conversion-first.
