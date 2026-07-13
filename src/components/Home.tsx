import type { Progress } from '../types'
import { course } from '../data/course'
import { isLessonUnlocked } from '../lib/progress'
import { FloppyIcon } from './SaveModal'

interface Props {
  progress: Progress
  onStartLesson: (lessonId: string) => void
  onOpenSave: () => void
}

export function Home({ progress, onStartLesson, onOpenSave }: Props) {
  return (
    <div className="home">
      <header className="stats-bar">
        <button type="button" className="stat save-chip" onClick={onOpenSave} aria-label="Save and load progress">
          <FloppyIcon size={15} /> save
        </button>
        <span className="stat" role="img" aria-label={`${progress.streak} day streak`} title="Day streak">
          <span className="stat-key">streak</span> {progress.streak}
        </span>
        <span className="stat" role="img" aria-label={`${progress.xp} XP`} title="Total XP">
          <span className="stat-key">xp</span> {progress.xp}
        </span>
        <span className="stat" role="img" aria-label={`${progress.hearts} hearts`} title="Hearts">
          <span className="stat-key">♥</span> {progress.hearts}
        </span>
      </header>

      <h1 className="app-title">
        <span className="title-prompt">&gt; </span>hola.exe<span className="cursor">_</span>
      </h1>
      <p className="app-subtitle">// select a lesson to begin transmission</p>

      <div className="units">
        {course.map((unit, unitIndex) => (
          <section key={unit.id} className="unit" style={{ ['--unit-color' as string]: unit.color }}>
            <div className="unit-header">
              <span className="unit-index">UNIT {String(unitIndex + 1).padStart(2, '0')}</span>
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
                    <span className="lesson-icon" aria-hidden="true">
                      {unlocked ? (completions > 0 ? '[✓]' : '[▸]') : '[░]'}
                    </span>
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
