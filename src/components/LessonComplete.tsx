interface Props {
  xpEarned: number
  mistakes: number
  onContinue: () => void
}

export function LessonComplete({ xpEarned, mistakes, onContinue }: Props) {
  return (
    <div className="complete-screen">
      <div className="complete-card">
        <div className="complete-emoji">🎉</div>
        <h1>Lesson complete!</h1>
        <div className="complete-stats">
          <div className="complete-stat">
            <span className="complete-stat-label">XP earned</span>
            <span className="complete-stat-value">⚡ {xpEarned}</span>
          </div>
          <div className="complete-stat">
            <span className="complete-stat-label">Accuracy</span>
            <span className="complete-stat-value">{mistakes === 0 ? 'Perfect! 💯' : `${mistakes} mistake${mistakes === 1 ? '' : 's'}`}</span>
          </div>
        </div>
        <button type="button" className="primary-btn" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  )
}
