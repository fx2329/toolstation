import { useState, useEffect } from "react"

export default function TimestampConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const convert = () => {
    const v = input.trim()
    if (!v) return
    const ts = Number(v)
    if (!isNaN(ts)) {
      const ms = ts > 9999999999 ? ts : ts * 1000
      const d = new Date(ms)
      setOutput(`${d.toLocaleString("zh-CN")}\nISO: ${d.toISOString()}\nUTC: ${d.toUTCString()}`)
    } else {
      const d = new Date(v)
      if (isNaN(d.getTime())) { setOutput("Invalid"); return }
      setOutput(`Seconds: ${Math.floor(d.getTime() / 1000)}\nMilliseconds: ${d.getTime()}`)
    }
  }

  const useNow = () => {
    setInput(String(now))
    const d = new Date(now)
    setOutput(`${d.toLocaleString("zh-CN")}\nISO: ${d.toISOString()}\nSeconds: ${Math.floor(now / 1000)}\nMilliseconds: ${now}`)
  }

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <div className="text-xs text-gray-500">
        Current: <span className="text-gray-300 font-mono">{now}</span> ms
      </div>
      <div className="flex gap-2">
        <input className="input-field flex-1" placeholder="Timestamp (seconds/ms) or date string..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={convert} className="btn-primary">Convert</button>
        <button onClick={useNow} className="btn-secondary">Now</button>
      </div>
      {output && <textarea className="tool-textarea min-h-24" value={output} readOnly spellCheck={false} />}
    </div>
  )
}
