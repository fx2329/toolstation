import { useState, useRef } from "react"
import imageCompression from "browser-image-compression"

export default function ImageCompressor() {
  const [original, setOriginal] = useState(null)
  const [compressed, setCompressed] = useState(null)
  const [quality, setQuality] = useState(0.7)
  const [maxSize, setMaxSize] = useState(1920)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginal({ file, url: URL.createObjectURL(file), size: file.size })
    setCompressed(null)
  }

  const compress = async () => {
    if (!original) return
    setLoading(true)
    try {
      const opts = { maxSizeMB: 10, maxWidthOrHeight: maxSize, useWebWorker: true, initialQuality: quality }
      const compFile = await imageCompression(original.file, opts)
      setCompressed({ file: compFile, url: URL.createObjectURL(compFile), size: compFile.size })
    } catch {}
    setLoading(false)
  }

  const download = () => {
    if (!compressed) return
    const a = document.createElement("a")
    a.href = compressed.url
    a.download = "compressed-" + original.file.name
    a.click()
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / 1048576).toFixed(2) + " MB"
  }

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <div className="flex gap-4 items-end flex-wrap">
        <div className="flex flex-col gap-1 w-32">
          <label className="text-xs text-gray-500">Quality ({Math.round(quality * 100)}%)</label>
          <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
        </div>
        <div className="flex flex-col gap-1 w-32">
          <label className="text-xs text-gray-500">Max px: {maxSize}</label>
          <input type="range" min={320} max={4096} step={16} value={maxSize} onChange={(e) => setMaxSize(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="flex gap-2">
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <button onClick={() => fileRef.current?.click()} className="btn-secondary">Select Image</button>
        {original && <button onClick={compress} disabled={loading} className="btn-primary">{loading ? "Compressing..." : "Compress"}</button>}
        {compressed && <button onClick={download} className="btn-secondary">Download</button>}
      </div>
      {original && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-xs text-gray-500">Original ({formatSize(original.size)})</div>
            <img src={original.url} alt="Original" className="max-w-full rounded-lg border border-gray-800" />
          </div>
          {compressed && (
            <div className="flex flex-col gap-1">
              <div className="text-xs text-gray-500">
                Compressed ({formatSize(compressed.size)})
                <span className="text-green-400 ml-2">
                  -{(100 - Math.round(compressed.size / original.size * 100))}%
                </span>
              </div>
              <img src={compressed.url} alt="Compressed" className="max-w-full rounded-lg border border-gray-800" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
