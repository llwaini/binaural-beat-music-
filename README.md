# React Binaural Generator (MVP)

最小可运行的 React + Vite 演示，使用 Web Audio API 在浏览器中实时生成左/右声道带波差的音频。

主要功能
- Carrier + Beat 控制（左/右频率自动计算）
- 主音量（dB）、渐入/渐出、Crossfeed（串音）
- 限幅（DynamicsCompressor）默认开启
- 左/右测试声道
- 预设保存/加载（localStorage）
- 简单 WebSocket 闭环 stub（可输入 JSON 消息）

运行

1. 进入项目目录

```bash
cd /Users/lijian/Desktop/音频/react-binaural
```

2. 安装依赖并启动（需要网络）

```bash
npm install
npm run dev
```

3. 浏览器打开开发地址（Vite 控制台会显示）。请戴耳机。

注意与约束
- Beat 限制在 0.5–30Hz
- 最大音量受控在 -6dB
- 网页端只负责音频合成；医疗效果与声明需在外部处理

后续可以继续做的工作
- 用 React Hook 抽离 audioEngine（可复用）
- 增加 OfflineAudioContext 导出 WAV
- 增加更完整的 EQ / pink noise 混合
- 后端闭环与日志存储

