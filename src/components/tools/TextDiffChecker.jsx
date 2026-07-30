import { useState } from "react"
import { diffChars } from "diff"

export default function TextDiffChecker() {
  const [left, setLeft] = useState("")
  const [right, setRight] = useState("")
  const [result, setResult] = useState([])

  const compare = () => {
    const d = diffChars(left, right)
    setResult(d)
  }

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <div className="flex gap-2">
        <button onClick={compare} className="btn-primary">Compare</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Original</label>
          <textarea className="tool-textarea min-h-40" value={left} onChange={(e) => setLeft(e.target.value)} spellCheck={false} placeholder="Paste original text..." />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Changed</label>
          <textarea className="tool-textarea min-h-40" value={right} onChange={(e) => setRight(e.target.value)} spellCheck={false} placeholder="Paste changed text..." />
        </div>
      </div>
      {result.length > 0 && (
        <div className="tool-panel">
          <div className="text-xs text-gray-400 mb-2">Diff Result</div>
          <div className="text-sm font-mono whitespace-pre-wrap break-all">
            {result.map((part, i) => {
              const color = part.added ? "bg-green-900/50 text-green-400" : part.removed ? "bg-red-900/50 text-red-400 line-through" : "text-gray-300"
              return <span key={i} className={color}>{part.value}</span>
            })}
          </div>
        </div>
      )}
    </div>
  )
}
