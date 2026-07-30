import { useState } from "react"

export default function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [input, setInput] = useState("")
  const [matches, setMatches] = useState([])
  const [error, setError] = useState("")

  const test = () => {
    setMatches([])
    setError("")
    if (!pattern) return
    try {
      const re = new RegExp(pattern, flags)
      const result = []
      let m
      while ((m = re.exec(input)) !== null) {
        result.push({ index: m.index, text: m[0], groups: m.slice(1) })
        if (!flags.includes("g")) break
      }
      if (result.length === 0) setError("No matches found")
      else setMatches(result)
    } catch (e) {
      setError(e.message)
    }
  }

  const replaceInput = (oldText, newText) => {
    try {
      const re = new RegExp(pattern, flags)
      setInput(input.replace(re, newText))
    } catch {}
  }

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <div className="flex gap-2 items-end flex-wrap">
        <div className="flex flex-col gap-1 flex-1 min-w-40">
          <label className="text-xs text-gray-500">Pattern</label>
          <input className="input-field font-mono" placeholder="/pattern/" value={pattern} onChange={(e) => setPattern(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 w-24">
          <label className="text-xs text-gray-500">Flags</label>
          <input className="input-field font-mono" placeholder="g" value={flags} onChange={(e) => setFlags(e.target.value)} />
        </div>
        <button onClick={test} className="btn-primary">Test</button>
      </div>
      {error && <div className="text-xs px-3 py-2 rounded-md bg-red-900/50 text-red-400 border border-red-800">{error}</div>}
      <textarea className="tool-textarea min-h-32" placeholder="Enter text to test against..." value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
      {matches.length > 0 && (
        <div className="tool-panel">
          <div className="text-xs text-gray-400 mb-3">{matches.length} match{matches.length > 1 ? "es" : ""} found</div>
          <div className="flex flex-col gap-2 max-h-60 overflow-auto">
            {matches.map((m, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-gray-600 font-mono w-8 shrink-0">[{m.index}]</span>
                <code className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-mono break-all">{m.text}</code>
                {m.groups.length > 0 && (
                  <span className="text-gray-500 text-xs">
                    groups: {m.groups.map((g, j) => <code key={j} className="text-green-400">{g}</code>)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
