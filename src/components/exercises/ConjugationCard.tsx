import { speakSpanish } from '../../lib/audio'

interface Props {
  verb: string
  translation: string
  forms: { pronoun: string; es: string; en: string }[]
}

export function ConjugationCard({ verb, translation, forms }: Props) {
  return (
    <div className="exercise intro-card">
      <span className="new-chip">[ VERB TABLE ]</span>
      <div className="prompt-row intro-word-row">
        <button type="button" className="speaker-btn" onClick={() => speakSpanish(verb)} aria-label="Play audio">
          ►))
        </button>
        <span className="intro-es">{verb}</span>
      </div>
      <div className="intro-en">{translation}</div>
      <div className="conj-table" role="table">
        {forms.map((form) => (
          <button
            key={form.es}
            type="button"
            className="conj-row"
            onClick={() => speakSpanish(form.es)}
            title="Play audio"
          >
            <span className="conj-pronoun">{form.pronoun}</span>
            <span className="conj-es">{form.es}</span>
            <span className="conj-en">{form.en}</span>
          </button>
        ))}
      </div>
      <p className="conj-hint">// tap a row to hear it</p>
    </div>
  )
}
