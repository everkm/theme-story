---
title: Changelog
slug: changelog
created_at: 2026-06-28T00:00:00Z
tags:
  - featured
---

{#private}
This changelog is for end users. Keep the wording user-friendly and avoid exposing internal technical details.

- Maintain the corresponding Chinese version at `../zh/CHANGELOG.md` when updating
- The date in parentheses after the version number is the release date
- When no new version is specified, append entries under the latest version


## v0.1.0 (2026-06-28)

**Initial release**

- **Blog layout**
  - Minimal, responsive blog design migrated from Astro Paper
  - Tailwind CSS v4 design tokens with light and dark mode support
  - Virtual homepage with hero section, featured posts, and recent posts

- **Virtual pages**
  - Homepage (`/index.html`), posts list, tags index, tag posts, archives, and about page
  - Paginated posts list and tag pages

- **Posts**
  - Featured posts via the `featured` tag on the homepage
  - Post detail pages with tags, date, and back navigation
  - Archives grouped by year and month

- **Features**
  - Dark mode toggle with localStorage persistence
  - View Transitions for smooth in-site navigation
  - View Transitions restore scroll position on navigation (top of page, or hash target)
  - Algolia full-text search in the header via `plugin-in-search` (when `algolia_search` is configured)
  - Optional archives button and back button on post pages
  - Post back button renders below the sticky header inside the main content area
  - Mobile navigation menu stays hidden until opened; the menu button switches to a close icon
  - Footer social icons inline with the copyright line; “Powered by” on its own row below
  - About page uses the same rounded card frame as archives and other static pages
  - Links and album pages use the same page frame and header spacing as About
  - Album page (`/album/`) uses MiniMasonry layout, hover captions, and loading skeleton aligned with hexo-theme-redefine
  - Algolia search overlay uses story theme colors (accent red, surface tokens) instead of paper grayscale
  - Homepage banner scroll-down button works after client hydration
  - Homepage sidebar site-info card vertical spacing aligned with hexo-theme-redefine
  - Page content and frame width widened to 1000px (62.5rem), matching redefine navbar and source site
  - Optional particles background (`features.particles`, aligned with hexo-theme-redefine); loaded as a standalone script to avoid breaking other client features

- **Rendering**
  - Server-side code highlighting (`code_highlight.server`)
  - Server-side math rendering via Typst (`math_render.server`)
  - Typography styles aligned with Astro Paper (blockquotes, footnotes, definition lists)

- **Configuration**
  - Site info, social links, copyright, and post pagination via `everkm.yaml`
  - Homepage and about content from `_home.md` and `_about.md` via inner links
  - Social links with bundled icons when `name` matches a known platform (case-insensitive); otherwise shows text
