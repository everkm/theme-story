---
title: "数学公式演示"
description: 使用 Typst 的服务端数学渲染。
created_at: 2026-06-21T10:30:00Z
tags:
  - demo
  - math
---

启用 `math_render.server` 后，行内与块级公式将渲染为 SVG。

## 行内公式

著名方程 $E = mc^2$ 可与正文同行显示。

## 块级公式

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

## 矩阵表示

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\ y
\end{bmatrix}
=
\begin{bmatrix}
ax + by \\ cx + dy
\end{bmatrix}
$$
