import type { Progress } from '../types'
import { course } from '../data/course'
import { isLessonUnlocked } from '../lib/progress'

interface Props {
  progress: Progress
  onStartLesson: (lessonId: string) => void
}

export function Home({ progress, onStartLesson }: Props) {
  return (
    <div className="home">
      <header className="stats-bar">
        <span className="stat" title="Day streak">
          🔥 {progress.streak}
        </span>
        <span className="stat" title="Total XP">
          ⚡ {progress.xp} XP
        </span>
        <span className="stat" title="Hearts">
          ❤️ {progress.hearts}
        </span>
      </header>

      <h1 className="app-title">¡Hola! Learn Spanish</h1>
      <p className="app-subtitle">Pick a lesson to start earning XP</p>

      <div className="units">
        {course.map((unit) => (
          <section key={unit.id} className="unit" style={{ ['--unit-color' as string]: unit.color }}>
            <div className="unit-header">
              <h2>{unit.title}</h2>
              <p>{unit.description}</p>
            </div>
            <div className="lesson-row">
              {unit.lessons.map((lesson) => {
                const unlocked = isLessonUnlocked(progress, lesson.id)
                const completions = progress.completedLessons[lesson.id] ?? 0
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    className={`lesson-node ${unlocked ? '' : 'locked'} ${completions > 0 ? 'done' : ''}`}
                    disabled={!unlocked}
                    onClick={() => onStartLesson(lesson.id)}
                  >
                    <span className="lesson-icon">{unlocked ? (completions > 0 ? '👑' : '★') : '🔒'}</span>
                    <span className="lesson-name">{lesson.title}</span>
                    {completions > 0 && <span className="lesson-crowns">×{completions}</span>}
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
