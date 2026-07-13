import { useEffect, useState } from 'react'

const LINES = [
  'HOLA.EXE v1.2 — language learning system',
  '(c) 2026 · all rights reserved',
  '> mounting A:\\ ················ OK',
  '> loading module es-EN ········· OK',
  '> reading save data ············ OK',
  '> iniciando sesión',
]

const LINE_DELAY = 0.24 // seconds between lines
const HOLD_MS = 2400 // total time before auto-dismiss starts

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), HOLD_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(onDone, 400)
    return () => clearTimeout(t)
  }, [leaving, onDone])

  return (
    <div
      className={`boot-screen ${leaving ? 'leaving' : ''}`}
      onClick={() => setLeaving(true)}
      role="presentation"
      aria-hidden="true"
    >
      <div className="boot-lines">
        {LINES.map((line, i) => (
          <div key={i} className="boot-line" style={{ animationDelay: `${i * LINE_DELAY}s` }}>
            {line}
            {i === LINES.length - 1 && <span className="cursor">_</span>}
          </div>
        ))}
        <div className="boot-line boot-bar" style={{ animationDelay: `${LINES.length * LINE_DELAY}s` }}>
          <span className="boot-fill" style={{ animationDelay: `${LINES.length * LINE_DELAY}s` }} />
        </div>
      </div>
      <div className="boot-skip">tap to skip</div>
    </div>
  )
}
