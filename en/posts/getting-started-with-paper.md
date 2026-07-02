---
title: "Getting Started with Paper"
description: How to use Paper Theme with everkm-publish.
created_at: 2026-06-27T10:00:00Z
tags:
  - guide
---

## Install the theme

Install Paper Theme via everkm-publish and set it in your site's `everkm.yaml`.

## Content structure

```text
your-site/
├── _home.md          # Hero content for virtual homepage
├── _about.md         # About page (virtual template)
└── posts/
    └── *.md          # Blog posts
```

## Featured posts

Add the `featured` tag to surface posts on the homepage:

```yaml
tags:
  - featured
```

## Typography samples

> Blockquotes use a left accent border and reduced opacity, matching Astro Paper.

Inline `code` uses a muted background. Fenced blocks:

```javascript
export function hello(name) {
  console.log(`Hello, ${name}!`);
}
```

| Feature | Status |
| --- | --- |
| Dark mode | ✅ |
| View Transitions | ✅ |
| Algolia search | ✅ (with `algolia_search` config) |

- Unordered list item
- Another item with **bold** and _italic_

1. Ordered list
2. Second step

End of typography demo.
