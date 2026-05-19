#!/bin/sh
case "$0" in
  */*) SCRIPT="$0" ;;
  *) SCRIPT="$(command -v "$0")" ;;
esac

BASE="$(
  cd -P "$(dirname "$SCRIPT")/.." || exit 1
  pwd
)"

# Check if 'serenebach' command exists
if ! command -v serenebach >/dev/null 2>&1; then
  echo "Error: 'serenebach' command not found. Please install serenebach or check your PATH." >&2
  exit 1
fi

# Note: _sandbox is intentionally gitignored; using local data source to build news pages.
export SB_IMAGE_DIR="$BASE/_sandbox/data/img"
export SB_TEMPLATE_DIR="$BASE/_sandbox/data/templates"
export SB_DB="$BASE/_sandbox/data/data.db"

export SB_REBUILD_OUT="$BASE/public/news"
export MD_SOURCE_PATH="$BASE/content"

serenebach import --source=md $MD_SOURCE_PATH
serenebach build --out="$SB_REBUILD_OUT"
if [ "$1" = "publish" ]; then
  git add "$MD_SOURCE_PATH"
  git add "$SB_REBUILD_OUT"
  git commit -m "feat(news): update news $(date +%Y-%m-%d)"
  git push
fi
