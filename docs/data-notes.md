# Screaming Frog Data Notes

The `data/site-crawl-initial` folder stores the raw CSV exports dropped from Screaming Frog. Keep them unmodified for traceability; derive insights in separate notebooks or sheets.

## Files

| File | Purpose |
| ---- | ------- |
| `ai_all.csv` | AI-generated page insights (titles, quality hints). |
| `analytics_all.csv` | GA session metrics for crawled URLs (if connected). |
| `canonicals_all.csv` | Canonical tags and duplicates to audit SEO hygiene. |
| `content_all.csv` | Word counts, read time, and near-duplicate signals. |
| `directives_all.csv` | Meta robots, X-Robots, and crawl directives. |
| `external_all.csv` | Outbound link inventory for partnership tracking. |
| `h1_all.csv`, `h2_all.csv` | Heading audit to spot missing or duplicate H tags. |
| `images_all.csv` | Image sizes, missing alt text, slow assets. |
| `internal_all.csv` | Internal link graph—useful for sitemap/core nav planning. |
| `meta_description_all.csv`, `meta_keywords_all.csv` | Metadata quality checks. |
| `mobile_all.csv` | Mobile-friendly test signals. |
| `page_titles_all.csv` | Current title tags per page (character + pixel widths). |
| `pagespeed_all.csv` | Lighthouse metric snapshots (FCP, LCP, TTI, etc.). |
| `pagination_all.csv` | Next/prev tags, rel attributes for paginated listings. |
| `sitemaps_all.csv` | Sitemap URLs discovered. |
| `structured_data_all.csv` | Schema.org entities detected (Events, Articles, etc.). |
| `url_all.csv` | Master URL list with status codes and crawl depth. |

## Usage Guide

1. Copy subsets into a spreadsheet or import into analytics notebooks for clustering.
2. Track remediation tasks (e.g., missing alt text) in GitHub Issues referencing offending URLs.
3. When a new crawl is uploaded, place it in a dated subfolder (e.g., `data/site-crawl-2024-05-01`) to keep history.
