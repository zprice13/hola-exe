import { speakSpanish } from '../../lib/audio'

interface Props {
  prompt: string
  speak?: string
  value: string
  locked: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export function TypeExercise({ prompt, speak, value, locked, onChange, onSubmit }: Props) {
  return (
    <div className="exercise">
      <h2 className="exercise-title">Write this in English</h2>
      <div className="prompt-row">
        {speak && (
          <button type="button" className="speaker-btn" onClick={() => speakSpanish(speak)} aria-label="Play audio">
            🔊
          </button>
        )}
        <span className="prompt-text">{prompt}</span>
      </div>
      <textarea
        className="type-input"
        placeholder="Type your answer in English"
        value={value}
        disabled={locked}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (value.trim()) onSubmit()
          }
        }}
      />
    </div>
  )
}
