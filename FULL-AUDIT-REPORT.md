# Bezel Studio Sunday SEO Audit

Scope: full-site operating audit with live GA4/Search Console refresh, local production-preview deep audit, and conversion-path review on `2026-04-27`.

Overall rating: `72/100`
Score confidence: `medium`

Primary mode: `conversion_path_optimization`

Reason: current run happened at `2026-04-26 22:12 PDT` / `2026-04-27 05:12 UTC`, so Sunday deep-audit rules applied. Measurement stayed clean after the 2026-04-26 repair, but homepage concentration and weak deeper routing still block download growth.

Top 3 issues:
- Homepage still owns `22` of `26` tracked page views in the last 7 days.
- Deeper guide intent is still dead: `guide_cta_click=0`, `guide_download_click=0`.
- Download proxy held flat at `app_store_click=3` after the last repair, so structure is improving faster than installs.

Top 3 opportunities:
- Improve homepage CTR on the only meaningful Search Console opportunity page: `51` impressions, `2` clicks, `3.92%` CTR, average position `7.9`.
- Put more direct feature routes above the fold so homepage visitors hit commercial pages before long-scroll sections.
- Keep manual indexing/backlink work in follow-up mode while the main operator fixes conversion path depth.

## Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| Conversion path | Warning | Confirmed | Homepage concentration is still too high for a site trying to drive installs. | GA4 7d mix: `home=22`, `features=3`, `guides=1`. | Add stronger above-the-fold internal routes from home into commercial feature pages and one clearer guide-hub route. |
| Download proxy | Warning | Confirmed | Download proxy is stable, not growing. | `app_store_click=3`, same as prior completed run. | Improve discovery into pages that already show some install intent before adding more content. |
| Guide path | Warning | Confirmed | Guide discovery exists, but guide CTA and guide download signals are still zero. | GA4 7d events: `guide_cta_click=0`, `guide_download_click=0`, while `/guides/` has `1` page view. | Give homepage visitors a clearer route into the guide archive and keep guide hub commercial paths visible. |
| Homepage CTR | Warning | Confirmed | Search Console opportunity is concentrated almost entirely on the homepage. | `https://bezelstudio.app/` shows `51` impressions, `2` clicks, `3.92%` CTR, average position `7.9`. | Tighten homepage title/meta around `App Store Screenshot Maker` and `iPhone mockups`. |
| Measurement integrity | Pass | Confirmed | On-page audit is still clean after last run’s repair. | `reports/seo/latest.md` shows `0 / 46` pages with issues. | Keep measurement repair work closed unless new gaps appear. |
| Crawl and AI controls | Pass | Confirmed | Crawlability basics remain healthy. | `robots.txt` and `llms.txt` both passed; broken-links audit found `0` broken links. | No change needed. |
| Internal links | Warning | Confirmed | Some secondary guides are still underlinked, but this is not the main bottleneck right now. | Local preview crawl found `45` unique pages, `281` internal links, and `4` guides at `<=1` incoming link. | Keep this as a follow-on cleanup after homepage routing proves or fails. |
| Security headers | Warning | Confirmed | Header hardening still depends on host/CDN control. | Security audit still flags missing HSTS/CSP and related headers. | Track outside repo; not fixable in static site code alone. |
| Performance data | Info | Confirmed | Core Web Vitals are incomplete again. | `pagespeed.py` hit rate limits during this audit. | Re-run later before making performance claims. |

## Prioritized Action Plan

1. Stay in `conversion_path_optimization`.
2. Ship homepage meta-copy update for CTR and clearer qualified intent.
3. Ship an above-the-fold commercial route block on home with direct links to `device-frames`, `projects-presets`, `translation`, `canvas-motion`, plus one guide-hub route.
4. Rebuild site and rerun report + deep audit on local production preview.
5. Keep support operator on `follow_up_only`; no new indexing or backlink queue this run.

## Unknowns And Follow-ups

- Need 1-2 more runs to see whether the new route block changes `feature_page_click`, `feature_cta_click`, or `guide_cta_click`.
- Guide underlinking still exists, but it may not matter if homepage routing starts working.
- App Store installs remain unavailable in automation, so `app_store_click` is still only a proxy.

## Artifacts

- HTML dashboard: `reports/seo/SEO-REPORT.html`
- Live metrics report: `reports/seo/latest.md`
- Dated report: `reports/seo/2026-04-27.md`
- Shared support-worker handoff: `reports/seo/manual-indexing-backlink-ledger.md` and `reports/seo/manual-indexing-backlink-state.json`
