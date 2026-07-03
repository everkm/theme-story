---
title: Theme Configuration
slug: readme
created_at: 2026-06-28T00:00:00Z
updated_at: 2026-07-03T10:37:00Z
tags:
  - featured
---



# Theme Configuration

Story is a blog theme for [everkm-publish](https://publish.everkm.com), migrated from [hexo-theme-redefine](https://github.com/EvanNotFound/hexo-theme-redefine). The default template is `post`. Site-level configuration lives under the `config` node in workspace `__everkm/everkm.yaml`; URL rules for content directories are set in `folders`. Theme defaults are defined in `__everkm/theme/story/everkm-theme.yaml`.

## Configuration Overview

```yaml
# __everkm/everkm.yaml

config:
  site: { ... }           # Site basic info
  home: '[[_home]]'       # Homepage data source marker (underscore file)
  about: '[[_about]]'     # About page content
  links: '[[_links]]'     # Friend links data
  album: '[[_album]]'     # Album data
  posts: { ... }          # Post list pagination
  features: { ... }       # Feature toggles
  story: { ... }          # Story theme appearance & layout
  code_highlight: { ... } # Server-side code highlighting
  math_render: { ... }    # Server-side math rendering
  socials: [ ... ]        # Social links (banner & footer)
  copyright: { ... }      # Footer "Powered by" line
  algolia_search: { ... } # Optional Algolia search

folders:
  "/":
    url_slug: posts
    url_id_suffix: false
```

---

## Site Info `site`

| Field | Type | Description |
|--------|------|------|
| `site.name` | string | Site name, used in page title, header, footer, banner, etc. |
| `site.description` | string | Site description (publish metadata; also used as banner subtitle fallback) |
| `site.author` | string | Author name shown on post pages and homepage sidebar |
| `site.profile` | string | Author avatar image path, e.g. `/assets/images/avatar-0.jpg` |
| `site.lang` | string | Site language, e.g. `en`, `zh` |
| `site.timezone` | string | Timezone for date display, e.g. `UTC`, `Asia/Shanghai` |
| `site.dir` | string | Text direction, `ltr` or `rtl` |

Example:

```yaml
config:
  site:
    name: My Blog
    description: Your personal blog journey.
    author: Jane Doe
    profile: /assets/images/avatar-0.jpg
    lang: en
    timezone: UTC
```

---

## Virtual Pages `home` / `about` / `links` / `album`

Story uses **virtual templates** for several pages. Body content and structured data come from underscore-prefixed Markdown files referenced by inner links:

| Field | Default | Description |
|--------|---------|-------------|
| `home` | `[[_home]]` | Homepage data source marker (`_home.md`; excluded from public post lists; banner copy is configured under `story.home_banner`) |
| `about` | `[[_about]]` | About page Markdown |
| `links` | `[[_links]]` | Friend links data (`links` array in front matter) |
| `album` | `[[_album]]` | Album data (`items` array in front matter) |

Example content layout:

```text
en/
├── _home.md          # Homepage data source marker (banner uses story.home_banner)
├── _about.md         # About page
├── _links.md         # Friend links data
├── _album.md         # Album data
├── README.md         # Theme configuration docs
├── CHANGELOG.md      # Changelog
└── hello-world.md    # Blog posts (at content root)
```

{.NOTE}
Do **not** create a root `index.md`. If `/index.html` resolves to a Markdown file, it renders as a regular post detail page instead of the virtual homepage.

Files whose basename starts with `_` are treated as **data sources**, not public posts.

---

## Posts `posts`

| Field | Type | Default | Description |
|--------|------|--------|------|
| `posts.per_page` | number | `10` | Posts per page on the homepage, posts list, and tag pages |

Homepage pagination uses the site root, e.g. `/index.html`, `/index.p2.html`.

---

## Feature Toggles `features`

| Field | Type | Default | Description |
|--------|------|--------|------|
| `features.light_and_dark_mode` | boolean | `true` | Light / dark mode toggle in the header |
| `features.show_archives` | boolean | `true` | Show the archives entry in the header (when using default nav) |
| `features.show_back_button` | boolean | `true` | Show a back button on post detail pages |
| `features.view_transitions` | boolean | `true` | Enable in-site View Transitions navigation |
| `features.preloader` | boolean | `false` | Show a loading screen on first visit |
| `features.particles` | boolean | `false` | Animated particles background |
| `features.home_banner` | boolean | `true` | Show the homepage banner |
| `features.home_sidebar` | boolean | `true` | Show the homepage sidebar |

Example:

```yaml
config:
  features:
    light_and_dark_mode: true
    show_archives: true
    show_back_button: true
    view_transitions: true
    preloader: true
    particles: false
    home_banner: true
    home_sidebar: true
```

---

## Story Theme `story`

Story-specific appearance and layout options. Defaults are provided in `everkm-theme.yaml`.

### Colors `story.colors`

| Field | Default | Description |
|--------|---------|-------------|
| `story.colors.primary` | `#A31F34` | Accent color |
| `story.colors.default_mode` | `light` | Default color mode (`light` or `dark`) |

### Homepage Banner `story.home_banner`

| Field | Default | Description |
|--------|---------|-------------|
| `story.home_banner.enable` | `true` | Enable the banner (also controlled by `features.home_banner`) |
| `story.home_banner.style` | `fixed` | `fixed` — full hero on page 1, blurred background on later pages; `static` — inline banner |
| `story.home_banner.image.light` | bundled image | Light-mode background image |
| `story.home_banner.image.dark` | bundled image | Dark-mode background image |
| `story.home_banner.title` | site name | Banner title |
| `story.home_banner.subtitle` | — | Static string, or typing config (see below) |

Subtitle typing config:

```yaml
story:
  home_banner:
    subtitle:
      text:
        - Welcome to my blog
        - Your personal blog journey.
      typing_speed: 100
      backing_speed: 80
      starting_delay: 500
      backing_delay: 1500
      loop: true
      smart_backspace: true
      hitokoto:
        enable: false
        show_author: false
        api: https://v1.hitokoto.cn
```

When `hitokoto.enable` is `true`, the banner fetches random quotes from the configured API instead of `text`.

### Homepage Sidebar `story.home_sidebar`

| Field | Default | Description |
|--------|---------|-------------|
| `story.home_sidebar.enable` | `true` | Enable sidebar (also controlled by `features.home_sidebar`) |
| `story.home_sidebar.position` | `left` | `left` or `right` |
| `story.home_sidebar.announcement` | — | Optional announcement text below the site name |

### Navbar `story.navbar`

| Field | Default | Description |
|--------|---------|-------------|
| `story.navbar.auto_hide` | — | Shrink navbar on scroll |
| `story.navbar.color.left` | `#f78736` | Left gradient color (navbar background) |
| `story.navbar.color.right` | `#367df7` | Right gradient color |
| `story.navbar.links` | — | Custom navigation links (replaces default nav when set) |

Link item:

```yaml
story:
  navbar:
    links:
      - label: Home
        path: /index.html
        icon: home
      - label: Album
        path: /album/index.html
        icon: album
      - label: Github
        path: https://github.com/everkm/theme-story
        external: true
        icon: github
```

Supported `icon` keys include `home`, `archives`, `github`, `album`, `links`, `about`, and others mapped in the theme.

### Global `story.global`

| Field | Default | Description |
|--------|---------|-------------|
| `story.global.scroll_progress.bar` | `false` | Show reading progress bar at the top |
| `story.global.scroll_tools.enable` | `true` | Show scroll-to-top and font-size controls |
| `story.global.preloader.message` | site name | Preloader text |
| `story.global.preloader.max_duration_ms` | `2500` | Maximum preloader display time |

### Articles `story.articles`

| Field | Default | Description |
|--------|---------|-------------|
| `story.articles.toc.enable` | `false` | Table of contents on post pages |
| `story.articles.toc.max_depth` | `3` | Maximum heading depth for TOC |
| `story.articles.copyright.enable` | `true` | Show copyright block at the bottom of posts |
| `story.articles.copyright.default` | `cc_by_nc_sa` | Default license when post front matter has no `copyright` |

Supported license keys: `cc_by_nc_sa`, `cc_by`, `cc_by_nc`, `cc_by_nd`, `cc_by_sa`, `cc0`, `all_rights_reserved`.

---

## Search `algolia_search`

When configured, the Algolia full-text search component appears in the header (requires `plugin-in-search` build artifacts).

```yaml
config:
  algolia_search:
    app_id: YOUR_APP_ID
    api_key: YOUR_SEARCH_API_KEY
    index_name: your_index
    site: your-site-id
```

| Field | Description |
|------|------|
| `app_id` | Algolia Application ID |
| `api_key` | Algolia Search-Only API Key |
| `index_name` | Index name |
| `site` | Site identifier (used internally by the plugin) |

---

## Code Highlighting `code_highlight`

Server-side syntax highlighting via everkm-publish:

```yaml
config:
  code_highlight:
    server: true
```

When `server: true`, code blocks are highlighted at build time using syntect themes scoped to `.app-prose`.

---

## Math Rendering `math_render`

Server-side math rendering via Typst:

```yaml
config:
  math_render:
    server: true
    font_size: 14
```

| Field | Type | Default | Description |
|--------|------|--------|------|
| `math_render.server` | boolean | — | Enable server-side math rendering |
| `math_render.font_size` | number | `14` | Base font size for rendered math SVG |

Use `$...$` for inline math and `$$...$$` for block math in Markdown.

---

## Social Links `socials`

Displayed on the homepage banner and in the footer:

```yaml
config:
  socials:
    - name: github
      url: https://github.com/everkm/theme-story
```

Supported `name` values include `github`, `twitter`, `x`, `facebook`, `linkedin`, `mail`, `telegram`, `whatsapp`, `pinterest`, and others mapped to icons in the theme. Unknown names render as text.

---

## Copyright `copyright`

Controls the **"Powered by"** line in the footer (separate from the automatic `© year site name` line):

```yaml
config:
  copyright:
    text: Everkm
    link: https://publish.everkm.com
```

---

## Directory Rules `folders`

Story's default theme configuration maps content at `/` to URLs under `/posts/`:

```yaml
folders:
  "/":
    url_slug: posts
    url_id_suffix: false
```

| Field | Description |
|-------|-------------|
| `url_slug` | URL prefix for content in this directory |
| `url_id_suffix` | When `true`, URLs include a stable ID suffix, e.g. `/posts/my-post-123.html` |

Site-level `folders` in `__everkm/everkm.yaml` **override** theme defaults.

---

## Virtual Page Routes

Story provides these virtual pages (no corresponding public Markdown file required):

| URL | Page | Description |
|-----|------|-------------|
| `/index.html` | Home | Banner, sidebar, paginated article list |
| `/index.p{N}.html` | Home (page N) | Homepage pagination |
| `/posts/index.html` | Posts list | Paginated post index |
| `/tags/index.html` | Tags index | All tags |
| `/tags/{tag}/index.html` | Tag posts | Posts filtered by tag |
| `/archives/index.html` | Archives | Posts grouped by year and month |
| `/about/` | About | About page from `config.about` |
| `/links/index.html` | Links | Friend links from `config.links` |
| `/album/index.html` | Album | Photo album from `config.album` |

---

## Friend Links `_links.md`

Friend link data is stored in the front matter of `_links.md`:

```yaml
---
title: Links
links:
  - category: Example Category
    has_thumbnail: true
    list:
      - name: Partner Site
        link: https://example.com
        description: Site description
        avatar: /assets/images/avatar-0.jpg
        thumbnail: /assets/images/desc-image.jpg
  - category: Simple List
    has_thumbnail: false
    list:
      - name: Another Site
        link: https://example.com
        description: Short description
        avatar: /assets/images/avatar-1.jpg
---
```

---

## Album `_album.md`

Album items are stored in the front matter of `_album.md`:

```yaml
---
title: Album
items:
  - image: /assets/images/1.jpg
    title: Image title
    description: Optional caption
---
```

The album page uses MiniMasonry layout with hover captions, a loading skeleton, and an image lightbox.

---

## Article Front Matter

Common fields for blog posts:

| Field | Type | Description |
|------|------|------|
| `title` | string | Post title |
| `description` | string | Post summary for meta and cards |
| `cover` | string | Cover image URL or path; shown on homepage cards and post hero |
| `created_at` | string | Creation time, RFC3339 format |
| `updated_at` | string | Update time, RFC3339 format |
| `slug` | string | URL path segment |
| `tags` | array | Tags for filtering |
| `draft` | boolean | When `true`, excluded from public lists |
| `copyright` | string | License key override for the post copyright block |

Example:

```yaml
---
title: Hello World
description: My first blog post.
cover: /assets/images/cover.jpg
created_at: 2026-06-28T10:00:00Z
tags:
  - intro
copyright: cc_by
---
```

If the first `h1` in the body matches the Front Matter `title`, it is automatically hidden during rendering.

---

## Content Markdown Extensions

Story inherits everkm-publish Markdown extensions. See the demo post [[everkm-markdown]] for a full showcase, or the [Everkm Markdown guide](https://publish.everkm.com/guide/everkm-markdown.html).

Supported extensions include:

- Inner links `[[...]]`
- Block attribute sets `{.class #id}`
- Inline attribute sets on links and images
- Macros (`macro/toc`, `macro/include`)
- Highlight `==text==`, superscript, subscript
- Definition lists, footnotes, task lists

---

## Reader Settings (Browser-side)

The following are stored locally in the user's browser and are **not** configured in `everkm.yaml`:

- Light / dark mode preference (when `features.light_and_dark_mode` is enabled)
- Font size level (when `story.global.scroll_tools.enable` is enabled)

Toggle color mode via the sun / moon button in the header. Adjust font size via the +/- buttons in the scroll tools panel.

---

## Theme Metadata

| Item | Value |
|----|-----|
| Theme name | `story` |
| Default template | `post` |
| Demo site | https://story.theme.everkm.com/ |
| Repository | https://github.com/everkm/theme-story |
