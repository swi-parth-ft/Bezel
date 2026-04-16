# Manual Indexing And Backlink Ledger

Persistent queue for manual Google Search Console indexing work and backlink/outreach work.

## Current GSC Situation

Source: user screenshots on 2026-04-14.

- Indexed: `7`
- Not indexed: `16`
- Reason shown: `Discovered - currently not indexed`
- Validation: `16` pending, `0` failed
- Example URLs show `Last crawled: N/A`

Interpretation: Google knows these URLs but has not crawled them yet. This is crawl scheduling/priority, not confirmed page rejection.

Update 2026-04-15: user reported URL Inspection indexing requests were submitted for the recommended URLs. Next check should wait 3-7 days, then record whether each URL is indexed, still discovered, crawled but not indexed, or has a new last-crawled date.

Update 2026-04-15 (SEO operator run): primary mode was `conversion_path_optimization`. Support operator directive is `follow_up_only`. No new manual queue should be opened until the current recheck window expires or live backlink URLs arrive.

Update 2026-04-16 (SEO operator run): homepage title CTR fix shipped locally and preview validation passed. Manual queue stays unchanged. Still `follow_up_only` until the current indexing and backlink recheck window expires or live URLs arrive.

## URL Inspection Queue

| Priority | URL | Page type | Known GSC status | Last crawled | Manual action | Date requested | Next action | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `https://bezelstudio.app/guides/` | Guide hub | Discovered, not indexed | N/A | Indexing requested | 2026-04-15 | Wait 3-7 days, then recheck status | Hub connects all guides; submit first. |
| 2 | `https://bezelstudio.app/features/device-frames.html` | Commercial feature | Discovered, not indexed | N/A | Indexing requested | 2026-04-15 | Wait 3-7 days, then recheck status | iPhone mockup generator intent. |
| 3 | `https://bezelstudio.app/features/projects-presets.html` | Commercial feature | Unknown / likely discovered | Unknown | Indexing requested | 2026-04-15 | Wait 3-7 days, then recheck status | App screenshot templates intent. |
| 4 | `https://bezelstudio.app/features/translation.html` | Commercial feature | Discovered, not indexed | N/A | Indexing requested | 2026-04-15 | Wait 3-7 days, then recheck status | Localization workflow intent. |
| 5 | `https://bezelstudio.app/features/canvas-motion.html` | Commercial feature | Unknown / likely discovered | Unknown | Indexing requested | 2026-04-15 | Wait 3-7 days, then recheck status | App preview video intent. |
| 6 | `https://bezelstudio.app/features/export-share.html` | Commercial feature | Unknown / likely discovered | Unknown | Indexing requested | 2026-04-15 | Wait 3-7 days, then recheck status | Export/download-adjacent intent. |
| 7 | `https://bezelstudio.app/features/copy-paste-projects.html` | Commercial feature | Unknown / likely discovered | Unknown | Indexing requested | 2026-04-15 | Wait 3-7 days, then recheck status | Reusable layout intent; supports new release-QA cluster. |
| 8 | `https://bezelstudio.app/guides/reuse-layouts-across-projects.html` | Guide | New | Unknown | Not requested | - | Request after feature pages | New release-QA parent path. |
| 9 | `https://bezelstudio.app/guides/review-app-store-screenshot-set-before-export.html` | Guide | New | Unknown | Not requested | - | Request after feature pages | Strong release-QA intent. |

## Manual Report-Back Format

After doing URL Inspection, report back:

- URL
- Google-selected canonical
- Live test result
- Indexing request submitted yes/no
- Current status reason
- Last crawled date
- Any screenshot/error

## Backlink Queue

| Priority | Target | URL | Type | Status | Anchor text | Manual next step | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Product Hunt | `https://www.producthunt.com/` | Launch/profile | Submitted | `Bezel Studio App Store screenshot maker` | Wait for live URL or approval status | User reported backlink submission on 2026-04-15; live URL not provided yet. |
| 2 | AlternativeTo | `https://alternativeto.net/` | Software directory | Submitted | `Bezel Studio` | Wait for live URL or approval status | User reported backlink submission on 2026-04-15; live URL not provided yet. |
| 3 | SaaSHub | `https://www.saashub.com/` | Product directory | Submitted | `App Store screenshot maker` | Wait for live URL or approval status | User reported backlink submission on 2026-04-15; live URL not provided yet. |
| 4 | BetaList | `https://betalist.com/` | Startup directory | Submitted | `Bezel Studio` | Wait for live URL or approval status | User reported backlink submission on 2026-04-15; live URL not provided yet. |
| 5 | Indie Hackers | `https://www.indiehackers.com/` | Community/product story | Submitted | `Bezel Studio` | Wait for live URL or approval status | User reported backlink submission on 2026-04-15; live URL not provided yet. |
| 6 | Dev.to | `https://dev.to/` | Technical article | Submitted | `App Store screenshot workflow` | Wait for live URL or approval status | User reported backlink/article submission on 2026-04-15; live URL not provided yet. |

## Rules

- Do not spam comments or low-quality directories.
- Prefer durable pages where Bezel Studio genuinely fits.
- Rotate targets after submission.
- Track live URL when backlink goes live.
