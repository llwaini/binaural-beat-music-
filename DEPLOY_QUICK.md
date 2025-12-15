# 🚀 快速部署速查卡

## 最快方案：Vercel CLI（2 分钟）

```bash
npm install -g vercel
cd /Users/lijian/Desktop/音频/react-binaural
vercel
```

按提示操作，完成！你会得到一个 `https://xxx.vercel.app` 的公网 URL。

---

## 备选：GitHub + Vercel（4 分钟）

1. **创建 GitHub 仓库**（或用现有的）
2. **推送代码**：
   ```bash
   cd /Users/lijian/Desktop/音频/react-binaural
   git remote add origin https://github.com/YOU/react-binaural.git
   git push -u origin main
   ```
3. **访问 vercel.com → 用 GitHub 登录 → Import 项目 → Deploy**

---

## 部署完成后

- 你会获得一个 **公网 URL**（例如 `https://react-binaural-xyz.vercel.app`）
- 分享这个链接给任何人，他们都能在浏览器中访问
- 每次 `git push`，Vercel 会自动重新部署

---

## 常见问题

**本地测试没问题，但部署后是白页？**
→ 可能是构建出错。访问 Vercel 控制面板看构建日志。

**想用自己的域名？**
→ 在 Vercel Settings → Domains，添加你的域名（需要 DNS 配置）。

**免费版有限制吗？**
→ 没有。Vercel 免费版足够支持个人项目。

