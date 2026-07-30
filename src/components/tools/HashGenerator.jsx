import { useState } from "react"
import CryptoJS from "crypto-js"

const algorithms = [
  { key: "MD5", fn: (t) => CryptoJS.MD5(t).toString() },
  { key: "SHA-1", fn: (t) => CryptoJS.SHA1(t).toString() },
  { key: "SHA-256", fn: (t) => CryptoJS.SHA256(t).toString() },
  { key: "SHA-512", fn: (t) => CryptoJS.SHA512(t).toString() },
  { key: "SHA-3", fn: (t) => CryptoJS.SHA3(t, { outputLength: 256 }).toString() },
  { key: "RIPEMD-160", fn: (t) => CryptoJS.RIPEMD160(t).toString() },
]

export default function HashGenerator() {
  const [input, setInput] = useState("")
  const [results, setResults] = useState({})

  const generateAll = () => {
    const r = {}
    algorithms.forEach((a) => { r[a.key] = a.fn(input) })
    setResults(r)
  }

  const copyHash = (hash) => navigator.clipboard.writeText(hash).catch(() => {})

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <div className="flex gap-2">
        <textarea
          className="tool-textarea min-h-24 max-h-32"
          placeholder="Enter text to hash..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </div>
      <button onClick={generateAll} className="btn-primary w-fit">Generate All</button>
      {Object.keys(results).length > 0 && (
        <div className="flex flex-col gap-2">
          {algorithms.map((a) => (
            <div key={a.key} className="tool-panel flex justify-between items-center gap-4">
              <span className="text-xs text-gray-500 font-mono w-20 shrink-0">{a.key}</span>
              <code className="text-xs text-gray-300 font-mono break-all flex-1 select-all">{results[a.key]}</code>
              <button onClick={() => copyHash(results[a.key])} className="btn-secondary text-xs px-2 py-1 shrink-0">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
