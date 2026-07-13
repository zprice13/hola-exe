import { useState } from 'react'
import { findLesson } from './data/course'
import { useProgress } from './lib/progress'
import { Home } from './components/Home'
import { LessonSession } from './components/LessonSession'
import { LessonComplete } from './components/LessonComplete'

type Screen =
  | { name: 'home' }
  | { name: 'lesson'; lessonId: string }
  | { name: 'complete'; xpEarned: number; mistakes: number }
  | { name: 'outOfHearts' }

export default function App() {
  const { progress, loseHeart, completeLesson, refillHearts } = useProgress()
  const [screen, setScreen] = useState<Screen>({ name: 'home' })

  // Starting a lesson with no hearts would dead-end at the first mistake
  const startLesson = (lessonId: string) =>
    setScreen(progress.hearts > 0 ? { name: 'lesson', lessonId } : { name: 'outOfHearts' })

  if (screen.name === 'lesson') {
    const found = findLesson(screen.lessonId)
    if (!found) {
      return <Home progress={progress} onStartLesson={startLesson} />
    }
    return (
      <LessonSession
        lesson={found.lesson}
        hearts={progress.hearts}
        onLoseHeart={loseHeart}
        onComplete={(xpEarned, mistakes) => {
          completeLesson(screen.lessonId, xpEarned)
          setScreen({ name: 'complete', xpEarned, mistakes })
        }}
        onQuit={() => setScreen({ name: 'home' })}
        onOutOfHearts={() => setScreen({ name: 'outOfHearts' })}
      />
    )
  }

  if (screen.name === 'complete') {
    return (
      <LessonComplete
        xpEarned={screen.xpEarned}
        mistakes={screen.mistakes}
        onContinue={() => setScreen({ name: 'home' })}
      />
    )
  }

  if (screen.name === 'outOfHearts') {
    return (
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
    )
  }

  return <Home progress={progress} onStartLesson={startLesson} />
}
