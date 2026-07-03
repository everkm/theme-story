---
title: 主题配置
slug: readme
created_at: 2026-06-28T00:00:00Z
updated_at: 2026-07-03T11:51:44Z
tags:
  - featured
---

# 主题配置

Story 是 [everkm-publish](https://publish.everkm.com) 的博客主题，由 [hexo-theme-redefine](https://github.com/EvanNotFound/hexo-theme-redefine) 迁移而来。默认模板为 `post`。站点级配置位于工作区 `__everkm/everkm.yaml` 的 `config` 节点；内容目录的 URL 规则在 `folders` 中设置。主题默认值定义在 `__everkm/theme/story/everkm-theme.yaml`。

## 配置概览

```yaml
# __everkm/everkm.yaml

config:
  site: { ... }           # 站点基本信息
  home: '[[_home]]'       # 首页数据源标记（下划线文件）
  about: '[[_about]]'     # 关于页内容
  links: '[[_links]]'     # 友链数据
  posts: { ... }          # 文章列表分页
  features: { ... }       # 功能开关
  story: { ... }          # Story 主题外观与布局
  code_highlight: { ... } # 服务端代码高亮
  math_render: { ... }    # 服务端数学渲染
  socials: [ ... ]        # 社交链接（Banner 与页脚）
  copyright: { ... }      # 页脚「Powered by」行
  algolia_search: { ... } # 可选 Algolia 搜索

folders:
  "/":
    url_slug: posts
    url_id_suffix: false
```

---

## 站点信息 `site`

| 字段 | 类型 | 说明 |
|--------|------|------|
| `site.name` | string | 站点名称，用于页面标题、顶栏、页脚、Banner 等 |
| `site.description` | string | 站点描述（发布元数据；也可作为 Banner 副标题回退） |
| `site.author` | string | 作者名，显示在文章页与首页侧边栏 |
| `site.profile` | string | 作者头像路径，如 `/assets/images/avatar-0.jpg` |
| `site.lang` | string | 站点语言，如 `en`、`zh` |
| `site.timezone` | string | 日期显示时区，如 `UTC`、`Asia/Shanghai` |
| `site.dir` | string | 文本方向，`ltr` 或 `rtl` |

示例：

```yaml
config:
  site:
    name: 我的博客
    description: 你的个人博客之旅。
    author: 张三
    profile: /assets/images/avatar-0.jpg
    lang: zh
    timezone: Asia/Shanghai
```

---

## 虚拟页面 `home` / `about` / `links`

Story 对若干页面使用**虚拟模板**。正文与结构化数据来自下划线开头的 Markdown 文件，通过内链引用：

| 字段 | 默认值 | 说明 |
|--------|---------|-------------|
| `home` | `[[_home]]` | 首页数据源标记（`_home.md`；不进入公开文章列表；Banner 文案在 `story.home_banner` 配置） |
| `about` | `[[_about]]` | 关于页 Markdown |
| `links` | `[[_links]]` | 友链数据（front matter 中的 `links` 数组） |

**相册**页（`/album/index.html`）也是虚拟模板，通过 Everkm `posts_resources` API 从公开发布的文章内容中收集图片——无需单独的数据文件。

示例内容布局：

```text
zh/
├── _home.md          # 首页数据源标记（Banner 使用 story.home_banner）
├── _about.md         # 关于页
├── _links.md         # 友链数据
├── README.md         # 主题配置文档
├── CHANGELOG.md      # 更新日志
└── hello-world.md    # 博客文章（位于内容根目录）
```

{.NOTE}
**不要**创建根目录 `index.md`。若 `/index.html` 解析到某篇 Markdown，会按普通文章详情页渲染，而非虚拟首页。

文件 basename 以 `_` 开头的视为**数据源**，不作为公开发布的文章。

---

## 文章 `posts`

| 字段 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `posts.per_page` | number | `10` | 首页、文章列表与标签页每页文章数 |

首页分页使用站点根路径，如 `/index.html`、`/index.p2.html`。

---

## 功能开关 `features`

| 字段 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `features.light_and_dark_mode` | boolean | `true` | 顶栏浅色 / 深色模式切换 |
| `features.show_archives` | boolean | `true` | 顶栏显示归档入口（使用默认导航时） |
| `features.show_back_button` | boolean | `true` | 文章详情页显示返回按钮 |
| `features.view_transitions` | boolean | `true` | 启用站内 View Transitions 导航 |
| `features.preloader` | boolean | `false` | 首次访问显示加载屏 |
| `features.particles` | boolean | `false` | 粒子动画背景 |
| `features.home_banner` | boolean | `true` | 显示首页 Banner |
| `features.home_sidebar` | boolean | `true` | 显示首页侧边栏 |

示例：

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

## Story 主题 `story`

Story 专属的外观与布局选项。默认值在 `everkm-theme.yaml` 中提供。

### 颜色 `story.colors`

| 字段 | 默认值 | 说明 |
|--------|---------|-------------|
| `story.colors.primary` | `#A31F34` | 强调色 |
| `story.colors.default_mode` | `light` | 默认配色模式（`light` 或 `dark`） |

### 首页 Banner `story.home_banner`

| 字段 | 默认值 | 说明 |
|--------|---------|-------------|
| `story.home_banner.enable` | `true` | 启用 Banner（也由 `features.home_banner` 控制） |
| `story.home_banner.style` | `fixed` | `fixed` — 第 1 页全屏 Hero，后续页模糊背景；`static` — 内联 Banner |
| `story.home_banner.image.light` | 内置图片 | 浅色模式背景图 |
| `story.home_banner.image.dark` | 内置图片 | 深色模式背景图 |
| `story.home_banner.title` | 站点名称 | Banner 标题 |
| `story.home_banner.subtitle` | — | 静态字符串，或打字机配置（见下） |

副标题打字机配置：

```yaml
story:
  home_banner:
    subtitle:
      text:
        - 欢迎来到我的博客
        - 你的个人博客之旅。
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

`hitokoto.enable` 为 `true` 时，Banner 从配置的 API 获取随机一言，而非使用 `text`。

### 首页侧边栏 `story.home_sidebar`

| 字段 | 默认值 | 说明 |
|--------|---------|-------------|
| `story.home_sidebar.enable` | `true` | 启用侧边栏（也由 `features.home_sidebar` 控制） |
| `story.home_sidebar.position` | `left` | `left` 或 `right` |
| `story.home_sidebar.announcement` | — | 站点名称下方的可选公告文字 |

### 导航栏 `story.navbar`

| 字段 | 默认值 | 说明 |
|--------|---------|-------------|
| `story.navbar.auto_hide` | — | 滚动时收缩导航栏 |
| `story.navbar.color.left` | `#f78736` | 左侧渐变色（导航栏背景） |
| `story.navbar.color.right` | `#367df7` | 右侧渐变色 |
| `story.navbar.links` | — | 自定义导航链接（设置后替换默认导航） |

链接项：

```yaml
story:
  navbar:
    links:
      - label: 首页
        path: /index.html
        icon: home
      - label: 相册
        path: /album/index.html
        icon: album
      - label: Github
        path: https://github.com/everkm/theme-story
        external: true
        icon: github
```

支持的 `icon` 包括 `home`、`archives`、`github`、`album`、`links`、`about` 等，在主题中有对应映射。

### 全局 `story.global`

| 字段 | 默认值 | 说明 |
|--------|---------|-------------|
| `story.global.scroll_progress.bar` | `false` | 页面顶部显示阅读进度条 |
| `story.global.scroll_tools.enable` | `true` | 显示回到顶部与字号调节控件 |
| `story.global.preloader.message` | 站点名称 | 预加载屏文字 |
| `story.global.preloader.max_duration_ms` | `2500` | 预加载屏最长显示时间 |

### 文章 `story.articles`

| 字段 | 默认值 | 说明 |
|--------|---------|-------------|
| `story.articles.toc.enable` | `false` | 文章页显示目录 |
| `story.articles.toc.max_depth` | `3` | 目录最大标题层级 |
| `story.articles.copyright.enable` | `true` | 文章底部显示版权块 |
| `story.articles.copyright.default` | `cc_by_nc_sa` | 文章 front matter 无 `copyright` 时的默认许可 |

支持的许可键：`cc_by_nc_sa`、`cc_by`、`cc_by_nc`、`cc_by_nd`、`cc_by_sa`、`cc0`、`all_rights_reserved`。

---

## 搜索 `algolia_search`

配置后，Algolia 全文搜索组件出现在顶栏（需要 `plugin-in-search` 构建产物）。

```yaml
config:
  algolia_search:
    app_id: YOUR_APP_ID
    api_key: YOUR_SEARCH_API_KEY
    index_name: your_index
    site: your-site-id
```

| 字段 | 说明 |
|------|------|
| `app_id` | Algolia Application ID |
| `api_key` | Algolia Search-Only API Key |
| `index_name` | 索引名称 |
| `site` | 站点标识（插件内部使用） |

---

## 代码高亮 `code_highlight`

通过 everkm-publish 的服务端语法高亮：

```yaml
config:
  code_highlight:
    server: true
```

`server: true` 时，代码块在构建时使用 syntect 主题高亮，作用域为 `.app-prose`。

---

## 数学渲染 `math_render`

通过 Typst 的服务端数学渲染：

```yaml
config:
  math_render:
    server: true
    font_size: 14
```

| 字段 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `math_render.server` | boolean | — | 启用服务端数学渲染 |
| `math_render.font_size` | number | `14` | 渲染数学 SVG 的基础字号 |

在 Markdown 中使用 `$...$` 表示行内公式，`$$...$$` 表示块级公式。

---

## 社交链接 `socials`

显示在首页 Banner 与页脚：

```yaml
config:
  socials:
    - name: github
      url: https://github.com/everkm/theme-story
```

支持的 `name` 包括 `github`、`twitter`、`x`、`facebook`、`linkedin`、`mail`、`telegram`、`whatsapp`、`pinterest` 等，在主题中映射为图标。未知名称显示为文本。

---

## 版权 `copyright`

控制页脚中的 **「Powered by」** 行（与自动生成的 `© 年份 站点名` 行分开）：

```yaml
config:
  copyright:
    text: Everkm
    link: https://publish.everkm.com
```

---

## 目录规则 `folders`

Story 默认主题配置将 `/` 下的内容映射到 `/posts/` URL：

```yaml
folders:
  "/":
    url_slug: posts
    url_id_suffix: false
```

| 字段 | 说明 |
|-------|-------------|
| `url_slug` | 该目录内容的 URL 前缀 |
| `url_id_suffix` | 为 `true` 时 URL 含稳定 ID 后缀，如 `/posts/my-post-123.html` |

`__everkm/everkm.yaml` 中的站点级 `folders` **覆盖**主题默认值。

---

## 虚拟页面路由

Story 提供以下虚拟页面（无需对应的公开发布 Markdown 文件）：

| URL | 页面 | 说明 |
|-----|------|-------------|
| `/index.html` | 首页 | Banner、侧边栏、分页文章列表 |
| `/index.p{N}.html` | 首页（第 N 页） | 首页分页 |
| `/posts/index.html` | 文章列表 | 分页文章索引 |
| `/tags/index.html` | 标签索引 | 全部标签 |
| `/tags/{tag}/index.html` | 标签文章 | 按标签筛选的文章 |
| `/archives/index.html` | 归档 | 按年月分组的文章 |
| `/about/` | 关于 | 来自 `config.about` 的关于页 |
| `/links/index.html` | 友链 | 来自 `config.links` 的友链 |
| `/album/index.html` | 相册 | 从公开发布的文章内容中提取的图片 |

---

## 友链 `_links.md`

友链数据存放在 `_links.md` 的 front matter 中：

```yaml
---
title: 友情链接
links:
  - category: 示例分类
    has_thumbnail: true
    list:
      - name: 合作伙伴站点
        link: https://example.com
        description: 站点描述
        avatar: /assets/images/avatar-0.jpg
        thumbnail: /assets/images/desc-image.jpg
  - category: 简单列表
    has_thumbnail: false
    list:
      - name: 另一个站点
        link: https://example.com
        description: 简短描述
        avatar: /assets/images/avatar-1.jpg
---
```

---

## 相册

相册页自动收集**公开发布文章中的图片**（Markdown `![]()` 与图片链接）。Everkm 在构建时解析图片 URL；主题以 MiniMasonry 网格展示，支持悬停标题与灯箱。

路径以 `_` 开头的文章（如 `_about.md` 等数据源）中的图片会被排除。在普通博客文章中添加图片即可填充相册。

---

## 文章 Front Matter

博客文章常用字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 文章标题 |
| `description` | string | 文章摘要，用于 meta 与卡片 |
| `cover` | string | 封面图 URL 或路径；显示在首页卡片与文章 Hero |
| `created_at` | string | 创建时间，RFC3339 格式 |
| `updated_at` | string | 更新时间，RFC3339 格式 |
| `slug` | string | URL 路径段 |
| `tags` | array | 用于筛选的标签 |
| `draft` | boolean | 为 `true` 时排除在公开列表外 |
| `copyright` | string | 文章版权块的许可键覆盖 |

示例：

```yaml
---
title: Hello World
description: 我的第一篇博客。
cover: /assets/images/cover.jpg
created_at: 2026-06-28T10:00:00Z
tags:
  - intro
copyright: cc_by
---
```

若正文中第一个 `h1` 与 Front Matter 的 `title` 一致，渲染时会自动隐藏，避免标题重复显示。

---

## 内容 Markdown 扩展

Story 继承 everkm-publish 的 Markdown 扩展。完整示例见演示文章 [[everkm-markdown]]，或 [Everkm Markdown 指南](https://publish.everkm.com/guide/everkm-markdown.html)。

支持的扩展包括：

- 内链 `[[...]]`
- 块级属性集 `{.class #id}`
- 链接与图片的行内属性集
- 宏（`macro/toc`、`macro/include`）
- 高亮 `==文字==`、上标、下标
- 定义列表、脚注、任务列表

---

## 阅读设置（浏览器端）

以下设置保存在用户浏览器本地，**不在** `everkm.yaml` 中配置：

- 浅色 / 深色模式偏好（启用 `features.light_and_dark_mode` 时）
- 字号级别（启用 `story.global.scroll_tools.enable` 时）

通过顶栏太阳 / 月亮按钮切换配色模式；通过滚动工具面板的 +/- 按钮调节字号。

---

## 主题元数据

| 项目 | 值 |
|----|-----|
| 主题名称 | `story` |
| 默认模板 | `post` |
| 演示站 | https://story.theme.everkm.com/ |
| 仓库 | https://github.com/everkm/theme-story |
