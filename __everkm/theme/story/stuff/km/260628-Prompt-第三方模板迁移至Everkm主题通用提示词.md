# 第三方模板迁移至 Everkm 主题 — 通用提示词

> **文档性质**：Prompt（260628）  
> **用途**：复制本提示词到新会话，替换 `{{占位符}}` 后交给 AI 或协作者，用于 **任意** 第三方静态站模板 → Everkm 主题的迁移评估与实施。  
> **关联**：[theme 脚手架规范](./copy_theme_youlog.md)、[JSRender 概念](./260615-JSRender-Feature.md)、[everkm-publish 主题开发文档](https://publish.everkm.cn/guide/custom-template)

---

## 0. 变更记录

| 版本 | 日期 | 内容 |
|------|------|------|
| 0.1 | 260628 | 初稿：基于 astro-paper → theme-paper 迁移讨论抽象通用提示词 |
| 0.2 | 260628 | 补充：虚拟模板页 fallback、分页 URL 与 JsRender compName 归一化 |
| 0.3 | 260628 | home 虚拟 index.html + home.md；default_template 详情；featured tag；客户端交互块与 VT |
| 0.4 | 260630 | 补充 theme-paper 实践：服务端代码高亮、定义列表/脚注样式与 youlog 对齐、browser 启动链排错 |

---

## 1. 如何使用

1. 复制 **§2 完整提示词** 到新对话。
2. 填写 `{{...}}` 占位符（源模板路径、目标主题名、参考框架等）。
3. 在 **§3 约束清单** 中勾选/补充本次迁移的硬性要求。
4. 要求 AI **先输出方案并讨论**，仅在明确说「开始编码」后才改代码。

---

## 2. 完整提示词（复制区）

```markdown
# 任务：将第三方模板迁移为 Everkm 主题

## 背景

我需要将 **{{SOURCE_TEMPLATE_NAME}}**（{{SOURCE_FRAMEWORK}} 模板）迁移为 Everkm 主题 **{{TARGET_THEME_NAME}}**。

- **源模板路径**：`{{SOURCE_TEMPLATE_PATH}}`
- **目标主题仓库/目录**：`{{TARGET_THEME_PATH}}`
- **参考框架**（构建脚本与技术栈保持不变）：`{{REFERENCE_THEME_PATH}}`（如 theme-youlog）
- **技术栈约束**：Tailwind CSS + SolidJS + esbuild + JsRender（everkm-render.js）
- **everkm-publish 文档**：`{{EKMP_DOCS_PATH}}` 或 https://publish.everkm.cn/guide/custom-template

当前目标目录可能是从参考框架复制的脚手架，需删除不需要的原模板文件。

## 你的第一步（必须）

1. 阅读源模板的 **页面路由、布局、配置、样式、客户端交互**。
2. 阅读参考框架的 **build.js、Makefile、JsRender 入口、everkm-theme.yaml**。
3. 阅读 everkm-publish 文档中：**JsRender、folders 配置、posts API、分页 URL 规则**。
4. 输出 **迁移方案文档**（不要直接编码），包含：
   - 功能对照表（源模板 vs Everkm 实现方式）
   - 路由映射表（源 URL → Everkm 地址映射）
   - 目录重构（保留 / 新建 / 删除）
   - 分阶段计划与 MVP 边界
   - 风险与待确认项

## Everkm 核心约束（不可违背）

### A. 渲染架构

- 页面由 **JsRender**（`templates/everkm-render.js`）或 Tera 渲染；优先参考框架的 SolidJS + `renderToStringAsync` 模式。
- 数据通过全局 `everkm.*` API 获取（`post_detail`、`posts`、`posts_tag_list`、`config`、`assets` 等），**不得**假设 Astro/Next 等运行时。
- 构建：`pnpm run build:jsrender` → `make build` → 打包 zip。

### B. 路由 — 地址映射驱动（关键）

Everkm-publish 是 **基于 Markdown 文件路径 + folders 配置** 的地址映射，不是源框架的文件系统路由。

必须将源模板的 **每一条路由** 改写为 Everkm 方式：

| 源框架常见模式 | Everkm 等价 |
|----------------|-------------|
| `pages/index.astro` | **虚拟** `/index.html` → JsRender `home`；Hero 读 **`home.md`**（非 index.md） |
| `pages/posts/[page].astro` | **虚拟** `posts/index.html` / `.p{N}.html` |
| `pages/posts/[slug].astro` | `posts/*.md` → **`default_template`**（如 `post`） |
| `pages/tags/[tag]/[page].astro` | **虚拟** `tags/{tag}/index.html` / `.p{N}.html` |
| 虚拟页（search、archives） | **虚拟** `search/index.html`、`archives/index.html` |
| 静态内容页（about） | `about.md` + **`default_template`** |
| 根目录误建 `index.md` | 命中 Markdown → **default_template** 详情页（可接受） |
| `getStaticPaths` / `paginate()` | `everkm.posts({ offset, limit })` + `.p{N}.html` |

**虚拟模板页机制**（ekmp 已实现）：

- 请求 URL **未命中** Markdown 映射（`resolve_page` → `None`）时，`tpl_path` = 请求路径（如 `posts/index.html`）。
- Tera 找不到同名模板 → **JsRender fallback**（`renderPage(compName, props)`）。
- 因此列表/标签/归档/搜索/**首页** 均 **不必** 占位 `index.md`；Hero 用独立 **`home.md`** 由 HomePage 按路径读取。
- **`folders["/"]` 不要设 template**，否则与误建 `index.md` 冲突。
- Markdown 详情统一 **`everkm-theme.yaml#default_template`**。

### C. 分页 URL 契约（关键）

Everkm 分页 **不是** `?page=` 单独作为路由，而是：

- 第 1 页：`index.html`（或 `{slug}.html`）
- 第 N 页：`index.p{N}.html`（或 `{slug}.p{N}.html`）
- ekmp 预处理：`foo.p2.html` → 自动注入 query `page=2`，并规范化 `full_request_url`

模板 / JsRender 中：

```javascript
const pageNo = Math.max(1, parseInt(props.qs?.page ?? "1", 10));
const pageSize = props.qs?.per_page ?? config.posts.per_page ?? 10;
const offset = (pageNo - 1) * pageSize;
const { items, total } = everkm.posts(requestId, {
  dir: "/posts/",
  recursive: true,
  offset,
  limit: pageSize,
  order_by: "date",
  order_direction: "desc",
});
const pageCount = Math.ceil(total / pageSize);
```

分页链接生成：

```html
<!-- 上一页：第 2 页回 index.html，第 N 页回 index.p{N-1}.html -->
<a href="index.p2.html">下一页</a>
```

ekmp 预处理：`posts/index.p2.html` → 注入 `qs.page=2`，并将 `resolve_page` 基准 URL 规范为 `posts/index.html`（仍不命中 md 则走虚拟模板）。

JsRender `renderPage` 须 **归一化 compName**（去掉 `.p{N}`、`index.html` 后缀），使 `posts/index.p2.html` 与 `posts/index.html` 落到同一 `posts-list` 组件。

参考：`everkm-publish-core/src/render/page.rs`（分页解析）、yilog 模板 `index.p{{page_no}}.html` 写法。

### D. 配置映射

| 源模板 config | Everkm |
|---------------|--------|
| `site.title` 等 | `everkm.yaml#config.site` |
| 功能开关 `features.*` | `everkm.yaml#config.features` |
| 主题默认模板 | `everkm-theme.yaml#default_template` |
| 目录级模板 / query | `everkm.yaml#folders` |

### E. Front Matter 映射

| 源 content schema | Everkm Front Matter |
|-------------------|---------------------|
| `title` | `title` |
| `pubDatetime` | `created_at`（RFC3339） |
| `modDatetime` | `updated_at` |
| `tags` | `tags: [...]` |
| `draft` | `draft: true` |
| `featured` | 用 **tag** `featured`（`posts({ tags: ["featured"] })`），非单独 front matter 字段 |
| `description` | `description` 或 meta |

### F. 样式与构建

- 若用户允许：**可升级/对齐源模板的 Tailwind 主版本**（如 v4），但需同步改 `build.js` 的 PostCSS / Vite 插件链，并保持 esbuild 双入口（browser + jsrender）。
- 从源模板移植 **CSS 变量、组件 class、SVG 图标**；不要整包复制 Astro/Vite 配置。

### G. 搜索（Pagefind）

若源模板使用 **Pagefind**：

- 在 everkm-publish **即将支持** pagefind 的前提下，**原样保留**源模板的 Pagefind UI 与构建产物路径约定。
- 主题 `browser.ts` 保留 search 页初始化逻辑；构建脚本增加 pagefind 索引步骤（或文档说明由 ekmp export 阶段触发）。
- 主题 `browser.ts`：**Client Mount Registry**（Pagefind 等）；JsRender 只输出 `data-client-mount` 挂载点。
- 若启用 View Transitions：换页须 **teardown → swap → remount** 交互块；搜索等可 `data-vt-persist`。
- 不要擅自替换为 Algolia，除非用户明确要求。

### H. View Transitions 与客户端交互块

- **不能**使用源框架 SPA 路由（如 Astro ClientRouter）。
- **可以**用 View Transitions API + fetch + `#main-content` 替换。
- 搜索、评论等 **客户端生成 UI** 必须与 VT 生命周期配合（mount registry），不能只做 innerHTML 替换。

### I. 明确不迁移 / 延后项

常见延后：

- Dynamic OG（satori + sharp）— JsRender 沙箱无 Node 图像栈
- 源框架 SPA 路由 — 改用 VT + client mounts（§H）
- 源框架 Content Collections / `getCollection` — 改用 `everkm.posts`
- RSS / sitemap — 查 ekmp 是否内置，否则单独脚本

### J. Markdown 正文样式与 everkm-markdown 扩展（参考 theme-youlog `markdown2.css`）

everkm-publish 渲染的正文 HTML **不是** Shiki `.astro-code`，而是带语义 class 的 DOM（脚注、定义列表、syntect 代码块等）。迁移时须对照 **参考框架** 的 `markdown2.css` + 客户端 widget，而非仅移植源模板的 prose 样式。

#### J.1 服务端代码高亮（`config.code_highlight.server: true`）

| 项 | 做法 |
|----|------|
| 引擎 | ekmp 用 syntect 给 `pre > code` 内 span 打 token class（如 `.keyword`） |
| 主题 CSS | 从 `everkm-publish/highlight-packages/themes/` 取 **light + dark** 两套 syntect 导出 CSS |
| 合并 | 脚本生成 `code-highlight.css`：`:root/[data-theme=light]` 与 `[data-theme=dark]` 分包，选择器加 scope `.app-prose pre:not(.astro-code)`（避免污染页面、不与 Shiki 冲突） |
| 构建 | `make code-highlight-build LIGHT=... DARK=...` 或 `pnpm run code-highlight:build` |
| 打入主 CSS | `@import "./code-highlight.css"` 于 `global.css`（不必像 yilog 单独 `code-highlight` manifest section） |
| typography 注意 | `pre:not(.astro-code)` 勿用 `bg-muted` / `text-foreground` 盖掉 token 色；行内 `` `code` `` 单独样式 |

两套高亮分工：**Shiki** → `.astro-code`（若源模板构建期有）；**syntect** → 普通 `pre > code`。

#### J.2 定义列表（GFM Definition List）

- HTML：`<dl><dt>…</dt><dd>…</dd></dl>`（everkm-markdown 输出）
- **内容**：术语与 `:` 定义行之间 **不能有空行**，否则解析成两个 `<p>` 而非 `<dl>`
- **样式**：参考 `markdown2.css` §Definition List — `dt` 加粗、`dd` 缩进/左边框；作用域 `.app-prose`

#### J.3 脚注（everkm-markdown）

**HTML 契约**（与 youlog 一致）：

```html
<sup class="footnote-reference"><a href="#slugify">1</a></sup>
<hr class="footnote-definitions-separator" />
<div class="footnote-definition" id="slugify">
  <span class="footnote-definition-label">1</span>
  <p>…</p>
</div>
```

**CSS**（对齐 `theme-youlog/.../markdown2.css`）：

- `.footnote-definition` 建议 **`display: grid; grid-template-columns: auto 1fr`**（比 flex 稳：SSR 在 `</span>` 与 `<p>` 间常有换行文本节点，flex 会竖排错位）
- `.footnote-definition > p { margin: 0 !important }` 覆盖 `@tailwindcss/typography` 默认段落边距
- `hr.footnote-definitions-separator` 分隔线勿用暗色 `--border`（paper 暗色主题为 accent 色）；用 `muted-foreground` 半透明
- 最后一条脚注加 `margin-bottom`，避免与 footer `border-t` 重叠
- 脚注编号 label 色可与 youlog 一致用 `accent`；正文用 `muted-foreground`

**客户端返回按钮**（移植 `youlog_lib/widgets/footnote/index.ts`）：

- 容器：`#article`（youlog 为 `#article-main` 内的 `.markdown-body`）
- 查找引用：`.footnote-reference a[href="#{id}"]`（比裸 `a[href=…]` 更准）
- 按钮挂到 **`definition.lastElementChild`（通常是 `<p>`）** 末尾，字符 `⤴`，`margin-left: 0.8em`
- 生命周期：`DOMContentLoaded` / 立即执行 + 换页事件（paper：`paper:page-swap`；youlog：`page-loaded`）
- **仅当正文存在对应 `[^id]` 引用时** 才注入按钮（底部仅有 `[^id]:` 定义、无正文引用则无返回目标）
- 初始化前 **删除** `.footnote-definition` 内仅含空白的文本子节点

**browser 启动链（易踩坑）**：

- `src/entries/browser.ts` → `bootClient()`；任一步 `ReferenceError` 会导致后续 widget **全部不执行**（脚注、VT、主题切换等）
- 修改 `viewTransitions.ts` 等入口时 **勿漏 import**（曾误删 `installTheme` 导致脚注脚本从未运行）
- 排错：浏览器控制台看 `pageerror`；Playwright/手动查 `document.querySelectorAll('.footnote-back-button').length`

## 输出格式要求

1. **先方案、后编码**：除非用户明确说「开始编码」，否则只讨论方案。
2. 方案需含 **路由映射表**（逐条 URL）。
3. 方案需标注 **MVP / Phase 2 / 不做**。
4. 文档写入主题 `stuff/km/`，命名 `YYMMDD-Plan-xxx.md`，变更记录 §0 遵循 [需求文档规范](/Users/dayu/Coder/everkm/everkm2/global_km/需求文档规范.md)。

## 参考仓库

- 官方主题框架：https://github.com/everkm/theme-youlog
- JsRender 类型：`theme/youlog/src/types/everkm.d.ts`
```

---

## 3. 约束清单（每次迁移勾选）

| # | 约束 | 默认 | 本次 |
|---|------|------|------|
| C1 | 构建脚本沿用参考框架（build.js / Makefile） | ✅ | |
| C2 | SolidJS + esbuild + JsRender | ✅ | |
| C3 | 路由必须改为 Everkm 地址映射 | ✅ | |
| C4 | 分页使用 `.p{N}.html` + `qs.page` + `posts(offset,limit)` | ✅ | |
| C5 | Tailwind 版本跟随源模板（若更优） | 视情况 | |
| C6 | Pagefind 原样迁移（ekmp 将支持） | 视情况 | |
| C7 | 删除参考框架中与本模板无关的模块 | ✅ | |
| C8 | 先出 km 文档再编码 | ✅ | |
| C9 | JsRender 与 Client 交互块分离（search 等 mount） | ✅ | |
| C10 | home 虚拟 index.html + home.md Hero | ✅ | |
| C11 | `code_highlight.server` 时 syntect 主题 CSS 并入主 bundle | 视情况 | |
| C12 | 定义列表/脚注样式对齐参考框架 `markdown2.css` + footnote widget | 视情况 | |

---

## 4. 方案评审检查表

迁移方案合并前，逐项确认：

- [ ] **R1** 源模板每条 route 都有 Everkm 映射（文件 + `folders.template` + `query`）
- [ ] **R2** 所有分页列表（posts、tag、archives 若分页）使用 `.p{N}.html` 链接
- [ ] **R3** `renderPage` switch 覆盖全部 template 名，与 `everkm.yaml#folders` 一致
- [ ] **R4** `everkm-theme.yaml` 的 `name` / `default_template` 已更新
- [ ] **R5** bundle 名、assets-manifest section、CSS 入口已重命名（无参考框架旧名残留）
- [ ] **R6** demo 内容目录结构可供 `everkm-publish serve` 预览
- [ ] **R7** Pagefind / RSS / OG 等依赖 ekmp 的能力已标注「等待 / 自建 / 不做」
- [ ] **R8** MVP 边界与用户确认一致
- [ ] **R9** 客户端交互块（Pagefind 等）有 mount/teardown，与 VT 换页配合
- [ ] **R10** home 为虚拟页；Hero 读 `home.md`；根目录无 `index.md`
- [ ] **R11** 启用 `code_highlight.server` 时，light/dark syntect CSS 已 scope 进 `.app-prose pre:not(.astro-code)`，且不与 Shiki/行内 code 冲突
- [ ] **R12** 脚注/定义列表在 `everkm-markdown` 示例页目测通过（横排对齐、分隔线颜色、有引用处显示 `⤴`）
- [ ] **R13** `bootClient()` 无控制台报错；换页后 client widget 重新挂载

---

## 5. 附录：占位符说明

| 占位符 | 示例 |
|--------|------|
| `{{SOURCE_TEMPLATE_NAME}}` | Astro Paper 6.1.0 |
| `{{SOURCE_FRAMEWORK}}` | Astro |
| `{{SOURCE_TEMPLATE_PATH}}` | `/path/to/astro-paper-6.1.0` |
| `{{TARGET_THEME_NAME}}` | paper |
| `{{TARGET_THEME_PATH}}` | `theme-paper/__everkm/theme/paper` |
| `{{REFERENCE_THEME_PATH}}` | `theme-youlog/__everkm/theme/youlog` |
| `{{EKMP_DOCS_PATH}}` | `everkm-pages/publish-2026/zh` |

---

## 6. 附录：theme-paper 迁移实践经验（260630）

> 摘自 theme-paper 落地过程，供后续主题迁移直接复用。

### 6.1 文件清单

| 能力 | 路径 / 命令 |
|------|-------------|
| syntect 主题源 | `src/assets/css/code_themes/*.css`（自 ekmp `highlight-packages/themes` 拷贝） |
| 合并 light/dark | `scripts/build-code-highlight.mjs` → `src/assets/css/code-highlight.css` |
| Makefile | `make code-highlight-build CODE_HIGHLIGHT_LIGHT=... CODE_HIGHLIGHT_DARK=...` |
| 配置 | `everkm-theme.yaml` → `config.code_highlight.server: true` |
| 正文排版 | `src/assets/css/typography.css` → `.app-prose` 内 dl/footnote |
| 脚注 widget | `src/lib/footnote.ts`（自 youlog 移植，换容器与换页事件） |
| 入口 | `bootClient()` 内 `installFootnoteBackButton("#article")` |

### 6.2 验收页面

- 使用含 **定义列表、脚注、多语言代码块** 的 demo 文（如 `posts/everkm-markdown.md`）
- 本地 `make work`（`__everkm` 级）预览后硬刷新，确认 JS bundle hash 已更新

### 6.3 常见故障

| 现象 | 原因 | 处理 |
|------|------|------|
| 代码块无着色 | 未引 `code-highlight.css` 或 `server: false` | 检查 yaml + `global.css` import |
| 代码块单色 + 灰底 | typography 覆盖了 syntect 背景/字色 | 去掉 `pre:not(.astro-code)` 上 `text-foreground`/`bg-muted` |
| 定义列表标题与解释分成两段 | Markdown 术语与 `:` 行之间有空行 | 改正文；必要时补 `dl` 样式 |
| 脚注 `[n]` 与正文上下叠放 | flex + SSR 空白文本节点；或 prose `p` 大 margin | 改 grid；`p { margin: 0 !important }`；JS 删空白节点 |
| 脚注无 `⤴` | 正文无 `[^id]` 引用，或 `bootClient` 中途报错 | 补引用；查控制台 `installTheme is not defined` 等 |
| 脚注区与 footer 线重叠 | 末条脚注无下边距 / footer 用 accent 色 `border` | `margin-bottom` + footer `border-muted` |
