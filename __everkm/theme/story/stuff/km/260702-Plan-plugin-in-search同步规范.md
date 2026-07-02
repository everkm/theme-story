# theme-paper `plugin-in-search` 上游同步规范（Plan）

> **文档性质**：Plan（260702）  
> **状态**：v1.0 初稿  
> **上游仓库**：[everkm/theme-youlog](https://github.com/everkm/theme-youlog)  
> **上游主题路径**：`__everkm/theme/youlog`（仓库内）  
> **本主题路径**：`theme-paper/__everkm/theme/paper`  
> **关联脚本**：[`scripts/sync-plugin-in-search-from-youlog.sh`](../../scripts/sync-plugin-in-search-from-youlog.sh)  
> **插件速查**：[`src/lib/plugins/in_search/UPSTREAM.md`](../../src/lib/plugins/in_search/UPSTREAM.md)

---

## 0. 变更记录

| 版本 | 日期 | 内容 |
|------|------|------|
| 1.0 | 260702 | 初稿：记录从 youlog 复制 `plugin-in-search` 的文件清单、paper 定制差异、三层同步策略与同步脚本 |
| 1.1 | 260702 | 明确上游为 GitHub 仓库 [everkm/theme-youlog](https://github.com/everkm/theme-youlog)；补充 clone / release 获取方式 |

---

## 1. 背景与目标

### 1.1 背景

theme-paper 原使用 **Pagefind** 客户端搜索（独立 `/search/index.html` 虚拟页 + `data-client-mount="pagefind"`）。260702 起改为与 theme-youlog 一致，使用基于 **Algolia** 的 `plugin-in-search`（自定义元素 `<x-in-search>` + 浮层 `FloatSearch`）。

插件源码自 youlog **复制**至 paper，非 npm 包；两主题各自维护集成层，存在 **fork 漂移** 风险。

### 1.2 目标

1. 明确 **上游源路径** 与 paper 侧 **目标路径** 的一一映射。
2. 将文件分为三层（可直接覆盖 / 合并保留定制 / 不同步），指导后续升级。
3. 提供可重复执行的同步脚本与验证清单。
4. 为长期抽离 `@everkm/plugin-in-search` 共享包预留演进路径。

### 1.3 非目标

- 不在本规范内实现自动三方合并（Layer B 仍需人工 review）。
- 不同步 youlog 的 PJAX `morphProtection`（paper 使用 View Transitions，见 §4.3）。
- 不修改 everkm-publish 或 Algolia 索引构建流程。

---

## 2. 上游与目录映射

### 2.1 上游仓库与路径

**官方仓库**：[https://github.com/everkm/theme-youlog](https://github.com/everkm/theme-youlog)

插件及依赖源码位于仓库内：

```text
__everkm/theme/youlog/src/youlog_lib/
```

GitHub 直链（`master` 分支）：

| 资源 | URL |
|------|-----|
| 插件目录 | [plugins/in_search](https://github.com/everkm/theme-youlog/tree/master/__everkm/theme/youlog/src/youlog_lib/plugins/in_search) |
| keymap | [widgets/keymap](https://github.com/everkm/theme-youlog/tree/master/__everkm/theme/youlog/src/youlog_lib/widgets/keymap) |
| infinite-loader | [widgets/infinite-loader](https://github.com/everkm/theme-youlog/tree/master/__everkm/theme/youlog/src/youlog_lib/widgets/infinite-loader) |
| Releases | [Releases](https://github.com/everkm/theme-youlog/releases)（同步前建议对照 tag，如 `v0.5.9`） |

**本地开发**（与 paper 同级 checkout 时）：

```text
../theme-youlog/__everkm/theme/youlog/src/youlog_lib/
```

### 2.2 复制映射表

| 编号 | youlog 源路径 | paper 目标路径 | 同步层 |
|------|---------------|----------------|--------|
| M-01 | `plugins/in_search/index.ts` | `src/lib/plugins/in_search/index.ts` | A |
| M-02 | `plugins/in_search/i18n.ts` | `src/lib/plugins/in_search/i18n.ts` | A |
| M-03 | `plugins/in_search/AlgoliaIcon.tsx` | `src/lib/plugins/in_search/AlgoliaIcon.tsx` | A |
| M-04 | `plugins/in_search/InSearch.tsx` | `src/lib/plugins/in_search/InSearch.tsx` | B |
| M-05 | `plugins/in_search/FloatSearch.tsx` | `src/lib/plugins/in_search/FloatSearch.tsx` | B |
| M-06 | `plugins/in_search/FloatSearch.css` | `src/lib/plugins/in_search/FloatSearch.css` | B |
| M-07 | `plugins/in_search/morphProtection.ts` | —（未复制） | — |
| M-08 | `widgets/keymap/*` | `src/lib/widgets/keymap/*` | A |
| M-09 | `widgets/infinite-loader/*` | `src/lib/widgets/infinite-loader/*` | A |
| M-10 | `directives/*` | `src/lib/directives/*` | A |
| M-11 | `core/i18n.ts` | `src/lib/core/i18n.ts` | A |
| M-12 | — | `src/lib/core/index.ts` | C（paper 新增导出） |

**Layer 含义**：

| 层 | 名称 | 同步方式 |
|----|------|----------|
| A | 上游一致 | 脚本可直接 `rsync` 覆盖 |
| B | fork 定制 | 对比合并，**禁止**盲目覆盖 |
| C | paper 独有 | 不随 youlog 同步 |

---

## 3. paper 集成层（Layer C，不同步）

以下文件为 paper 主题对搜索的 **挂载与构建适配**，youlog 升级时 **不参与** rsync：

| 编号 | 文件 | 职责 |
|------|------|------|
| I-01 | `build.js` | 增加 `plugin-in-search` esbuild 入口 |
| I-02 | `package.json` | Algolia、solid-element、mitt 等依赖 |
| I-03 | `src/layout/Header.tsx` | 顶栏 `<x-in-search>` 挂载、`algolia_search` 配置读取 |
| I-04 | `src/pages/index.tsx` | 条件注入 `plugin-in-search` CSS/JS |
| I-05 | `src/lib/configValue.ts` | 嵌套配置读取（`algolia_search/app_id` 等） |
| I-06 | `src/lib/viewTransitions.ts` | VT 换页时保留 `#header-in-search`  live 节点 |
| I-07 | `src/lib/events.ts` | `PAPER_PAGE_SWAP` 事件常量 |
| I-08 | `src/types/solid-directives.d.ts` | `x-in-search` JSX 类型 |
| I-09 | `__everkm/everkm.yaml` | 站点级 `algolia_search` 配置示例 |
| I-10 | `everkm-theme.yaml` | 主题默认配置（已移除 `features.search: pagefind`） |

### 3.1 youlog 对照（集成差异）

| 关注点 | youlog | paper |
|--------|--------|-------|
| 挂载位置 | `src/layout/TopHeader.tsx` | `src/layout/Header.tsx` |
| 资源注入 | `src/pages/index.tsx`（book） | `src/pages/index.tsx` |
| 导航保护 | `morphProtection.ts` + PJAX `processedRegistry` | `viewTransitions.ts` 保留 `#header-in-search` |
| 关闭浮层事件 | `EVENT_BEFORE_UPDATE`（page-ajax） | `PAPER_PAGE_SWAP` |
| 图标方案 | iconify Tailwind 类 | paper `Icon` + 内联 SVG |
| CSS 构建 | Tailwind v3 | Tailwind v4 独立 bundle（`FloatSearch.css` 内 `@import`） |

---

## 4. paper 对上游的定制差异（Layer B 合并清单）

同步 Layer B 文件后，**必须保留或重新应用** 以下 paper 定制。

### 4.1 `InSearch.tsx`（M-04）

| 编号 | 定制项 | 说明 |
|------|--------|------|
| B-01 | 导航事件 | `EVENT_BEFORE_UPDATE` → `import { PAPER_PAGE_SWAP } from "../../events"` |
| B-02 | 触发器图标 | 使用 `Icon` + `IconSearch.svg`，不用 iconify `icon-[f7--search]` |
| B-03 | 触发器样式 | 圆角 pill：`border-border bg-muted/40`，带 `⌘K` / `^K` 快捷键 |
| B-04 | 无障碍 | `role="button"`、`tabIndex={0}`、Enter/Space 键盘触发 |
| B-05 | 移除调试 | 删除 `console.log("toggle search", ...)` |

### 4.2 `FloatSearch.tsx`（M-05）

| 编号 | 定制项 | 说明 |
|------|--------|------|
| B-06 | 图标 | `SearchGlyph` / `CloseGlyph` / `EmptyGlyph` 内联 SVG，替代 iconify |
| B-07 | 逻辑 | Algolia 搜索、无限滚动、快捷键等 **业务逻辑** 尽量与上游一致，合并时以 youlog 为准 |

### 4.3 `FloatSearch.css`（M-06）

| 编号 | 定制项 | 说明 |
|------|--------|------|
| B-08 | Tailwind v4 入口 | 文件头保留 `@import "tailwindcss"` + `@source` |
| B-09 | 设计 token | `@theme inline` 映射 paper 变量（`--background`、`--accent` 等） |
| B-10 | 避免 @apply | plugin 独立 bundle 构建会报错；用普通 CSS 替代 `@apply` |
| B-11 | loading 色 | `--accent` 替代 youlog `--brand-primary` |

### 4.4 未复制的上游文件（M-07）

`morphProtection.ts` 依赖 youlog `page-ajax/processedRegistry`，paper 无 PJAX。等效逻辑在 `viewTransitions.ts`：

```typescript
// swapVtRegion key === "header" 时
const liveSearch = current.querySelector("#header-in-search");
const clonedSearch = cloned.querySelector("#header-in-search");
if (liveSearch && clonedSearch) clonedSearch.replaceWith(liveSearch);
```

若 youlog 未来重构 morph 保护，paper 应在 **viewTransitions** 侧评估是否跟进，而非复制该文件。

---

## 5. 已移除的 Pagefind 相关（勿恢复）

| 编号 | 文件/配置 | 说明 |
|------|-----------|------|
| R-01 | `src/pages/search.tsx` | 已删除虚拟搜索页 |
| R-02 | `src/lib/clientMounts.ts` | 已移除 `pagefind` registry |
| R-03 | `src/assets/css/global.css` | 已移除 `#pagefind-search` 样式 |
| R-04 | `src/lib/config.ts` | 已移除 `features.search` |
| R-05 | `src/pages/post.tsx` | 已移除 `data-pagefind-body` |
| R-06 | `src/lib/normalizeTplPath.ts` | 已移除 `search` 路由 key |
| R-07 | `everkm-theme.yaml` | 已移除 `search: pagefind` |

---

## 6. 配置与构建

### 6.1 站点配置 `algolia_search`

```yaml
config:
  algolia_search:
    app_id: YOUR_APP_ID
    api_key: YOUR_SEARCH_API_KEY   # Search-Only API Key
    index_name: your_index
    site: your-site-id
```

配置存在时，Header 显示搜索触发器，`index.tsx` 注入 `plugin-in-search` 资源。

### 6.2 构建入口

`build.js`：

```javascript
{
  in: "src/lib/plugins/in_search/index.ts",
  out: "plugin-in-search",
}
```

### 6.3 依赖（`package.json`）

`@algolia/client-search`、`algoliasearch`、`solid-element`、`mitt`、`scroll-into-view-if-needed`、`throttle-debounce`、`w3c-keyname`

---

## 7. 同步操作流程

### 7.1 前置条件

1. 获取上游源码，任选其一：
   - **本地同级仓库**（推荐日常开发）：
     ```bash
     git clone https://github.com/everkm/theme-youlog.git ../theme-youlog
     ```
   - **指定 release tag**（推荐发版前对齐）：
     ```bash
     git clone --depth 1 --branch v0.5.9 https://github.com/everkm/theme-youlog.git /tmp/theme-youlog
     export YOULOG_THEME=/tmp/theme-youlog/__everkm/theme/youlog
     ```
   - **已有本地路径**：`export YOULOG_THEME=/path/to/theme-youlog/__everkm/theme/youlog`
2. 确认上游 [plugins/in_search](https://github.com/everkm/theme-youlog/tree/master/__everkm/theme/youlog/src/youlog_lib/plugins/in_search) 或依赖有变更（git log / [Releases](https://github.com/everkm/theme-youlog/releases)）。

### 7.2 推荐步骤

```bash
# 1. 在 paper 主题目录执行同步脚本（仅 Layer A）
cd theme-paper/__everkm/theme/paper
./scripts/sync-plugin-in-search-from-youlog.sh

# 2. 人工对比 Layer B
diff -ru \
  ../../../../theme-youlog/__everkm/theme/youlog/src/youlog_lib/plugins/in_search/InSearch.tsx \
  src/lib/plugins/in_search/InSearch.tsx

diff -ru \
  ../../../../theme-youlog/__everkm/theme/youlog/src/youlog_lib/plugins/in_search/FloatSearch.tsx \
  src/lib/plugins/in_search/FloatSearch.tsx

diff -ru \
  ../../../../theme-youlog/__everkm/theme/youlog/src/youlog_lib/plugins/in_search/FloatSearch.css \
  src/lib/plugins/in_search/FloatSearch.css

# 3. 按 §4 重新应用 paper 定制（B-01～B-11）

# 4. 构建与冒烟验证
pnpm install
pnpm run build:jsrender
```

### 7.3 脚本行为摘要

| 模式 | 命令 | 行为 |
|------|------|------|
| 安全同步 | `./scripts/sync-plugin-in-search-from-youlog.sh` | 仅覆盖 Layer A；Layer B 打印 diff 提示 |
| 强制 Layer B | `./scripts/sync-plugin-in-search-from-youlog.sh --include-fork` | 覆盖 B 文件（**危险**，需事后重做 §4 定制） |
| 自定义上游 | `YOULOG_THEME=... ./scripts/...` | 指定 youlog 主题根目录 |

### 7.4 验证清单

| 编号 | 检查项 |
|------|--------|
| V-01 | `pnpm run build:jsrender` 无报错 |
| V-02 | `assets-manifest.json` 含 `plugin-in-search` js/css |
| V-03 | 顶栏搜索 pill + `⌘K` 显示正常（桌面/移动菜单首位） |
| V-04 | 点击或 `⌘K` / `Ctrl+K` 打开浮层，Algolia 有结果 |
| V-05 | View Transitions 换页后搜索触发器仍可用、浮层自动关闭 |
| V-06 | 暗色模式下样式正常 |

---

## 8. 长期演进建议

### 8.1 短期（当前架构）

- 每次 youlog 搜索相关 release 后，按 §7 执行 Layer A 同步 + Layer B review。
- 在本文件 §0 变更记录追加版本行。

### 8.2 中期

- 将 Layer A + 无主题耦合的 Layer B 逻辑抽为 monorepo 包，例如 `@everkm/plugin-in-search`。
- paper / youlog 仅保留 Layer C 集成（Header、VT/PJAX 保护、样式 token 适配）。

### 8.3 上游路径环境变量

脚本默认尝试本地同级 checkout：

```text
${YOULOG_THEME:-../../../../theme-youlog/__everkm/theme/youlog}
```

未 clone 或路径不同时，指向从 [everkm/theme-youlog](https://github.com/everkm/theme-youlog) 拉取的目录：

```bash
export YOULOG_THEME=/path/to/theme-youlog/__everkm/theme/youlog
```

---

## 9. 参考

| 资源 | 路径 |
|------|------|
| 上游仓库 | [github.com/everkm/theme-youlog](https://github.com/everkm/theme-youlog) |
| youlog 插件源码 | [plugins/in_search](https://github.com/everkm/theme-youlog/tree/master/__everkm/theme/youlog/src/youlog_lib/plugins/in_search) |
| youlog TopHeader 挂载 | [TopHeader.tsx](https://github.com/everkm/theme-youlog/blob/master/__everkm/theme/youlog/src/layout/TopHeader.tsx) |
| paper Header 挂载 | `theme-paper/.../src/layout/Header.tsx` |
| 同步脚本 | `theme-paper/.../scripts/sync-plugin-in-search-from-youlog.sh` |
| 插件速查 | `theme-paper/.../src/lib/plugins/in_search/UPSTREAM.md` |
