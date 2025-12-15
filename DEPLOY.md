# 🌐 Vercel 部署指南（5 分钟快速部署）

你的 React Binaural Audio Generator 现在可以部署到互联网上，让任何人都能访问。下面是最快的方法。

## 方案 A：用 GitHub + Vercel（推荐，自动部署）

### 第 1 步：创建 GitHub 账号并新建仓库
1. 访问 [github.com](https://github.com)，注册或登录
2. 点击 "New" → 创建新仓库，名字例如 `react-binaural`
3. **不要** 初始化 README（因为我们本地已有代码）

### 第 2 步：推送本地代码到 GitHub
在你的项目目录（/Users/lijian/Desktop/音频/react-binaural）运行：

```bash
git remote add origin https://github.com/YOUR_USERNAME/react-binaural.git
git branch -M main
git push -u origin main
```

（把 `YOUR_USERNAME` 替换为你的 GitHub 用户名）

### 第 3 步：在 Vercel 上部署
1. 访问 [vercel.com](https://vercel.com)，点击 "Sign Up"，选择 "Continue with GitHub"（授权）
2. 登录后，点击 "New Project"
3. 找到并选择你刚创建的 `react-binaural` 仓库
4. Vercel 会自动检测 Vite 配置，点击 "Deploy"
5. **等待 1–3 分钟**，部署完成后你会看到一个 **公网 URL**（例如 `https://react-binaural.vercel.app`）

### 第 4 步：分享给用户
把这个 URL 发给任何人，他们就能在浏览器中打开并使用你的网站。

---

## 方案 B：直接用 Vercel CLI（快速方案）

### 第 1 步：安装 Vercel CLI
```bash
npm install -g vercel
```

### 第 2 步：部署
```bash
cd /Users/lijian/Desktop/音频/react-binaural
vercel
```

按照提示操作，选择：
- "Set up and deploy" → Yes
- 其他问题都选默认即可

**几秒后你会得到一个公网 URL。**

---

## 方案 C：用 Netlify（备选）

如果你更喜欢 Netlify：

1. 访问 [netlify.com](https://netlify.com)，用 GitHub 登录
2. 点击 "New site from Git"，选择你的 `react-binaural` 仓库
3. 构建命令设为 `npm run build`，发布目录为 `dist`
4. 点击 "Deploy"，几分钟后你会得到一个公网地址

---

## 🔐 部署后的安全 & 约束

你的网站现在在互联网上了。建议：

1. **医疗声明**：页面已有"不作为医疗建议"的提示，确保符合当地法规
2. **限流**（可选）：如果担心滥用，可以在 Vercel 后端加简单的速率限制（后续可做）
3. **HTTPS**：Vercel/Netlify 自动提供 HTTPS，安全没问题

---

## 后续更新

当你修改代码时：

```bash
git add .
git commit -m "Fix: xxx"
git push origin main
```

Vercel/Netlify 会自动检测并重新部署，通常 1 分钟内生效。

---

## 常见问题

**Q: URL 可以自定义吗？**  
A: 可以。在 Vercel 仪表板 → Settings → Domains，可以添加自己的域名。

**Q: 用户能访问我的代码吗？**  
A: 不能。他们只能访问构建后的 JS/CSS，源代码存放在你的 Git 仓库中（可以设为私密）。

**Q: 免费额度够吗？**  
A: 够。Vercel 免费账户每月 100 GB 带宽，足以支持几千用户。

---

## 🚀 立即开始

**选择方案 A 或 B，按步骤做，5 分钟内完成部署。**

如有卡住的地方，回复我，我可以帮你逐步调试。

