# React Binaural Audio Generator - 完整项目指南

## 📦 项目状态

✅ **代码已完成**：全功能 React + Web Audio API 应用  
✅ **Git 仓库已初始化**：可随时推送并部署  
✅ **配置已准备**：Vercel/Netlify 部署配置已就位  

---

## 🎯 核心功能

- **左右耳不同频率生成**（Binaural Beat）
  - 可调载频 (80–400 Hz) 与波差 (0.5–30 Hz)
  
- **实时音量和时序控制**
  - 主音量范围 -40 ~ -6 dB（带硬限幅）
  - 渐入/渐出 (5–120 秒)
  
- **白噪音混合**（内置生成，无需外部文件）
  - 可调混合比例 (0–0.5)
  
- **音色选择**：Sine / Triangle / Sawtooth
  
- **预设系统**：Sleep / Relax / Focus（localStorage 保存）
  
- **测试功能**：单独测试左/右声道

---

## 🚀 部署到互联网（让他人访问）

### 方法 1：用 Vercel CLI（最快，2 分钟）

```bash
npm install -g vercel
cd /Users/lijian/Desktop/音频/react-binaural
vercel
```

按提示操作，几秒后你会看到：
```
✓ Production: https://react-binaural-xyz.vercel.app
```

**完成！** 这个 URL 就是你的公网地址，可以分享给任何人。

### 方法 2：GitHub + Vercel（自动部署，推荐长期使用）

1. **创建 GitHub 账号**（如未有）并新建仓库 `react-binaural`

2. **推送代码到 GitHub**：
   ```bash
   cd /Users/lijian/Desktop/音频/react-binaural
   git remote add origin https://github.com/YOUR_USERNAME/react-binaural.git
   git branch -M main
   git push -u origin main
   ```

3. **在 Vercel 上部署**：
   - 访问 https://vercel.com
   - 用 GitHub 账号登录
   - 点击 "New Project"
   - 选择 `react-binaural` 仓库
   - 点击 "Deploy"
   - **等待 1–3 分钟**，完成后你会得到公网 URL

4. **自动更新**：之后每次 `git push`，Vercel 会自动重新部署

### 方法 3：Netlify（备选）

- 访问 https://netlify.com → 用 GitHub 登录
- 点击 "New site from Git" → 选择仓库
- 构建命令：`npm run build`，发布目录：`dist`
- 点击 "Deploy"，几分钟后完成

---

## 🖥️ 本地运行（开发/测试）

```bash
cd /Users/lijian/Desktop/音频/react-binaural
npm install   # 如未装依赖
npm run dev
```

打开浏览器访问 http://localhost:5173（Vite 会自动打开）。

---

## 📝 项目结构

```
react-binaural/
├── src/
│   ├── main.jsx          # React 入口
│   ├── App.jsx           # 页面壳（警示 + 标题）
│   ├── components/
│   │   └── AudioEngine.jsx  # 核心音频引擎 + UI
│   └── styles.css        # 样式
├── index.html            # HTML 模板
├── package.json          # 依赖声明
├── vite.config.js        # Vite 配置
├── vercel.json           # Vercel 部署配置
├── .vercelignore         # Vercel 忽略列表
├── README.md             # 项目说明
├── DEPLOY.md             # 详细部署指南
└── DEPLOY_QUICK.md       # 快速参考
```

---

## 🔒 安全 & 约束

- **医疗声明**：页面已标明"不作为医疗建议"
- **强制限制**：Beat 范围严格限制在 0.5–30 Hz；音量限幅在 -6 dB
- **音频合成**：纯 Web Audio API，无外部音乐/样本库（降低法律风险）
- **HTTPS**：Vercel/Netlify 自动提供 HTTPS，通信安全有保障

---

## 📞 后续定制（可选）

- **添加 EQ 控制**：HPF/LPF Biquad 滤波器（已预留接口）
- **导出 WAV**：OfflineAudioContext 渲染并下载（可后补）
- **闭环与数据**：WebSocket 接收外部设备（EEG/传感器）输入并记录日志
- **用户账号**：后端存储用户预设与会话日志
- **多语言**：UI 文本国际化

---

## ✨ 总结

**你现在有一个完整、可部署的 React Binaural 音频生成网站。**

- ✅ 本地开发没问题（npm run dev）
- ✅ 代码已 Git 管理
- ✅ 部署配置就绪（Vercel 2 分钟一键发布）
- ✅ 所有核心功能完成（参数控制、白噪音、预设）

**下一步**：选择部署方法（推荐 Vercel CLI 最快），5 分钟内让全世界的人都能访问你的应用。

