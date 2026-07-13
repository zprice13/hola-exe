import { useEffect, useRef, useState } from 'react'
import type { Progress } from '../types'
import { decodeSave, downloadSave, encodeSave } from '../lib/save'

interface Props {
  progress: Progress
  onImport: (progress: Progress) => void
  onClose: () => void
}

export function FloppyIcon({ size = 72, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      {/* body with clipped corner */}
      <path
        d="M8 10 a2 2 0 0 1 2-2 H48 L56 16 V54 a2 2 0 0 1-2 2 H10 a2 2 0 0 1-2-2 Z"
        fill="var(--card)"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* metal shutter */}
      <rect x="22" y="8" width="18" height="15" fill="var(--card-raised)" stroke="currentColor" strokeWidth="2" />
      <rect x="31" y="11" width="5" height="9" fill="currentColor" />
      {/* label */}
      <rect x="15" y="32" width="34" height="18" rx="1.5" fill="var(--card-raised)" stroke="currentColor" strokeWidth="2" />
      <line x1="19" y1="38" x2="45" y2="38" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="19" y1="43" x2="39" y2="43" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    </svg>
  )
}

type Tab = 'write' | 'read'

export function SaveModal({ progress, onImport, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('write')
  const [writing, setWriting] = useState(false)
  const [written, setWritten] = useState(false)
  const [copied, setCopied] = useState(false)
  const [readText, setReadText] = useState('')
  const [readError, setReadError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const code = encodeSave(progress)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function startWrite() {
    setWriting(true)
    setWritten(false)
    setCopied(false)
    // Let the floppy slide into the drive before revealing the payload
    setTimeout(() => {
      setWriting(false)
      setWritten(true)
    }, 1200)
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. non-secure context) — the code is selectable
    }
  }

  function tryLoad(text: string) {
    const imported = decodeSave(text)
    if (!imported) {
      setReadError(true)
      return
    }
    setReadError(false)
    setLoaded(true)
    onImport(imported)
    setTimeout(onClose, 900)
  }

  function onFilePicked(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => tryLoad(String(reader.result ?? ''))
    reader.readAsText(file)
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="terminal-window" role="dialog" aria-label="Disk operations" onClick={(e) => e.stopPropagation()}>
        <div className="window-title">
          <span>A:\ DISK OPERATIONS</span>
          <button type="button" className="window-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="window-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'write'}
            className={tab === 'write' ? 'active' : ''}
            onClick={() => setTab('write')}
          >
            ▼ WRITE
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'read'}
            className={tab === 'read' ? 'active' : ''}
            onClick={() => setTab('read')}
          >
            ▲ READ
          </button>
        </div>

        {tab === 'write' && (
          <div className="window-body">
            <div className="drive-bay">
              <FloppyIcon className={`floppy ${writing ? 'inserting' : ''} ${written ? 'inserted' : ''}`} />
              <div className="drive-slot">
                <span className={`drive-led ${writing ? 'busy' : ''} ${written ? 'ok' : ''}`} />
              </div>
            </div>

            {!written && (
              <>
                <p className="window-text">
                  {writing ? 'writing progress to disk…' : 'back up your streak, xp and lessons to a save code.'}
                </p>
                <button type="button" className="primary-btn" disabled={writing} onClick={startWrite}>
                  Write to disk
                </button>
              </>
            )}

            {written && (
              <>
                <p className="window-text ok-text">✓ 1 file written · hola-exe.sav</p>
                <textarea className="save-code" readOnly value={code} rows={3} onFocus={(e) => e.target.select()} />
                <div className="window-actions">
                  <button type="button" className="ghost-btn" onClick={copyCode}>
                    {copied ? '✓ copied' : 'Copy code'}
                  </button>
                  <button type="button" className="ghost-btn" onClick={() => downloadSave(code)}>
                    Download .sav
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {tab === 'read' && (
          <div className="window-body">
            {loaded ? (
              <p className="window-text ok-text">✓ save loaded — welcome back</p>
            ) : (
              <>
                <p className="window-text">paste a save code, or insert a .sav file. this replaces current progress.</p>
                <textarea
                  className="save-code"
                  placeholder="HOLA1:…"
                  value={readText}
                  rows={3}
                  onChange={(e) => {
                    setReadText(e.target.value)
                    setReadError(false)
                  }}
                />
                {readError && <p className="window-text error-text">✗ disk error: unreadable save code</p>}
                <div className="window-actions">
                  <button
                    type="button"
                    className="primary-btn"
                    disabled={!readText.trim()}
                    onClick={() => tryLoad(readText)}
                  >
                    Load
                  </button>
                  <button type="button" className="ghost-btn" onClick={() => fileRef.current?.click()}>
                    Insert .sav file
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".sav,text/plain"
                    hidden
                    onChange={(e) => onFilePicked(e.target.files?.[0])}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
