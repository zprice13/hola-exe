import { useMemo, useState } from 'react'
import { shuffle } from '../../lib/exercises'
import { speakSpanish } from '../../lib/audio'

interface Props {
  pairs: { es: string; en: string }[]
  onComplete: () => void
}

export function MatchExercise({ pairs, onComplete }: Props) {
  const esColumn = useMemo(() => shuffle(pairs.map((p) => p.es)), [pairs])
  const enColumn = useMemo(() => shuffle(pairs.map((p) => p.en)), [pairs])

  const [selectedEs, setSelectedEs] = useState<string | null>(null)
  const [selectedEn, setSelectedEn] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [shakeKey, setShakeKey] = useState(0)

  function tryMatch(es: string | null, en: string | null) {
    if (!es || !en) return
    const isPair = pairs.some((p) => p.es === es && p.en === en)
    if (isPair) {
      const next = new Set(matched)
      next.add(es)
      setMatched(next)
      if (next.size === pairs.length) {
        // Brief pause so the last match is visible before advancing
        setTimeout(onComplete, 400)
      }
    } else {
      setShakeKey((k) => k + 1)
    }
    setSelectedEs(null)
    setSelectedEn(null)
  }

  function pickEs(es: string) {
    speakSpanish(es)
    setSelectedEs(es)
    tryMatch(es, selectedEn)
  }

  function pickEn(en: string) {
    setSelectedEn(en)
    tryMatch(selectedEs, en)
  }

  function isEsMatched(es: string) {
    return matched.has(es)
  }
  function isEnMatched(en: string) {
    const pair = pairs.find((p) => p.en === en)
    return pair ? matched.has(pair.es) : false
  }

  return (
    <div className="exercise">
      <h2 className="exercise-title">Match the pairs</h2>
      <div className="match-grid" key={shakeKey}>
        <div className="match-column">
          {esColumn.map((es) => (
            <button
              key={es}
              type="button"
              className={`match-btn ${selectedEs === es ? 'selected' : ''} ${isEsMatched(es) ? 'matched' : ''}`}
              disabled={isEsMatched(es)}
              onClick={() => pickEs(es)}
            >
              {es}
            </button>
          ))}
        </div>
        <div className="match-column">
          {enColumn.map((en) => (
            <button
              key={en}
              type="button"
              className={`match-btn ${selectedEn === en ? 'selected' : ''} ${isEnMatched(en) ? 'matched' : ''}`}
              disabled={isEnMatched(en)}
              onClick={() => pickEn(en)}
            >
              {en}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
