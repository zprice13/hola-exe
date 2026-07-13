import { useMemo, useState } from 'react'
import type { Exercise, Lesson } from '../types'
import { answersMatch, buildExercises } from '../lib/exercises'
import { speakSpanish } from '../lib/audio'
import { ChoiceExercise } from './exercises/ChoiceExercise'
import { WordBankExercise } from './exercises/WordBankExercise'
import { MatchExercise } from './exercises/MatchExercise'
import { TypeExercise } from './exercises/TypeExercise'

export const XP_PER_EXERCISE = 10
export const PERFECT_BONUS = 20

interface Props {
  lesson: Lesson
  hearts: number
  onLoseHeart: () => void
  onComplete: (xpEarned: number, mistakes: number) => void
  onQuit: () => void
  onOutOfHearts: () => void
}

type Feedback = { status: 'correct' } | { status: 'incorrect'; correctAnswer: string } | null

export function LessonSession({ lesson, hearts, onLoseHeart, onComplete, onQuit, onOutOfHearts }: Props) {
  const initialQueue = useMemo(() => buildExercises(lesson), [lesson])
  const [queue, setQueue] = useState<Exercise[]>(initialQueue)
  const [position, setPosition] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [feedback, setFeedback] = useState<Feedback>(null)

  // Per-exercise answer state
  const [choiceSelected, setChoiceSelected] = useState<string | null>(null)
  const [pickedTokens, setPickedTokens] = useState<number[]>([])
  const [typedAnswer, setTypedAnswer] = useState('')

  const current = queue[position]
  const total = queue.length
  const progressPct = Math.round((position / total) * 100)

  function resetAnswerState() {
    setChoiceSelected(null)
    setPickedTokens([])
    setTypedAnswer('')
    setFeedback(null)
  }

  function advance() {
    if (position + 1 >= queue.length) {
      const xp = initialQueue.length * XP_PER_EXERCISE + (mistakes === 0 ? PERFECT_BONUS : 0)
      onComplete(xp, mistakes)
      return
    }
    setPosition(position + 1)
    resetAnswerState()
  }

  function handleWrong(correctAnswer: string) {
    setFeedback({ status: 'incorrect', correctAnswer })
    setMistakes((m) => m + 1)
    onLoseHeart()
    // Missed exercises come back at the end of the session, Duolingo-style
    setQueue((q) => [...q, current])
  }

  function check() {
    if (!current || feedback) return
    switch (current.type) {
      case 'choice': {
        if (!choiceSelected) return
        if (choiceSelected === current.correct) {
          setFeedback({ status: 'correct' })
        } else {
          handleWrong(current.correct)
        }
        break
      }
      case 'wordBank': {
        const attempt = pickedTokens.map((i) => current.bankTokens[i]).join(' ')
        const expected = current.answerTokens.join(' ')
        if (answersMatch(expected, attempt)) {
          if (current.speak) speakSpanish(current.speak)
          setFeedback({ status: 'correct' })
        } else {
          handleWrong(expected)
        }
        break
      }
      case 'type': {
        if (!typedAnswer.trim()) return
        if (answersMatch(current.answer, typedAnswer)) {
          setFeedback({ status: 'correct' })
        } else {
          handleWrong(current.answer)
        }
        break
      }
    }
  }

  function continueAfterFeedback() {
    if (feedback?.status === 'incorrect' && hearts <= 0) {
      onOutOfHearts()
      return
    }
    advance()
  }

  if (!current) return null

  const canCheck =
    current.type === 'choice'
      ? choiceSelected !== null
      : current.type === 'wordBank'
        ? pickedTokens.length > 0
        : current.type === 'type'
          ? typedAnswer.trim().length > 0
          : false

  return (
    <div className="lesson-screen">
      <header className="lesson-header">
        <button type="button" className="quit-btn" onClick={onQuit} aria-label="Quit lesson">
          ✕
        </button>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="hearts" aria-label={`${hearts} hearts left`}>
          ❤️ {hearts}
        </div>
      </header>

      <main className="lesson-body">
        {current.type === 'choice' && (
          <ChoiceExercise
            prompt={current.prompt}
            promptLang={current.promptLang}
            options={current.options}
            speak={current.speak}
            selected={choiceSelected}
            locked={feedback !== null}
            onSelect={setChoiceSelected}
          />
        )}
        {current.type === 'wordBank' && (
          <WordBankExercise
            prompt={current.prompt}
            bankTokens={current.bankTokens}
            picked={pickedTokens}
            locked={feedback !== null}
            onPick={(i) => setPickedTokens((p) => [...p, i])}
            onUnpick={(i) => setPickedTokens((p) => p.filter((x) => x !== i))}
          />
        )}
        {current.type === 'match' && (
          <MatchExercise key={position} pairs={current.pairs} onComplete={advance} />
        )}
        {current.type === 'type' && (
          <TypeExercise
            prompt={current.prompt}
            speak={current.speak}
            value={typedAnswer}
            locked={feedback !== null}
            onChange={setTypedAnswer}
            onSubmit={check}
          />
        )}
      </main>

      {current.type !== 'match' && (
        <footer className={`lesson-footer ${feedback ? feedback.status : ''}`}>
          {feedback === null ? (
            <button type="button" className="primary-btn" disabled={!canCheck} onClick={check}>
              Check
            </button>
          ) : (
            <div className="feedback-row">
              <div className="feedback-text">
                {feedback.status === 'correct' ? (
                  <strong>Nice job! ✅</strong>
                ) : (
                  <>
                    <strong>Correct answer:</strong> {feedback.correctAnswer}
                  </>
                )}
              </div>
              <button type="button" className="primary-btn" onClick={continueAfterFeedback}>
                Continue
              </button>
            </div>
          )}
        </footer>
      )}
    </div>
  )
}
