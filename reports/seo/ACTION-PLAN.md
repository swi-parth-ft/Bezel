# Bezel Studio SEO Action Plan - 2026-04-14

## Immediate

1. Keep download proxy measurement under review.
   - Install data is unavailable here, so use `app_store_click` only as a proxy.
   - Watch `feature_download_click`, `guide_download_click`, and `feature_cta_click` after deployment.

2. Inspect App Store CTA behavior in browser next run.
   - Current events show `app_store_click=1`, `feature_download_click=0`, `guide_download_click=0`, `feature_cta_click=0`.
   - Confirm whether users are not clicking or whether click classification still misses some contexts.

3. Strengthen feature-to-download conversion if zeros persist.
   - Prioritize `features/export-share.html`, `features/projects-presets.html`, `features/device-frames.html`, and `features/copy-paste-projects.html`.
   - These pages now link into the release-QA guide cluster and should be monitored before adding another content batch.

## This Run

Shipped a 4-page release-QA cluster:

- Reuse App Store screenshot layouts across projects
- Create multi-device promo visuals
- Review an App Store screenshot set before export
- Build an App Store release asset kit

Updated:

- Homepage cluster links
- Guide hub cards and schema
- Feature-page related guide links
- `sitemap.xml` and `public/sitemap.xml`
- `llms.txt`, `llms-full.txt`, and public copies
- `vite.config.js`
- Content-cluster ledgers
- Fresh SEO reports

## Next Bets

1. Conversion test over more content if `app_store_click` stays flat.
2. Feature CTA copy/placement audit if `feature_cta_click` stays `0`.
3. Guide CTA audit if `guide_download_click` stays `0` while `guide_cta_click` continues rising.
4. Deployment-layer security headers, since this static repo cannot fix GitHub Pages response headers directly.

## Stagnation Status

This is not yet two failed retrospectives after the latest strategy shift. Current status: structure improving, download proxy flat. If the next retrospective still shows no proxy movement, propose a prompt/strategy upgrade focused on browser-tested CTA experiments and App Store click funnels before more content production.
