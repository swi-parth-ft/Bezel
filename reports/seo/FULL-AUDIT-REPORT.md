# Bezel Studio SEO Deep Audit - 2026-04-14

## Summary

Deep audit ran because this run shipped a major guide cluster and download-proxy metrics remain weak. Install data is unavailable in this automation environment, so `app_store_click` is used only as a download proxy.

Latest 7-day data from GA4/GSC:

- Traffic mix: `home=67`, `features=5`, `guides=19`
- Download proxy: `app_store_click=1`
- CTA events: `home_download_click=1`, `feature_download_click=0`, `guide_download_click=0`, `feature_cta_click=0`, `feature_page_click=4`, `guide_cta_click=13`
- Search Console: only visible query signal is `bezel ai` with `1` impression and `0` clicks
- On-page audit: `0 / 42` pages with issues after the new release-QA cluster

## Evidence

| Check | Result | Source |
| --- | --- | --- |
| Production robots.txt | HTTP 200; sitemap declared; AI crawlers explicitly allowed | `robots_checker.py https://bezelstudio.app/` |
| Production llms.txt | Found; `llms-full.txt` found; quality score `100/100` | `llms_txt_checker.py https://bezelstudio.app/` |
| Local build internal links | `43` pages crawled, `42` unique pages found, `357` internal links, no orphan candidates | `internal_links.py http://127.0.0.1:4173 --depth 2 --max-pages 80 --json` |
| Local build broken links | `35` checked, `33` healthy, `0` broken, `2` redirected | `broken_links.py http://127.0.0.1:4173 --workers 5` |
| Production redirects | `0` hops; final `200` | `redirect_checker.py https://bezelstudio.app/` |
| Security headers | HTTPS yes; score `25/100`; 6 missing headers | `security_headers.py https://bezelstudio.app/` |
| PageSpeed mobile | Blocked by Google API rate limit | `pagespeed.py https://bezelstudio.app/ --strategy mobile` |

## Strategy Read

The work is helping structure and guide discovery more than downloads so far. Guide views rose from the previous run (`16` to `19`) while home concentration eased slightly (`73/6/16` to `67/5/19` by 7-day page views), but `app_store_click` stayed flat at `1`, and feature/guide download events are still `0`.

The correct next bet remains conversion-path and measurement work before more broad content. This run still shipped 4 pages because the content-cluster mandate could be satisfied with truthful, high-intent release-QA topics that also strengthen paths into export and App Store intent.

## Shipped Content Cluster

Theme: `release qa handoff system`

New pages:

- `/guides/reuse-layouts-across-projects.html` targeting `reuse App Store screenshot layouts`
- `/guides/create-multi-device-promo-visuals.html` targeting `multi-device app promo visuals`
- `/guides/review-app-store-screenshot-set-before-export.html` targeting `App Store screenshot set review`
- `/guides/build-app-store-release-asset-kit.html` targeting `App Store release asset kit`

Source material consulted:

- `BEZEL_STUDIO_MASTER_GUIDE.md`
- `APP_STORE_CONNECT_CONTEXT.md`
- `BZLS_APP_TECHNICAL_REPORT.md`
- `guides/GUIDES_TRACKER.md`
- `public/assets/source/notes/assets-description.md`
- Existing feature pages and guide pages in the repo
- Current GA4/GSC report in `reports/seo/latest.md`

No unsupported features, fake benchmarks, or external claims were added.

## Findings

| Priority | Finding | Evidence | Impact | Fix |
| --- | --- | --- | --- | --- |
| High | Download proxy is flat | `app_store_click=1`; same proxy level as prior run | More pages are not yet proving install movement | Next run should inspect CTA click behavior in browser and consider App Store CTA placement/copy tests on guide pages |
| High | Feature CTA path still weak | `feature_download_click=0`, `feature_cta_click=0` | Feature traffic is qualified but not moving to App Store | Add stronger above-fold and mid-page feature CTAs or test whether current clicks are too sparse to measure |
| Medium | Homepage still dominates | `home=67`, `features=5`, `guides=19` | Search and direct users still concentrate at the homepage | Keep routing home visitors into commercial guide clusters and feature pages |
| Medium | Security headers missing | Security score `25/100`; missing HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy | Trust/security hardening remains unresolved | Move behind host/CDN that supports response headers, or configure headers in the deployment layer |
| Low | PageSpeed could not refresh | Google API rate-limited | CWV status not verified this run | Retry later or add PageSpeed API key |

## Verdict

Latest work appears to help site structure, crawlability, and qualified guide paths. It is not helping downloads yet based on available proxy data. `app_store_click` remains only a proxy because install data is unavailable.
