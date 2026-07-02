---
title: Theme Configuration
slug: readme
created_at: 2026-06-28T00:00:00Z
tags:
  - featured
---



# Theme Configuration

Paper is a minimal blog theme for [everkm-publish](https://publish.everkm.com), with `post` as the default template. Site-level configuration is placed under the `config` node in workspace `__everkm/everkm.yaml`; URL rules for content directories are set in `folders`.

## Configuration Overview

```yaml
# __everkm/everkm.yaml

config:
  site: { ... }           # Site basic info
  home: '[[_home]]'       # Homepage hero content
  about: '[[_about]]'     # About page content
  posts: { ... }          # Post list pagination and featured tag
  features: { ... }       # Feature toggles
  code_highlight: { ... } # Server-side code highlighting
  math_render: { ... }    # Server-side math rendering
  socials: [ ... ]        # Social links (homepage hero & footer)
  share_links: [ ... ]    # Share links on post pages
  copyright: { ... }      # Footer copyright

folders:
  "/":
    url_slug: posts
    url_id_suffix: true
```

---

## Site Info `site`

| Field | Type | Description |
|--------|------|------|
| `site.name` | string | Site name, used in page title, header, footer, etc. |
| `site.description` | string | Site description (publish system metadata) |
| `site.author` | string | Author name |
| `site.profile` | string | Author profile URL |
| `site.lang` | string | Site language, e.g. `en`, `zh` |
| `site.timezone` | string | Timezone for date display, e.g. `UTC`, `Asia/Shanghai` |
| `site.dir` | string | Text direction, `ltr` or `rtl` |

Example:

```yaml
config:
  site:
    name: My Blog
    description: A personal blog powered by Paper Theme
    author: Jane Doe
    lang: en
    timezone: UTC
```

---

## Virtual Pages `home` / `about`

Paper uses **virtual templates** for the homepage and about page. Hero and about body content come from Markdown files referenced by inner links:

| Field | Default | Description |
|--------|---------|-------------|
| `home` | `[[_home]]` | Path to homepage hero Markdown (resolved via inner link) |
| `about` | `[[_about]]` | Path to about page Markdown |

Example content layout:

```text
en/
├── _home.md          # Homepage hero (required)
├── _about.md         # About page (required)
├── README.md         # Theme configuration docs
├── CHANGELOG.md      # Changelog
└── posts/
    └── *.md          # Blog posts
```

{.NOTE}
Do **not** create a root `index.md`. If `/index.html` resolves to a Markdown file, it renders as a regular post detail page instead of the virtual homepage.

---

## Posts `posts`

| Field | Type | Default | Description |
|--------|------|--------|------|
| `posts.per_page` | number | `4` | Posts per page on the posts list and tag pages |
| `posts.per_index` | number | `4` | Recent posts shown on the homepage (excluding featured) |
| `posts.featured_tag` | string | `featured` | Tag used to mark featured posts on the homepage |

Featured posts example:

```yaml
---
title: My Featured Post
tags:
  - featured
  - release
---
```

---

## Feature Toggles `features`

| Field | Type | Default | Description |
|--------|------|--------|------|
| `features.light_and_dark_mode` | boolean | `true` | Enable light / dark mode toggle in the header |
| `features.show_archives` | boolean | `true` | Show the archives icon in the header navigation |
| `features.show_back_button` | boolean | `true` | Show a back button on post detail pages |
| `features.view_transitions` | boolean | `true` | Enable in-site View Transitions navigation |
| `features.edit_post.enabled` | boolean | `false` | Show an edit link on post pages |
| `features.edit_post.url` | string | — | Edit link URL template |

Example:

```yaml
config:
  features:
    light_and_dark_mode: true
    show_archives: true
    show_back_button: true
    view_transitions: true
    edit_post:
      enabled: false
```

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

Paper supports server-side syntax highlighting via everkm-publish:

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

Displayed on the homepage hero section and in the footer:

```yaml
config:
  socials:
    - name: github
      url: https://github.com/everkm/theme-paper
    - name: everkm
      url: https://everkm.com
```

Supported `name` values include `github`, `twitter`, `linkedin`, `mail`, and others mapped to icons in the theme.

---

## Share Links `share_links`

Optional share links on post detail pages:

```yaml
config:
  share_links:
    - name: twitter
      url: https://twitter.com/intent/tweet
    - name: facebook
      url: https://www.facebook.com/sharer/sharer.php
```

---

## Copyright `copyright`

```yaml
config:
  copyright:
    text: everkm
    link: https://everkm.com
```

---

## Directory Rules `folders`

Paper's default theme configuration maps content at `/` to URLs under `/posts/`:

```yaml
folders:
  "/":
    url_slug: posts
    url_id_suffix: true
```

| Field | Description |
|-------|-------------|
| `url_slug` | URL prefix for content in this directory |
| `url_id_suffix` | When `true`, URLs include a stable ID suffix, e.g. `/posts/my-post-123.html` |

Site-level `folders` in `__everkm/everkm.yaml` **override** theme defaults.

---

## Virtual Page Routes

Paper provides these virtual pages (no corresponding Markdown file required):

| URL | Page | Description |
|-----|------|-------------|
| `/index.html` | Home | Hero, featured posts, recent posts |
| `/posts/index.html` | Posts list | Paginated post index |
| `/tags/index.html` | Tags index | All tags |
| `/tags/{tag}/index.html` | Tag posts | Posts filtered by tag |
| `/archives/index.html` | Archives | Posts grouped by year and month |
| `/about/` | About | About page from `config.about` |

---

## Article Front Matter

Common fields for blog posts:

| Field | Type | Description |
|------|------|------|
| `title` | string | Post title |
| `description` | string | Post summary for meta and cards |
| `created_at` | string | Creation time, RFC3339 format |
| `updated_at` | string | Update time, RFC3339 format |
| `slug` | string | URL path segment |
| `tags` | array | Tags for filtering and featured marking |
| `draft` | boolean | When `true`, excluded from public lists |

Example:

```yaml
---
title: Hello World
description: My first blog post.
created_at: 2026-06-28T10:00:00Z
tags:
  - featured
  - intro
---
```

If the first `h1` in the body matches the Front Matter `title`, it is automatically hidden during rendering. See [[everkm-markdown#heading]] in the demo posts.

---

## Content Markdown Extensions

Paper inherits everkm-publish Markdown extensions. See the demo post [[everkm-markdown]] for a full showcase, or the [Everkm Markdown guide](https://publish.everkm.com/guide/everkm-markdown.html).

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

Toggle via the sun / moon button in the header.

---

## Theme Metadata

| Item | Value |
|----|-----|
| Theme name | `paper` |
| Default template | `post` |
| Demo site | https://paper.theme.everkm.com/ |
| Repository | https://github.com/everkm/theme-paper |
