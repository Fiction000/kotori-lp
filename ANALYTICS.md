# Kotori website analytics

## Overview

- Tool: Google Analytics 4 through the Google tag (`gtag.js`)
- Primary question: which pages and calls to action lead visitors to the App Store?
- Privacy model: basic consent mode; the Google tag is not loaded until a visitor accepts
- Scope: the canonical Kotori domains only; Vercel preview deployments do not collect data
- Last updated: 2026-09-01

The site does not send contact-form values, names, email addresses, message contents, or app reading data to GA4. Google Signals and ad personalization are disabled in the tag configuration.

## Tracking plan

| Event | Description | Parameters | Trigger |
| --- | --- | --- | --- |
| `page_view` | A consented visitor views a page | GA4 automatic page metadata | Google tag configuration after consent |
| `app_store_clicked` | A consented visitor opens Kotori in the App Store | `cta_location`, `site_language`, `link_url` | Any App Store badge click |

Current `cta_location` values are `hero`, `closing_cta`, `weekly_index`, `weekly_detail`, and `work_page`.

## Configure GA4

1. Create a GA4 property and a Web data stream for `https://www.kotori-aozora.app`.
2. Add the stream’s `G-...` measurement ID to the Vercel Production environment as `PUBLIC_GA_MEASUREMENT_ID`.
3. Deploy the site. Builds without a valid measurement ID contain no GA4 integration or consent interface.
4. In GA4 Admin, create event-scoped custom dimensions for “CTA location” (`cta_location`) and “Site language” (`site_language`).
5. After `app_store_clicked` appears in GA4, mark it as a key event. Use “once per session” if the goal is to compare sessions that reached the App Store.
6. Set data retention and internal-traffic filters in GA4 Admin before using the reports for decisions.

## Validate

Build and preview with a measurement ID:

```sh
PUBLIC_GA_MEASUREMENT_ID=G-YOURID npm run build
npm run preview
```

Open the local preview with `?ga_debug=1`, accept analytics, then verify `page_view` and `app_store_clicked` in GA4 DebugView. Confirm that declining consent creates no request to `googletagmanager.com`, that each App Store click fires once, and that no form values appear in event parameters.
