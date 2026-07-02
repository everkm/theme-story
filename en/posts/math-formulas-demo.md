---
title: "Math Formulas Demo"
description: Server-side math rendering with Typst.
created_at: 2026-06-21T10:30:00Z
tags:
  - demo
  - math
---

When `math_render.server` is enabled, inline and block math are rendered as SVG.

## Inline math

The famous equation $E = mc^2$ appears inline with text.

## Block math

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

## Matrix notation

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
