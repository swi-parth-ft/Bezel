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

## URL Inspection Queue

| Priority | URL | Page type | Known GSC status | Last crawled | Manual action | Date requested | Next action | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `https://bezelstudio.app/guides/` | Guide hub | Discovered, not indexed | N/A | Not requested | - | URL Inspection -> Request indexing | Hub connects all guides; submit first. |
| 2 | `https://bezelstudio.app/features/device-frames.html` | Commercial feature | Discovered, not indexed | N/A | Not requested | - | URL Inspection -> Request indexing | iPhone mockup generator intent. |
| 3 | `https://bezelstudio.app/features/projects-presets.html` | Commercial feature | Unknown / likely discovered | Unknown | Not requested | - | URL Inspection -> Request indexing | App screenshot templates intent. |
| 4 | `https://bezelstudio.app/features/translation.html` | Commercial feature | Discovered, not indexed | N/A | Not requested | - | URL Inspection -> Request indexing | Localization workflow intent. |
| 5 | `https://bezelstudio.app/features/canvas-motion.html` | Commercial feature | Unknown / likely discovered | Unknown | Not requested | - | URL Inspection -> Request indexing | App preview video intent. |
| 6 | `https://bezelstudio.app/features/export-share.html` | Commercial feature | Unknown / likely discovered | Unknown | Not requested | - | URL Inspection -> Request indexing | Export/download-adjacent intent. |
| 7 | `https://bezelstudio.app/features/copy-paste-projects.html` | Commercial feature | Unknown / likely discovered | Unknown | Not requested | - | URL Inspection -> Request indexing | Reusable layout intent; supports new release-QA cluster. |
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
| 1 | Product Hunt | `https://www.producthunt.com/` | Launch/profile | Not started | `Bezel Studio App Store screenshot maker` | Prepare launch page and maker profile. | Best when launch story is ready; can drive referral traffic. |
| 2 | AlternativeTo | `https://alternativeto.net/` | Software directory | Not started | `Bezel Studio` | Submit app as alternative to screenshot/mockup tools. | Relevant durable directory listing. |
| 3 | SaaSHub | `https://www.saashub.com/` | Product directory | Not started | `App Store screenshot maker` | Submit product listing with iOS/iPadOS positioning. | Directory backlink plus comparison pages. |
| 4 | BetaList | `https://betalist.com/` | Startup directory | Not started | `Bezel Studio` | Submit if app positioning fits startup/product launch guidelines. | Good discovery source if accepted. |
| 5 | Indie Hackers | `https://www.indiehackers.com/` | Community/product story | Not started | `Bezel Studio` | Post a build/launch story, not thin promo. | Best if framed as indie app growth/tooling story. |
| 6 | Dev.to | `https://dev.to/` | Technical article | Not started | `App Store screenshot workflow` | Publish source-backed article on making App Store screenshots/localized assets. | Better than directory spam; can link to guide hub and feature page. |

## Rules

- Do not spam comments or low-quality directories.
- Prefer durable pages where Bezel Studio genuinely fits.
- Rotate targets after submission.
- Track live URL when backlink goes live.
