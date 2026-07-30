import { Routes, Route, NavLink, useLocation } from "react-router-dom"
import JsonFormatter from "./components/tools/JsonFormatter.jsx"
import Base64Tool from "./components/tools/Base64Tool.jsx"
import UrlEncoder from "./components/tools/UrlEncoder.jsx"
import TimestampConverter from "./components/tools/TimestampConverter.jsx"
import UuidGenerator from "./components/tools/UuidGenerator.jsx"
import RegexTester from "./components/tools/RegexTester.jsx"
import MarkdownPreviewer from "./components/tools/MarkdownPreviewer.jsx"
import QrCodeGenerator from "./components/tools/QrCodeGenerator.jsx"
import ColorConverter from "./components/tools/ColorConverter.jsx"
import ImageCompressor from "./components/tools/ImageCompressor.jsx"
import TextDiffChecker from "./components/tools/TextDiffChecker.jsx"
import HashGenerator from "./components/tools/HashGenerator.jsx"

const tools = [
  { path: "/json", name: "JSON Formatter", icon: "{ }", component: JsonFormatter, category: "dev" },
  { path: "/base64", name: "Base64", icon: "64", component: Base64Tool, category: "encode" },
  { path: "/url", name: "URL Codec", icon: "//", component: UrlEncoder, category: "encode" },
  { path: "/timestamp", name: "Timestamp", icon: "T", component: TimestampConverter, category: "dev" },
  { path: "/uuid", name: "UUID", icon: "ID", component: UuidGenerator, category: "dev" },
  { path: "/regex", name: "Regex", icon: ".*", component: RegexTester, category: "dev" },
  { path: "/markdown", name: "Markdown", icon: "MD", component: MarkdownPreviewer, category: "text" },
  { path: "/qrcode", name: "QR Code", icon: "QR", component: QrCodeGenerator, category: "img" },
  { path: "/color", name: "Color", icon: "#", component: ColorConverter, category: "img" },
  { path: "/image", name: "Image", icon: "IMG", component: ImageCompressor, category: "img" },
  { path: "/diff", name: "Text Diff", icon: "<>", component: TextDiffChecker, category: "text" },
  { path: "/hash", name: "Hash", icon: "#=", component: HashGenerator, category: "encode" },
]

const categories = [
  { key: "dev", label: "Dev Tools" },
  { key: "encode", label: "Encode/Decode" },
  { key: "text", label: "Text Tools" },
  { key: "img", label: "Image Tools" },
]

function HomePage() {
  return (
    <div className="flex-1 p-6 md:p-10 overflow-auto">
      <h1 className="text-3xl font-bold text-gray-100 mb-2">DevTool Station</h1>
      <p className="text-gray-400 mb-10 text-sm">Free online developer tools — no signup, runs in your browser.</p>
      <div className="mb-8">
        <ins className="adsbygoogle" style={{display:"block"}} data-ad-client="ca-pub-5754174567008199" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script dangerouslySetInnerHTML={{__html:"(adsbygoogle = window.adsbygoogle || []).push({});"}} />
      </div>
      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat.key)
        if (catTools.length === 0) return null
        return (
          <div key={cat.key} className="mb-10">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{cat.label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {catTools.map((tool) => (
                <NavLink
                  key={tool.path}
                  to={tool.path}
                  className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 hover:bg-gray-800/50 transition-all group"
                >
                  <span className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-md text-xs font-mono font-bold text-blue-400 group-hover:bg-blue-500/10 group-hover:text-blue-300 transition-colors">
                    {tool.icon}
                  </span>
                  <span className="text-sm text-gray-300 group-hover:text-gray-100">{tool.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-800">
        <NavLink to="/" className="text-base font-bold text-gray-100 hover:text-blue-400 transition-colors">
          DevTool Station
        </NavLink>
      </div>
      <nav className="flex-1 p-2">
        {categories.map((cat) => {
          const catTools = tools.filter((t) => t.category === cat.key)
          if (catTools.length === 0) return null
          return (
            <div key={cat.key} className="mb-4">
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {cat.label}
              </div>
              {catTools.map((tool) => (
                <NavLink
                  key={tool.path}
                  to={tool.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors mb-0.5 ${
                      isActive
                        ? "bg-blue-600/20 text-blue-400 font-medium"
                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                    }`
                  }
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded text-[10px] font-mono font-bold">
                    {tool.icon}
                  </span>
                  {tool.name}
                </NavLink>
              ))}
            </div>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-800 text-xs text-gray-600">
        <div className="mb-2">All tools run locally in your browser.</div>
        <NavLink to="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors block mb-1">Privacy Policy</NavLink>
        <NavLink to="/about" className="text-gray-500 hover:text-gray-300 transition-colors block">About</NavLink>
        <div className="mt-3">
          <ins className="adsbygoogle" style={{display:"block",width:"100%",minHeight:"250px"}} data-ad-client="ca-pub-5754174567008199" data-ad-slot="2345678901" data-ad-format="auto"></ins>
          <script dangerouslySetInnerHTML={{__html:"(adsbygoogle = window.adsbygoogle || []).push({});"}} />
        </div>
      </div>
    </aside>
  )
}

export default function App() {
  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/json" element={<ToolShell title="JSON Formatter"><JsonFormatter /></ToolShell>} />
        <Route path="/base64" element={<ToolShell title="Base64 Encoder / Decoder"><Base64Tool /></ToolShell>} />
        <Route path="/url" element={<ToolShell title="URL Encoder / Decoder"><UrlEncoder /></ToolShell>} />
        <Route path="/timestamp" element={<ToolShell title="Timestamp Converter"><TimestampConverter /></ToolShell>} />
        <Route path="/uuid" element={<ToolShell title="UUID Generator"><UuidGenerator /></ToolShell>} />
        <Route path="/regex" element={<ToolShell title="Regex Tester"><RegexTester /></ToolShell>} />
        <Route path="/markdown" element={<ToolShell title="Markdown Previewer"><MarkdownPreviewer /></ToolShell>} />
        <Route path="/qrcode" element={<ToolShell title="QR Code Generator"><QrCodeGenerator /></ToolShell>} />
        <Route path="/color" element={<ToolShell title="Color Converter"><ColorConverter /></ToolShell>} />
        <Route path="/image" element={<ToolShell title="Image Compressor"><ImageCompressor /></ToolShell>} />
        <Route path="/diff" element={<ToolShell title="Text Diff Checker"><TextDiffChecker /></ToolShell>} />
        <Route path="/hash" element={<ToolShell title="Hash Generator"><HashGenerator /></ToolShell>} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

function ToolShell({ title, children }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50 shrink-0">
        <h1 className="text-lg font-semibold text-gray-100">{title}</h1>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <ins className="adsbygoogle" style={{display:"block",marginBottom:"16px"}} data-ad-client="ca-pub-5754174567008199" data-ad-slot="3456789012" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script dangerouslySetInnerHTML={{__html:"(adsbygoogle = window.adsbygoogle || []).push({});"}} />
        {children}
      </div>
    </div>
  )
}

function PrivacyPage() {
  return (
    <div className="flex-1 p-6 md:p-10 overflow-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        <p><strong className="text-gray-100">Last updated:</strong> July 30, 2026</p>
        <h2 className="text-lg font-semibold text-gray-100 mt-6">Our Commitment to Privacy</h2>
        <p>DevTool Station is designed with privacy as a core principle. <strong>All tools run entirely in your browser.</strong> Your data never leaves your device.</p>
        <h2 className="text-lg font-semibold text-gray-100 mt-6">Data Collection</h2>
        <p>We do <strong>not</strong> collect, store, or transmit any data you enter into our tools. No text, files, JSON, URLs, images, or any other content you process is ever sent to our servers or any third party.</p>
        <h2 className="text-lg font-semibold text-gray-100 mt-6">Analytics & Advertising</h2>
        <p>We may use Google Analytics to understand visitor traffic patterns and Google AdSense to display advertisements. These services may use cookies. No personally identifiable information is collected through these services.</p>
        <h2 className="text-lg font-semibold text-gray-100 mt-6">Cookies</h2>
        <p>Third-party services (Google Analytics, Google AdSense) may place cookies in your browser. You can disable cookies in your browser settings at any time.</p>
        <h2 className="text-lg font-semibold text-gray-100 mt-6">Contact</h2>
        <p>For privacy-related questions, please open an issue on our <a href="https://github.com/fx2329/toolstation" className="text-blue-400 hover:underline">GitHub repository</a>.</p>
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="flex-1 p-6 md:p-10 overflow-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">About DevTool Station</h1>
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>DevTool Station is a collection of free online developer tools built with one principle: <strong>privacy first.</strong></p>
        <p>Unlike many "free tool" websites that upload your data to unknown servers, every tool on DevTool Station runs entirely in your browser using Web APIs. Nothing you type, paste, or upload ever leaves your device.</p>
        <h2 className="text-lg font-semibold text-gray-100 mt-6">Technology</h2>
        <p>Built with React, Vite, and Tailwind CSS. All processing is done client-side using browser-native APIs. The source code is open source and available on <a href="https://github.com/fx2329/toolstation" className="text-blue-400 hover:underline">GitHub</a>.</p>
        <h2 className="text-lg font-semibold text-gray-100 mt-6">Contact</h2>
        <p>Have suggestions or found a bug? Open an issue on <a href="https://github.com/fx2329/toolstation" className="text-blue-400 hover:underline">GitHub</a>.</p>
      </div>
    </div>
  )
}
