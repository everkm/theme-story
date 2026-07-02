# Astro Paper 6.1.0 → theme-paper 迁移方案

> **文档性质**：Plan（260628）  
> **状态**：方案 v0.5（讨论定稿），待用户说「开始编码」  
> **源模板**：`/Users/dayu/Downloads/tmp/img_download/astro-paper-6.1.0`  
> **目标主题**：`theme-paper/__everkm/theme/paper`（自 theme-youlog 复制）  
> **关联**：[通用迁移提示词](./260628-Prompt-第三方模板迁移至Everkm主题通用提示词.md)

---

## 0. 变更记录

| 版本 | 日期 | 内容 |
|------|------|------|
| 0.1 | 260628 | 初稿：功能对照、分阶段计划 |
| 0.2 | 260628 | 采纳：Tailwind v4 对齐源模板；Pagefind 原样迁移；分页 `.p{N}.html` 契约；路由必须改为 ekmp 地址映射 |
| 0.3 | 260628 | 定稿讨论：虚拟模板页 fallback（E-T1/T3 关闭）；about 走 default_template；MVP 全量；youlog_lib 暂不动；TW v4 官方 postcss 搭配 |
| 0.4 | 260628 | **删除 youlog_lib 全部**；模板仅 home + default_template（详情页）；View Transitions 方案 |
| 0.5 | 260628 | **home 改为虚拟 index.html**（读 `home.md`）；`index.md` 误建走 post；`featured` tag 定稿；VT 补充客户端交互块 |

---

## 1. 目标与原则

### 1.1 目标

将 **Astro Paper 6.1.0** 的博客视觉与功能，迁移为 Everkm 主题 **paper**，供 `everkm-publish` 安装使用。

### 1.2 原则

| # | 原则 |
|---|------|
| P1 | **构建链保留**：`build.js`、`Makefile`、`pnpm` scripts（来自 youlog 脚手架，**不含** youlog UI） |
| P2 | **UI 来自源模板**：Astro Paper 组件/CSS/交互；**删除 youlog_lib 及 book 等全部 youlog 页面代码** |
| P3 | **路由**：Everkm 地址映射 + 虚拟模板页 fallback JsRender |
| P4 | **分页**：`.p{N}.html` + `qs.page` + `posts(offset, limit)` |
| P5 | **Tailwind v4** + `@tailwindcss/postcss` |
| P6 | **Pagefind** 原样迁移 |
| P7 | **模板极简**：**全部页面模板均为虚拟页**（含 home）；**仅 Markdown 详情**走 `default_template: post` |

### 1.3 非目标（首版仍不做）

- Dynamic OG（satori + `index.png.ts`）
- Astro `ClientRouter`（不可用；见 §14 自建 View Transitions）
- 独立 Node RSS 生成

---

## 2. 已定决策（v0.5）

| 编号 | 决策 |
|------|------|
| D1 | **所有列表/功能页 + 首页** 均为虚拟模板页（无对应 `index.md`） |
| D2 | **youlog_lib 全部删除**；只保留 youlog **构建脚手架** |
| D3 | **所有 Markdown 详情页**（post、about、…）统一 **`default_template: post`** |
| D4 | **home = 虚拟 `/index.html`**：JsRender `HomePage`；Hero 正文读 **`home.md`**（§4.6）；**不在** `folders["/"]` 设 template |
| D5 | 用户若误建根目录 **`index.md`** → 正常命中 post 映射 → **`default_template: post` 渲染**（可接受） |
| D6 | **Featured tag** 固定为 **`featured`**（`config.posts.featured_tag` 默认同名） |
| D7 | Demo 仅 **en**；MVP **全量** |
| D8 | Tailwind v4 + `@tailwindcss/postcss` |
| D9 | **View Transitions** + **客户端交互块**生命周期（§14、§15）；不用 Astro ClientRouter |

---

## 3. 源模板页面清单

Astro Paper 6.1.0 路由（`src/pages/`）：

| 编号 | 源路由 | 源文件 | 类型 |
|------|--------|--------|------|
| S-01 | `/` | `index.astro` | 首页 Hero + Featured + Recent |
| S-02 | `/posts/`、`/posts/2/`… | `posts/[...page].astro` | 文章列表 + **paginate** |
| S-03 | `/posts/{slug}/` | `posts/[...slug]/index.astro` | 文章详情 |
| S-04 | `/tags/` | `tags/index.astro` | 标签索引 |
| S-05 | `/tags/{tag}/`、`/tags/{tag}/2/`… | `tags/[tag]/[...page].astro` | 标签文章列表 + **paginate** |
| S-06 | `/archives/` | `archives/index.astro` | 按年月归档 |
| S-07 | `/search/` | `search.astro` | **Pagefind** 搜索 UI |
| S-08 | `/about/` | `about.astro` | 关于页（content/pages） |
| S-09 | `/404` | `404.astro` | 404 |
| S-10 | `/rss.xml` | `rss.xml.ts` | RSS feed |
| S-11 | `/robots.txt` | `robots.txt.ts` | robots |
| S-12 | `/posts/{slug}/og.png` | `index.png.ts` | Dynamic OG（延后） |

---

## 4. Everkm 路由模型（虚拟模板页 + 文章映射）

### 4.1 两类 URL（不冲突）

ekmp 渲染管线（[260614-Feature-页面渲染管线](file:///Users/dayu/Coder/everkm/everkm2/be/everkm-publish/stuff/km/260614-Feature-页面渲染管线.md)）：

```text
GET /index.html
  → resolve_page
      ├─ 无 index.md → None → tpl_path = index.html → JsRender HomePage
      └─ 有 index.md → 命中 → default_template: post → PostPage（用户误建，可接受）

GET /posts/index.html
  → 无 posts/index.md → None → JsRender PostsListPage
```

**结论**：

- **虚拟页**（home、posts 列表、tags、archives、search）：URL 无 Markdown 命中 → JsRender compName。
- **详情页**：Markdown 命中 → **`default_template: post`**（含 about、文章；**含误建的 index.md**）。
- **`folders["/"]` 不设 `template`**，避免与误建 `index.md` 冲突。

### 4.2 路由对照表

| 编号 | Astro URL | Everkm URL | Markdown | 渲染方式 | JsRender compName |
|------|-----------|------------|----------|----------|-------------------|
| E-01 | `/` | `/index.html` | **无**（Hero 读 `home.md`，§4.6） | **虚拟模板** | `home` |
| E-01x | — | `/index.html` | 误建 `index.md` | **default_template** | `post` |
| E-02 | `/posts/` | `/posts/index.html` | **无** | 虚拟模板 | `posts-list` |
| E-02p | `/posts/2/` | `/posts/index.p2.html` | **无** | 虚拟模板 + 分页 | `posts-list` |
| E-03 | `/posts/{slug}/` | `/posts/{slug}.html` | `posts/{slug}.md` | **default_template** | `post` |
| E-04 | `/tags/` | `/tags/index.html` | **无** | 虚拟模板 | `tags-index` |
| E-05 | `/tags/{tag}/` | `/tags/{tag}/index.html` | **无** | 虚拟模板 | `tag-posts` |
| E-05p | `/tags/{tag}/2/` | `/tags/{tag}/index.p2.html` | **无** | 虚拟模板 + 分页 | `tag-posts` |
| E-06 | `/archives/` | `/archives/index.html` | **无** | 虚拟模板 | `archives` |
| E-07 | `/search/` | `/search/index.html` | **无** | 虚拟模板 | `search` |
| E-08 | `/about/` | `/about.html` | `about.md` | **default_template** | `post` |
| E-09 | `/404` | ekmp 404 | — | — | 可选 `404` |

### 4.3 Demo 内容目录（仅 en）

```text
theme-paper/
├── home.md           # Hero 正文（由 HomePage 按路径读取，URL 可为 /home.html）
├── about.md          # default_template 详情页
└── posts/
    └── *.md          # 文章；Featured 打 tags: [featured]
```

**不要**创建根目录 `index.md`（会抢占 `/index.html` 并变成 post 详情页）。Hero 内容写在 **`home.md`**。

### 4.6 Home 页（虚拟 `/index.html`）

`HomePage`（compName `home`，**仅**在 `resolve_page(/index.html)` → `None` 时渲染）：

| 区块 | 数据来源 |
|------|----------|
| **Hero 正文** | `post_detail(path: homePath, allow_missing: true)`；`homePath` 默认 **`/home.md`**，可 `config.home` 覆盖；无文件则仅用 `config.site` 标题/描述 |
| **Featured** | `posts({ tags: ["featured"], limit: 6, order_by: "date", order_direction: "desc" })` |
| **Recent** | `posts({ dir: "/posts/", recursive: true, exclude_tags: ["featured"], limit: per_index, order_by: "date", order_direction: "desc" })` |

**Featured tag 已定**：`featured`（`config.posts.featured_tag` 默认 `"featured"`）。文章示例：`tags: [featured, …]`。

**与 Astro Paper 差异**：源模板 `featured: true` front matter → Everkm 用 **tag `featured`**。

**误建 `index.md`**：若用户创建根目录 `index.md`，`/index.html` 命中 Markdown → **`default_template: post`** 渲染为普通详情页；**不**走 HomePage。属可接受边缘行为，文档中明确禁止即可。

### 4.7 模板模型（v0.5）

| 类型 | 触发条件 | JsRender compName |
|------|----------|-------------------|
| **虚拟页** | `resolve_page` → `None` | `home` / `posts-list` / `tags-index` / `tag-posts` / `archives` / `search` |
| **Markdown 详情** | `resolve_page` → 命中 | `post`（`everkm-theme.yaml#default_template`） |

`everkm-theme.yaml`：

```yaml
name: paper
default_template: post
```

`everkm.yaml`（**注意**：根目录不设 `template`）：

```yaml
config:
  home: /home.md              # HomePage Hero 来源
  posts:
    featured_tag: featured
    per_index: 4
    per_page: 4

folders:
  "/posts/":
    url_id_suffix: false
  # "/" 不设 template——home 靠虚拟 index.html
```

### 4.4 compName 归一化（JsRender 必做）

ekmp 内置 `js_template_name()` 对 `posts/index.p2.html` **不会**剥掉 `.p2` 段（仅 `trim_end_matches("index.html")`）。`renderPage` 入口须统一归一化：

```typescript
function normalizeTplPath(tplPath: string): string {
  // posts/index.p2.html → posts/index.html → posts/
  return tplPath
    .replace(/\.p\d+(?=\.html$)/i, "")
    .replace(/^\/+/, "")
    .replace(/index\.html$/, "")
    .replace(/\/+$/, "");
}

// 映射示例
// ""              → home        (原 index.html)
// "posts"         → posts-list
// "tags"          → tags-index
// "tags/javascript" → tag-posts  (tagSlug = 末段)
// "archives"      → archives
// "search"        → search
// "post"          → post         (文章页 tpl_path 来自 template 链)
```

标签名：`tag-posts` 从 URL 段取 slug，再用 `posts_tag_list` / 配置表还原显示名；筛选时 `everkm.posts({ tags: [tagName], … })`。

### 4.5 `everkm.yaml` 配置草案

```yaml
config:
  site:
    name: Paper Theme
    description: …
  home: /home.md
  posts:
    per_page: 4
    per_index: 4
    featured_tag: featured
  features:
    light_and_dark_mode: true
    show_archives: true
    search: pagefind
    view_transitions: true

folders:
  "/posts/":
    url_id_suffix: false
  # "/" 不设 template
```

---

## 5. 分页实现规范

### 5.1 ekmp 预处理（已实现）

引用 [260614-Feature-页面渲染管线.md](file:///Users/dayu/Coder/everkm/everkm2/be/everkm-publish/stuff/km/260614-Feature-页面渲染管线.md) §3.1：

> 解析分页文件名（`foo.p2.html` → query `page=2` + `full_request_url` 去分页段）

### 5.2 JsRender 分页伪代码

```typescript
function readPagination(qs: Record<string, unknown>, config: Record<string, unknown>) {
  const pageNo = Math.max(1, parseInt(String(qs?.page ?? "1"), 10));
  const pageSize = Number(qs?.per_page ?? config?.posts?.per_page ?? 4);
  const offset = (pageNo - 1) * pageSize;
  return { pageNo, pageSize, offset };
}

function paginationHref(base: string, targetPage: number): string {
  if (targetPage <= 1) return `${base}/index.html`;
  return `${base}/index.p${targetPage}.html`;
}
```

### 5.3 适用页面

| 页面 | 分页 |
|------|------|
| `posts-list` | ✅ `posts/index.p{N}.html` |
| `tag-posts` | ✅ `tags/{tag}/index.p{N}.html` |
| `home` | ❌ 仅 `per_index` 条数，不分页 |
| `archives` | ❌ 首版全量展示（文章量大时再讨论 `.p{N}`） |

### 5.4 与 Astro `Pagination.astro` 的差异

Astro 的 `page.url.prev/next` 由构建器生成。Everkm 需在 `Pagination.tsx` 组件内根据 `pageNo`、`pageCount`、`basePath` **手工拼接** `.p{N}.html` 链接（逻辑参考 yilog `index.html` 模板）。

---

## 6. 功能对照与实现方式

| 功能 | Astro Paper | theme-paper 实现 |
|------|-------------|------------------|
| 首页 Hero | index.astro 静态文案 | 虚拟 home + 读 **`home.md`** |
| 首页 Featured | `featured: true` | `posts({ tags: ["featured"], limit: 6 })` |
| 首页 Recent | filter !featured | `posts({ exclude_tags, limit: per_index })` 倒序 |
| 文章列表 | `paginate(getSortedPosts)` | `posts(offset,limit)` + `.p{N}.html` |
| 文章详情 | `PostLayout` + content render | `post_detail` + `PostLayout.tsx` |
| 标签索引 | `getUniqueTags` | `posts_tag_list({ dir })` |
| 标签列表 | paginate by tag | `posts({ tags, offset, limit })` |
| 归档 | 按年月 group | JS 内对 `posts` 全量分组 |
| about | content/pages | `about.md` + **default_template: post** |
| 暗色模式 | `theme.ts` + inline script | 移植至 `lib/theme/`，保留 FOUC 脚本 |
| 搜索 | Pagefind UI | **原样移植** `search.astro` 逻辑；构建保留 pagefind 步骤 |
| 代码高亮 | Shiki (build time) | everkm Markdown 渲染 + 可选 prism widget |
| 配置 | `astro-paper.config.ts` | `everkm.yaml#config` |
| i18n UI | `src/i18n/` | 主题 `lib/i18n/` + `@i18n:`（内容 i18n 走目录） |
| Social / Share | config arrays | `config.socials` / `config.share_links` |
| RSS | `@astrojs/rss` | 延后；查 ekmp 导出是否生成 |
| Sitemap | `@astrojs/sitemap` | 延后；ekmp export 可能已覆盖 |
| Dynamic OG | satori | **不做**（v1） |
| Edit post | config URL 模板 | 配置保留，纯链接组件 |

---

## 7. Tailwind v4 迁移

采用 **Tailwind v4 + `@tailwindcss/postcss`**（esbuild 官方搭配，非 Vite 插件）。

### 7.1 样式来源（Astro Paper）

- `@import "tailwindcss"`（`global.css`）
- `@theme inline` 设计令牌（`theme.css`）
- `@tailwindcss/typography`（prose）
- `@custom-variant dark` 基于 `[data-theme=dark]`

### 7.2 构建改造要点

| 项 | youlog 现状 | paper 目标 |
|----|-------------|------------|
| tailwind 包 | `tailwindcss@3` + postcss | `tailwindcss@4` + **`@tailwindcss/postcss`** |
| 配置 | `tailwind.config.js` | 以 CSS `@theme` 为主；`@source` 扫描 TSX |
| build.js | `tailwindcss()` postcss 插件 | 换 `@tailwindcss/postcss`，**保持** esbuild + solid 插件 |
| darkMode | `class` | `[data-theme=dark]` 变体（与 Astro Paper 一致） |

### 7.3 风险

- esbuild postcss 链需 spike：`make jsrender-build` 通过后再铺页面。

---

## 8. Pagefind 与搜索页（客户端交互块）

搜索页是 **JsRender 输出静态壳 + 浏览器端挂载 Pagefind UI** 的典型「客户端交互块」，不能与纯 HTML 字符串同等对待。详见 §15。

### 8.1 源模板行为

- `package.json`：`"build": "... && pagefind --site dist && cp -r dist/pagefind public/"`
- `search.astro`：加载 `@pagefind/default-ui`，`bundlePath` 指向 `/pagefind/`
- `config.features.search === "pagefind"` 时启用

### 8.2 theme-paper 策略

| 步骤 | 动作 |
|------|------|
| 1 | JsRender `SearchPage` 只输出 **挂载点** `<div id="pagefind-search" data-client-mount="pagefind">` |
| 2 | `browser.ts` 注册 **`pagefind` mount**；首次加载与 VT 换页后均调用 |
| 3 | **等待 everkm-publish 官方 pagefind 集成**；文档标注依赖 ekmp 版本 |
| 4 | 构建脚本预留 `pagefind` CLI 钩子（与 `make build` 集成方式待 ekmp 文档确认） |
| 5 | **不引入** Algolia / youlog `plugin-in-search` |

### 8.3 待观察 E-T2

- ekmp 支持 pagefind 后，索引在 export 还是 theme build 阶段生成（跟随官方）。
- preview 下 search 页可保留 Astro 同款 dev warning。

---

## 9. 目录重构

### 9.1 保留（仅构建脚手架）

```text
build.js, Makefile, package.json, everkm-theme.yaml
src/entries/{jsrender,browser}.ts
src/types/
templates/, assets/
```

### 9.2 删除（全部 youlog 业务代码）

```text
src/youlog_lib/**           # 整目录删除
src/pages/book.tsx, demo.tsx
src/layout/{Sidebar,TOC,TopHeader,ArticleContent,…}  # youlog layout
src/dcard/                  # 若 Astro 源无 dcard，首版删除；需时再建 paper/dcard
plugin-in-search 构建入口
youlog.css / markdown2.css 等 youlog 样式
stuff/tera_tpls_archive/    # 可选保留作参考
```

### 9.3 新建（来自 Astro Paper）

```text
src/
├── pages/index.tsx          # renderPage 路由
├── pages/{home,post,posts-list,tags-index,tag-posts,archives,search}.tsx
├── layout/{RootLayout,PostLayout,Header,Footer}.tsx
├── components/{Card,Datetime,Tag,Pagination,…}.tsx
├── lib/{theme,i18n,viewTransitions,normalizeTplPath,clientMounts}.ts
└── assets/css/ + icons/    # Astro Paper v4 样式与 SVG
```

### 9.4 全局重命名

`youlog` → `paper`：bundle 名、assets-manifest、Makefile zip、`everkm-theme.yaml#name`。

---

## 10. JsRender 模板分发

`src/pages/index.tsx` 的 `renderPage` switch：

`renderPage(compName, props)` 流程：

```text
compNameRaw = props.tpl_path ?? compName
key = normalizeTplPath(compNameRaw)   // §4.4
→ switch(key) → Paper 页面组件
```

| 归一化 key | 组件 | URL |
|------------|------|-----|
| `home` / `""` | `HomePage` | 虚拟 `/index.html`（无 `index.md`） |
| `posts` | `PostsListPage` | `/posts/index.html`, `.p{N}.html` |
| `post` | `PostPage` | **所有** Markdown 详情（posts、about、…） |
| `tags` | `TagsIndexPage` | `/tags/index.html` |
| `tags/{slug}` | `TagPostsPage` | `/tags/{slug}/index.html`, `.p{N}.html` |
| `archives` | `ArchivesPage` | `/archives/index.html` |
| `search` | `SearchPage` | `/search/index.html` |

**无** 独立 `about` compName——`about.md` 命中 post 映射，`compName = post`。

---

## 11. 实施计划（MVP 全量，单次交付）

| 步骤 | 内容 |
|------|------|
| 1 | **删除 youlog_lib 及 youlog 页面**；bundle 重命名；TW v4 spike |
| 2 | 移植 Astro Paper CSS / icons；`normalizeTplPath` + `renderPage` |
| 3 | `RootLayout` / `Header` / `Footer` / 暗色模式 |
| 4 | 虚拟 `home`（§4.6）+ `post`（default_template） |
| 5 | 虚拟页：posts-list、tags、archives、search |
| 6 | **View Transitions** + 客户端交互块 registry（§14–§15） |
| 7 | demo en + `everkm-publish serve` + `make bundle` |

**预估：5–8 人日**

---

## 12. 开放项

| 编号 | 问题 | 状态 |
|------|------|------|
| E-T2 | Pagefind 索引生成时机 | 跟随 ekmp 官方 |
| E-T6 | `url_id_suffix: false`  scope | `/posts/` 已足够 |
| E-T8 | View Transitions + 客户端交互块 | **已定**（§14–§15） |

---

## 13. MVP 边界（v0.5 全量）

**包含：** 虚拟 home、post（default_template）、全部虚拟列表页、archives、search（Pagefind **客户端挂载**）、暗色模式、Tailwind v4、View Transitions + 交互块生命周期、demo en、`featured` tag。

**不包含：** Dynamic OG、RSS 自建、Astro ClientRouter、youlog_lib。

---

## 14. View Transitions（无刷新切换）

### 14.1 结论

**可以**实现接近 Astro Paper 的无刷新体验，但 **不能** 使用 Astro `ClientRouter`。采用 **View Transitions API** + 轻量 fetch 导航（`lib/viewTransitions.ts`）。

**关键约束**：部分 UI（搜索、后续可能的评论/图表等）在 **客户端生成**，换页时须配合 §15 **交互块生命周期**，不能只做 `innerHTML` 替换了事。

### 14.2 原理

```text
用户点击站内 <a>
  → intercept（同域、非 _blank、非 download）
  → fetch(href) → parse HTML
  → teardownClientMounts()          # §15：销毁旧页交互块
  → document.startViewTransition(() => {
        替换 #main-content + <title>
        history.pushState
    })
  → mountClientBlocksForPage()      # §15：按 data-layout / data-client-mount 挂载
  → dispatch paper:page-swap
```

降级：不支持 VT 或 `prefers-reduced-motion` → 整页刷新。

### 14.3 与 Astro Paper 对齐

| Astro Paper | theme-paper |
|-------------|-------------|
| `<ClientRouter />` | `installViewTransitions()` |
| `transition:name` on Card | `view-transition-name` + `toTransitionName()` |
| `transition:persist` on search | §15.3 **persist 区** 或 search 页 **跳过后 teardown** |
| `astro:after-swap` | `paper:page-swap` 事件 |

### 14.4 布局约定

```html
<body>
  <Header data-vt-persist />     <!-- 顶栏、主题按钮：可不随 main 销毁 -->
  <main id="main-content" data-layout="home|post|search|…">
    …
    <!-- search 页内： -->
    <div id="pagefind-search" data-client-mount="pagefind" />
  </main>
  <Footer />
</body>
```

换页时默认 **只替换 `#main-content` 内部**；带 `data-vt-persist` 的节点可保留（Header 内主题状态不丢）。

### 14.5 限制

| 项 | 说明 |
|----|------|
| 浏览器 | same-document VT：Chrome 111+、Safari 18+、Firefox 129+ |
| 分页链接 | `.p{N}.html` 同样 intercept |
| 交互块 | 必须经过 §15 mount/teardown，否则 search 等会失效 |
| SEO | 首屏完整静态 HTML；VT 为渐进增强 |

### 14.6 配置

```yaml
config:
  features:
    view_transitions: true
```

---

## 15. 客户端交互块（Client Mounts）

### 15.1 背景

Everkm JsRender 产出 **静态 HTML 字符串**；下列能力必须在 **浏览器端** 初始化：

| 交互块 | 页面 | 说明 |
|--------|------|------|
| **pagefind** | `search` | `@pagefind/default-ui` 注入 `#pagefind-search` |
| **theme** | 全局 | `#theme-btn` 点击；Header persist 时仅首屏 setup |
| **mobile-nav** | 全局 | `#menu-btn` 折叠菜单 |
| **back-to-top** | `post` | 文章页滚动按钮（可选） |

JsRender **只输出挂载点与 `data-client-mount` 标记**，不内联 Pagefind 实例化逻辑。

### 15.2 Mount Registry

```typescript
// lib/clientMounts.ts（示意）
type MountFn = (root: HTMLElement) => () => void;  // 返回 teardown

const registry: Record<string, MountFn> = {
  pagefind: (el) => { /* init PagefindUI */ return () => search.destroy(); },
};

function mountClientBlocks(main: HTMLElement) {
  main.querySelectorAll("[data-client-mount]").forEach((el) => {
    const key = el.getAttribute("data-client-mount")!;
    registry[key]?.(el as HTMLElement);
  });
}

function teardownClientMounts(main: HTMLElement) { /* 调用各 destroy */ }
```

`browser.ts` 冷启动与每次 `paper:page-swap` 后调用。

### 15.3 View Transitions 与 persist

| 策略 | 适用 | 做法 |
|------|------|------|
| **remount** | 大多数页 | 换页 teardown → 替换 main → 对新 main mount |
| **persist** | 离开 search 仍想保留输入/结果 | `#pagefind-search` 标记 `data-vt-persist`，换页时不销毁该 subtree（对齐 Astro `transition:persist`） |
| **skip intercept** | 复杂降级 | search ↔ 外部页强制 `location.href` 整页跳（备选） |

**推荐**：search 页容器 `data-vt-persist` + 进入 search 时若未 mount 则 mount；离开 search 到非 search 页时 **teardown pagefind** 避免泄漏。

### 15.4 JsRender / Client 职责分界

| 层 | 职责 |
|----|------|
| **JsRender** | 布局、静态列表、SEO 正文、`data-layout` / `data-client-mount` 属性 |
| **browser.ts** | 主题、导航 intercept、VT、**client mount registry** |
| **everkm-publish** | 静态 HTML 服务；Pagefind 索引（E-T2，后续） |

### 15.5 开放项 E-T2

Pagefind 索引生成时机仍跟随 ekmp 官方；**UI 挂载与 VT 生命周期不依赖索引时机**（无索引时 mount 内显示 dev warning，与 Astro 一致）。

---

## 16. 下一步

用户明确说 **「开始编码」** 后，从 §11 步骤 1 执行。