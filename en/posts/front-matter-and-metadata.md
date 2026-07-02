---
title: "Front Matter and Metadata"
description: How to configure post metadata in Paper Theme.
created_at: 2026-06-24T09:00:00Z
tags:
  - guide
---

Every post starts with YAML **Front Matter** describing the page metadata.

## Common fields

| Field | Description |
| --- | --- |
| `title` | Post title shown in cards and detail pages |
| `description` | Summary for meta tags and previews |
| `created_at` | Creation date in RFC3339 format |
| `tags` | Array of tags for filtering |

## Example

```yaml
---
title: My Post
description: A short summary.
created_at: 2026-06-24T09:00:00Z
tags:
  - demo
---
```

Run `everkm-publish lint` before export to catch missing fields or duplicate slugs.
