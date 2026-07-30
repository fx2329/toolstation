import { useState } from "react"

export default function JsonFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const format = () => {
    try {
      const obj = JSON.parse(input)
      setOutput(JSON.stringify(obj, null, 2))
      setError("")
    } catch (e) {
      setError(e.message)
      setOutput("")
    }
  }

  const minify = () => {
    try {
      const obj = JSON.parse(input)
      setOutput(JSON.stringify(obj))
      setError("")
    } catch (e) {
      setError(e.message)
      setOutput("")
    }
  }

  const validate = () => {
    try {
      JSON.parse(input)
      setError("Valid JSON!")
      setOutput("")
    } catch (e) {
      setError(e.message)
      setOutput("")
    }
  }

  const copyAll = () => {
    const text = output || input
    navigator.clipboard.writeText(text).catch(() => {})
  }

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <div className="flex gap-2 flex-wrap">
        <button onClick={format} className="btn-primary">Format</button>
        <button onClick={minify} className="btn-secondary">Minify</button>
        <button onClick={validate} className="btn-secondary">Validate</button>
        <button onClick={copyAll} className="btn-secondary">Copy</button>
      </div>
      {error && (
        <div className={`text-xs px-3 py-2 rounded-md ${error === "Valid JSON!" ? "bg-green-900/50 text-green-400 border border-green-800" : "bg-red-900/50 text-red-400 border border-red-800"}`}>
          {error}
        </div>
      )}
      <textarea
        className="tool-textarea min-h-40"
        placeholder="Paste JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
      />
      {output && (
        <textarea
          className="tool-textarea min-h-40"
          value={output}
          readOnly
          spellCheck={false}
        />
      )}
    </div>
  )
}
