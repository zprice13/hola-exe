import { useState } from 'react'
import type { Exercise } from './types'
import { course, findLesson } from './data/course'
import { buildExercises, buildPracticeSession } from './lib/exercises'
import { useProgress } from './lib/progress'
import { Home } from './components/Home'
import { LessonSession } from './components/LessonSession'
import { LessonComplete } from './components/LessonComplete'
import { BootScreen } from './components/BootScreen'
import { SaveModal } from './components/SaveModal'
import { DialogueScreen } from './components/DialogueScreen'

const DIALOGUE_XP = 10

type Screen =
  | { name: 'home' }
  | { name: 'session'; lessonId: string | null; exercises: Exercise[] }
  | { name: 'complete'; xpEarned: number; mistakes: number }
  | { name: 'outOfHearts' }
  | { name: 'dialogue'; unitId: string }

export default function App() {
  const {
    progress,
    loseHeart,
    completeLesson,
    refillHearts,
    replaceProgress,
    recordWordResult,
    markDialogueSeen,
  } = useProgress()
  const [screen, setScreen] = useState<Screen>({ name: 'home' })
  const [booting, setBooting] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [showSave, setShowSave] = useState(false)

  // Starting a session with no hearts would dead-end at the first mistake
  const startLesson = (lessonId: string) => {
    if (progress.hearts <= 0) {
      setScreen({ name: 'outOfHearts' })
      return
    }
    const found = findLesson(lessonId)
    if (found) setScreen({ name: 'session', lessonId, exercises: buildExercises(found.lesson, progress) })
  }

  const startPractice = () => {
    if (progress.hearts <= 0) {
      setScreen({ name: 'outOfHearts' })
      return
    }
    const exercises = buildPracticeSession(progress)
    if (exercises.length > 0) setScreen({ name: 'session', lessonId: null, exercises })
  }

  const overlays = (
    <>
      {booting && <BootScreen onDone={() => setBooting(false)} />}
      {showSave && (
        <SaveModal progress={progress} onImport={replaceProgress} onClose={() => setShowSave(false)} />
      )}
    </>
  )

  if (screen.name === 'dialogue') {
    const unit = course.find((u) => u.id === screen.unitId)
    if (unit) {
      return (
        <>
          <DialogueScreen
            unit={unit}
            onDone={() => {
              markDialogueSeen(unit.id, DIALOGUE_XP)
              setScreen({ name: 'home' })
            }}
            onQuit={() => setScreen({ name: 'home' })}
          />
          {overlays}
        </>
      )
    }
  }

  if (screen.name === 'session') {
    return (
      <>
        <LessonSession
          key={screen.lessonId ?? 'practice'}
          exercises={screen.exercises}
          hearts={progress.hearts}
          onLoseHeart={loseHeart}
          onWordResult={recordWordResult}
          onComplete={(xpEarned, mistakes) => {
            completeLesson(screen.lessonId, xpEarned)
            setScreen({ name: 'complete', xpEarned, mistakes })
          }}
          onQuit={() => setScreen({ name: 'home' })}
          onOutOfHearts={() => setScreen({ name: 'outOfHearts' })}
        />
        {overlays}
      </>
    )
  }

  if (screen.name === 'complete') {
    return (
      <>
        <LessonComplete
          xpEarned={screen.xpEarned}
          mistakes={screen.mistakes}
          onContinue={() => setScreen({ name: 'home' })}
        />
        {overlays}
      </>
    )
  }

  if (screen.name === 'outOfHearts') {
    return (
      <>
        <div className="complete-screen">
          <div className="complete-card">
            <div className="complete-glyph danger" aria-hidden="true">
              [♥ 0]
            </div>
            <h1>out of hearts</h1>
            <p className="complete-note">Hearts refill every day. For now, here's a freebie — keep practicing!</p>
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                refillHearts()
                setScreen({ name: 'home' })
              }}
            >
              Refill and go home
            </button>
          </div>
        </div>
        {overlays}
      </>
    )
  }

  const practiceReady = Object.values(progress.completedLessons).some((n) => n > 0)

  return (
    <>
      <Home
        progress={progress}
        onStartLesson={startLesson}
        onOpenSave={() => setShowSave(true)}
        onPractice={startPractice}
        practiceReady={practiceReady}
        onOpenDialogue={(unitId) => setScreen({ name: 'dialogue', unitId })}
      />
      {overlays}
    </>
  )
}
