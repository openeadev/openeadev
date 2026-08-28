# OpenEA Website SEO and Search Console Checklist

This site is optimized around the public OpenEA homepage at `https://openea.dev/`.

## Primary search positioning

The homepage is written to establish OpenEA as:

- an **open-source enterprise architecture platform**
- a **self-hosted enterprise architecture platform**
- **enterprise architecture software**
- **enterprise architecture management** software
- an option for organizations evaluating **free enterprise architecture software** through OpenEA Community
- an alternative operating model for teams evaluating **LeanIX**, **Alfabet**, **Ardoq**, or **Essential**

The page intentionally uses these concepts in visible, useful copy rather than relying on a `meta keywords` tag. Google does not use the `meta keywords` tag for ranking.

## Technical SEO included

The production homepage includes:

- one descriptive `<title>`
- one clear `<h1>` aligned with the primary search intent
- a unique meta description
- canonical URL
- `index,follow` robots directives
- Open Graph metadata for Facebook, LinkedIn, Teams, Slack, and other compatible link unfurlers
- X/Twitter summary-large-image card metadata
- 1200×630 social preview image metadata
- Organization structured data
- WebSite structured data
- WebPage structured data
- SoftwareApplication structured data
- FAQPage structured data backed by visible FAQ content
- descriptive screenshot `alt` text and intrinsic image dimensions
- crawlable internal links
- crawlable GitHub project links
- `robots.txt`
- XML sitemap with accurate `lastmod` values
- image entries in the sitemap for core product screenshots
- favicon and web-app icon assets
- Google Analytics 4 with consent handling

The `/try/` page also includes page-specific SEO/social metadata, SoftwareApplication structured data, and BreadcrumbList structured data.

The `/privacy/` page includes page-specific metadata and BreadcrumbList structured data.

Placeholder routes that are not ready for search remain `noindex` and are intentionally excluded from the sitemap.

## Google Search Console after deployment

1. Deploy the updated files to GitHub Pages.
2. Confirm these URLs load successfully:
   - `https://openea.dev/`
   - `https://openea.dev/robots.txt`
   - `https://openea.dev/sitemap.xml`
   - `https://openea.dev/assets/img/openea-social.png`
3. In Google Search Console, open the `openea.dev` property.
4. Submit `sitemap.xml` under **Sitemaps** if it is not already submitted.
5. Use **URL Inspection** for `https://openea.dev/`.
6. Run **Test live URL**.
7. If Google can fetch the page successfully, choose **Request indexing** after this SEO deployment.
8. Repeat URL Inspection for `https://openea.dev/try/`.
9. Review **Pages / Indexing**, **Sitemaps**, and **Performance** after Google recrawls the site.
10. Monitor queries such as `OpenEA`, `open source enterprise architecture`, `self hosted enterprise architecture`, `enterprise architecture software`, and related phrases. Search rankings normally take time to develop and are not guaranteed by technical optimization alone.

If your Search Console property is verified using a DNS TXT record, no `google-site-verification` meta tag is required. If you use a URL-prefix property and Google gives you a verification meta tag, add the exact token Google provides to the homepage `<head>`.

## Structured data validation

After deployment, test the live homepage with Google's Rich Results Test and Schema Markup Validator.

Structured data helps search engines understand the page but does not guarantee a rich result or a particular ranking.

## Social preview validation

The production social image is:

`https://openea.dev/assets/img/openea-social.png`

It is 1200×630 pixels.

After deployment, refresh cached previews using the platform tools you use, especially:

- Facebook Sharing Debugger
- LinkedIn Post Inspector
- X link/card preview behavior

LinkedIn, Facebook, X, Slack, Teams, and many other services primarily use Open Graph metadata for link previews. X also recognizes the `twitter:*` card tags included on the site.

These tags improve how shared OpenEA links are represented. They do not control a social platform's internal search-ranking algorithm. Discoverability inside social networks also depends on public OpenEA profiles, posts, links, engagement, and the text used in those profiles and posts.

## Content strategy

This version intentionally does **not** create separate keyword landing pages or a blog. The homepage carries the search positioning.

When writing future homepage updates:

- keep the language useful to enterprise architects
- use terms people actually search for in titles, headings, explanatory copy, image alt text, and link text
- do not repeat keywords unnaturally
- preserve a single clear H1
- keep competitor comparisons factual
- do not claim feature parity unless it has been verified
- update `sitemap.xml` `lastmod` only after meaningful page/content/structured-data changes
- keep canonical URLs aligned with the public `https://openea.dev/` domain

## Current sitemap

The main sitemap is:

`https://openea.dev/sitemap.xml`

The OpenEA documentation site at `docs.openea.dev` is a separate host and should manage its own sitemap independently.
