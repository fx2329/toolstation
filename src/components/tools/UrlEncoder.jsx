import { useState } from "react"

export default function UrlEncoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState("encode")

  const convert = () => {
    try {
      if (mode === "encode") setOutput(encodeURIComponent(input))
      else setOutput(decodeURIComponent(input))
    } catch {
      setOutput("Error: invalid input")
    }
  }

  const copy = () => navigator.clipboard.writeText(output).catch(() => {})

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <div className="flex gap-1 bg-gray-800 rounded-md p-1 w-fit">
        <button onClick={() => setMode("encode")} className={`tool-tab ${mode === "encode" ? "tool-tab-active" : "tool-tab-inactive"}`}>Encode</button>
        <button onClick={() => setMode("decode")} className={`tool-tab ${mode === "decode" ? "tool-tab-active" : "tool-tab-inactive"}`}>Decode</button>
      </div>
      <textarea className="tool-textarea min-h-32" placeholder={mode === "encode" ? "Enter URL or text to encode..." : "Enter encoded URL to decode..."} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
      <div className="flex gap-2">
        <button onClick={convert} className="btn-primary">{mode === "encode" ? "Encode" : "Decode"}</button>
        {output && <button onClick={copy} className="btn-secondary">Copy</button>}
      </div>
      {output && <textarea className="tool-textarea min-h-32" value={output} readOnly spellCheck={false} />}
    </div>
  )
}
