# Full Audit Report

Date: 2026-04-15
Mode under review: `conversion_path_optimization`

## Audit Trigger

Deep audit ran because:

- homepage traffic concentration remains too high
- `feature_download_click=0`
- `guide_download_click=0`
- `feature_cta_click=0`

Install data is unavailable here, so `app_store_click` is used only as a download proxy.

## Evidence

- 7d traffic mix: `home=66`, `features=4`, `guides=20`
- 7d conversion proxy: `app_store_click=2`
- 7d CTA events: `home_download_click=2`, `feature_download_click=0`, `guide_download_click=0`, `feature_page_click=3`, `feature_cta_click=0`, `guide_cta_click=15`
- Search Console opportunity page: homepage only, `4` clicks / `22` impressions / `18.18%` CTR / position `7.8`
- Deep audit HTML report: [`/Users/parthantala/.codex-profiles/speechactors/home/worktrees/5a25/BezelStudio/reports/seo/SEO-REPORT.html`](/Users/parthantala/.codex-profiles/speechactors/home/worktrees/5a25/BezelStudio/reports/seo/SEO-REPORT.html)
- Deep audit score: `82/100`
- Internal link crawl: `42` unique pages, `220` internal links, no obvious discovery collapse

## Findings

| Severity | Finding | Evidence | Impact | Fix |
| --- | --- | --- | --- | --- |
| High | Homepage still carries too much commercial load | Search opportunity page set is still homepage-only; `home=66` vs `features=4` | Users and crawlers keep starting and ending too shallow | Push stronger above-fold and mid-page routes into commercial feature pages |
| High | Deeper download intent remains unproven | `feature_download_click=0`, `guide_download_click=0`, `feature_cta_click=0` | Existing content is not yet demonstrating install-path health | Prioritize routing and CTA path changes over new content |
| Medium | Guide structure is improving faster than feature discovery | last-3-run feature views `6 -> 5 -> 4`, guide share `16 -> 19 -> 20` | More publishing would likely bias even harder toward guide browsing | Shift entry points toward money pages and feature hubs |
| Medium | Technical foundations are mostly adequate | robots, redirects, social meta, broken links, llms all passed in current audit | Strategy should not hide behind technical excuses | Treat routing and intent alignment as primary problem |
| Unknown | PageSpeed status still unresolved | Google API rate-limited again | Could hide performance issues, but not confirmed | Retry later with available quota or API key |

## Strategy Read

Current strategy needed correction, not expansion.

- Previous runs helped structure.
- They did not prove deeper conversion health.
- New guide publishing this run would have been low-signal.
- Strongest next move was conversion-path tightening on homepage and guide hub.

## Shipped Response

- Homepage meta title and description now lean harder into commercial terms.
- Homepage hero now routes second click into a commercial feature page, not deeper guide loop.
- Homepage now has above-fold commercial path links for top-intent workflows.
- Guide hub now includes stronger product-page and App Store CTA rows.

## Conclusion

Latest work before this run helped structure and top-level App Store intent a little, not deeper installs yet.

This run intentionally shifted from publishing bias to conversion-path work.
