import React, { useEffect, useRef, useState } from 'react'

function dbToGain(db){ return Math.pow(10, db/20) }

export default function AudioEngine(){
  const [carrier, setCarrier] = useState(200)
  const [beat, setBeat] = useState(4.0)
  const [db, setDb] = useState(-24)
  const [fadeIn, setFadeIn] = useState(30)
  const [fadeOut, setFadeOut] = useState(30)
  const [noiseMix, setNoiseMix] = useState(0.1)
  const [tone, setTone] = useState('sine')

  const [running, setRunning] = useState(false)
  const [statusText, setStatusText] = useState('Audio: stopped')
  const [freqReadout, setFreqReadout] = useState('')

  const ctxRef = useRef(null)
  const nodesRef = useRef({ oscL: null, oscR: null, noise: null, master: null })
  const stopTimeoutRef = useRef(null)

  function calcFreqs(){
    const c = Number(carrier)
    const b = Number(beat)
    return { c, b, left: c - b/2, right: c + b/2 }
  }

  function updateReadout(){
    const {c,b,left,right} = calcFreqs()
    setFreqReadout(`Carrier: ${c.toFixed(1)} Hz\nBeat: ${b.toFixed(1)} Hz\nLeft: ${left.toFixed(1)} Hz\nRight: ${right.toFixed(1)} Hz`)
  }

  function ensureContext(){
    if(!ctxRef.current){
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return ctxRef.current
  }

  function buildGraph(){
    const ctx = ensureContext()
    
    // stop any existing nodes
    if(nodesRef.current.oscL) try{ nodesRef.current.oscL.stop() }catch(e){}
    if(nodesRef.current.oscR) try{ nodesRef.current.oscR.stop() }catch(e){}
    if(nodesRef.current.noise) try{ nodesRef.current.noise.stop() }catch(e){}

    // create nodes
    const oscL = ctx.createOscillator()
    const oscR = ctx.createOscillator()
    const gainL = ctx.createGain()
    const gainR = ctx.createGain()
    const master = ctx.createGain()
    const comp = ctx.createDynamicsCompressor()
    const merger = ctx.createChannelMerger(2)

    // noise
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for(let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource()
    noise.buffer = buf
    noise.loop = true
    const noiseGain = ctx.createGain()

    // set up oscillators
    oscL.type = tone
    oscR.type = tone
    const {left, right} = calcFreqs()
    oscL.frequency.value = left
    oscR.frequency.value = right

    // connect: osc -> gain -> merger
    oscL.connect(gainL)
    gainL.connect(merger, 0, 0)
    oscR.connect(gainR)
    gainR.connect(merger, 0, 1)

    // noise -> both channels
    noise.connect(noiseGain)
    noiseGain.connect(merger, 0, 0)
    noiseGain.connect(merger, 0, 1)
    noiseGain.gain.value = noiseMix

    // master chain
    comp.threshold.value = -18
    comp.knee.value = 12
    comp.ratio.value = 8
    comp.attack.value = 0.003
    comp.release.value = 0.25

    merger.connect(comp)
    comp.connect(master)
    master.connect(ctx.destination)

    // start and store
    oscL.start()
    oscR.start()
    noise.start()

    nodesRef.current = { oscL, oscR, noise, master, noiseGain }

    // apply parameters
    applyParams()
  }

  function applyParams(){
    if(!nodesRef.current.oscL) return
    const ctx = ctxRef.current
    const now = ctx.currentTime
    const {left, right} = calcFreqs()

    nodesRef.current.oscL.frequency.setValueAtTime(left, now)
    nodesRef.current.oscR.frequency.setValueAtTime(right, now)

    const g = dbToGain(Number(db))
    nodesRef.current.master.gain.setTargetAtTime(g, now, 0.05)

    if(nodesRef.current.noiseGain) {
      nodesRef.current.noiseGain.gain.setValueAtTime(Number(noiseMix), now)
    }

    updateReadout()
  }

  async function start(){
    try{
      const ctx = ensureContext()
      await ctx.resume()
      if(running) return

      buildGraph()

      const now = ctx.currentTime
      const fadeInTime = Number(fadeIn)
      const target = dbToGain(Number(db))

      nodesRef.current.master.gain.setValueAtTime(0.0001, now)
      nodesRef.current.master.gain.linearRampToValueAtTime(target, now + fadeInTime)

      setRunning(true)
      setStatusText('Audio: running')
    }catch(e){
      console.error('start error:', e)
      setStatusText('Error: ' + e.message)
    }
  }

  function stop(){
    if(!running) return

    if(stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current)

    const ctx = ctxRef.current
    if(!ctx || !nodesRef.current.master) {
      setRunning(false)
      setStatusText('Audio: stopped')
      return
    }

    const now = ctx.currentTime
    const fadeOutTime = Math.max(0.1, Number(fadeOut))

    // ramp down
    nodesRef.current.master.gain.cancelScheduledValues(now)
    nodesRef.current.master.gain.setValueAtTime(nodesRef.current.master.gain.value, now)
    nodesRef.current.master.gain.linearRampToValueAtTime(0.0001, now + fadeOutTime)

    // stop after fadeout
    stopTimeoutRef.current = setTimeout(() => {
      try { nodesRef.current.oscL.stop() }catch(e){}
      try { nodesRef.current.oscR.stop() }catch(e){}
      try { nodesRef.current.noise.stop() }catch(e){}

      nodesRef.current = { oscL: null, oscR: null, noise: null, master: null, noiseGain: null }

      setRunning(false)
      setStatusText('Audio: stopped')
    }, (fadeOutTime + 0.1) * 1000)
  }

  function testChannel(which){
    const ctx = ensureContext()
    ctx.resume()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    const p = ctx.createStereoPanner()
    o.type = 'sine'
    o.frequency.value = 880
    g.gain.value = 0.15
    p.pan.value = (which === 'L') ? -1 : 1
    o.connect(g)
    g.connect(p)
    p.connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + 1.0)
  }

  function savePreset(name){
    if(!name) return
    const presets = JSON.parse(localStorage.getItem('binaural_presets')||'{}')
    presets[name] = { carrier, beat, db, fadeIn, fadeOut, tone, noiseMix }
    localStorage.setItem('binaural_presets', JSON.stringify(presets))
    alert('Saved: ' + name)
  }

  function loadPreset(name){
    const presets = JSON.parse(localStorage.getItem('binaural_presets')||'{}')
    const p = presets[name]
    if(!p) return alert('Not found')
    setCarrier(p.carrier)
    setBeat(p.beat)
    setDb(p.db)
    setFadeIn(p.fadeIn)
    setFadeOut(p.fadeOut)
    setTone(p.tone)
    setNoiseMix(p.noiseMix || 0.1)
  }

  useEffect(()=>{
    const presets = JSON.parse(localStorage.getItem('binaural_presets')||'{}')
    if(Object.keys(presets).length === 0){
      localStorage.setItem('binaural_presets', JSON.stringify({
        Sleep: { carrier:180, beat:3.0, db:-26, fadeIn:30, fadeOut:30, tone:'sine', noiseMix:0.1 },
        Relax: { carrier:200, beat:7.0, db:-24, fadeIn:20, fadeOut:20, tone:'sine', noiseMix:0.1 },
        Focus: { carrier:220, beat:12.0, db:-22, fadeIn:10, fadeOut:10, tone:'sine', noiseMix:0.05 }
      }))
    }
  },[])

  useEffect(()=>{ updateReadout() },[carrier,beat,db])
  useEffect(()=>{ if(running) applyParams() },[carrier,beat,db,noiseMix,tone,running])

  return (
    <div className="audio-panel">
      <div className="controls">
        <h3>Parameters</h3>
        <label>Carrier (Hz): <b>{carrier}</b></label>
        <input type="range" min="80" max="400" step="1" value={carrier} onChange={e=>setCarrier(Number(e.target.value))} />

        <label>Beat (Hz): <b>{beat.toFixed(1)}</b></label>
        <input type="range" min="0.5" max="30" step="0.1" value={beat} onChange={e=>setBeat(Number(e.target.value))} />

        <label>Volume (dB): <b>{db}</b></label>
        <input type="range" min="-40" max="-6" step="1" value={db} onChange={e=>setDb(Number(e.target.value))} />

        <label>Fade In (s): <b>{fadeIn}</b></label>
        <input type="range" min="5" max="120" step="1" value={fadeIn} onChange={e=>setFadeIn(Number(e.target.value))} />

        <label>Fade Out (s): <b>{fadeOut}</b></label>
        <input type="range" min="5" max="120" step="1" value={fadeOut} onChange={e=>setFadeOut(Number(e.target.value))} />

        <label>White Noise: <b>{noiseMix.toFixed(2)}</b></label>
        <input type="range" min="0" max="0.5" step="0.01" value={noiseMix} onChange={e=>setNoiseMix(Number(e.target.value))} />

        <label>Tone:</label>
        <select value={tone} onChange={e=>setTone(e.target.value)}>
          <option value="sine">Sine</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Sawtooth</option>
        </select>

        <div className="btns">
          <button onClick={start} disabled={running}>▶ Start</button>
          <button onClick={stop} disabled={!running}>⏹ Stop</button>
          <button onClick={()=>testChannel('L')}>🎧 L</button>
          <button onClick={()=>testChannel('R')}>🎧 R</button>
        </div>

        <div className="preset-row">
          <button onClick={()=>{ const n=prompt('Name:'); if(n) savePreset(n) }}>Save</button>
          <button onClick={()=>{ const n=prompt('Sleep/Relax/Focus'); if(n) loadPreset(n) }}>Load</button>
        </div>
      </div>

      <div className="status">
        <h3>Status</h3>
        <pre className="mono">{statusText}</pre>
        <hr />
        <h4>Frequencies</h4>
        <pre className="mono">{freqReadout}</pre>
        <hr />
        <p style={{fontSize:'13px',color:'#666'}}>Beat {beat.toFixed(1)}Hz: {beat>=0.5&&beat<=30 ? '✓ OK' : '✗ Out of range'}</p>
      </div>
    </div>
  )
}
