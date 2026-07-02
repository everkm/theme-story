#!/usr/bin/env bash
# Sync plugin-in-search Layer A files from theme-youlog to theme-paper.
# Upstream: https://github.com/everkm/theme-youlog
# See: stuff/km/260702-Plan-plugin-in-search同步规范.md

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PAPER_THEME="$(cd "${SCRIPT_DIR}/.." && pwd)"
YOULOG_THEME="${YOULOG_THEME:-$(cd "${PAPER_THEME}/../../../../theme-youlog/__everkm/theme/youlog" 2>/dev/null && pwd || true)}"
INCLUDE_FORK=0

usage() {
  cat <<'EOF'
Usage: sync-plugin-in-search-from-youlog.sh [OPTIONS]

Sync Layer A (safe) files from theme-youlog plugin-in-search to theme-paper.

Upstream repository: https://github.com/everkm/theme-youlog
Plugin path in repo:     __everkm/theme/youlog/src/youlog_lib/plugins/in_search

Options:
  --include-fork   Also overwrite Layer B fork files (InSearch, FloatSearch).
                   You MUST re-apply paper customizations from km doc §4.
  -h, --help       Show this help.

Environment:
  YOULOG_THEME     Path to youlog theme root (__everkm/theme/youlog).
                   Default: ../../../../theme-youlog/__everkm/theme/youlog
                   Clone: git clone https://github.com/everkm/theme-youlog.git

Examples:
  git clone https://github.com/everkm/theme-youlog.git ../../../../theme-youlog
  ./scripts/sync-plugin-in-search-from-youlog.sh
  YOULOG_THEME=/tmp/theme-youlog/__everkm/theme/youlog ./scripts/sync-plugin-in-search-from-youlog.sh
  ./scripts/sync-plugin-in-search-from-youlog.sh --include-fork
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --include-fork) INCLUDE_FORK=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

if [[ -z "${YOULOG_THEME}" || ! -d "${YOULOG_THEME}/src/youlog_lib" ]]; then
  echo "error: youlog theme not found at: ${YOULOG_THEME:-<unset>}" >&2
  echo "Clone upstream: git clone https://github.com/everkm/theme-youlog.git" >&2
  echo "Then set: export YOULOG_THEME=/path/to/theme-youlog/__everkm/theme/youlog" >&2
  exit 1
fi

YOULOG_LIB="${YOULOG_THEME}/src/youlog_lib"
PAPER_LIB="${PAPER_THEME}/src/lib"

echo "Upstream:  ${YOULOG_LIB}"
echo "Target:    ${PAPER_LIB}"
echo ""

rsync_layer_a() {
  local src="$1"
  local dst="$2"
  local label="$3"
  if [[ ! -d "${src}" ]]; then
    echo "skip (missing): ${label}"
    return
  fi
  mkdir -p "${dst}"
  rsync -av --delete "${src}/" "${dst}/"
  echo "synced: ${label}"
}

# Layer A — plugin (exclude fork files)
mkdir -p "${PAPER_LIB}/plugins/in_search"
rsync -av \
  --exclude='InSearch.tsx' \
  --exclude='FloatSearch.tsx' \
  --exclude='FloatSearch.css' \
  --exclude='morphProtection.ts' \
  "${YOULOG_LIB}/plugins/in_search/" \
  "${PAPER_LIB}/plugins/in_search/"
echo "synced: plugins/in_search (Layer A only)"

rsync_layer_a "${YOULOG_LIB}/widgets/keymap" "${PAPER_LIB}/widgets/keymap" "widgets/keymap"
rsync_layer_a "${YOULOG_LIB}/widgets/infinite-loader" "${PAPER_LIB}/widgets/infinite-loader" "widgets/infinite-loader"
rsync_layer_a "${YOULOG_LIB}/directives" "${PAPER_LIB}/directives" "directives"
mkdir -p "${PAPER_LIB}/core"
rsync -av "${YOULOG_LIB}/core/i18n.ts" "${PAPER_LIB}/core/i18n.ts"
echo "synced: core/i18n.ts"

if [[ "${INCLUDE_FORK}" -eq 1 ]]; then
  echo ""
  echo "WARNING: overwriting Layer B fork files..."
  rsync -av \
    "${YOULOG_LIB}/plugins/in_search/InSearch.tsx" \
    "${YOULOG_LIB}/plugins/in_search/FloatSearch.tsx" \
    "${YOULOG_LIB}/plugins/in_search/FloatSearch.css" \
    "${PAPER_LIB}/plugins/in_search/"
  echo "synced: InSearch.tsx FloatSearch.tsx FloatSearch.css"
  echo ""
  echo ">>> Re-apply paper customizations: stuff/km/260702-Plan-plugin-in-search同步规范.md §4"
else
  echo ""
  echo "Layer B (manual merge required if upstream changed):"
  for f in InSearch.tsx FloatSearch.tsx FloatSearch.css; do
    if diff -q "${YOULOG_LIB}/plugins/in_search/${f}" "${PAPER_LIB}/plugins/in_search/${f}" >/dev/null 2>&1; then
      echo "  OK  ${f}"
    else
      echo "  DIFF ${f}"
    fi
  done
  echo ""
  echo "Run with --diff:"
  echo "  diff -ru ${YOULOG_LIB}/plugins/in_search/InSearch.tsx ${PAPER_LIB}/plugins/in_search/InSearch.tsx"
fi

echo ""
echo "Next: pnpm install && pnpm run build:jsrender"
echo "Verify: stuff/km/260702-Plan-plugin-in-search同步规范.md §7.4"
