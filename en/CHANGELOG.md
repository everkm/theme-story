---
title: Changelog
slug: changelog
created_at: 2026-06-28T00:00:00Z
updated_at: 2026-07-03T10:37:00Z
tags:
  - featured
---

{#private}
## Propmpt
This changelog is for end users. Keep the wording user-friendly and avoid exposing internal technical details.

- Maintain the corresponding Chinese version at `../zh/CHANGELOG.md` when updating
- The date in parentheses after the version number is the release date
- When no new version is specified, append entries under the latest version


## v0.1.0 (2026-06-28)

**Initial release**

- **Blog layout**
  - Responsive blog design migrated from hexo-theme-redefine
  - Accent color and light / dark mode with Story design tokens
  - Virtual homepage with banner, sidebar, and paginated article list

- **Homepage**
  - Full-screen banner on page 1 with title, typing subtitle, scroll-down button, and social icons
  - Fixed-banner mode: blurred banner background on pages 2 and beyond
  - Sidebar with site info, announcement, author avatar, and post count
  - Article cards with optional cover image, summary, date, and tags
  - Homepage pagination at site root (`/index.html`, `/index.p2.html`, …)

- **Virtual pages**
  - Homepage, about, links, album, posts list, tags index, tag posts, and archives
  - Paginated posts list and tag pages

- **Posts**
  - Post detail pages with cover hero (or plain title), author header, tags, and prev / next navigation
  - Optional post copyright block with Creative Commons license support
  - Archives grouped by year and month

- **Links & album**
  - Friend links page with categorized cards and optional thumbnails
  - Album page with MiniMasonry layout, hover captions, loading skeleton, and image lightbox

- **Features**
  - Dark mode toggle with localStorage persistence
  - View Transitions for smooth in-site navigation
  - View Transitions restore scroll position on navigation (top of page, or hash target)
  - Algolia full-text search in the header via `plugin-in-search` (when `algolia_search` is configured)
  - Optional preloader screen and particles background
  - Scroll tools: back-to-top and font-size adjustment (stored in browser)
  - Optional reading progress bar at the top of the page
  - Configurable navbar with gradient background, custom links, and auto-hide on scroll
  - Optional archives button and back button on post pages
  - Footer with copyright, inline social icons, and optional "Powered by" line
  - Image lightbox for images in post content

- **Rendering**
  - Server-side code highlighting (`code_highlight.server`)
  - Server-side math rendering via Typst (`math_render.server`)
  - Typography styles for blockquotes, footnotes, definition lists, and callouts

- **Configuration**
  - Site info, social links, copyright, and post pagination via `everkm.yaml`
  - About, links, and album content from `_about.md`, `_links.md`, and `_album.md` via inner links; homepage banner copy from `story.home_banner`
  - Story-specific options under `story.*` for banner, sidebar, navbar, scroll tools, and article copyright
  - Social links with bundled icons when `name` matches a known platform (case-insensitive); otherwise shows text
  - Underscore-prefixed files (`_*.md`) are data sources and are not listed as public posts
