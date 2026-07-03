---
title: "Front Matter 与元数据"
description: 如何在 Story 主题中配置文章元数据。
created_at: 2026-06-24T09:00:00Z
tags:
  - guide
---

每篇文章以 YAML **Front Matter** 开头，用于描述页面元数据。

## 常用字段

| 字段 | 说明 |
| --- | --- |
| `title` | 文章标题，显示在卡片与详情页 |
| `description` | 摘要，用于 meta 标签与预览 |
| `created_at` | 创建时间，RFC3339 格式 |
| `tags` | 标签数组，用于筛选 |

## 示例

```yaml
---
title: 我的文章
description: 简短摘要。
created_at: 2026-06-24T09:00:00Z
tags:
  - demo
---
```

导出前运行 `everkm-publish lint`，可检查缺失字段或重复 slug。
