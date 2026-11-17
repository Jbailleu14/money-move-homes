#!/usr/bin/env bash
# Publishes the preview to GitHub Pages: https://jbailleu14.github.io/money-move-homes/
set -euo pipefail
cd "$(dirname "$0")"
REPO=Jbailleu14/money-move-homes
BASE_PATH=/money-move-homes SITE_URL=https://jbailleu14.github.io/money-move-homes node build.mjs
gh repo view "$REPO" >/dev/null 2>&1 || gh repo create "$REPO" --public --description "Money Move Homes preview site" --source . --push
rm -rf /tmp/mmh-pages && cp -r dist /tmp/mmh-pages && cd /tmp/mmh-pages
git init -q -b gh-pages && git add -A
git -c user.name=Jbailleu14 -c user.email=info@dfwledlite.com commit -qm "Publish preview"
git push -qf "https://github.com/$REPO.git" gh-pages
gh api -X POST "repos/$REPO/pages" -f "source[branch]=gh-pages" -f "source[path]=/" >/dev/null 2>&1 || true
echo
echo "Published. Live in ~1-2 minutes at: https://jbailleu14.github.io/money-move-homes/"
