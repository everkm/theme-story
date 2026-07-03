---
title: "深色模式与 View Transitions"
description: Story 主题的客户端增强功能。
created_at: 2026-06-26T10:00:00Z
tags:
  - features
---

Story 主题包含：

1. **深色模式** — 通过顶栏按钮切换，偏好保存在 `localStorage`
2. **View Transitions** — 站内导航平滑过渡，无需整页刷新
3. **Algolia 搜索** — 配置 `algolia_search` 后，通过 `plugin-in-search` 在顶栏提供全文搜索

以上均为渐进增强；即使未启用 JavaScript，站点仍可正常使用。
