import { useRef, useState } from 'react'
import type { Exercise } from '../types'
import { anyAnswerMatches } from '../lib/exercises'
import { speakSpanish } from '../lib/audio'
import { ChoiceExercise } from './exercises/ChoiceExercise'
import { WordBankExercise } from './exercises/WordBankExercise'
import { MatchExercise } from './exercises/MatchExercise'
import { TypeExercise } from './exercises/TypeExercise'
import { IntroCard } from './exercises/IntroCard'
import { ConjugationCard } from './exercises/ConjugationCard'

export const XP_PER_EXERCISE = 10
export const PERFECT_BONUS = 20

interface Props {
  exercises: Exercise[]
  hearts: number
  onLoseHeart: () => void
  onComplete: (xpEarned: number, mistakes: number) => void
  onQuit: () => void
  onOutOfHearts: () => void
  onWordResult?: (key: string, correct: boolean) => void
}

type Feedback = { status: 'correct' } | { status: 'incorrect'; correctAnswer: string } | null

export function LessonSession({
  exercises,
  hearts,
  onLoseHeart,
  onComplete,
  onQuit,
  onOutOfHearts,
  onWordResult,
}: Props) {
  const [queue, setQueue] = useState<Exercise[]>(exercises)
  // Teaching cards can't be answered, so they don't pay XP
  const [initialLength] = useState(
    queue.filter((e) => e.type !== 'intro' && e.type !== 'conjugation').length,
  )
  const [position, setPosition] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [feedback, setFeedback] = useState<Feedback>(null)

  // Per-exercise answer state
  const [choiceSelected, setChoiceSelected] = useState<string | null>(null)
  const [pickedTokens, setPickedTokens] = useState<number[]>([])
  const [typedAnswer, setTypedAnswer] = useState('')

  const current = queue[position]

  // Progress counts the current exercise once it's answered correctly (so the
  // bar hits 100% during the final green footer) and never moves backwards
  // even though mistakes grow the queue.
  const answered = feedback?.status === 'correct' ? position + 1 : position
  const rawPct = (answered / queue.length) * 100
  const maxPctRef = useRef(0)
  maxPctRef.current = Math.max(maxPctRef.current, rawPct)
  const progressPct = Math.round(maxPctRef.current)

  function resetAnswerState() {
    setChoiceSelected(null)
    setPickedTokens([])
    setTypedAnswer('')
    setFeedback(null)
  }

  function advance() {
    if (position + 1 >= queue.length) {
      const xp = initialLength * XP_PER_EXERCISE + (mistakes === 0 ? PERFECT_BONUS : 0)
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

  function report(correct: boolean) {
    if (current && 'key' in current && current.key && onWordResult) {
      onWordResult(current.key, correct)
    }
  }

  function check() {
    if (!current || feedback) return
    switch (current.type) {
      case 'choice': {
        if (!choiceSelected) return
        const correct = choiceSelected === current.correct
        report(correct)
        if (correct) {
          setFeedback({ status: 'correct' })
        } else {
          handleWrong(current.correct)
        }
        break
      }
      case 'wordBank': {
        const attempt = pickedTokens.map((i) => current.bankTokens[i]).join(' ')
        const correct = anyAnswerMatches(current.accept, attempt)
        report(correct)
        if (correct) {
          if (current.speak) speakSpanish(current.speak)
          setFeedback({ status: 'correct' })
        } else {
          handleWrong(current.display)
        }
        break
      }
      case 'type': {
        if (!typedAnswer.trim()) return
        const correct = anyAnswerMatches(current.answers, typedAnswer)
        report(correct)
        if (correct) {
          setFeedback({ status: 'correct' })
        } else {
          handleWrong(current.answers[0])
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

  const result = feedback === null ? null : feedback.status === 'correct' ? 'correct' : 'wrong'

  return (
    <div className="lesson-screen">
      <header className="lesson-header">
        <div className="lesson-header-inner">
          <button type="button" className="quit-btn" onClick={onQuit} aria-label="Quit lesson">
            ✕
          </button>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Lesson progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPct}
          >
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="hearts" role="img" aria-label={`${hearts} hearts left`}>
            ♥ {hearts}
          </div>
        </div>
      </header>

      <main className="lesson-body">
        <div className="lesson-body-inner">
          {current.type === 'intro' && (
            <IntroCard es={current.es} en={current.en} example={current.example} />
          )}
          {current.type === 'conjugation' && (
            <ConjugationCard verb={current.verb} translation={current.translation} forms={current.forms} />
          )}
          {current.type === 'choice' && (
            <ChoiceExercise
              prompt={current.prompt}
              promptLang={current.promptLang}
              options={current.options}
              correct={current.correct}
              speak={current.speak}
              selected={choiceSelected}
              result={result}
              onSelect={setChoiceSelected}
            />
          )}
          {current.type === 'wordBank' && (
            <WordBankExercise
              prompt={current.prompt}
              bankTokens={current.bankTokens}
              picked={pickedTokens}
              result={result}
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
        </div>
      </main>

      <footer className={`lesson-footer ${feedback ? feedback.status : ''}`}>
        <div className="lesson-footer-inner">
          {feedback === null ? (
            current.type === 'intro' || current.type === 'conjugation' ? (
              <button type="button" className="primary-btn" onClick={advance}>
                Got it
              </button>
            ) : (
              <button
                type="button"
                className="primary-btn"
                disabled={!canCheck || current.type === 'match'}
                onClick={check}
              >
                {current.type === 'match' ? 'Match all pairs' : 'Check'}
              </button>
            )
          ) : (
            <div className="feedback-row">
              <div className="feedback-text" role="status">
                {feedback.status === 'correct' ? (
                  <strong>✓ correct</strong>
                ) : (
                  <>
                    <strong>✗ correct answer:</strong> {feedback.correctAnswer}
                  </>
                )}
              </div>
              <button type="button" className="primary-btn" onClick={continueAfterFeedback}>
                Continue
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
