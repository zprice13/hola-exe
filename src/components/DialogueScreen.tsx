import { useEffect, useRef, useState } from 'react'
import type { Unit } from '../types'
import { speakSpanish } from '../lib/audio'
import { PORTRAITS } from './portraits'

interface Props {
  unit: Unit
  onDone: () => void
  onQuit: () => void
}

const NAMES: Record<string, string> = { rosana: 'ROSANA', leo: 'LEO' }

export function DialogueScreen({ unit, onDone, onQuit }: Props) {
  const [shown, setShown] = useState(1)
  const endRef = useRef<HTMLDivElement>(null)
  const lines = unit.dialogue
  const finished = shown >= lines.length

  function speakLine(index: number) {
    const line = lines[index]
    if (line) speakSpanish(line.es, { speaker: line.speaker })
  }

  // Voice each line as it appears, and keep the newest line in view
  useEffect(() => {
    speakLine(shown - 1)
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown])

  return (
    <div className="lesson-screen">
      <header className="lesson-header">
        <div className="lesson-header-inner">
          <button type="button" className="quit-btn" onClick={onQuit} aria-label="Close dialogue">
            ✕
          </button>
          <span className="dialogue-title" style={{ ['--unit-color' as string]: unit.color }}>
            {unit.id}.log — {unit.title}
          </span>
        </div>
      </header>

      <main className="lesson-body dialogue-body">
        <div className="lesson-body-inner">
          <div className="portrait-stage" aria-hidden="true">
            <pre key={lines[shown - 1].speaker} className={`portrait ${lines[shown - 1].speaker}`}>
              {PORTRAITS[lines[shown - 1].speaker]}
            </pre>
            <span className={`portrait-name ${lines[shown - 1].speaker}`}>
              {NAMES[lines[shown - 1].speaker]}
            </span>
          </div>
          <div className="dialogue-lines">
            {lines.slice(0, shown).map((line, i) => (
              <button
                key={i}
                type="button"
                className={`bubble ${line.speaker}`}
                onClick={() => speakLine(i)}
                title="Replay audio"
              >
                <span className="bubble-speaker">{NAMES[line.speaker]}</span>
                <span className="bubble-es">{line.es}</span>
                <span className="bubble-en">{line.en}</span>
              </button>
            ))}
            <div ref={endRef} />
          </div>
        </div>
      </main>

      <footer className="lesson-footer">
        <div className="lesson-footer-inner">
          <button
            type="button"
            className="primary-btn"
            onClick={() => (finished ? onDone() : setShown((n) => n + 1))}
          >
            {finished ? 'Done' : 'Next'}
          </button>
        </div>
      </footer>
    </div>
  )
}
