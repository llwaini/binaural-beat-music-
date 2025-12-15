# Netlify 部署指南

## 快速部署步骤

### 第 1 步：点击 "Import from Git"
在 Netlify Projects 页面，点击绿色的 **"Import from Git"** 按钮

### 第 2 步：授权 GitHub
1. 选择 **GitHub** 作为 Git 提供商
2. 点击 **"Authorize Netlify"**
3. 在 GitHub 授权页面，点击 **"Authorize netlify"**

### 第 3 步：选择仓库
1. 你会看到你的 GitHub 仓库列表
2. 搜索并选择 `binaural-beat-music-` 仓库
3. 点击选中该仓库

### 第 4 步：配置构建设置
Netlify 会自动检测到你的 `netlify.toml` 配置文件，但你也可以手动验证：

- **Owner**: llwaini（你的 GitHub 用户名）
- **Branch**: main（主分支）
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 第 5 步：部署
1. 向下滚动，点击 **"Deploy site"**
2. Netlify 开始构建和部署你的应用
3. 等待部署完成（通常需要 2-5 分钟）

### 第 6 步：获取部署 URL
部署完成后，你会看到：
- **Site URL**: `https://[随机名称].netlify.app`
- 这就是你的应用公开 URL

## 部署完成标志
✅ 绿色的"Site is live"提示
✅ 显示你的部署 URL
✅ 可以访问 https://[随机名称].netlify.app

## 自动部署
- 以后每次推送代码到 GitHub `main` 分支时
- Netlify 会自动检测到更改
- 自动重新构建和部署
- 无需手动操作

## 遇到问题？
- 检查构建日志：Netlify Dashboard → Deploys → 点击最新部署 → 查看 Deploy log
- 确保 `npm run build` 在本地能正常运行
- 检查 `netlify.toml` 配置文件是否正确
