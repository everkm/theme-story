---
title: Everkm Markdown 格式
created_at: 2023-11-03T11:03:00+08:00
updated_at: 2026-07-04T14:00:29+08:00
slug: everkm-markdown
tags:
  - featured
---

Everkm 在标准 Markdown 与 GitHub Markdown 基础上，增加了若干常用功能，扩展 Markdown 的使用场景。


# 标准 Markdown 语法

参考：<https://daringfireball.net/projects/markdown/syntax>

## 标题

{.NOTE}
预览与发布时，若正文中第一个 `h1` 与页面标题（Front Matter `title` 或等价字段）**文字一致**，该 h1 会自动隐藏，避免页面上标题重复出现。

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 段落

段落之间需按两次 Enter 分隔。单次换行仅分隔文字，前端无视觉效果。两次连续换行形成一个段落。
在单次换行前输入两个空格，可在段落内换行，即软换行。见本行实际效果。

## 列表

列表分为无序列表与有序列表。无序列表使用 `* ` 或 `- `，后接空格。
有序列表使用数字序号或 `1. `，后接空格。前端会自动按顺序重新编号。
多级列表通过每级前增加两个或四个空格实现缩进。

```markdown
* 无序项 1
* 无序项 2
* 无序项 3

- 无序样式 2
- 无序样式 2
- 无序样式 2

1. 有序项 1
1. 有序项 2
1. 有序项 3
1. 连续编号或全写 1
    最终渲染会自动修正编号。
    若上方有缩进，会归入上一列表项下。


- 1 多级列表
    - 1.1 多级列表
    - 1.2 多级列表
- 2 多级列表
- 3 多级列表
```


## 强调

```markdown
强调，也称斜体，使用 *星号* 或 _下划线_。

加强强调，也称粗体，使用 **双星号** 或 __双下划线__。

组合强调，也称粗斜体，使用 **星号与 _下划线_** 或 ***组合强调***
```

`-` 与 `*` 效果相同。


## 链接

```markdown
[行内链接](https://note.everkm.cn)

[带标题的行内链接](https://note.everkm.cn "Everkm 笔记")

[引用链接][任意大小写不敏感的引用文本]

或留空 [链接文字本身]

引用链接地址可放在后面。

[链接文字本身]: https://note.everkm.cn
[任意大小写不敏感的引用文本]: https://note.everkm.cn
```


## 图片

```markdown
1. 行内
![替代文字](https://example.com/logo.png "图片标题")

2. 引用
![替代文字][picture]

引用内容放在后面

[picture]: https://example.com/logo.png "图片标题"
```


## 代码

<pre><code class="language-markdown">
行内代码用单个反引号包裹

`行内代码`


代码块用三个反引号包裹 ```

```javascript
console.log('代码块 + 语法高亮')
```

```
未指定语言，无语法高亮。
试试随机标签 <b>tag</b>
```
</code></pre>


## 分隔线

三个或以上的 `-`

```markdown
---
```


## 引用块

```markdown
> 引用内容
> 引用块内可使用其他 Markdown 格式
> > 嵌套引用内容
```


# GitHub Markdown 扩展

来源：<https://github.github.com/gfm/>

## 删除线

```markdown
~~删除线~~
```

## 任务列表

```markdown
- [x] 撰写新闻稿
- [ ] 更新网站
- [ ] 联系媒体
```

## 自动链接转换

```markdown
<https://www.everkm.cn>
```

## 脚注

有时需要为读者提供可见、非超链接的脚注。
使用 `[^数字|字母-下划线-连字符组合]` 语法。字符后可用数字或字母、下划线、连字符的组合。渲染时会自动按顺序重新编号。

```markdown
脚注引用前的文字。[^2]
[^2]: 脚注中要包含的注释。
```

## 表格

```markdown
可用冒号对齐列（可选）。

| 表格        | 很           | 酷  |
| ------------- |:-------------:| -----:|
| 第 3 列      | 右对齐 | $1600 |
| 第 2 列      | 居中      |   $12 |
| 斑马纹 | 很整洁      |    $1 |


外侧竖线（|）可选，无需对齐。表格内也可嵌入其他 Markdown。

Markdown | Less | Pretty
--- | --- | ---
*仍然* | `可以` | **漂亮地**
1 | 2 | 3
```


## 定义列表

```markdown
Apple

:   蔷薇科苹果属植物的梨果。

Orange

:   柑橘属常绿乔木的果实。
```



# Everkm Markdown 扩展


{id=everkm-macro}
## 宏

> **v0.17.0 变更**：旧的花括号宏语法 `{{everkm::toc(...)}}` 与 `{{everkm::include(...)}}` 已弃用，请使用下方围栏块语法。

### TOC（目录）

自动为当前页面生成目录（TOC）。效果见本页顶部。

<pre class=language-markdown"><code class=language-markdown>[TOC]

```macro/toc```

```macro/toc
level: 1
```
</code></pre>

**参数**：

* `level` 可选。要检索的标题层级，默认 `level=3`



### 包含外部文件

渲染时包含指定文件内容。仅允许常见 {ul}#**纯文本**# 文件，扩展名如 md、txt、csv、js 及其他程序源文件。

**参数**：

* `source` 绝对路径（相对项目根）或文件相对路径。
* `as` 可选。输出格式。省略时按文件扩展名推断。有效值：
    1. `plain`，渲染时原样输出
    1. `table`，尝试解析为表格
    1. `code`，代码块
    1. `md` 或 `markdown`，按 Markdown 解析
* `code_lang` 可选。编程语言，仅 `as=code` 时有效。
* `table_header` 可选。首行是否为表头，仅 `as=table` 时有效。
* `table_merge` 可选。是否自动合并单元格。相同内容合并，先列后行。仅 `as=table` 时有效。
* `csv_delimiter` 可选。CSV 分隔符，默认 `,`。

**嵌入外部 Markdown 文件：**

````markdown
```macro/include
source: _include_test.inc.md
as: md
```
````

**包含外部表格：**

内容为 `*` 的单元格会自动合并并附加扩展属性。

````markdown
```macro/include
source: demo.csv
as: table
table_header: true
table_merge: "*"
```
````

**包含外部代码：**

````markdown
```macro/include
source: _xx.js
as: code
code_lang: js
```
````

{id=inner-link}
## 站内项目链接

站内页面导航的完整文档见 [链接与内链](https://publish.everkm.com/guide/inner-link.html)。以下为语法速查。非 Markdown 媒体（如 PDF）也可通过内链引用，导出时会自动复制到静态资源目录。

```markdown
[[filename]]

[[directory/filename]]

[[./faq/]]          # 显式目录路径，避免歧义
[[/section/doc]]   # 从站点根目录匹配
```

### 匹配规则

- 按 **title** 或 **slug** 匹配时**不区分大小写**（如 `[[faq]]` 可匹配标题「FAQ」）。
- 若 slug 或 title 对应**多篇**文档，预览与导出会**立即报错**并列出候选，而非静默使用第一个匹配。
- 若标题可能在不同目录重复，建议使用显式路径，如 `[[./faq/]]` 或 `[[/section/doc/file]]`。
- 以 `/` 结尾的路径解析为**目录默认页**（如 `index.md`、`slug=index` 等）。

当主题（双括号内为标题）仅有一个标题时，系统搜索整个内容目录。若文件名匹配（忽略 `.md` 扩展名）则匹配成功。目录识别规则：

1. 以 `/` 开头表示从项目根目录严格匹配。
2. 以 `./`（当前文件目录）或 `../`（当前文件父目录）开头表示相对当前文件定位。
3. 其他情况作为文件名后缀与项目中所有文件匹配。

### 发布前内链检查

```bash
everkm-publish lint ./my-site
```

按行号列出无法解析或存在歧义的 `[[...]]` 链接，适合 CI 与发布前自检。可加 `--auto-fix` 修复 Front Matter 等可自动修复项。

{.NOTE}
导航函数 `nav_indicator`、`nav_path`、`nav_tree` 的 `from_file` 参数使用 `[[...]]` 包裹时，与正文内链采用相同解析规则。


{id=page-anchor}
## 页内锚点

用于在同一页面不同标题间跳转。

标题会自动生成锚点。可通过 `id=标识` 定义 ID。默认将标题内容 slugify[^slugify] 作为锚点名。链接中可用 `#id` 进行页内锚点导航。


{id=attr-set}
## 块级扩展属性

放在块正上方单独一行，用大括号包裹。例如：

```markdown
{color=red tc}
# 红色标题
```

**属性集**支持以下属性：

1. `#tag` 添加标签，支持中文
1. `.class` 添加 CSS 类名
1. `tl`、`tc`、`tr` 分别左对齐、居中、右对齐
1. `ul` 或 `underline` 添加下划线
1. `color=red` 文字颜色
1. `bgcolor=red` 背景颜色
1. `font=Arial` 字体
1. `pa=1em`、`px=1em`、`py=1em` 分别四边内边距、水平内边距、垂直内边距
1. `corner=0.5em` 四边圆角，`em` 为当前字号
1. `key=value` 设置其他自定义属性

{.note}
注意：若值含空格或逗号，须用双引号包裹。


### 标题扩展属性

```markdown
{id=main-header}
# 主标题
```

### 段落扩展属性

```markdown
{bgcolor="rgba(0,0,0,0.1)" color=blue underline pa=1em corner=0.5em}
这是一段带扩展属性的示例块。
```

{bgcolor="rgba(0,0,0,0.1)" color=blue underline pa=1em corner=0.5em}
这是一段带扩展属性的示例块。


### 表格扩展属性

```markdown
{align=center .my-table}
| 默认   | 左 | 中 | 右 |
| ---       | :---  | :---: | ---:  |
| 内容   | 内容 | 内容 | 内容 |
| 内容   | 内容 | 内容 | 内容 |
```

{align=center .my-table}
| 默认   | 左 | 中 | 右 |
| ---       | :---  | :---: | ---:  |
| 内容   | 内容 | 内容 | 内容 |
| 内容   | 内容 | 内容 | 内容 |



{.main #the-site lang=zh}
## 行内扩展属性


### 包裹区域扩展属性

为 `#` 包裹的区域添加属性，[属性集](https://publish.everkm.com/guide/everkm-markdown.html#attr-set) 在前。格式：

```markdown
我是{color=red}#一段较长的#段落。
```

我是{color=red}#一段较长的#段落。


### 链接

```markdown
你好 <https://www.everkm.cn>{target=_blank color=red} 世界

带扩展属性的链接 [Everkm](https://www.everkm.cn){color=orangered}。
```

你好 <https://www.everkm.cn>{target=_blank color=red} 世界

带扩展属性的链接 [Everkm](https://www.everkm.cn){color=orangered}。



### 图片

```markdown
![天空](https://images.unsplash.com/photo-1564979045531-fa386a275b27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80 "蓝天与狗尾草"){corner=1em}
```

**预览**：

![天空](https://images.unsplash.com/photo-1564979045531-fa386a275b27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80 "蓝天与狗尾草"){corner=1em}

---


## 下划线

```markdown
{ul}#下划线#
```

{ul}#下划线#

## 上标

```markdown
E=MC^2^
```

E=MC^2^

## 下标

```markdown
H~2~O
```

H~2~O


## 高亮

```markdown
我需要高亮这些 ==非常重要的文字==。
```

我需要高亮这些 ==非常重要的文字==。

**HTML 输出**

```html
我需要高亮这些 <mark>非常重要的文字</mark>。
```


## 特殊字符替换

```markdown
| => &#124;
> => &gt;
< => &lt;
(C) 版权
(TM) 商标
(R) 注册商标
-- 长破折号
... 省略号
-> 右箭头
<- 左箭头
=> 右双箭头
<= 左双箭头
```

## 常用符号

1. [HTML 特殊字符](https://chaooo.github.io/unicode_css3_content/)
2. [Emoji 符号](https://gist.github.com/rxaviers/7360908)

```markdown
Emoji 符号

:+1:
```

:+1: :point_right: 在此查找 emoji [链接](https://github-emoji-picker.rickstaa.dev/) :smile: :muscle:。


# 定义

属性集

:   用大括号包裹的属性集合，多个属性以空格或逗号分隔。



[^markdown-syntax]: <https://daringfireball.net/projects/markdown/syntax>

[^gfm]: <https://github.github.com/gfm/>

[^slugify]: 将文本转换为有效链接字符。字母数字保持不变，空格替换为 `-`，每个汉字转为拼音并用 `-` 连接。==注意:exclamation:==：字母与汉字交界处没有连字符 `-`；若需要，可在中间加空格。
