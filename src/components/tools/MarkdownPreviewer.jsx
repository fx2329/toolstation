import { useState } from "react"
import { marked } from "marked"

export default function MarkdownPreviewer() {
  const [input, setInput] = useState(`# Welcome to Markdown Previewer

Type your **Markdown** on the left, see the *rendered* result on the right.

\`\`\`js
console.log("Hello, world!");
\`\`\`

- List item 1
- List item 2
- List item 3

> A blockquote for good measure.

| Col A | Col B |
|-------|-------|
| 1     | 2     |
`)

  const html = marked.parse(input, { breaks: true })

  return (
    <div className="flex gap-4 h-[calc(100vh-180px)]">
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <label className="text-xs text-gray-500">Markdown</label>
        <textarea
          className="tool-textarea flex-1 resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </div>
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <label className="text-xs text-gray-500">Preview</label>
        <div
          className="flex-1 bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-auto text-sm text-gray-200 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
