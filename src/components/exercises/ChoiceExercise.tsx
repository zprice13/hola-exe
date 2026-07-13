import { speakSpanish } from '../../lib/audio'

interface Props {
  prompt: string
  promptLang: 'es' | 'en'
  options: string[]
  correct: string
  speak?: string
  selected: string | null
  result: 'correct' | 'wrong' | null
  onSelect: (option: string) => void
}

export function ChoiceExercise({
  prompt,
  promptLang,
  options,
  correct,
  speak,
  selected,
  result,
  onSelect,
}: Props) {
  const locked = result !== null

  function optionClass(option: string): string {
    if (!locked) return selected === option ? 'selected' : ''
    // Once checked: always highlight the right answer; mark a wrong pick red
    if (option === correct) return 'correct'
    if (option === selected) return 'wrong'
    return 'dimmed'
  }

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
            className={`choice-btn ${optionClass(option)}`}
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
