# Full Audit Report

Date: 2026-04-18
Mode under review: `conversion_path_optimization`

## Audit Trigger

Deep audit ran because:

- homepage traffic concentration remains too high
- `feature_download_click=0`
- `guide_download_click=0`
- `feature_cta_click=0`
- feature pages remain under-discovered relative to the homepage

Install data is unavailable here, so `app_store_click` is used only as a download proxy.

## Evidence

- 7d traffic mix: `home=44`, `features=2`, `guides=6`
- 7d conversion proxy: `app_store_click=5`
- 7d CTA events: `home_download_click=5`, `feature_download_click=0`, `guide_download_click=0`, `feature_page_click=2`, `feature_cta_click=0`, `guide_cta_click=6`
- Search Console opportunity page: homepage only, `3` clicks / `30` impressions / `10.0%` CTR / position `8.8`
- Robots check: `200` with sitemap declared and AI crawler management explicitly allowed
- `llms.txt` check: `200`, `100/100` quality score, `llms-full.txt` present
- Broken link check: `35` links tested, `0` broken, `2` redirected
- Redirect check: `0` hops
- Internal link crawl sample: `21` pages crawled, `42` unique pages, `195` internal links, `6` potential orphan pages
- Security headers check: `25/100`, with `6` missing headers
- PageSpeed: rate-limited by Google API, so no fresh CWV numbers this run

## Findings

| Severity | Finding | Evidence | Impact | Fix |
| --- | --- | --- | --- | --- |
| High | Homepage still carries too much commercial load | Search opportunity page is still homepage-only; traffic mix is `home=44` vs `features=2` | Users and crawlers keep starting and ending too shallow | Push stronger above-fold and mid-page routes into commercial feature pages |
| High | Deeper download intent remains unproven | `feature_download_click=0`, `guide_download_click=0`, `feature_cta_click=0` | Existing content is not yet demonstrating install-path health | Prioritize routing and CTA path changes over new content |
| Medium | Feature discovery is still thin on supporting pages | Internal link crawl found `6` potential orphan pages among support features | Supporting feature pages may stay under-discovered and under-reinforced | Add a small support-link layer from homepage and related feature pages |
| Medium | Technical foundations are mostly adequate, but security headers are missing | Robots, llms, broken links, and redirects passed; security score was `25/100` | Strategy should not hide behind technical excuses, but host/CDN hardening still matters | Treat routing and intent alignment as primary; escalate headers to host/CDN owner |
| Unknown | PageSpeed status still unresolved | Google API rate-limited again | Could hide performance issues, but not confirmed | Retry later with available quota or add an API key |

## Strategy Read

Current strategy still needs correction, not expansion.

- Previous runs improved structure and homepage intent.
- They did not prove deeper conversion health.
- New guide publishing this run would have been low-signal.
- Best move was to rebalance homepage routing toward feature pages, then keep App Store handoff visible.

## Shipped Response

- Homepage hero primary CTA now routes to `/features/device-frames.html`.
- Homepage keeps a direct App Store CTA as the secondary option.
- Homepage now includes a supporting-tools link row for underlinked feature pages: typography, images and stickers, draw and annotate, layer precision, 3-axis transforms, and undo and redo.

## Conclusion

Latest work appears to help structure and feature discovery, not downloads yet.

This run intentionally shifted from direct-download bias to a feature-first routing balance while preserving the App Store handoff.

## Post-Audit Note

- On 2026-04-16, the homepage title, OG title, and Twitter title were shortened in the local build, and preview validation cleared the only on-page issue the audit had flagged.
- On 2026-04-18, the homepage CTA balance was reworked to push more visitors into the iPhone mockup feature before the App Store handoff.
