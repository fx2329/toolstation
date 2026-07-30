import { useState } from "react"

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!r) return null
  return { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) }
}

function hslToRgb(h, s, l) {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => { const k = (n + h / 30) % 12; return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)) }
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) }
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60
  else if (max === g) h = ((b - r) / d + 2) * 60
  else h = ((r - g) / d + 4) * 60
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#3B82F6")
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 })
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 })

  const updateFromHex = (h) => {
    setHex(h)
    const c = hexToRgb(h)
    if (c) { setRgb(c); setHsl(rgbToHsl(c.r, c.g, c.b)) }
  }

  const updateFromRgb = (r, g, b) => {
    setRgb({ r, g, b })
    const hr = r.toString(16).padStart(2, "0")
    const hg = g.toString(16).padStart(2, "0")
    const hb = b.toString(16).padStart(2, "0")
    setHex(`#${hr}${hg}${hb}`)
    setHsl(rgbToHsl(r, g, b))
  }

  const updateFromHsl = (h, s, l) => {
    setHsl({ h, s, l })
    const c = hslToRgb(h, s, l)
    setRgb(c)
    const hr = c.r.toString(16).padStart(2, "0")
    const hg = c.g.toString(16).padStart(2, "0")
    const hb = c.b.toString(16).padStart(2, "0")
    setHex(`#${hr}${hg}${hb}`)
  }

  const colorStr = `rgb(${rgb.r},${rgb.g},${rgb.b})`

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div
        className="w-full h-32 rounded-lg border border-gray-700 transition-colors"
        style={{ backgroundColor: colorStr }}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">HEX</label>
          <input className="input-field font-mono" value={hex} onChange={(e) => updateFromHex(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">RGB</label>
          <div className="flex gap-1">
            <input type="number" min={0} max={255} className="input-field w-20" value={rgb.r} onChange={(e) => updateFromRgb(Number(e.target.value), rgb.g, rgb.b)} />
            <input type="number" min={0} max={255} className="input-field w-20" value={rgb.g} onChange={(e) => updateFromRgb(rgb.r, Number(e.target.value), rgb.b)} />
            <input type="number" min={0} max={255} className="input-field w-20" value={rgb.b} onChange={(e) => updateFromRgb(rgb.r, rgb.g, Number(e.target.value))} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">HSL</label>
          <div className="flex gap-1">
            <input type="number" min={0} max={360} className="input-field w-20" value={hsl.h} onChange={(e) => updateFromHsl(Number(e.target.value), hsl.s, hsl.l)} />
            <input type="number" min={0} max={100} className="input-field w-20" value={hsl.s} onChange={(e) => updateFromHsl(hsl.h, Number(e.target.value), hsl.l)} />
            <input type="number" min={0} max={100} className="input-field w-20" value={hsl.l} onChange={(e) => updateFromHsl(hsl.h, hsl.s, Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <code className="text-sm text-gray-400 bg-gray-800 px-3 py-1.5 rounded font-mono select-all">RGB: {colorStr}</code>
        <code className="text-sm text-gray-400 bg-gray-800 px-3 py-1.5 rounded font-mono select-all">HEX: {hex}</code>
        <code className="text-sm text-gray-400 bg-gray-800 px-3 py-1.5 rounded font-mono select-all">HSL: hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</code>
      </div>
    </div>
  )
}
