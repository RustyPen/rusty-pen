## 可用的命令
- npm run tauri:dev - 启动开发模式
- npm run tauri:build - 构建生产版本的桌面应用
- npm run dev - 仅启动 Web 开发服务器
- npm run build - 仅构建 Web 版本

## 应用图标

> https://v2.tauri.org.cn/develop/icons/

1. 准备一张 512x512 或 1024x1024 的透明 PNG 图片，命名为 app-icon.png，放在项目根目录
2. 执行命令，自动生成所有平台所需的图标（会覆盖 src-tauri/icons 文件夹）

```bash
npm run tauri icon app-icon.png

# 如果图标未更新
cd src-tauri
cargo clean
```

## 添加 Tauri v2 签名配置（Updater + 平台签名）

### 第一步：生成 Updater 签名密钥（最重要，必做）

在项目根目录运行以下命令：

```bash
npx tauri signer generate -w ~/.tauri/rusty-pen.key
```

- 会提示你输入密码（推荐设置一个强密码）。
- 生成后会得到两个文件：
  - `~/.tauri/rusty-pen.key` → **私钥**（保密）
  - `~/.tauri/rusty-pen.key.pub` → **公钥**（需要复制到配置中）

**复制公钥内容**（运行下面命令查看）：

```bash
cat ~/.tauri/rusty-pen.key.pub
```

### 第二步：修改 `tauri.conf.json`

在 `plugins` 下面添加 updater 配置，并填入公钥：

```json
{
  "$schema": "../node_modules/@tauri-apps/cli/config.schema.json",
  "productName": "rusty-pen",
  "version": "0.1.0",
  "identifier": "com.rustypen.app",
  "build": {
    "frontendDist": "../dist",
    "devUrl": "http://localhost:5173",
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build"
  },
  "app": {
    "windows": [
      {
        "title": "Rusty Pen",
        "width": 1600,
        "height": 900,
        "minWidth": 1000,
        "minHeight": 700,
        "resizable": true,
        "fullscreen": false,
        "center": true,
        "decorations": false
      }
    ],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  },
  "plugins": {
    "updater": {
      "pubkey": "你的公钥内容（从 .key.pub 文件复制）",
      "endpoints": [
        "https://github.com/你的用户名/rusty-pen/releases/latest/download/latest.json"
      ]
    }
  }
}
```

### 第三步：GitHub Secrets 设置（用于 CI 签名）

进入你的仓库 → **Settings → Secrets and variables → Actions → New repository secret**，添加以下两个：

1. **Name**: `TAURI_SIGNING_PRIVATE_KEY`  
   **Value**: 私钥文件全部内容（`cat ~/.tauri/rusty-pen.key`）

2. **Name**: `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`  
   **Value**: 你刚才设置的密码（如果没设密码就留空）

### 第四步：更新 GitHub Workflow（推荐）

在 `.github/workflows/publish.yml` 的 `tauri-action` 步骤中加上环境变量：

```yaml
- uses: tauri-apps/tauri-action@v0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    TAURI_SIGNING_PRIVATE_KEY: ${{ secrets.TAURI_SIGNING_PRIVATE_KEY }}
    TAURI_SIGNING_PRIVATE_KEY_PASSWORD: ${{ secrets.TAURI_SIGNING_PRIVATE_KEY_PASSWORD }}
  with:
    tagName: app-v__VERSION__
    releaseName: 'App v__VERSION__'
    releaseBody: 'See the assets to download this version and install.'
    releaseDraft: true
    prerelease: false
    args: ${{ matrix.args }}
```

---

### windows 代码签名

> https://tauri.app/zh-cn/distribute/sign/windows

## 发布

### release 发布

```bash
release.sh
```

### tag 触发

```yml
on:
  push:
    tags:
      - 'app-v*'
```

```bash
git tag v1.0.0
git push origin v1.0.0
```
