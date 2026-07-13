interface Props {
  xpEarned: number
  mistakes: number
  onContinue: () => void
}

export function LessonComplete({ xpEarned, mistakes, onContinue }: Props) {
  return (
    <div className="complete-screen">
      <div className="complete-card">
        <div className="complete-glyph" aria-hidden="true">
          [✓]
        </div>
        <h1>
          lesson complete<span className="cursor">_</span>
        </h1>
        <div className="complete-stats">
          <div className="complete-stat">
            <span className="complete-stat-label">xp earned</span>
            <span className="complete-stat-value">+{xpEarned}</span>
          </div>
          <div className="complete-stat">
            <span className="complete-stat-label">accuracy</span>
            <span className="complete-stat-value">
              {mistakes === 0 ? '100% ✓' : `${mistakes} miss${mistakes === 1 ? '' : 'es'}`}
            </span>
          </div>
        </div>
        <button type="button" className="primary-btn" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  )
}
