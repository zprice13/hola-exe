import { useEffect } from 'react'
import { speakSpanish } from '../../lib/audio'

interface Props {
  es: string
  en: string
  example?: { es: string; en: string }
}

export function IntroCard({ es, en, example }: Props) {
  // Hear the word as soon as it's introduced
  useEffect(() => {
    speakSpanish(es)
  }, [es])

  return (
    <div className="exercise intro-card">
      <span className="new-chip">[ NEW WORD ]</span>
      <div className="prompt-row intro-word-row">
        <button type="button" className="speaker-btn" onClick={() => speakSpanish(es)} aria-label="Play audio">
          ►))
        </button>
        <span className="intro-es">{es}</span>
      </div>
      <div className="intro-en">{en}</div>
      {example && (
        <div className="intro-example">
          <span className="intro-example-es">“{example.es}”</span>
          <span className="intro-example-en">{example.en}</span>
        </div>
      )}
    </div>
  )
}
