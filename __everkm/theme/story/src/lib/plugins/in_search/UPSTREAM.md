# plugin-in-search 上游说明

> 完整同步规范见：[`stuff/km/260702-Plan-plugin-in-search同步规范.md`](../../../stuff/km/260702-Plan-plugin-in-search同步规范.md)

## 上游

**官方仓库**：[github.com/everkm/theme-youlog](https://github.com/everkm/theme-youlog)

```text
__everkm/theme/youlog/src/youlog_lib/
```

插件目录：[plugins/in_search](https://github.com/everkm/theme-youlog/tree/master/__everkm/theme/youlog/src/youlog_lib/plugins/in_search)

## 获取上游

```bash
# 与 theme-paper 同级 clone（脚本默认路径）
git clone https://github.com/everkm/theme-youlog.git ../theme-youlog

# 或指定 release tag
git clone --depth 1 --branch v0.5.9 https://github.com/everkm/theme-youlog.git /tmp/theme-youlog
export YOULOG_THEME=/tmp/theme-youlog/__everkm/theme/youlog
```

## 同步命令

```bash
cd __everkm/theme/paper
./scripts/sync-plugin-in-search-from-youlog.sh
```

## 三层速查

| 层 | 本目录/依赖 | 操作 |
|----|-------------|------|
| **A 可直接覆盖** | `index.ts` `i18n.ts` `AlgoliaIcon.tsx`；`../widgets/keymap` `infinite-loader`；`../directives`；`../core/i18n.ts` | 脚本自动同步 |
| **B fork 定制** | `InSearch.tsx` `FloatSearch.tsx` `FloatSearch.css` | 禁止盲目覆盖；合并后保留 paper 定制（见规范 §4） |
| **C 不同步** | `Header.tsx` `index.tsx` `viewTransitions.ts` `configValue.ts` `build.js` | paper 集成层 |

## paper 关键定制（Layer B）

- `InSearch.tsx`：`PAPER_PAGE_SWAP`、paper 图标与 pill 样式
- `FloatSearch.tsx`：内联 SVG（无 iconify）
- `FloatSearch.css`：Tailwind v4 `@import` + paper design tokens

## 未复制

- `morphProtection.ts` — paper 用 View Transitions 保留 `#header-in-search`
