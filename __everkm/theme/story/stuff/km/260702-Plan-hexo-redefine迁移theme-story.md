# Hexo Redefine (dayu-me3) → theme-story 迁移方案

> **文档性质**：Plan（260702）  
> **状态**：v1.1（用户已定 D1–D9，待说「开始编码」）  
> **源模板**：`/Users/dayu/Downloads/tmp/img_download/dayu-me3-main`（hexo-theme-redefine / `defaultone` v2.8.2）  
> **编译对照**：`/Users/dayu/Downloads/tmp/img_download/dayu-me3-main/public`  
> **目标主题**：`theme-story/__everkm/theme/story`（自 theme-paper 复制脚手架）  
> **关联**：[通用迁移提示词](../../../../../theme-paper/__everkm/theme/paper/stuff/km/260628-Prompt-第三方模板迁移至Everkm主题通用提示词.md)（实施时复制一份到本主题 `stuff/km/`）

---

## 0. 变更记录

| 版本 | 日期 | 内容 |
|------|------|------|
| 1.0 | 260702 | 初稿：功能对照、路由映射、已定决策、分阶段计划（Phase 3 不做） |
| 1.1 | 260702 | 暂缓：TOC、代码复制、图片查看器、particles（§1.4、§9.4） |

---

## 1. 目标与原则

### 1.1 目标

将 **dayu-me3**（基于 hexo-theme-redefine 的动漫风博客）的视觉与核心功能，迁移为 Everkm 主题 **story**，供 `everkm-publish` 安装使用。

### 1.2 原则

| # | 原则 |
|---|------|
| P1 | **构建链保留**：自 theme-paper 复制 `build.js`、`Makefile`、`pnpm` scripts、esbuild 双入口（browser + jsrender） |
| P2 | **尽量向 Everkm 靠拢**：虚拟页 + `default_template`、`.p{N}.html` 分页、`everkm.posts` API、`_` 前缀数据源文件、`[[_home]]` 内链 |
| P3 | **UI 来自源模板**：对照 `public/` 编译产物与 redefine EJS/CSS/交互，用 SolidJS 重写 |
| P4 | **路由**：Everkm 地址映射 + 虚拟模板页 JsRender fallback |
| P5 | **换页**：View Transitions API（沿用 paper），**不**移植 Swup |
| P6 | **搜索**：对齐 theme-paper 的 **Algolia `plugin-in-search`**，不做 redefine 本地 searchdb |
| P7 | **代码高亮**：`code_highlight.server: true` + syntect CSS（对齐 paper） |

### 1.3 已定决策（用户 260702）

| 编号 | 决策 |
|------|------|
| D1 | **文章 URL 使用根目录**：`hello-world.md` → `/hello-world.html`（对齐 Hexo `permalink: :title/`），**不设** `folders["/"].url_slug: posts` |
| D2 | **数据源页面以下划线开头**：`_home.md`、`_about.md`、`_links.md`、`_masonry.md` 等；由虚拟模板或 `config` 内链读取，**不作为公开发布 URL** |
| D3 | **搜索对齐 paper**：复用 `plugin-in-search`（Algolia），同步脚本与集成方式参照 paper |
| D4 | **Phase 3 不做**：Live2D、评论系统、APlayer、Mermaid、cursor-effects、网站统计/字数统计等一律不纳入本期 |
| D5 | **home = 虚拟 `/index.html`**：读 `[[_home]]`；**不在** `folders["/"]` 设 `template` |
| D6 | **Markdown 详情**统一 `default_template: post`（含 about 正文若走详情渲染时） |
| D7 | **脚手架自 theme-paper 复制**，全局 `paper` → `story` 改名 |
| D8 | Demo 语言以 **zh** 为主，保留 `en/` 目录结构供 i18n 扩展 |
| D9 | **暂缓**：文章 TOC、代码块复制、图片查看器、particles 粒子背景（见 §9.4） |

### 1.4 非目标（本期不做）

- Phase 3 全部能力（见 §9.5）
- **暂缓项**（见 §9.4）：TOC、代码复制、图片查看器、particles
- Dynamic OG、Hexo 文章加密（hbe）、RSS 自建
- redefine 本地搜索（`hexo-generator-searchdb` / `localSearch.js`）
- Swup 及其插件生态原样移植
- hexo-wordcount / 第三方 PV·UV counter
- 分类（categories）完整生态（若 demo 无需求，Phase 2 可降级为仅 tags）

---

## 2. 源模板页面清单

### 2.1 Hexo 路由（`public/` 实测）

| 编号 | 源 URL | 源类型 | 说明 |
|------|--------|--------|------|
| S-01 | `/index.html` | 虚拟（Hexo index） | 首页 Banner + 侧边栏 + 文章列表 |
| S-02 | `/page/2/`… | Hexo 分页 | 首页文章列表第 N 页（**非** Everkm 契约） |
| S-03 | `/{slug}/index.html` | 文章 | 如 `/hello-world/`、`/study/` |
| S-04 | `/archives/index.html` | 归档 | 按时间归档 |
| S-05 | `/tags/index.html` | 标签索引 | blur/cloud 样式 |
| S-06 | `/about/index.html` | 静态页 | `source/about/index.md` |
| S-07 | `/links/index.html` | 自定义模板 | `template: links` + `_data/links.yml` |
| S-08 | `/masonry/index.html` | 自定义模板 | `template: masonry` + `_data/masonry.yml` |
| S-09 | `/404.html` | 404 | |
| S-10 | — | 未在 demo 启用 | categories、shuoshuo、bookmarks、search 导航 |

### 2.2 源模板技术栈

| 层 | 技术 |
|----|------|
| 模板 | EJS + Hexo helpers |
| 样式 | Tailwind v3 + `variables.css` / layout CSS |
| 换页 | Swup + 多插件 |
| 特效 | particles.js、Live2D（hexo 站点级）、cursor-effects |
| 图标 | FontAwesome 6 |
| 代码高亮 | highlight.js（客户端） |
| 评论 | Waline 等（配置默认关闭） |

---

## 3. Everkm 路由模型

### 3.1 两类 URL

```text
GET /index.html
  → resolve_page → None → tpl_path = index.html → JsRender HomePage
  → Hero / 公告读 _home.md（config.home: '[[_home]]'）

GET /hello-world.html
  → resolve_page → 命中 hello-world.md → default_template: post → PostPage

GET /links/index.html
  → resolve_page → None（无 links/index.md）→ JsRender LinksPage
  → 友链数据读 _links.md
```

**禁止**创建根目录 `index.md`（会抢占 `/index.html` 变成 post 详情页）。

### 3.2 路由对照表

| 编号 | Hexo URL | Everkm URL | Markdown 文件 | 渲染方式 | JsRender `pageKey` |
|------|----------|------------|---------------|----------|-------------------|
| E-01 | `/` | `/index.html` | **无**（读 `_home.md`） | 虚拟模板 | `home` |
| E-01p | `/page/2/` | `/index.p2.html` | **无** | 虚拟 + 分页 | `home` |
| E-02 | `/{slug}/` | `/{slug}.html` | `{slug}.md`（内容根目录） | **default_template** | `post` |
| E-03 | `/archives/` | `/archives/index.html` | **无** | 虚拟模板 | `archives` |
| E-04 | `/tags/` | `/tags/index.html` | **无** | 虚拟模板 | `tags-index` |
| E-05 | `/tags/{tag}/` | `/tags/{tag}/index.html` | **无** | 虚拟模板 | `tag-posts` |
| E-05p | `/tags/{tag}/page/2/` | `/tags/{tag}/index.p2.html` | **无** | 虚拟 + 分页 | `tag-posts` |
| E-06 | `/about/` | `/about.html` 或 `/about/` | `_about.md`（经 config.about） | 虚拟 **或** default_template | `about` |
| E-07 | `/links/` | `/links/index.html` | **无**（读 `_links.md`） | 虚拟模板 | `links` |
| E-08 | `/masonry/` | `/masonry/index.html` | **无**（读 `_masonry.md`） | 虚拟模板 | `masonry` |
| E-09 | `/404.html` | `/404.html` | **无** | 虚拟模板 | `not-found` |
| E-10 | — | — | — | Header 浮层搜索 | **Algolia plugin**（无独立 `/search/` 页） |

> **about 页**：优先对齐 paper——虚拟 `about` 模板读 `config.about: '[[_about]]'`；若实现简化，也可让 `_about.md` 发布为 `/about.html` 走 `post` 模板，但导航 URL 须与实现一致。

### 3.3 与 Hexo 分页的差异

| Hexo | Everkm |
|------|--------|
| `/page/2/` | `/index.p2.html` |
| `?page=` 或 `pagination_dir: page` | ekmp 预处理注入 `qs.page` |
| 首页列表分页 | **HomePage** 内 `everkm.posts({ offset, limit })` |

首页分页链接生成：

```html
<!-- 第 2 页 -->
<a href="/index.p2.html">下一页</a>
```

### 3.4 `compName` 归一化（`normalizeTplPath`）

在 paper 基础上扩展 `resolvePageKey`：

```typescript
// 新增 pageKey
"links"           → LinksPage
"masonry"         → MasonryPage
"not-found" / "404" → NotFoundPage

// 既有
"" / "home"       → HomePage
"archives"        → ArchivesPage
"tags"            → TagsIndexPage
"tags/{slug}"     → TagPostsPage
"about"           → AboutPage
// 文章详情由 post 对象或 compName "post" 判定
```

`index.p2.html` 归一化后与 `index.html` 同落 `home`。

### 3.5 `folders` 配置（根目录文章）

```yaml
# everkm-theme.yaml 或 __everkm/everkm.yaml
# 根目录不设 url_slug —— 文章 URL 保持 /{slug}.html

folders:
  "/":
    url_id_suffix: false   # 按 demo 需要；与 Hexo :title/ 对齐时不加 id 后缀
  # "/" 不设 template
```

`everkm.posts` 查询：

```typescript
everkm.posts(requestId, {
  dir: "/",
  recursive: false,       // 文章平铺在内容根目录
  offset,
  limit: pageSize,
  order_by: "date",
  order_direction: "desc",
  draft: false,
});
```

**列表须排除 `_` 前缀文件**：在应用层过滤 `path` 以 `/_` 开头或文件名以 `_` 开头的条目（`_home.md`、`_about.md` 等不应出现在文章列表）。

---

## 4. 内容目录与 Front Matter

### 4.1 Demo 目录（`zh/` 或 `en/`）

```text
theme-story/
└── zh/                          # 主 demo（或 en/，结构相同）
    ├── _home.md                 # 首页 Banner 文案、公告（数据源，无独立 URL）
    ├── _about.md                # 关于页正文（config.about: '[[_about]]'）
    ├── _links.md                # 友链数据（YAML frontmatter 或正文结构）
    ├── _masonry.md              # 相册数据
    ├── hello-world.md           # 文章 → /hello-world.html
    ├── study.md
    ├── m3u8.md
    └── README.md                # 主题配置说明（可选，非文章）
```

**规则**：

- 以 `_` 开头的 `.md`：**仅作数据源**，不参与 `posts` 列表、不生成公开详情 URL（除非刻意配置）。
- 普通 `.md` 在内容根目录：**文章**，`default_template: post`。
- **不要** `posts/` 子目录（与 paper demo 不同，对齐 Hexo 根路径发文）。
- **不要** 根目录 `index.md`。

### 4.2 Front Matter 映射

| Hexo / redefine | Everkm |
|-----------------|--------|
| `title` | `title` |
| `date` | `created_at`（RFC3339） |
| `updated` | `updated_at` |
| `tags` | `tags: [...]` |
| `categories` | 建议合并进 `tags`（Everkm 无原生 category） |
| `draft` | `draft: true` |
| `description` | `description` |
| `template: links` | 删除；友链改 `_links.md` + 虚拟 `links` 页 |
| `template: masonry` | 删除；相册改 `_masonry.md` + 虚拟 `masonry` 页 |

### 4.3 数据源文件约定

#### `_home.md`

- 用途：Banner 标题区下方的 Markdown 区块、侧边栏公告等（按 HomePage 设计拆分读取）。
- 配置：`config.home: '[[_home]]'`（对齐 paper）。

#### `_about.md`

- 配置：`config.about: '[[_about]]'`。
- AboutPage 虚拟模板渲染。

#### `_links.md`

友链数据从 Hexo `_data/links.yml` 迁入 frontmatter 或结构化 Markdown，示例：

```yaml
---
title: 友情链接
links:
  - category: 示例分类
    has_thumbnail: true
    list:
      - name: Example
        link: https://example.com
---
```

LinksPage 通过 `post_detail(path: '/_links.md')` 读取并解析。

#### `_masonry.md`

```yaml
---
title: 相册
items:
  - image: /images/1.jpg
    title: Image title 1
    description: …
---
```

---

## 5. 配置映射

### 5.1 `everkm-theme.yaml` 草案

```yaml
name: story
owner: everkm
version: 0.1.0
default_template: post

config:
  site:
    name: Story Theme
    description: …
    author: …
    lang: zh
    timezone: Asia/Shanghai

  home: '[[_home]]'
  about: '[[_about]]'
  links: '[[_links]]'       # LinksPage 数据源
  masonry: '[[_masonry]]'   # MasonryPage 数据源

  code_highlight:
    server: true
  math_render:
    server: true

  posts:
    per_page: 10             # 对齐 Hexo index_generator.per_page
    per_index: 10            # 首页首屏条数（若与分页合一，同 per_page）
    featured_tag: featured

  features:
    light_and_dark_mode: true
    show_archives: true
    show_back_button: true
    view_transitions: true
    preloader: true            # redefine 有，MVP 可简版
    particles: false           # 暂缓（§9.4）
    home_banner: true
    home_sidebar: true

  # redefine 主题配置子集（迁入 story 专属结构）
  story:
    colors:
      primary: "#A31F34"
      default_mode: light
    home_banner:
      enable: true
      style: fixed             # fixed | static
      image:
        light: /images/main_bg_ligth.jpg
        dark: /images/main_bg.jpg
      title: …
      subtitle: …
    navbar:
      auto_hide: true
      color:
        left: "#f78736"
        right: "#367df7"
    articles:
      toc:
        enable: false          # 暂缓（§9.4）；后续开启时再实现 tocToggle
        max_depth: 3

folders:
  "/":
    url_id_suffix: false
```

站点级 `__everkm/everkm.yaml` 覆盖主题默认，并配置 Algolia（对齐 paper）：

```yaml
config:
  algolia_search:
    app_id: …
    api_key: …
    index_name: story
    site: theme-story
```

### 5.2 redefine `_config.yml` → Everkm 映射（摘要）

| redefine 节点 | Everkm 落点 |
|---------------|-------------|
| `info.*` | `config.site` |
| `colors.*` | `config.story.colors` |
| `home_banner.*` | `config.story.home_banner` |
| `navbar.*` | `config.story.navbar` + Header 组件 |
| `home.sidebar.*` | HomePage + `config.story.home_sidebar` |
| `articles.*` | PostPage + `config.story.articles` |
| `global.single_page` | `features.view_transitions`（实现方式不同） |
| `comment.*` | **不做**（Phase 3 已砍） |
| `plugins.feed/aplayer/mermaid` | **不做** |
| `effects.particles` | **暂缓**（§9.4） |
| `effects.cursoreffects` | **不做** |
| `live2d`（站点 _config.yml） | **不做** |

---

## 6. 功能对照与实现方式

| 功能 | redefine / Hexo | theme-story 实现 | 阶段 |
|------|-----------------|------------------|------|
| 首页 Banner | `home-banner.ejs` + 背景图 | HomePage + `config.story.home_banner` | MVP（简版）→ P2（完整） |
| 首页侧边栏 | `home-sidebar.ejs` | HomePage Sidebar 组件 | MVP |
| 首页文章列表 | `home-content.ejs` + Hexo paginate | `everkm.posts` + `index.p2.html` | MVP |
| 文章详情 | `article-content.ejs` | PostPage + `post_detail` | MVP |
| 归档 | `archive.ejs` | ArchivesPage，按年月分组 | MVP |
| 标签索引 | `tags.ejs` | TagsIndexPage | MVP |
| 标签文章列表 | `tag-detail.ejs` | TagPostsPage + 分页 | P2 |
| 关于 | `about/index.md` | AboutPage + `_about.md` | MVP |
| 友链 | `links` 模板 + yml | LinksPage + `_links.md` | P2 |
| 相册 | `masonry` 模板 + yml | MasonryPage + `_masonry.md` | P2 |
| 暗色模式 | `lightDarkSwitch.js` | 沿用 paper `installTheme` | MVP |
| 换页 | Swup | paper View Transitions → 事件改名 `story:page-swap` | MVP |
| 搜索 | localSearch（未启用） | **paper `plugin-in-search`（Algolia）** | MVP |
| Navbar 渐变/收缩 | `navbar.ejs` + JS | Header 组件 + client widget | MVP / P2 |
| TOC | `toc.js` | client mount，换页 remount | **暂缓** |
| 代码高亮 | highlight.js | **syntect** + `code-highlight.css` | MVP |
| 代码复制 | `codeBlock.js` | client widget | **暂缓** |
| 图片查看器 | `imageViewer.js` | client widget | **暂缓** |
| 滚动工具条 | `scrollTopBottom.js` | client widget | P2 |
| Preloader | `preloader.ejs` | client mount | P2 |
| particles 背景 | `particles.js` | client mount + `data-vt-persist` | **暂缓** |
| 打字副标题 | Typed.js | client mount（Banner 区） | P2 |
| FontAwesome | 静态 CSS | 复制必要 subset 到 `dist/assets` | MVP |
| 脚注返回 | — | 沿用 paper `footnote.ts` | MVP |
| Live2D | hexo-live2d | **不做** | — |
| 评论 Waline 等 | comment 组件 | **不做** | — |
| APlayer / Mermaid | plugins | **不做** | — |
| 网站统计 / 字数 | wordcount / vercount | **不做** | — |

---

## 7. 搜索（对齐 paper）

### 7.1 方案

- **不**移植 redefine `localSearch.js` / `hexo-generator-searchdb`。
- 自 paper 复制 `src/lib/plugins/in_search/` 全套及 `assets-manifest` 中 `plugin-in-search` section。
- `browser.ts` → `bootClient()` 内挂载 `<x-in-search>` / FloatSearch。
- `RootLayout` / Header 保留搜索入口（快捷键对齐 paper）。
- 同步规范参照 paper `stuff/km/260702-Plan-plugin-in-search同步规范.md`。

### 7.2 与 VT 配合

- 搜索浮层使用 client mount registry；换页时 **不** teardown 已打开的搜索面板（可对浮层容器 `data-vt-persist`，对齐 paper 实践）。

---

## 8. 样式与构建

### 8.1 Tailwind

- **构建链沿用 paper（Tailwind v4 + `@tailwindcss/postcss`）**，不保留 redefine 的 TW v3 构建脚本。
- 从 redefine 移植 **CSS 变量**（`variables.css`）与 layout 样式，逐步用 TW utility 或 `@apply` 表达。

### 8.2 静态资源

从源主题 / `public/` 复制到 `theme/story/src/assets/` 或 `static/`：

| 资源 | 用途 | 阶段 |
|------|------|------|
| `images/`（banner、avatar、og） | 首页与 meta | MVP |
| `fonts/Chillax`、`Geist` | 标题/正文字体 | P2 |
| `fontawesome/`（精简 subset） | 导航/侧栏图标 | MVP |
| `live2dw/` | — | **不复制** |

### 8.3 正文排版

- `.app-prose` 内 dl / 脚注对齐 paper `typography.css` + `footnote.ts`。
- `code_highlight.server: true`；`make code-highlight-build` 生成 `code-highlight.css`。

---

## 9. 分阶段计划

### 9.1 Phase 1 — MVP

**目标**：`make work` 可预览，视觉骨架接近 `public/index.html` 与文章页。

| 任务 | 说明 |
|------|------|
| T1 | 复制 theme-paper → theme-story；`paper` → `story` 全局替换（bundle、manifest、事件名、Makefile） |
| T2 | `everkm-theme.yaml` / demo `zh/` 内容目录（§4.1） |
| T3 | `normalizeTplPath` + `renderPage`：`home`、`post`、`about`、`archives`、`tags-index` |
| T4 | RootLayout、Header（navbar 基础）、Footer |
| T5 | HomePage：Banner 简版 + 侧边栏骨架 + 文章列表 + **首页分页** `index.p2.html` |
| T6 | PostPage：正文 + 基础 meta |
| T7 | ArchivesPage、TagsIndexPage、AboutPage |
| T8 | 主题切换、View Transitions、`story:page-swap` |
| T9 | syntect 代码高亮 + 脚注 widget |
| T10 | **plugin-in-search** 从 paper 复制并接入 |
| T11 | 从 `public/` 对照调 CSS（主色、Banner、卡片、暗色变量） |

**MVP 验收**：

- [ ] `/index.html` 虚拟首页，读 `_home.md`
- [ ] 根目录文章 `/hello-world.html` 可访问
- [ ] `/index.p2.html` 首页分页正常
- [ ] `/archives/`、`/tags/`、`/about/` 可访问
- [ ] 暗色模式、VT 换页无控制台报错
- [ ] Algolia 搜索浮层可用
- [ ] `_*.md` 不出现在文章列表

### 9.2 Phase 2 — 完整体验

| 任务 | 说明 |
|------|------|
| T12 | HomePage 完整 Banner（fixed 背景、打字副标题 Typed.js） |
| T13 | LinksPage + `_links.md`；MasonryPage + `_masonry.md` |
| T14 | TagPostsPage + 标签分页 |
| T15 | PostPage：版权块、post-tools 侧栏（**不含** TOC、代码复制，已暂缓） |
| T16 | scrollTopBottom、Preloader（**不含** imageViewer，已暂缓） |
| T18 | Navbar auto-hide、渐变条 |
| T19 | NotFoundPage（`/404.html`） |
| T20 | 字体 Chillax/Geist、hover 效果、懒加载图片 |

### 9.4 暂缓（本期与 Phase 2 均不做）

以下能力**暂不实现**，文档与配置预留开关位，后续单独立项：

| 能力 | 源实现 | 说明 |
|------|--------|------|
| 文章 TOC | `toc.js` / `tocToggle.js` | PostPage 侧栏目录；`config.story.articles.toc.enable: false` |
| 代码块复制 | `codeBlock.js` | 正文 `pre` 复制按钮 |
| 图片查看器 | `imageViewer.js` | 正文图片灯箱 |
| particles 粒子背景 | `particles.js` | 全站固定层；`features.particles: false` |

### 9.5 Phase 3 — 不做（明确排除）

以下能力**不纳入 theme-story 本期及后续规划**（除非用户另开需求）：

- Live2D 看板娘
- cursor-effects 光标特效
- Waline / Gitalk / Twikoo / Giscus 评论
- APlayer 音乐播放器
- Mermaid 图表插件
- hexo-wordcount 字数 / 阅读时间
- 第三方 PV·UV 统计（vercount）
- 文章推荐（nodejieba）
- 文章加密（hbe）
- Pangu.js 中英文空格
- RSS 独立生成脚本

---

## 10. 目录重构

### 10.1 目标仓库结构

```text
theme-story/
├── __everkm/
│   ├── everkm.yaml
│   ├── Makefile                 # --theme story
│   ├── package.json
│   └── theme/story/
│       ├── everkm-theme.yaml
│       ├── build.js
│       ├── Makefile
│       ├── assets-manifest.json
│       ├── templates/everkm-render.js
│       ├── dist/
│       ├── scripts/
│       │   ├── build-code-highlight.mjs
│       │   └── sync-plugin-in-search-from-youlog.sh
│       ├── src/
│       │   ├── entries/         # browser.ts, jsrender.ts
│       │   ├── layout/          # RootLayout, Header, …
│       │   ├── pages/           # home, post, archives, tags, links, masonry, …
│       │   ├── components/      # Sidebar, HomeBanner, Card, Pagination, …
│       │   ├── lib/             # config, VT, theme, footnote, widgets/
│       │   └── assets/css/      # global, theme, typography, code-highlight
│       └── stuff/km/            # 本文档
├── zh/                          # 主 demo
│   ├── _home.md
│   ├── _about.md
│   ├── _links.md
│   ├── _masonry.md
│   └── *.md                     # 文章
└── en/                          # 可选英文 demo（结构同 zh）
```

### 10.2 自 paper 保留

- `build.js`、esbuild 插件链、双入口构建
- `Makefile` / `pnpm` scripts
- `lib/viewTransitions.ts`（改名事件）
- `lib/footnote.ts`、`typography.css`、`code-highlight` 流程
- `plugin-in-search` 全套
- `types/everkm.d.ts`

### 10.3 自 paper 删除或替换

- paper 极简 Header/Footer/Home 视觉
- Pagefind 相关（若残留）
- `posts/` 路径常量 → 改为内容根目录 `POSTS_CONTENT_DIR = "/"`

### 10.4 自 redefine 移植（参考 `public/`）

- CSS 变量与 layout 视觉
- 首页/文章/标签/归档的 **布局结构**（非 EJS 原文）
- 必要静态图与字体
- 精选 client widgets（仅 Phase 2 清单内）

---

## 11. 客户端交互与 VT

### 11.1 Swup → VT 迁移原则

| redefine 模式 | story 模式 |
|---------------|------------|
| `swup.hooks.on("page:view", fn)` | `document.addEventListener("story:page-swap", fn)` |
| `data-swup-reload-script` | client mount `teardown` / `mount` |
| `#swup` 容器替换 | `#main-content` VT swap（对齐 paper） |

### 11.2 Client Mount Registry

每个 widget 实现 `mount()` / `teardown()`，在 `bootClient()` 与 `story:page-swap` 后调用：

| Widget | 阶段 |
|--------|------|
| theme | MVP |
| viewTransitions | MVP |
| footnote | MVP |
| in_search (Algolia) | MVP |
| tocToggle | **暂缓** |
| codeBlockCopy | **暂缓** |
| imageViewer | **暂缓** |
| scrollTopBottom | P2 |
| particles | **暂缓** |
| typed (Banner) | P2 |
| preloader | P2 |
| navbarShrink | P2 |

### 11.3 易踩坑（继承 paper 经验）

- `bootClient()` 任一步 `ReferenceError` 会导致后续 widget 全部失效；增量接入并查控制台。
- 脚注 grid 布局、`.app-prose pre:not(.astro-code)` 勿覆盖 syntect 色。
- particles 若后续启用：容器建议 `data-vt-persist`，避免换页重建 canvas（当前 §9.4 暂缓）。

---

## 12. 风险与许可

| 风险 | 等级 | 缓解 |
|------|------|------|
| redefine UI 复杂，MVP 还原度不足 | 中 | 以 `public/` 截图/对照逐项验收 |
| TW v3 class 与 v4 不兼容 | 中 | 先 CSS 变量层，再逐组件迁移 |
| `_` 前缀文件被 posts API 收录 | 中 | 应用层过滤 + 文档约定 |
| GPL-3.0（redefine） | 中 | 发布 theme-story 时遵守 GPL 或确认仅内部使用 |
| Algolia 索引需单独推送 | 低 | 对齐 paper 文档与 demo 配置 |

---

## 13. 方案评审检查表

迁移合并前逐项确认：

- [ ] **R1** 每条源路由有 Everkm 映射（§3.2）
- [ ] **R2** 首页与标签分页使用 `.p{N}.html` + `qs.page`
- [ ] **R3** `renderPage` 覆盖全部 `pageKey`，与虚拟页路径一致
- [ ] **R4** `everkm-theme.yaml` 的 `name: story`、`default_template: post`
- [ ] **R5** bundle / manifest 无 `paper` 残留
- [ ] **R6** 文章在内容根目录，URL 无 `/posts/` 前缀
- [ ] **R7** `_*.md` 仅作数据源，不进文章列表
- [ ] **R8** 搜索为 Algolia plugin-in-search，非本地 searchdb
- [ ] **R9** Phase 3（§9.5）与暂缓项（§9.4）未混入 MVP/P2 范围
- [ ] **R10** home 虚拟页；`config.home: '[[_home]]'`；无根目录 `index.md`
- [ ] **R11** `code_highlight.server` + 脚注/定义列表目测通过
- [ ] **R12** VT 换页后 client widget 正确 remount

---

## 14. 参考

| 资源 | 路径 |
|------|------|
| 源 Hexo 站点 | `/Users/dayu/Downloads/tmp/img_download/dayu-me3-main` |
| 编译对照 | `…/dayu-me3-main/public` |
| 脚手架参考 | `theme-paper/__everkm/theme/paper` |
| paper 迁移 Plan | `theme-paper/.../260628-Plan-astro-paper迁移theme-paper.md` |
| 搜索同步规范 | `theme-paper/.../260702-Plan-plugin-in-search同步规范.md` |
| everkm-publish 文档 | https://publish.everkm.cn/guide/custom-template |

---

**下一步**：用户确认本文档后，回复「开始编码」→ 执行 Phase 1 任务 T1–T11。
