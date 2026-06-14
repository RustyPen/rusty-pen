# 使用 tag 触发
# on:
#   push:
#     tags:
#       - 'app-v*'

#!/bin/bash

set -e  # 遇到错误立即退出

echo "=== Rusty Pen 发布脚本 ==="

# 检查是否在项目根目录
if [ ! -f "src-tauri/tauri.conf.json" ]; then
  echo "❌ 错误：未在项目根目录运行（未找到 src-tauri/tauri.conf.json）"
  exit 1
fi

# 输入版本号
read -p "请输入要发布的版本号 (例如 0.1.0): " VERSION

if [[ ! $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "❌ 版本号格式错误！请使用 semver 格式（如 0.1.0）"
  exit 1
fi

echo "🚀 准备发布版本: $VERSION"

# 更新 tauri.conf.json 中的版本号
jq --arg version "$VERSION" '.version = $version' package.json > tmp.json && mv tmp.json package.json
jq --arg version "$VERSION" '.version = $version' src-tauri/tauri.conf.json > tmp.json && mv tmp.json src-tauri/tauri.conf.json

echo "✅ package.json 版本已更新为 $VERSION"
echo "✅ tauri.conf.json 版本已更新为 $VERSION"

# Git 操作
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
  echo "⚠️  当前不在 main/master 分支，当前分支: $CURRENT_BRANCH"
  read -p "是否继续？(y/n): " confirm
  if [[ ! $confirm =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# 提交更改
git add package.json src-tauri/tauri.conf.json
git commit -m "chore: bump version to $VERSION"

# 推送到 main
git push origin main

# 打 tag 并推送（这一步触发 GitHub Actions 构建）
git tag "app-v$VERSION"
git push origin "app-v$VERSION"

echo ""
echo "🎉 发布命令已执行完成！"
echo ""
echo "下一步操作："
echo "1. 打开 GitHub Actions 页面查看构建进度："
echo "   https://github.com/RustyPen/rusty-pen/actions"
echo "2. 构建完成后，前往 Releases 页面："
echo "   https://github.com/RustyPen/rusty-pen/releases"
echo "3. 找到 Draft Release 'Rusty Pen v$VERSION'，编辑 Release Notes 后点击 Publish release"
echo ""
echo "✅ 脚本执行完毕！"
