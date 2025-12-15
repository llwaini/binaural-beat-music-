import React from 'react'
import AudioEngine from './components/AudioEngine'

export default function App(){
  return (
    <div className="app">
      <header>
        <h1>Binaural Audio Generator (React MVP)</h1>
        <p className="warn">请佩戴耳机。Beat 限制在 0.5–30Hz。默认启用限幅并限制最大输出。</p>
      </header>
      <main>
        <AudioEngine />
      </main>
      <footer>
        <small>MVP：仅用于音频合成与参数控制，不作为医疗建议。</small>
      </footer>
    </div>
  )
}
