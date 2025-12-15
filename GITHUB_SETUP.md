# 🚀 3 分钟快速上传到 GitHub & 获得公网 URL

## 步骤 1：在 GitHub 创建新仓库

1. 登录你的 GitHub 账号（已看到你的用户名是 `llwaini`）
2. 访问 https://github.com/new
3. 填写：
   - **Repository name**：`react-binaural`
   - **Description**：Binaural Audio Generator with Web Audio API
   - **Public**：选择（这样任何人都能访问）
   - 不要勾选 "Initialize this repository with a README"
4. 点击 **Create repository**

## 步骤 2：推送代码到 GitHub

在你的电脑上运行这些命令：

```bash
cd /Users/lijian/Desktop/音频/react-binaural
git branch -M main
git push -u origin main
```

系统会要求输入 GitHub 凭证。选择：
- 用 GitHub CLI 认证（推荐）
- 或创建 Personal Access Token（访问令牌）

## 步骤 3：启用 GitHub Pages（自动部署）

1. 在你的 GitHub 仓库页面，点击 **Settings**
2. 左侧菜单找到 **Pages**
3. 在 "Build and deployment" 下：
   - **Source**：选择 "GitHub Actions"
4. 往下滚动，找到预设的工作流，选择 **Node.js** 工作流
5. 或者直接用我下面给的 `.github/workflows/deploy.yml` 配置文件

## 步骤 4：添加自动部署配置（可选，推荐）

将下面这个文件保存为 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

然后推送这个文件：

```bash
cd /Users/lijian/Desktop/音频/react-binaural
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

## 步骤 5：获得你的公网 URL

1-2 分钟后，GitHub Actions 会自动构建并部署
2. 在你的仓库 Settings → Pages，会显示你的部署 URL
3. 通常格式是：`https://llwaini.github.io/react-binaural/`

**这就是你可以分享给用户的公网链接！**

---

## 完整流程总结

```bash
# 1. 创建 GitHub 仓库（网页操作）
# https://github.com/new

# 2. 推送代码
cd /Users/lijian/Desktop/音频/react-binaural
git branch -M main
git push -u origin main

# 3. 添加 GitHub Pages 工作流文件
# 保存下面的内容为 .github/workflows/deploy.yml

# 4. 推送工作流
git add .github/workflows/deploy.yml
git commit -m "Add deployment workflow"
git push

# 5. 等待 1-2 分钟，访问
# https://llwaini.github.io/react-binaural/
```

---

## 🎉 成功标志

- ✅ GitHub 仓库创建完成
- ✅ 代码已推送到 GitHub
- ✅ GitHub Actions 工作流运行成功（看仓库的 "Actions" 标签）
- ✅ 在 Settings → Pages 看到部署 URL
- ✅ 访问该 URL，看到你的应用在线运行

---

按这个步骤做，5 分钟内你就能有一个可分享的公网 URL！

