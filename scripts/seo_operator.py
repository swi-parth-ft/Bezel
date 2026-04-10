#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
from collections import defaultdict
from dataclasses import dataclass
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import requests
from google.auth.transport.requests import Request
from google.oauth2 import service_account


DEFAULT_KEY_PATH = "keys/seo-automation.json"
DEFAULT_SITE_URL = "https://bezelstudio.app/"
DEFAULT_GA4_PROPERTY_ID = "529323990"
APP_STORE_HOST = "apps.apple.com"
DEFAULT_KEY_ENV_VARS = (
    "SEO_AUTOMATION_KEY_PATH",
    "BEZEL_SEO_KEY_PATH",
    "GOOGLE_APPLICATION_CREDENTIALS",
)
FALLBACK_KEY_CANDIDATES = (
    Path.home() / "Code/Swift/Websites/BezelStudio/keys/seo-automation.json",
    Path.home() / "Code/Swift/Websites/Bezel/keys/seo-automation.json",
    Path.home() / ".codex/keys/seo-automation.json",
)


@dataclass
class ApiClient:
    key_path: Path

    def _token(self, scopes: list[str]) -> str:
        creds = service_account.Credentials.from_service_account_file(
            self.key_path,
            scopes=scopes,
        )
        creds.refresh(Request())
        return str(creds.token)

    def post(self, url: str, scopes: list[str], payload: dict[str, Any]) -> dict[str, Any]:
        token = self._token(scopes)
        response = requests.post(
            url,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            },
            data=json.dumps(payload),
            timeout=60,
        )
        response.raise_for_status()
        return response.json()

    def get(self, url: str, scopes: list[str]) -> dict[str, Any]:
        token = self._token(scopes)
        response = requests.get(
            url,
            headers={"Authorization": f"Bearer {token}"},
            timeout=60,
        )
        response.raise_for_status()
        return response.json()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate an SEO operations report for Bezel Studio.")
    parser.add_argument("--key", default=DEFAULT_KEY_PATH, help="Path to the Google service account JSON key.")
    parser.add_argument("--site-url", default=DEFAULT_SITE_URL, help="Search Console site URL.")
    parser.add_argument("--ga4-property-id", default=DEFAULT_GA4_PROPERTY_ID, help="GA4 property ID.")
    parser.add_argument(
        "--audit-origin",
        default=None,
        help="Optional origin to fetch pages from for on-page audits while keeping GA4/Search Console on the canonical site.",
    )
    parser.add_argument(
        "--output",
        default="reports/seo/latest.md",
        help="Markdown report output path.",
    )
    return parser.parse_args()


def resolve_key_path(repo_root: Path, configured_path: str) -> Path:
    raw_path = Path(configured_path).expanduser()
    candidates: list[Path] = []
    seen: set[Path] = set()

    def add_candidate(candidate: Path) -> None:
        expanded = candidate.expanduser()
        if not expanded.is_absolute():
            expanded = (repo_root / expanded).resolve()
        else:
            expanded = expanded.resolve()
        if expanded in seen:
            return
        seen.add(expanded)
        candidates.append(expanded)

    add_candidate(raw_path)

    for env_name in DEFAULT_KEY_ENV_VARS:
        env_value = os.environ.get(env_name)
        if env_value:
            add_candidate(Path(env_value))

    for candidate in FALLBACK_KEY_CANDIDATES:
        add_candidate(candidate)

    for candidate in candidates:
        if candidate.exists():
            return candidate

    searched = "\n".join(f"- {candidate}" for candidate in candidates)
    raise FileNotFoundError(
        "Could not find the SEO automation service-account key. "
        "Set SEO_AUTOMATION_KEY_PATH or place the file at one of:\n"
        f"{searched}"
    )


def iso_day(offset_days: int) -> str:
    return (date.today() + timedelta(days=offset_days)).isoformat()


def percent_change(current: float, previous: float) -> str:
    if previous == 0:
        if current == 0:
            return "0%"
        return "new"
    delta = ((current - previous) / previous) * 100
    return f"{delta:+.1f}%"


def safe_div(numerator: float, denominator: float) -> float:
    if denominator == 0:
        return 0.0
    return numerator / denominator


def fmt_num(value: float | int) -> str:
    if isinstance(value, float):
        if value >= 100:
            return f"{value:,.0f}"
        return f"{value:.2f}"
    return f"{value:,}"


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def fetch_search_console(
    client: ApiClient,
    site_url: str,
    start_date: str,
    end_date: str,
    dimensions: list[str],
    row_limit: int = 100,
) -> list[dict[str, Any]]:
    payload = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }
    encoded_site = requests.utils.quote(site_url, safe="")
    data = client.post(
        f"https://www.googleapis.com/webmasters/v3/sites/{encoded_site}/searchAnalytics/query",
        ["https://www.googleapis.com/auth/webmasters.readonly"],
        payload,
    )
    return data.get("rows", [])


def fetch_ga_report(
    client: ApiClient,
    property_id: str,
    start_date: str,
    end_date: str,
    dimensions: list[str],
    metrics: list[str],
    limit: int = 50,
    dimension_filter: dict[str, Any] | None = None,
) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "dateRanges": [{"startDate": start_date, "endDate": end_date}],
        "dimensions": [{"name": name} for name in dimensions],
        "metrics": [{"name": name} for name in metrics],
        "limit": str(limit),
    }
    if dimension_filter:
        payload["dimensionFilter"] = dimension_filter
    return client.post(
        f"https://analyticsdata.googleapis.com/v1beta/properties/{property_id}:runReport",
        ["https://www.googleapis.com/auth/analytics.readonly"],
        payload,
    )


def fetch_ga_realtime(client: ApiClient, property_id: str) -> int:
    data = client.post(
        f"https://analyticsdata.googleapis.com/v1beta/properties/{property_id}:runRealtimeReport",
        ["https://www.googleapis.com/auth/analytics.readonly"],
        {"metrics": [{"name": "activeUsers"}]},
    )
    rows = data.get("rows", [])
    if not rows:
        return 0
    return int(rows[0]["metricValues"][0]["value"])


def find_page_files(repo_root: Path) -> list[Path]:
    pages = [repo_root / "index.html", repo_root / "privacy.html"]
    pages.extend(sorted((repo_root / "features").glob("*.html")))
    pages.extend(sorted((repo_root / "guides").glob("*.html")))
    return [path for path in pages if path.exists()]


def audit_page(page_path: Path, request_origin: str, canonical_origin: str) -> dict[str, Any]:
    relative = f"/{page_path.name}"
    if page_path.name == "index.html" and page_path.parent.name == "guides":
        relative = "/guides/"
    elif page_path.parent.name == "features":
        relative = f"/features/{page_path.name}"
    elif page_path.parent.name == "guides":
        relative = f"/guides/{page_path.name}"
    elif page_path.name == "index.html":
        relative = "/"
    elif page_path.name == "privacy.html":
        relative = "/privacy.html"

    canonical_url = f"{canonical_origin.rstrip('/')}{relative}"
    request_url = f"{request_origin.rstrip('/')}{relative}"
    response = requests.get(request_url, timeout=60)
    html = response.text

    title_match = re.search(r"<title>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
    desc_match = re.search(
        r'<meta name="description"\s+content="([^"]*)"',
        html,
        re.IGNORECASE,
    )
    canonical_match = re.search(
        r'<link rel="canonical"\s+href="([^"]*)"',
        html,
        re.IGNORECASE,
    )
    og_title_match = re.search(
        r'<meta property="og:title"\s+content="([^"]*)"',
        html,
        re.IGNORECASE,
    )
    og_desc_match = re.search(
        r'<meta property="og:description"\s+content="([^"]*)"',
        html,
        re.IGNORECASE,
    )
    twitter_title_match = re.search(
        r'<meta name="twitter:title"\s+content="([^"]*)"',
        html,
        re.IGNORECASE,
    )
    twitter_desc_match = re.search(
        r'<meta name="twitter:description"\s+content="([^"]*)"',
        html,
        re.IGNORECASE,
    )
    h1_matches = re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.IGNORECASE | re.DOTALL)
    app_store_links = len(re.findall(APP_STORE_HOST, html, re.IGNORECASE))

    title = clean_text(title_match.group(1)) if title_match else ""
    description = clean_text(desc_match.group(1)) if desc_match else ""
    canonical = canonical_match.group(1) if canonical_match else ""
    h1_count = len(h1_matches)

    issues: list[str] = []
    if not title:
        issues.append("missing title")
    elif len(title) > 65:
        issues.append(f"title too long ({len(title)})")
    if not description:
        issues.append("missing meta description")
    elif len(description) > 160:
        issues.append(f"meta description too long ({len(description)})")
    if canonical != canonical_url:
        issues.append("canonical mismatch")
    if not og_title_match or not og_desc_match:
        issues.append("missing Open Graph metadata")
    if not twitter_title_match or not twitter_desc_match:
        issues.append("missing Twitter metadata")
    if h1_count != 1:
        issues.append(f"unexpected h1 count ({h1_count})")
    if app_store_links == 0:
        issues.append("no App Store links")

    return {
        "path": relative,
        "url": canonical_url,
        "audit_url": request_url,
        "status_code": response.status_code,
        "title": title,
        "description": description,
        "canonical": canonical,
        "issues": issues,
    }


def top_pages_from_ga(report: dict[str, Any]) -> list[dict[str, Any]]:
    pages: list[dict[str, Any]] = []
    for row in report.get("rows", []):
        dimension_values = row.get("dimensionValues", [])
        metric_values = row.get("metricValues", [])
        pages.append(
            {
                "pagePath": dimension_values[0]["value"] if dimension_values else "",
                "screenPageViews": int(metric_values[0]["value"]) if metric_values else 0,
                "sessions": int(metric_values[1]["value"]) if len(metric_values) > 1 else 0,
                "totalUsers": int(metric_values[2]["value"]) if len(metric_values) > 2 else 0,
            }
        )
    return pages


def event_rows(report: dict[str, Any]) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    for row in report.get("rows", []):
        dims = row.get("dimensionValues", [])
        metrics = row.get("metricValues", [])
        items.append(
            {
                "eventName": dims[0]["value"] if dims else "",
                "eventCount": int(metrics[0]["value"]) if metrics else 0,
            }
        )
    return items


DOWNLOAD_TRACKING_EVENTS = [
    "app_store_click",
    "home_download_click",
    "feature_download_click",
    "guide_download_click",
    "feature_page_click",
    "feature_cta_click",
    "guide_cta_click",
]


def classify_page_bucket(page_path: str) -> str:
    if page_path in {"/", "/index.html", ""}:
        return "home"
    if page_path.startswith("/features/"):
        return "features"
    if page_path.startswith("/guides/") or page_path == "/guides/":
        return "guides"
    if page_path == "/privacy.html":
        return "privacy"
    return "other"


def build_page_mix(ga_pages: list[dict[str, Any]]) -> dict[str, Any]:
    totals = {"home": 0, "features": 0, "guides": 0, "privacy": 0, "other": 0}
    total_views = 0

    for item in ga_pages:
        page_views = int(item.get("screenPageViews", 0))
        totals[classify_page_bucket(item.get("pagePath", ""))] += page_views
        total_views += page_views

    return {
        "totals": totals,
        "total_views": total_views,
        "home_share": safe_div(totals["home"], total_views),
    }


def build_query_growth(
    current_rows: list[dict[str, Any]],
    previous_rows: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    previous_map = {
        row["keys"][0]: row
        for row in previous_rows
        if row.get("keys")
    }
    trends: list[dict[str, Any]] = []
    for row in current_rows:
        if not row.get("keys"):
            continue
        query = row["keys"][0]
        previous = previous_map.get(query, {})
        current_clicks = float(row.get("clicks", 0))
        current_impressions = float(row.get("impressions", 0))
        prev_clicks = float(previous.get("clicks", 0))
        prev_impressions = float(previous.get("impressions", 0))
        score = (current_clicks - prev_clicks) * 3 + (current_impressions - prev_impressions)
        trends.append(
            {
                "query": query,
                "current_clicks": current_clicks,
                "current_impressions": current_impressions,
                "prev_clicks": prev_clicks,
                "prev_impressions": prev_impressions,
                "click_change": percent_change(current_clicks, prev_clicks),
                "impression_change": percent_change(current_impressions, prev_impressions),
                "position": float(row.get("position", 0)),
                "score": score,
            }
        )
    trends.sort(key=lambda item: (item["score"], item["current_impressions"]), reverse=True)
    return trends[:12]


def build_page_opportunities(
    current_rows: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    for row in current_rows:
        if not row.get("keys"):
            continue
        page = row["keys"][0]
        clicks = float(row.get("clicks", 0))
        impressions = float(row.get("impressions", 0))
        ctr = float(row.get("ctr", 0))
        position = float(row.get("position", 0))
        if impressions < 20:
            continue
        items.append(
            {
                "page": page,
                "clicks": clicks,
                "impressions": impressions,
                "ctr": ctr,
                "position": position,
                "opportunity": (impressions * max(0, 0.03 - ctr)) + max(0, 12 - position),
            }
        )
    items.sort(key=lambda item: item["opportunity"], reverse=True)
    return items[:10]


def build_keyword_hypotheses(
    ga_pages: list[dict[str, Any]],
    trending_keywords: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    if trending_keywords:
        return []

    keyword_map: dict[str, list[tuple[str, str]]] = {
        "/": [
            ("app store screenshot maker", "commercial"),
            ("iphone mockup generator", "commercial"),
            ("app preview video maker", "commercial"),
        ],
        "/features/device-frames.html": [
            ("iphone mockup generator", "commercial"),
            ("app store device mockup templates", "commercial"),
        ],
        "/features/canvas-motion.html": [
            ("app preview video maker", "commercial"),
            ("animated app store screenshots", "informational"),
        ],
        "/features/copy-paste-projects.html": [
            ("app screenshot templates", "informational"),
            ("reuse app store screenshot layouts", "informational"),
        ],
        "/features/translation.html": [
            ("app store screenshot localization", "commercial"),
            ("localized app screenshots", "commercial"),
        ],
        "/features/typography.html": [
            ("app store screenshot captions", "informational"),
            ("app screenshot text overlay", "informational"),
        ],
        "/features/bezel-ai-shortcuts.html": [
            ("shortcuts app screenshot automation", "informational"),
            ("instant iphone mockup shortcuts", "informational"),
        ],
    }

    seen_keywords: set[str] = set()
    hypotheses: list[dict[str, Any]] = []

    for page in ga_pages:
        page_path = page["pagePath"]
        candidates = keyword_map.get(page_path, [])
        page_views = page["screenPageViews"]

        for keyword, intent in candidates:
            if keyword in seen_keywords:
                continue
            hypotheses.append(
                {
                    "keyword": keyword,
                    "intent": intent,
                    "page": page_path,
                    "page_views": page_views,
                }
            )
            seen_keywords.add(keyword)
            if len(hypotheses) >= 8:
                return hypotheses

    return hypotheses


def render_report(
    active_users: int,
    ga_pages: list[dict[str, Any]],
    ga_events: list[dict[str, Any]],
    trending_keywords: list[dict[str, Any]],
    page_opportunities: list[dict[str, Any]],
    page_audits: list[dict[str, Any]],
    keyword_hypotheses: list[dict[str, Any]],
) -> str:
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    event_counts = {item["eventName"]: item["eventCount"] for item in ga_events}
    tracking_events = DOWNLOAD_TRACKING_EVENTS
    missing_events = [name for name in tracking_events if event_counts.get(name, 0) == 0]
    page_mix = build_page_mix(ga_pages)

    lines = [
        "# SEO Operator Report",
        "",
        f"Generated: {timestamp}",
        "",
        "## Executive Summary",
        "",
        f"- GA4 realtime active users: `{active_users}`",
        f"- Top GA4 page in the last 7 days: `{ga_pages[0]['pagePath']}` with `{ga_pages[0]['screenPageViews']}` page views" if ga_pages else "- No GA4 page view data yet",
        f"- Traffic mix (7d): `home={page_mix['totals']['home']}`, `features={page_mix['totals']['features']}`, `guides={page_mix['totals']['guides']}`, `other={page_mix['totals']['other']}`",
        f"- Search Console trending keyword leader: `{trending_keywords[0]['query']}`" if trending_keywords else "- No Search Console keyword data yet",
        f"- Download and CTA events (7d): `app_store_click={event_counts.get('app_store_click', 0)}`, `home_download_click={event_counts.get('home_download_click', 0)}`, `feature_download_click={event_counts.get('feature_download_click', 0)}`, `guide_download_click={event_counts.get('guide_download_click', 0)}`, `feature_page_click={event_counts.get('feature_page_click', 0)}`, `feature_cta_click={event_counts.get('feature_cta_click', 0)}`, `guide_cta_click={event_counts.get('guide_cta_click', 0)}`",
        f"- Conversion tracking watch: missing recent activity for `{', '.join(missing_events)}`" if missing_events else "- Conversion tracking status: all primary CTA and download-proxy events are active",
        f"- Pages with on-page audit issues: `{sum(1 for audit in page_audits if audit['issues'])}` / `{len(page_audits)}`",
        "",
        "## GA4 Top Pages (Last 7 Days)",
        "",
        "| Page | Page Views | Sessions | Users |",
        "| --- | ---: | ---: | ---: |",
    ]
    for item in ga_pages[:10]:
        lines.append(
            f"| `{item['pagePath']}` | {item['screenPageViews']} | {item['sessions']} | {item['totalUsers']} |"
        )

    lines.extend(
        [
            "",
            "## Download And CTA Events (Last 7 Days)",
            "",
            "| Event | Count |",
            "| --- | ---: |",
        ]
    )
    if ga_events:
        for item in ga_events:
            lines.append(f"| `{item['eventName']}` | {item['eventCount']} |")
    else:
        lines.append("| _No tracked events yet_ | 0 |")

    lines.extend(
        [
            "",
            "## Trending Search Console Queries",
            "",
            "| Query | Clicks | Impressions | Click Change | Impression Change | Avg Position |",
            "| --- | ---: | ---: | --- | --- | ---: |",
        ]
    )
    for item in trending_keywords:
        lines.append(
            f"| `{item['query']}` | {fmt_num(item['current_clicks'])} | {fmt_num(item['current_impressions'])} | "
            f"{item['click_change']} | {item['impression_change']} | {item['position']:.1f} |"
        )

    lines.extend(
        [
            "",
            "## Search Opportunity Pages",
            "",
            "| Page | Clicks | Impressions | CTR | Avg Position |",
            "| --- | ---: | ---: | ---: | ---: |",
        ]
    )
    for item in page_opportunities:
        lines.append(
            f"| `{item['page']}` | {fmt_num(item['clicks'])} | {fmt_num(item['impressions'])} | "
            f"{item['ctr'] * 100:.2f}% | {item['position']:.1f} |"
        )

    lines.extend(
        [
            "",
            "## Keyword Hypotheses (Search Console Sparse)",
            "",
            "| Keyword | Intent | Evidence Page | 7D Page Views |",
            "| --- | --- | --- | ---: |",
        ]
    )
    if keyword_hypotheses:
        for item in keyword_hypotheses:
            lines.append(
                f"| `{item['keyword']}` | {item['intent']} | `{item['page']}` | {item['page_views']} |"
            )
    else:
        lines.append("| _No additional hypotheses needed while query data is available_ | - | - | - |")

    lines.extend(
        [
            "",
            "## On-Page Audit",
            "",
            "| Page | Status | Issues |",
            "| --- | ---: | --- |",
        ]
    )
    for audit in page_audits:
        issue_text = ", ".join(audit["issues"]) if audit["issues"] else "ok"
        lines.append(f"| `{audit['path']}` | {audit['status_code']} | {issue_text} |")

    lines.extend(
        [
            "",
            "## Next Actions",
            "",
        ]
    )

    if page_opportunities:
        top_page = page_opportunities[0]["page"]
        lines.append(f"- Improve title/description CTR for `{top_page}` first; it has the strongest impression opportunity.")
    if trending_keywords:
        lines.append(f"- Expand copy or internal links around `{trending_keywords[0]['query']}` while momentum is rising.")
    if keyword_hypotheses:
        lines.append(
            f"- Search Console is still sparse; prioritize content and internal links for `{keyword_hypotheses[0]['keyword']}` from `{keyword_hypotheses[0]['page']}`."
        )
    if page_mix["home_share"] >= 0.6:
        lines.append("- Homepage traffic is still too concentrated; add or strengthen homepage links that move visitors into feature pages and step-by-step guides.")
    if event_counts.get("app_store_click", 0) == 0:
        lines.append("- No App Store clicks were recorded in the last 7 days; inspect outbound CTA tracking and the download path before publishing more content.")
    if event_counts.get("feature_page_click", 0) == 0:
        lines.append("- No feature-page clicks were recorded in the last 7 days; inspect and improve internal feature entry points before the next run.")
    if event_counts.get("guide_cta_click", 0) == 0:
        lines.append("- No guide CTA clicks were recorded in the last 7 days; strengthen the guide hub and homepage guide links with clearer entry copy.")
    if event_counts.get("feature_page_click", 0) > 0 and event_counts.get("feature_download_click", 0) == 0:
        lines.append("- Feature pages are being discovered but not producing download clicks; improve feature-page CTA placement, copy, and event wiring.")
    elif event_counts.get("feature_page_click", 0) > 0 and event_counts.get("feature_cta_click", 0) == 0:
        lines.append("- Feature pages are being discovered but the dedicated feature CTA event is still zero; verify event wiring before assuming the copy failed.")
    audit_issues = [audit for audit in page_audits if audit["issues"]]
    if audit_issues:
        lines.append(f"- Fix on-page issues on `{audit_issues[0]['path']}` and related pages before the next crawl wave.")
    if not (page_opportunities or trending_keywords or audit_issues):
        lines.append("- Search demand is still sparse; ship a new or materially expanded high-intent page before the next crawl wave instead of waiting for more data.")

    lines.append("")
    return "\n".join(lines)


def main() -> None:
    args = parse_args()
    repo_root = Path(__file__).resolve().parents[1]
    key_path = resolve_key_path(repo_root, args.key)
    output_path = (repo_root / args.output).resolve() if not Path(args.output).is_absolute() else Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    dated_output_path = output_path.parent / f"{date.today().isoformat()}.md"

    client = ApiClient(key_path=key_path)

    active_users = fetch_ga_realtime(client, args.ga4_property_id)
    ga_pages_report = fetch_ga_report(
        client,
        args.ga4_property_id,
        start_date="7daysAgo",
        end_date="today",
        dimensions=["pagePath"],
        metrics=["screenPageViews", "sessions", "totalUsers"],
        limit=25,
    )
    ga_event_report = fetch_ga_report(
        client,
        args.ga4_property_id,
        start_date="7daysAgo",
        end_date="today",
        dimensions=["eventName"],
        metrics=["eventCount"],
        limit=15,
        dimension_filter={
            "filter": {
                "fieldName": "eventName",
                "inListFilter": {"values": DOWNLOAD_TRACKING_EVENTS},
            }
        },
    )

    current_queries = fetch_search_console(
        client,
        args.site_url,
        iso_day(-28),
        iso_day(-1),
        ["query"],
        row_limit=100,
    )
    previous_queries = fetch_search_console(
        client,
        args.site_url,
        iso_day(-56),
        iso_day(-29),
        ["query"],
        row_limit=100,
    )
    current_pages = fetch_search_console(
        client,
        args.site_url,
        iso_day(-28),
        iso_day(-1),
        ["page"],
        row_limit=100,
    )

    canonical_origin = args.site_url.rstrip("/")
    audit_origin = (args.audit_origin or args.site_url).rstrip("/")
    page_audits = [audit_page(page_path, audit_origin, canonical_origin) for page_path in find_page_files(repo_root)]
    ga_pages = top_pages_from_ga(ga_pages_report)
    ga_events = event_rows(ga_event_report)
    trending_keywords = build_query_growth(current_queries, previous_queries)
    keyword_hypotheses = build_keyword_hypotheses(ga_pages, trending_keywords)

    report = render_report(
        active_users=active_users,
        ga_pages=ga_pages,
        ga_events=ga_events,
        trending_keywords=trending_keywords,
        page_opportunities=build_page_opportunities(current_pages),
        page_audits=page_audits,
        keyword_hypotheses=keyword_hypotheses,
    )
    output_path.write_text(report, encoding="utf-8")
    dated_output_path.write_text(report, encoding="utf-8")
    print(f"Wrote SEO report to {output_path}")
    print(f"Wrote dated SEO report to {dated_output_path}")


if __name__ == "__main__":
    main()
