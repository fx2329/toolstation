import { useState } from "react"
import QRCode from "qrcode"

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://example.com")
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [size, setSize] = useState(256)

  const generate = async () => {
    if (!text.trim()) return
    try {
      const url = await QRCode.toDataURL(text, { width: size, margin: 2 })
      setQrDataUrl(url)
    } catch {
      setQrDataUrl("")
    }
  }

  const download = () => {
    if (!qrDataUrl) return
    const a = document.createElement("a")
    a.href = qrDataUrl
    a.download = "qrcode.png"
    a.click()
  }

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <div className="flex gap-2 items-end flex-wrap">
        <div className="flex flex-col gap-1 flex-1 min-w-40">
          <label className="text-xs text-gray-500">Text or URL</label>
          <input className="input-field" placeholder="https://..." value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 w-24">
          <label className="text-xs text-gray-500">Size (px)</label>
          <input type="number" min={64} max={1024} value={size} onChange={(e) => setSize(Number(e.target.value))} className="input-field" />
        </div>
        <button onClick={generate} className="btn-primary">Generate</button>
        {qrDataUrl && <button onClick={download} className="btn-secondary">Download PNG</button>}
      </div>
      {qrDataUrl && (
        <div className="flex justify-center p-4 bg-white rounded-lg inline-block">
          <img src={qrDataUrl} alt="QR Code" className="block" />
        </div>
      )}
    </div>
  )
}
