import { speakSpanish } from '../../lib/audio'

interface Props {
  prompt: string
  promptLang: 'es' | 'en'
  options: string[]
  speak?: string
  selected: string | null
  locked: boolean
  onSelect: (option: string) => void
}

export function ChoiceExercise({ prompt, promptLang, options, speak, selected, locked, onSelect }: Props) {
  return (
    <div className="exercise">
      <h2 className="exercise-title">
        {promptLang === 'es' ? 'What does this mean?' : 'Translate into Spanish'}
      </h2>
      <div className="prompt-row">
        {speak && (
          <button type="button" className="speaker-btn" onClick={() => speakSpanish(speak)} aria-label="Play audio">
            🔊
          </button>
        )}
        <span className="prompt-text">{prompt}</span>
      </div>
      <div className="choice-grid">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`choice-btn ${selected === option ? 'selected' : ''}`}
            disabled={locked}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
