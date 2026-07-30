import { useState } from "react"

export default function UuidGenerator() {
  const [uuids, setUuids] = useState([])
  const [count, setCount] = useState(1)
  const [uppercase, setUppercase] = useState(false)
  const [noDashes, setNoDashes] = useState(false)

  const generate = () => {
    const result = []
    for (let i = 0; i < count; i++) {
      let uuid = crypto.randomUUID()
      if (uppercase) uuid = uuid.toUpperCase()
      if (noDashes) uuid = uuid.replace(/-/g, "")
      result.push(uuid)
    }
    setUuids(result)
  }

  const copyAll = () => navigator.clipboard.writeText(uuids.join("\n")).catch(() => {})

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <div className="flex gap-4 items-end flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Count</label>
          <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="input-field w-24" />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded" />
          Uppercase
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input type="checkbox" checked={noDashes} onChange={(e) => setNoDashes(e.target.checked)} className="rounded" />
          No Dashes
        </label>
        <button onClick={generate} className="btn-primary">Generate</button>
      </div>
      {uuids.length > 0 && (
        <>
          <button onClick={copyAll} className="btn-secondary w-fit">Copy All</button>
          <div className="flex flex-col gap-1">
            {uuids.map((u, i) => (
              <code key={i} className="text-xs text-gray-300 bg-gray-800 px-3 py-1.5 rounded font-mono select-all break-all">{u}</code>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
