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

Update 2026-04-17 (SEO operator run): `app_store_click` and `home_download_click` both rose to `4`, but `feature_cta_click` and `feature_download_click` are still `0`. Manual queue stays unchanged. Keep `follow_up_only`; do not open a new manual queue until the current recheck window expires or live backlink URLs arrive.

Update 2026-04-18 (SEO operator run): `app_store_click` rose to `5` and `home_download_click` stayed at `5`, but `feature_cta_click` and `feature_download_click` remain `0`. Homepage CTA balance now favors `device-frames` first and adds support links to underlinked feature pages. Manual queue stays unchanged. Keep `follow_up_only`.

Update 2026-04-18 (SEO operator run, refreshed after build validation): feature install CTA now moves earlier in the generated feature template, guide hub now has a top commercial CTA strip, and the strongest guide pages now show above-the-fold install CTAs. Manual queue stays unchanged. Keep `follow_up_only`.

Update 2026-04-22 (SEO operator run): live GA4/GSC refresh still shows `app_store_click=5`, `home_download_click=5`, `feature_cta_click=0`, and `feature_download_click=0`. Home still owns `38/44` page views. Manual queue stays unchanged. Keep `follow_up_only`; no new indexing or backlink queue this run.

Update 2026-04-24 (SEO operator run): live GA4/GSC refresh shows `app_store_click=2`, `home_download_click=1`, `feature_cta_click=1`, `feature_download_click=1`, `feature_page_click=0`, and `guide_cta_click=0`. Homepage still owns `15/17` tracked page views. Homepage BezelAI meta and above-fold BezelAI/starter-guide links shipped under `conversion_path_optimization`. Manual queue stays unchanged. Keep `follow_up_only`; wait on existing indexing and backlink outcomes before opening new requests.

Update 2026-04-25 (SEO operator run): live GA4/GSC refresh shows `app_store_click=3`, `home_download_click=2`, `feature_cta_click=1`, `feature_download_click=1`, `feature_page_click=1`, and `guide_cta_click=0`. Homepage still owns `24/27` tracked page views. Manual queue stays unchanged. Keep `follow_up_only`; feature discovery moved once, but guide-path clicks are still dead so do not open a new manual queue.

Update 2026-04-26 (SEO operator run): primary mode switched to `measurement_repair` after the Sunday audit found four live clean-status/reflection pages missing the GA4 loader and Twitter metadata. Live GA4/GSC refresh still shows `app_store_click=3`, `home_download_click=2`, `feature_cta_click=1`, `feature_download_click=1`, `feature_page_click=1`, and `guide_cta_click=0`. Manual queue stays unchanged. Keep `follow_up_only`; existing indexing and backlink requests still need outcomes, and this run did not justify a new queue.

Update 2026-04-27 (SEO operator run): primary mode switched back to `conversion_path_optimization` because measurement stayed clean after the 2026-04-26 repair, but homepage concentration is still `22/26` tracked page views and guide-path intent remains `guide_cta_click=0`, `guide_download_click=0`. This run shipped homepage CTR copy updates plus a new above-the-fold `Fastest routes` block into commercial feature pages and the guide hub. Manual queue stays unchanged. Keep `follow_up_only`; existing indexing and backlink requests still need outcome checks before any new asks.

Update 2026-04-30 (SEO operator run): primary mode stayed `conversion_path_optimization`. Live GA4/GSC refresh shows `app_store_click=6`, `home_download_click=6`, `feature_cta_click=1`, `feature_download_click=1`, `feature_page_click=1`, `guide_cta_click=0`, and `guide_download_click=0`; homepage still owns `52/55` tracked page views. This run added a homepage hero route to BezelAI workflows and a top guide-hub CTA to the first screenshot guide. Manual queue stays unchanged. Keep `follow_up_only`; existing indexing and backlink requests still need outcomes before any new asks.

Update 2026-05-01 (SEO operator run): primary mode stayed `conversion_path_optimization`. Live GA4/GSC refresh shows `app_store_click=6`, `home_download_click=7`, `feature_page_click=1`, `feature_cta_click=0`, `feature_download_click=0`, `guide_cta_click=0`, and `guide_download_click=0`; homepage still owns `50/52` tracked page views. This run updated the homepage title/social title to match the active `bezel ai` query signal. Manual queue stays unchanged. Keep `follow_up_only`; existing URL Inspection and submitted backlink outcomes still need confirmation before any new manual asks.

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
