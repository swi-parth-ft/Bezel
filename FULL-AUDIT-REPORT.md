# Bezel Studio Sunday SEO Audit

Scope: full-site operating audit with live GA4/Search Console refresh, production homepage deep audit, and local-preview verification after fixes on `2026-04-26`.

Overall rating: `72/100`
Score confidence: `medium`

Top 3 issues:
- Measurement coverage was broken on four live clean-status/reflection pages because the GA4 loader was missing.
- Traffic remains homepage-heavy, with `home=20`, `features=3`, `guides=0` over the last 7 days.
- Internal-link depth is still uneven, with `8` pages showing `<=1` incoming internal link in the Sunday crawl.

Top 3 opportunities:
- Use repaired measurement to confirm whether clean-status/reflection pages contribute any deeper CTA or download intent.
- Improve homepage CTR on the only meaningful Search Console opportunity page, which sits at `40` impressions, `2` clicks, `5.0%` CTR, and average position `7.2`.
- Strengthen internal links into underlinked feature pages before shipping more content.

## Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| Measurement | Warning | Confirmed | Four live pages were missing the GA4 loader, so page-specific feature and guide click events could not fire there. | `reports/seo/2026-04-26.md` originally flagged `/features/clean-status-bar.html`, `/features/frame-reflections.html`, `/guides/clean-status-bars-in-device-frames.html`, and `/guides/add-frame-reflections-to-device-mockups.html` with `missing GA4 gtag loader`; local rerun now shows `0 / 46` issues. | Fixed in this run by restoring the GA4 loader block on all four pages. |
| On-page social metadata | Warning | Confirmed | The same four pages also lacked complete Twitter metadata, weakening social preview parity and audit health. | Live report flagged `missing Twitter metadata`; local rerun cleared all four pages. | Fixed in this run by adding `twitter:title`, `twitter:description`, `twitter:image`, and `twitter:image:alt`. |
| Conversion path | Warning | Confirmed | Downloads proxy is stable but deeper funnel movement is still weak. | Last 7 days: `app_store_click=3`, `feature_page_click=1`, `feature_cta_click=1`, `feature_download_click=1`, `guide_cta_click=0`, `guide_download_click=0`. | Next run should return to `conversion_path_optimization` and improve homepage/guide-hub routing into commercial feature pages. |
| Homepage concentration | Warning | Confirmed | Traffic is still overly concentrated on the homepage. | GA4 traffic mix is `home=20`, `features=3`, `guides=0`. | Prioritize stronger internal routes and sharper CTR work on homepage before expanding content. |
| Internal links | Warning | Confirmed | Several feature pages remain underlinked. | Sunday `internal_links.py` crawl found `46` unique pages, `191` internal links, and `8` potential orphan/underlinked pages with `<=1` incoming link. | Add at least one additional contextual link into each underlinked commercial feature page from homepage, guide hub, or related features. |
| Crawl hygiene | Pass | Confirmed | Core crawl and AI-access controls are healthy. | `robots_checker.py` returned sitemap present and AI crawlers explicitly allowed; `llms_txt_checker.py` scored `100/100`; `broken_links.py` found `0` broken links. | Keep current `robots.txt`, `llms.txt`, and sitemap behavior. |
| Security headers | Warning | Confirmed | Security headers are still missing at the host level. | `security_headers.py` scored `25/100` and reported missing HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. | Needs CDN or host configuration outside this repo. Track separately; not fixable in static site code alone. |
| Performance data | Info | Confirmed | PageSpeed evidence is incomplete this run. | `pagespeed.py` was rate-limited by Google API during the Sunday audit. | Re-run CWV checks later or with API key support before making performance claims. |
| Schema policy | Warning | Confirmed | Two guides still use `HowTo` schema, which this audit framework treats as deprecated for rich-result value. | `guides/clean-status-bars-in-device-frames.html` and `guides/add-frame-reflections-to-device-mockups.html` include `\"@type\": \"HowTo\"`. | Replace those blocks with valid `Article` or `WebPage` JSON-LD in a future technical cleanup run. |

## Prioritized Action Plan

1. Keep this run in `measurement_repair` and ship the GA4/Twitter fixes. Status: complete.
2. Use the repaired data surface to watch whether clean-status/reflection URLs now contribute any feature or guide CTA events. Status: next 1-2 runs.
3. Return to `conversion_path_optimization` next run if no new measurement gaps appear. Focus on homepage CTR and deeper feature routing.
4. Add contextual links into the eight underlinked pages, starting with commercial features that support installs.
5. Handle non-repo blockers separately: host security headers and PageSpeed API access.

## Unknowns And Follow-ups

- Core Web Vitals remain unverified this run because the PageSpeed API was rate-limited.
- Search Console indexing state for the existing manual queue still depends on user-side rechecks in GSC.
- The repaired pages need at least one more reporting window before judging download impact.

## Artifacts

- HTML dashboard: `reports/seo/SEO-REPORT.html`
- Live metrics report: `reports/seo/2026-04-26.md`
- Shared support-worker handoff: `reports/seo/manual-indexing-backlink-ledger.md` and `reports/seo/manual-indexing-backlink-state.json`
