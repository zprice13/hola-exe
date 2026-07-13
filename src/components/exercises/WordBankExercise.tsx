interface Props {
  prompt: string
  bankTokens: string[]
  /** Indexes into bankTokens, in the order the learner picked them */
  picked: number[]
  locked: boolean
  onPick: (index: number) => void
  onUnpick: (index: number) => void
}

export function WordBankExercise({ prompt, bankTokens, picked, locked, onPick, onUnpick }: Props) {
  return (
    <div className="exercise">
      <h2 className="exercise-title">Build the sentence in Spanish</h2>
      <div className="prompt-row">
        <span className="prompt-text">{prompt}</span>
      </div>
      <div className="answer-strip">
        {picked.length === 0 && <span className="answer-placeholder">Tap the words below</span>}
        {picked.map((index) => (
          <button
            key={index}
            type="button"
            className="token-btn"
            disabled={locked}
            onClick={() => onUnpick(index)}
          >
            {bankTokens[index]}
          </button>
        ))}
      </div>
      <div className="bank">
        {bankTokens.map((token, index) => (
          <button
            key={index}
            type="button"
            className={`token-btn ${picked.includes(index) ? 'used' : ''}`}
            disabled={locked || picked.includes(index)}
            onClick={() => onPick(index)}
          >
            {token}
          </button>
        ))}
      </div>
    </div>
  )
}
