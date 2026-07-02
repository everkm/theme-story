---
title: Everkm Markdown Format
created_at: 2023-11-03T11:03:00+08:00
updated_at: 2026-06-20T15:43:40+08:00
slug: everkm-markdown
tags:
  - featured
---



Everkm builds on standard Markdown and GitHub Markdown by adding several commonly used features to expand the range of Markdown use cases.


# Standard Markdown Syntax

Reference: <https://daringfireball.net/projects/markdown/syntax>

## Headings

{.NOTE}
During preview and publishing, if the first `h1` in the body **matches** the page title (Front Matter `title` or equivalent field) **textually**, the h1 is automatically hidden to avoid the title appearing twice on the page.

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

## Paragraphs

Paragraphs are separated by pressing Enter twice. A single line break only separates text and has no visual effect on the front end. Two consecutive line breaks form a paragraph.
Entering two spaces before a single line break results in a line break within the paragraph, also known as a soft break. See this line for the actual effect.

## Lists

Lists are divided into unordered and ordered lists. Unordered lists use `* ` or `- `, both followed by a space.
Ordered lists use numerical indices or `1. `, also followed by a space. The front end will automatically renumber them sequentially.
Multi-level list indentation is achieved by adding two or four extra spaces before each level.

```markdown
* Unordered item 1
* Unordered item 2
* Unordered item 3

- Unordered item style 2
- Unordered item style 2
- Unordered item style 2

1. Ordered item 1
1. Ordered item 2
1. Ordered item 3
1. Sequential numbering or all 1s
    Final rendering will auto-correct the numbering.
    If indented above, it will be grouped under the previous list item.


- 1 Multi-level list
    - 1.1 Multi-level list
    - 1.2 Multi-level list
- 2 Multi-level list
- 3 Multi-level list
```


## Emphasis

```markdown
Emphasis, also called italic, uses *asterisks* or _underscores_.

Strong emphasis, also called bold, uses **double asterisks** or __double underscores__.

Combined emphasis, also called bold italic, uses **asterisks and _underscores_** or ***combined emphasis***
```

`-` and `*` produce the same effect.


## Links

```markdown
[Inline link](https://note.everkm.cn)

[Inline link with title](https://note.everkm.cn "Everkm Notes")

[Reference link][arbitrary case-insensitive reference text]

Or leave it empty [link text itself]

Reference link addresses can be placed afterward.

[link text itself]: https://note.everkm.cn
[arbitrary case-insensitive reference text]: https://note.everkm.cn
```


## Images

```markdown
1. Inline
![alt text](https://example.com/logo.png "Picture Title")

2. Reference
![alt text][picture]

Reference content goes after

[picture]: https://example.com/logo.png "Picture Title"
```


## Code

<pre><code class="language-markdown">
Inline code wrapped with a single backtick

`inline code`


Code blocks wrapped with triple backticks ```

```javascript
console.log('code block + syntax highlighting')
```

```
Language not specified, so no syntax highlighting.
Let's try a random tag <b>tag</b>
```
</code></pre>


## Horizontal Rule

Three or more `-`

```markdown
---
```


## Blockquotes

```markdown
> Quoted content
> You can use other Markdown formats within blockquotes
> > Nested quoted content
```


# GitHub Markdown Extensions

From: <https://github.github.com/gfm/>

## Strikethrough

```markdown
~~strikethrough~~
```

## Task Lists

```markdown
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```

## Automatic Link Conversion

```markdown
<https://www.everkm.cn>
```

## Footnotes

Sometimes it's useful to include a visible, non-hyperlink footnote for the reader.
Use `[^number|letter-underscore-hyphen combination]` syntax. After the character, you can use a number or a combination of letters, underscores, and hyphens. The system will automatically renumber them sequentially during rendering.

```markdown
Text prior to footnote reference.[^2]
[^2]: Comment to include in footnote.
```

## Tables

```markdown
Colons can be used to align columns (optional).

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


The outer pipe (|) is optional and doesn't need to be aligned. You can also embed other Markdown within tables.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```


## Definition Lists

```markdown
Apple

:   Pomaceous fruit of plants of the genus Malus in
    the family Rosaceae.

Orange

:   The fruit of an evergreen tree of the genus Citrus.
```



# Everkm Markdown Extensions


{id=everkm-macro}
## Macros

> **v0.17.0 change**: The legacy brace macro syntax `{{everkm::toc(...)}}` and `{{everkm::include(...)}}` is deprecated. Please use the fenced block syntax below.

### TOC (Table of Content)

Automatically generates a table of contents (TOC) for the current page. See the effect at the top of this page.

<pre class=language-markdown"><code class=language-markdown>[TOC]

```macro/toc```

```macro/toc
level: 1
```
</code></pre>

**Parameters**:

* `level` Optional. The heading level to search, default `level=3`



### Include External Files

Includes the content of the specified file during rendering. Only common {ul}#**plain text**# files are allowed, with common extensions such as md, txt, csv, js, and other program source files.

**Parameters**:

* `source` Absolute path (relative to project root) or relative path of the file.
* `as` Optional. Output format. When omitted, inferred from the file extension. Valid values:
    1. `plain`, outputs as-is during rendering
    1. `table`, attempts to parse as a table
    1. `code`, code block
    1. `md` or `markdown`, parsed as Markdown format
* `code_lang` Optional. Programming language, only effective when `as=code`.
* `table_header` Optional. Whether the first row is a header, only effective when `as=table`.
* `table_merge` Optional. Whether to automatically merge cells. Cells with the same content are merged, merging column-first then row. Only effective when `as=table`.
* `csv_delimiter` Optional. Specifies the CSV delimiter, default `,`.

**Embedding external Markdown files:**

````markdown
```macro/include
source: _include_test.inc.md
as: md
```
````

**Including external tables:**

Cells whose content is `*` are automatically merged and receive extended attributes.

````markdown
```macro/include
source: demo.csv
as: table
table_header: true
table_merge: "*"
```
````

**Including external code:**

````markdown
```macro/include
source: _xx.js
as: code
code_lang: js
```
````

{id=inner-link}
## Internal Project Links

For complete documentation on intra-site page navigation, see [Links and Inner Links](https://publish.everkm.com/guide/inner-link.html). Below is a quick syntax reference. Non-Markdown media (such as PDFs) can also be referenced via inner links and are automatically copied to the static assets directory during export.

```markdown
[[filename]]

[[directory/filename]]

[[./faq/]]          # Explicit directory path, avoids ambiguity
[[/section/doc]]   # Match from site root directory
```

### Matching Rules

- Matching by **title** or **slug** is **case-insensitive** (e.g., `[[faq]]` can match the title "FAQ").
- If a slug or title corresponds to **multiple** documents, preview and export will **immediately report an error** and list candidates, instead of silently using the first match.
- If a title may be duplicated across different directories, it's recommended to use an explicit path, such as `[[./faq/]]` or `[[/section/doc/file]]`.
- Paths ending with `/` are resolved as **directory default pages** (e.g., `index.md`, `slug=index`, etc.).

When the topic (the text within double brackets is a title) has only one title, the system searches the entire content directory. If a filename matches (ignoring the `.md` extension), the match succeeds. Directory recognition follows these rules:

1. Starting with `/` means strict matching from the project root directory.
2. Starting with `./` (current file directory) or `../` (parent directory of the current file) means relative positioning based on the current file.
3. Anything else is matched as a filename suffix against all files in the project.

### Pre-publish Inner Link Check

```bash
everkm-publish lint ./my-site
```

Lists unresolvable or ambiguous `[[...]]` links by line number, suitable for CI and pre-publish self-checks. You can add `--auto-fix` to fix Front Matter and other auto-fixable items.

{.NOTE}
Navigation functions `nav_indicator`, `nav_path`, and `nav_tree` use the same resolution rules as body inner links when their `from_file` parameter is wrapped in `[[...]]`.


{id=page-anchor}
## In-page Anchors

Used for jumping between different headings within a page.

Headings automatically generate anchors. You can define an ID via `id=identity`. By default, the heading content is slugified[^slugify] as the anchor name. You can use `#id` in links for in-page anchor navigation.


{id=attr-set}
## Block Extended Attributes

Placed on a separate line immediately before a block, wrapped in curly braces. For example:

```markdown
{color=red tc}
# Red Heading
```

**Attribute sets** support the following attributes:

1. `#tag` Adds a tag label, supports Chinese
1. `.class` Adds a CSS class name attribute
1. `tl`, `tc`, `tr` Left-aligned, center-aligned, right-aligned respectively
1. `ul` or `underline` Adds underline
1. `color=red` Adds text color
1. `bgcolor=red` Adds background color
1. `font=Arial` Font
1. `pa=1em`, `px=1em`, `py=1em` All-side padding, horizontal padding, vertical padding respectively
1. `corner=0.5em` All-side border radius, `em` is the current font size
1. `key=value` Sets other custom attributes

{.note}
Note: If the value contains spaces or commas, it must be wrapped in double quotes.


### Heading Extended Attributes

```markdown
{id=main-header}
# Main Heading
```

### Paragraph Extended Attributes

```markdown
{bgcolor="rgba(0,0,0,0.1)" color=blue underline pa=1em corner=0.5em}
This is a sample block with extended attributes.
```

{bgcolor="rgba(0,0,0,0.1)" color=blue underline pa=1em corner=0.5em}
This is a sample block with extended attributes.


### Table Extended Attributes

```markdown
{align=center .my-table}
| Default   | Left | Center | Right |
| ---       | :---  | :---: | ---:  |
| Content   | Content | Content | Content |
| Content   | Content | Content | Content |
```

{align=center .my-table}
| Default   | Left | Center | Right |
| ---       | :---  | :---: | ---:  |
| Content   | Content | Content | Content |
| Content   | Content | Content | Content |



{.main #the-site lang=zh}
## Inline Extended Attributes


### Wrapped Region Extended Attributes

Add attributes to `#`-wrapped regions, with the [attribute set](https://publish.everkm.com/guide/everkm-markdown.html#attr-set) first. Format:

```markdown
I am {color=red}#quite a long# paragraph.
```

I am {color=red}#quite a long# paragraph.


### Links

```markdown
hello <https://www.everkm.cn>{target=_blank color=red} world

A link with extended attributes to [Everkm](https://www.everkm.cn){color=orangered}.
```

hello <https://www.everkm.cn>{target=_blank color=red} world

A link with extended attributes to [Everkm](https://www.everkm.cn){color=orangered}.



### Images

```markdown
![Air](https://images.unsplash.com/photo-1564979045531-fa386a275b27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80 "Blue sky and foxtail grass"){corner=1em}
```

**Preview**:

![Air](https://images.unsplash.com/photo-1564979045531-fa386a275b27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80 "Blue sky and foxtail grass"){corner=1em}

---


## Underline

```markdown
{ul}#underline#
```

{ul}#underline#

## Superscript

```markdown
E=MC^2^
```

E=MC^2^

## Subscript

```markdown
H~2~O
```

H~2~O


## Highlight

```markdown
I need to highlight these ==very important words==.
```

I need to highlight these ==very important words==.

**HTML Output**

```html
I need to highlight these <mark>very important words</mark>.
```


## Special Character Replacement

```markdown
| => &#124;
> => &gt;
< => &lt;
(C) copyright
(TM) trademark
(R) registered trademark
-- em dash
... ellipsis
-> right arrow
<- left arrow
=> right double arrow
<= left double arrow
```

## Common Symbols

1. [HTML Special Characters](https://chaooo.github.io/unicode_css3_content/)
2. [Emoji Symbols](https://gist.github.com/rxaviers/7360908)

```markdown
Emoji symbols

:+1:
```

:+1: :point_right: Find emoji [here](https://github-emoji-picker.rickstaa.dev/) :smile: :muscle:.


# Definitions

Attribute Set

:   A collection of attributes wrapped in curly braces, with multiple attributes separated by spaces or commas.



[^markdown-syntax]: <https://daringfireball.net/projects/markdown/syntax>

[^gfm]: <https://github.github.com/gfm/>

[^slugify]: Converts text into valid link characters. Alphanumeric characters remain unchanged, spaces are replaced with `-`, and each Chinese character is converted to pinyin and joined with `-`. ==Note:exclamation:==: there is no hyphen `-` at the junction between letters and Chinese characters; if needed, add a space in between.
