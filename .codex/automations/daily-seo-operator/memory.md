2026-04-13 05:45 UTC

- Ran the Bezel SEO operator refresh from the a337 worktree; generated fresh `reports/seo/latest.md` and `reports/seo/2026-04-13.md`.
- Install data was unavailable, so `app_store_click` remains only a download proxy. Current 7d report: `home=73`, `features=6`, `guides=16`, `app_store_click=1`, `feature_page_click=5`, `feature_cta_click=0`, `guide_cta_click=9`, and on-page issues `0 / 38` after fixes.
- Deep audit ran because download proxy declined, `feature_cta_click` stayed zero, homepage concentration remained high, and this run shipped content. SEO dashboard score was `80/100`; robots and llms checks passed, local crawl found `38` pages / `285` internal links / `0` broken links, PageSpeed was rate-limited, and security headers remain a host/CDN blocker.
- Found and fixed a real measurement fidelity issue: guide pages loaded `src/main.js` but did not load GA4, so guide App Store clicks could not emit `guide_download_click`. Added GA4 loader to all guide pages and guide hub, and added a future `missing GA4 gtag loader` audit check to `scripts/seo_operator.py`.
- Shipped a 4-page source-backed `bezelai release assistant` cluster: `use-bezel-ai-to-refine-a-canvas`, `rewrite-app-store-screenshot-captions-with-bezel-ai`, `adjust-app-screenshot-backgrounds-with-bezel-ai`, and `prepare-shortcut-ready-mockup-presets`.
- Wired the new cluster from homepage, guide hub, BezelAI feature page, typography, canvas styling, project presets, sitemap, `llms.txt`, and `llms-full.txt`; fixed one long localization-guide meta description.
- Created tracked dedupe ledgers at `reports/seo/content-cluster-ledger.md` and `reports/seo/content-cluster-ledger.json` and bootstrapped all 21 guide entries.
- Source docs consulted for new pages: `BEZEL_STUDIO_MASTER_GUIDE.md`, `APP_STORE_CONNECT_CONTEXT.md`, `BZLS_APP_TECHNICAL_REPORT.md`, `guides/GUIDES_TRACKER.md`, and `public/assets/source/notes/assets-description.md`.
- Validation passed: `npm install`, `python3 -m py_compile scripts/seo_operator.py`, `python3 -m json.tool reports/seo/content-cluster-ledger.json`, `npm run build`, local `npm run seo:report -- --audit-origin http://127.0.0.1:4173`, local internal-link crawl, local broken-link crawl, and `git diff --check`.
- Committed as `a2a4520` (`Ship BezelAI guide cluster and fix guide tracking`) and pushed to `origin/main`.
- Run time: about 25 minutes.

2026-04-10 11:45 UTC

- Manual follow-up fix to improve download-focused measurement while keeping the automation paused.
- Updated `src/main.js` so outbound App Store tracking is more reliable: all App Store clicks still fire `app_store_click`, feature pages still fire `feature_cta_click`, and new page-type-specific download events now fire for home, feature, and guide contexts (`home_download_click`, `feature_download_click`, `guide_download_click`).
- Updated `scripts/seo_operator.py` to include those new download events in the refreshed report so future runs can distinguish generic App Store clicks from feature-page and guide-page download intent.
- Verified with `npm run build`, `python3 -m py_compile scripts/seo_operator.py`, and `npm run seo:report`.
- Committed as `49e94e5` (`Improve download CTA tracking and reporting`) and pushed to `origin/main`.
- Important remaining blocker: live security headers cannot be fixed from this static GitHub Pages repo alone; that requires moving behind a host/CDN that can set response headers.
- Run time: about 9 minutes.

2026-04-10 11:40 UTC

- Verified the automation prompt now explicitly requires reading the repo markdown docs before drafting new guides.
- Confirmed named sources in the prompt: `BEZEL_STUDIO_MASTER_GUIDE.md`, `APP_STORE_CONNECT_CONTEXT.md`, `BZLS_APP_TECHNICAL_REPORT.md`, `guides/GUIDES_TRACKER.md`, and `public/assets/source/notes/assets-description.md`.
- Run time: under 1 minute.

2026-04-10 11:37 UTC

- Tightened the automation prompt again so new guides must explicitly consult the repo's markdown product docs before drafting.
- Named required source docs in the prompt: `BEZEL_STUDIO_MASTER_GUIDE.md`, `APP_STORE_CONNECT_CONTEXT.md`, `BZLS_APP_TECHNICAL_REPORT.md`, `guides/GUIDES_TRACKER.md`, and `public/assets/source/notes/assets-description.md`.
- Also required future reports to state which markdown docs were consulted when new content is created.
- Run time: about 1 minute.

2026-04-10 11:36 UTC

- Updated the `daily-seo-operator` automation prompt to make downloads the primary KPI instead of raw content output or generic traffic growth.
- Added new prompt rules to prioritize install-proxy metrics, CTA/event instrumentation, App Store routing, and conversion-path fixes ahead of publishing volume when those are the main blockers.
- Added a sourcing rule: new guides must be grounded in verifiable product material from the site code, existing feature pages, existing guides, app assets/screenshots, analytics evidence, and documented capabilities; no invented workflows or filler content.
- Left schedule and guardrails unchanged.
- Run time: about 3 minutes.

2026-04-10 11:32 UTC

- Confirmed after the 404 fix that crawler/discovery files were already correct on `main`: `sitemap.xml`, `public/sitemap.xml`, `llms.txt`, `public/llms.txt`, `llms-full.txt`, `public/llms-full.txt`, `guides/index.html`, and `index.html` all reference guides 13 to 17.
- Final diagnosis stayed the same: the only missing production piece was `vite.config.js` build input coverage for the five new guide files.
- Run time: about 1 minute.

2026-04-10 11:31 UTC

- Follow-up fix after Guides 13 to 17 returned `404` in production.
- Root cause: the five new guide HTML files existed in the repo and were linked from the homepage/guide hub, but `vite.config.js` did not include them in `build.rollupOptions.input`, so Vite never emitted them into `dist/guides/`.
- Added the five missing guide entries to the Vite input map, rebuilt successfully, and confirmed all five files now exist in `dist/guides/`.
- Committed as `35997c1` (`Add missing guide pages to Vite build`) and pushed to `origin/main`.
- Run time: about 5 minutes.

2026-04-10 11:26 UTC

- Ran the deep-audit path again because the trailing 14-day mix is still homepage-heavy (`104/15/0`), `feature_cta_click` remained `0`, and this run shipped another major content batch.
- Strategy shifted from release-polish expansion to a 5-page `localization-release-system` cluster: `create-localization-ready-app-screenshot-template`, `create-iphone-mockup-variants-from-one-template`, `review-localized-app-store-screenshot-captions`, `create-localized-app-preview-video-variants`, and `export-app-store-localization-delivery-pack`.
- Rewired the link graph around that cluster from the homepage, guide hub, and six commercial feature pages (`device-frames`, `projects-presets`, `translation`, `canvas-motion`, `export-share`, `typography`) with descriptive anchors and reciprocal in-cluster links.
- Updated crawler-facing discovery files (`sitemap.xml`, `llms.txt`, `llms-full.txt`, and `public/` copies), regenerated `reports/seo/latest.md` plus `reports/seo/2026-04-10.md`, and refreshed local deep-audit artifacts in `reports/seo/FULL-AUDIT-REPORT.md`, `reports/seo/ACTION-PLAN.md`, and `reports/seo/content-cluster-ledger.{md,json}`.
- Validation passed: `npm install`, `npm run build`, built-site preview on `http://127.0.0.1:4173`, local SEO report refresh against the build, local crawl with `56` pages / `1141` internal links / `0` broken links, and production checks confirming healthy AI crawler controls while security headers remain missing and PageSpeed stayed rate-limited.
- Committed as `cac9de1` (`Ship localization release system guide cluster`) and pushed to `origin/main`.
- Run time: about 47 minutes.

2026-04-10 10:09 UTC

- Ran a manual health-check execution of the Bezel operator command (`npm run seo:report`) from the canonical repo.
- Report generation completed successfully and refreshed `reports/seo/latest.md` plus `reports/seo/2026-04-10.md` without runtime errors.
- Current canonical Bezel repo remains aligned to `origin/main` at `149c27c`.
- Run time: about 2 minutes.

2026-04-10 10:00 UTC

- Reconciled local operator state with remote after a consistency check flagged drift: fast-forwarded `/Users/parthantala/Code/Swift/Websites/BezelStudio` from `604f6f1` to `149c27c` so local code matches `origin/main`.
- Regenerated canonical project reports with `npm run seo:report`, which refreshed `reports/seo/latest.md` and `reports/seo/2026-04-10.md` in the Bezel website repo.
- Result: Bezel automation memory and canonical report files are now aligned to the same codebase state and no longer split between an older local checkout and newer remote commit.
- Run time: about 3 minutes.

2026-04-10 09:17 UTC

- Ran the deep-audit path again because homepage concentration is still high, guide landing traffic is still `0`, `feature_cta_click` is still `0`, and this run shipped a major content batch.
- Shipped a 5-page `release-polish-workflows` cluster: `style-app-store-captions`, `use-layers-and-3-axis-transforms`, `create-sticker-assets-background-removal`, `draw-callouts-with-pencilkit`, and `export-stills-and-videos`.
- Rewired the link graph around the new cluster from the homepage, guide hub, and eight supporting feature pages; local post-build crawl improved to `29` pages and `212` internal links, with only `/privacy.html` left below `3` outgoing links.
- Updated crawl assets and build inputs so the new pages are live and discoverable: `sitemap.xml`, `llms.txt`, `llms-full.txt`, `public/` copies, and `vite.config.js`.
- Refreshed `reports/seo/latest.md`, `reports/seo/2026-04-10.md`, `reports/seo/FULL-AUDIT-REPORT.md`, `reports/seo/ACTION-PLAN.md`, and initialized `reports/seo/content-cluster-ledger.{md,json}` with all `12` live guides to prevent duplicate future clusters.
- Final status: production build passed, local on-page audit stayed clean at `0 / 29`, production AI crawler controls stayed healthy, and the unresolved technical gap is still missing security headers on the live site.
- Committed as `149c27c` (`Ship release polish guide cluster`) and pushed to `origin/main`.
- Run time: about 40 minutes.

2026-04-10 07:17 UTC

- Updated automation config for `daily-seo-operator` to add a mandatory 4 to 5 page guide/blog cluster shipment on every run, with explicit hub-and-spoke internal linking requirements.
- Added persistent anti-duplication requirements to the prompt: maintain `reports/seo/content-cluster-ledger.md` and `reports/seo/content-cluster-ledger.json` with slug, keyword, theme, intent, date, links, and run id metadata.
- Activated the automation by switching status from `PAUSED` to `ACTIVE` while keeping the existing RRULE and guardrail logic intact.
- Run time: about 4 minutes.

2026-04-10 07:13 UTC

- Status check requested for `daily-seo-operator`; reviewed automation memory and `reports/seo/latest.md` without shipping new code.
- Current performance status is mixed-positive: deeper clicks improved (`feature_page_click=10`, `guide_cta_click=5`) and homepage concentration improved versus prior 14-day window, but guide landing traffic is still `0` and `feature_cta_click` remains `0`.
- Repo state still has local, uncommitted homepage layout edits in `index.html` and `src/style.css`; latest fully pushed SEO run remains `f8565e0` and latest pushed layout tweak remains `e0d8e4a`.
- Run time: about 2 minutes.

2026-04-10 06:32 UTC

- Corrected the hero after the redesign overshot the requested scope: removed the added framed background, badge, and crop from the hero image, and stripped the extra hero kicker so the first viewport returns to the original visual treatment.
- Kept the tighter layout/composition adjustments and rebuilt successfully with `npm run build`; local preview remains available at `http://127.0.0.1:4173/`.
- Current local-only files are still `index.html` and `src/style.css`; nothing from this hero correction is committed or pushed.
- Run time: about 6 minutes.

2026-04-10 06:26 UTC

- Started a local preview server for the current homepage redesign so the revised hero and workflow transition can be reviewed in-browser before commit and push.
- Preview is serving the built site via `npm run preview -- --host 127.0.0.1 --port 4173` at `http://127.0.0.1:4173/`.
- The redesign changes remain local and uncommitted in `index.html` and `src/style.css`.
- Run time: about 2 minutes.

2026-04-10 06:24 UTC

- Reworked the homepage first viewport after the earlier spacing-only pass still looked weak: tightened the hero into a smaller poster composition, shortened the CTA copy, added a compact hero kicker and meta band, and anchored the desktop product image inside a deliberate visual stage.
- Replaced the generic six-card workflow slab with a stronger route selector in `index.html` and `src/style.css`: one dominant "device frames" path plus a cleaner supporting link rail for templates, localization, preview video, export, and the reusable-templates guide.
- Verified with `npm run build` and a local built-site preview plus screenshot sanity check on `http://127.0.0.1:4173/`.
- Left the work uncommitted and unpushed so the user can review the redesign before shipping it.
- Run time: about 18 minutes.

2026-04-10 06:01 UTC

- Committed and pushed the homepage workflow-section spacing fix after user approval.
- Shipped `index.html` and `src/style.css` only: added the `workflow-jump-section` hook, trimmed the oversized hero-to-workflow gap, and increased the section's bottom breathing room so the card sits more evenly before the features grid.
- Verified earlier with `npm run build`; no further code changes were needed before push.
- Committed as `e0d8e4a` (`Tighten homepage workflow section spacing`) and pushed to `origin main`.
- Run time: about 2 minutes.

2026-04-10 06:00 UTC

- Follow-up layout fix for the homepage workflow card: reduced the oversized gap above the "Choose A Workflow" section and increased the section's bottom breathing room.
- Changes are in `index.html` and `src/style.css`: added a dedicated `workflow-jump-section` hook, tightened the hero-to-workflow handoff, reduced large-screen hero min-height from `100svh` to `92svh`, and softened hero bottom padding on desktop and mobile.
- Verified with `npm run build`; build completed successfully.
- Left the change uncommitted so it can be reviewed with the rest of the current worktree state.
- Run time: about 4 minutes.

2026-04-10 05:56 UTC

- Generated fresh GA4/GSC reports in `reports/seo/latest.md` and `reports/seo/2026-04-10.md`, plus new deep-audit artifacts in `reports/seo/FULL-AUDIT-REPORT.md` and `reports/seo/ACTION-PLAN.md`.
- Self-review summary: the last 3 recorded 7-day mixes stayed at `35/12/0` on `2026-04-05`, `42/14/0` on `2026-04-08`, and `47/14/0` on `2026-04-09`; today's fresh 14-day mix improved home share from `90.1%` to `86.0%`, but guide landing pages stayed at `0` and `feature_cta_click` stayed at `0`.
- Deep audit challenged the old strategy again: feature-page discovery and guide clicks are now non-zero, but Search Console is still mostly homepage-only and the templates workflow had no guide page of its own.
- Shipped a missing mid-funnel guide plus routing/measurement fixes across `/`, `/guides/`, and the reusable-template feature cluster: added `guides/create-reusable-app-screenshot-templates.html`, linked it from the homepage, guide hub, and template feature pages, strengthened the homepage localization-guide link, fixed relative internal-link tracking plus `data-track-label` support in `src/main.js`, and made `scripts/seo_operator.py` find the SEO key outside ephemeral worktrees.
- Updated crawl-facing assets so the new guide is immediately discoverable: `sitemap.xml`, `public/sitemap.xml`, `llms.txt`, `public/llms.txt`, `llms-full.txt`, and `public/llms-full.txt`.
- Verified with `npm ci`, `npm run build`, previewing the built site on `http://127.0.0.1:4173`, a post-build `npm run seo:report -- --audit-origin http://127.0.0.1:4173 --output reports/seo/latest.md`, local robots/llms checks, a local internal-link crawl showing `24` pages and no orphan pages in the sampled crawl, and HTML spot checks for the new guide and homepage links.
- Production technical note: AI crawler controls remain healthy, `llms.txt` improved to `100/100` locally, but security headers are still missing on GitHub Pages and PageSpeed mobile was rate-limited again.
- Committed as `f8565e0` (`Add reusable templates guide and fix SEO tracking`) and pushed to `origin main`.
- Run time: about 18 minutes.

2026-04-09 05:24 UTC

- Generated fresh GA4/GSC reports in `reports/seo/latest.md` and `reports/seo/2026-04-09.md`, plus deep-audit artifacts in `reports/seo/FULL-AUDIT-REPORT.md` and `reports/seo/ACTION-PLAN.md`.
- Self-review summary: last 3 runs moved from `home=35/features=12/guides=0` on `2026-04-05` to `42/14/0` on `2026-04-08` to `47/14/0` on `2026-04-09`; the trailing 14-day mix stayed concentrated at `home=111/features=15/guides=0` (`88.1%` home share) with `feature_cta_click=0`.
- Deep audit confirmed the strategy needs another shift: robots/llms and on-page checks stayed healthy, but current 7-day CTA events still resolve to `/`, internal-link crawl still found `8` low-linked support feature pages, and security headers remain missing.
- Shipped a new routing + conversion pass across `/`, `/guides/`, and the commercial feature cluster: early homepage workflow routing, a guide-hub commercial-path strip, new in-body install CTAs on device frames / translation / project presets / export / Canvas Motion, and more reliable outbound App Store tracking in `src/main.js`.
- Verified with `npm ci`, `npm run build`, previewing the built site on `http://127.0.0.1:4173`, and a post-build `seo_operator.py --audit-origin http://127.0.0.1:4173`; spot checks confirmed the new sections render in the built HTML.
- Committed as `2af725a` (`Route deeper into commercial feature workflows`) and pushed to `origin main`.
- Environment note: PageSpeed mobile checks were rate-limited by Google, and local disk space was briefly tight until `node_modules/` was removed after validation.
- Run time: about 51 minutes.

2026-04-08 07:30 UTC

- Generated fresh GA4/GSC reports in `reports/seo/latest.md` and `reports/seo/2026-04-08.md`, then ran a deep audit because `feature_cta_click` remained at `0`, homepage traffic concentration was still high, and progress was flat across consecutive retrospectives.
- Self-review summary: last 3 runs moved from `home=47/features=1/guides=0` on `2026-04-03` to `35/12/0` on `2026-04-05` to `42/14/0` on `2026-04-08`; the trailing 14-day home-share improved only slightly from `89.8%` to `87.6%`, so the strategy changed from light homepage maintenance to stronger commercial-page routing.
- Shipped a broader commercial SEO pass across `/`, `/guides/`, and the feature cluster: stronger CTA copy, new feature-path/launch-path sections, expanded copy and schema on core feature pages, richer generated related-feature journeys, and a new `llms-full.txt` commercial crawl map.
- Updated `scripts/seo_operator.py` with `--audit-origin` so the automation can keep canonical analytics on production while auditing the post-build local site in the same run.
- Verified with `npm run build`, a post-build `npm run seo:report -- --audit-origin http://127.0.0.1:4173`, and local link/robots/llms checks; on-page audit stayed clean at `0 / 23` issues.
- Committed as `d3740c5` (`Strengthen commercial SEO paths and audit workflow`) and pushed to `origin main`.
- Run time: about 45 minutes.

2026-04-02 04:22 UTC

- Generated `reports/seo/2026-04-02.md` successfully; internet, GA4, and Search Console access were available.
- Report snapshot: homepage led with `66` views in the last 7 days, realtime users were `0`, Search Console query/page tables were still empty, and only `app_store_click` had recent conversion activity (`15`).
- Technical and on-page audit stayed clean at `0 / 23` pages with issues. The clearest remaining issue was internal linking: all feature pages still had only `1` inbound internal link before this run.
- Added guide-to-feature internal links across six workflow guides so six commercial feature pages now have `2` inbound internal links instead of `1`: project presets, device frames, copy-paste projects, translation, canvas motion, and Bezel AI shortcuts.
- Verified with `npm run build`, committed as `8d220b3` (`Add guide links to feature pages`), and pushed to `origin main`.
- Run time: about 10 minutes.

2026-04-01 11:11 UTC

- Generated `reports/seo/2026-04-01.md` successfully; internet, GA4, and Search Console access were available.
- Report snapshot: homepage led with `64` views in the last 7 days, realtime users were `0`, Search Console query/page tables were still empty, and only `app_store_click` had recent conversion activity (`15`).
- Technical and on-page audit stayed clean at `0 / 23` pages with issues. The clearest structural issue was internal linking: `/features/projects-presets.html` and `/features/export-share.html` had `0` inbound internal links in the static site.
- Added a homepage "Workflow Deep Dives" link block in `index.html` to give both under-linked feature pages crawlable internal links, alongside adjacent workflow pages.
- Verified with `npm run build`, committed as `eec973a` (`Add homepage links for reusable workflow pages`), and pushed to `origin main`.
- Run time: about 7 minutes.

2026-03-28 13:08 UTC

- Generated `reports/seo/2026-03-28.md` successfully; GA4 and Search Console access were available.
- Report snapshot: homepage led with 358 views in the last 7 days, realtime users were 1, Search Console query data was still sparse, and only `app_store_click` had recent conversion activity (`40`).
- Technical/on-page audit stayed clean at `0 / 23` pages with issues. Highest-confidence improvement was guide indexing support rather than copy changes.
- Added JSON-LD structured data to the full guides cluster: `CollectionPage` on `guides/index.html` and `HowTo` + `BreadcrumbList` on all six live guide pages.
- Verified with `npm run build`, committed as `d1e8087` (`Add structured data to guide pages`), and pushed to `origin main`.
- Run time: about 8 minutes.

2026-04-14 16:24 UTC

- Generated fresh GA4/GSC reports and force-added required ignored report artifacts: `reports/seo/latest.md`, `reports/seo/2026-04-14.md`, `reports/seo/FULL-AUDIT-REPORT.md`, and `reports/seo/ACTION-PLAN.md`.
- Install data was unavailable, so `app_store_click` remains only a download proxy. Current 7d report: `home=67`, `features=5`, `guides=19`, `app_store_click=1`, `home_download_click=1`, `feature_download_click=0`, `guide_download_click=0`, `feature_page_click=4`, `feature_cta_click=0`, `guide_cta_click=13`, and on-page issues `0 / 42`.
- Deep audit ran because a major page batch shipped and download proxies stayed weak. Results: robots and AI crawler controls passed, `llms.txt` scored `100/100`, local crawl found `42` unique pages / `357` internal links / no orphan candidates, broken links `0`, redirects clean, PageSpeed rate-limited, and security headers remain a host/CDN blocker.
- Shipped a 4-page source-backed `release qa handoff system` cluster: `reuse-layouts-across-projects`, `create-multi-device-promo-visuals`, `review-app-store-screenshot-set-before-export`, and `build-app-store-release-asset-kit`.
- Wired the cluster from homepage, guide hub, feature pages (`copy-paste-projects`, `device-frames`, `projects-presets`, `export-share`), reciprocal guide links, sitemap, `llms.txt`, and `llms-full.txt`; updated content-cluster ledgers and Vite inputs.
- Source docs consulted: `BEZEL_STUDIO_MASTER_GUIDE.md`, `APP_STORE_CONNECT_CONTEXT.md`, `BZLS_APP_TECHNICAL_REPORT.md`, `guides/GUIDES_TRACKER.md`, and `public/assets/source/notes/assets-description.md`.
- Self-review: structure is improving (`guides` 16 -> 19, home concentration slightly lower), but download proxy is flat (`app_store_click=1`) and deeper download events are still zero. Latest work appears to help structure/qualified paths, not downloads yet.
- Validation passed: `npm install`, `python3 -m py_compile scripts/seo_operator.py`, `python3 -m json.tool reports/seo/content-cluster-ledger.json`, `npm run build`, local `npm run seo:report -- --audit-origin http://127.0.0.1:4173`, local internal-link crawl, local broken-link crawl, robots/llms/security/redirect checks, and `git diff --check`.
- Committed as `dfd4f86` (`Ship release QA guide cluster`) and pushed to `origin/main`.
- Run time: about 32 minutes.

2026-04-14 16:45 UTC

- Updated `daily-seo-operator` automation prompt with manual indexing/backlink sync clause.
- Future SEO God runs should create/update `reports/seo/manual-indexing-backlink-ledger.md` and `reports/seo/manual-indexing-backlink-state.json` with GSC URL Inspection priorities, indexing reasons, sitemap/internal-link status, and backlink/outreach handoff targets.
- Created initial shared repo manual indexing/backlink state and committed it as `88db6e6` (`Add manual indexing backlink ledger`), pushed to `origin/main`.
- Run time: about 3 minutes.

2026-04-15 05:54 UTC

- Manual indexing/backlink handoff updated from user report.
- User completed URL Inspection requests for the recommended priority URLs; state now marks them as `indexing_requested` on 2026-04-15.
- User submitted/added backlinks on Product Hunt, AlternativeTo, SaaSHub, BetaList, Indie Hackers, and Dev.to; state marks them `submitted` with live URLs pending.
- Future SEO God runs should watch GSC for crawled/indexed changes after 3-7 days and watch referral/app_store_click movement from these backlink sources.
- Run time: about 4 minutes.
