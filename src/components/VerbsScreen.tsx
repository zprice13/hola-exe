import type { Progress } from '../types'
import { course } from '../data/course'
import { CONJUGATIONS } from '../data/conjugations'
import { speakSpanish } from '../lib/audio'

interface Props {
  progress: Progress
  onQuit: () => void
}

interface VerbEntry {
  verb: string
  unitTitle: string
  lessonTitle: string
  unlocked: boolean
}

function verbEntries(progress: Progress): VerbEntry[] {
  const entries: VerbEntry[] = []
  for (const unit of course) {
    for (const lesson of unit.lessons) {
      for (const verb of lesson.conjugates ?? []) {
        if (!CONJUGATIONS[verb]) continue
        entries.push({
          verb,
          unitTitle: unit.title,
          lessonTitle: lesson.title,
          unlocked: (progress.completedLessons[lesson.id] ?? 0) > 0,
        })
      }
    }
  }
  return entries
}

export function VerbsScreen({ progress, onQuit }: Props) {
  const entries = verbEntries(progress)

  return (
    <div className="lesson-screen">
      <header className="lesson-header">
        <div className="lesson-header-inner">
          <button type="button" className="quit-btn" onClick={onQuit} aria-label="Close verb tables">
            ✕
          </button>
          <span className="dialogue-title">verbs.dat — conjugation tables</span>
        </div>
      </header>

      <main className="lesson-body dialogue-body">
        <div className="lesson-body-inner">
          <div className="verb-list">
            {entries.map(({ verb, unitTitle, lessonTitle, unlocked }) => (
              <section key={verb} className={`verb-entry ${unlocked ? '' : 'locked'}`}>
                <div className="verb-heading">
                  <span className="verb-name">
                    {unlocked ? verb : `[░] ${verb}`}
                    <span className="verb-translation"> = {CONJUGATIONS[verb].translation}</span>
                  </span>
                  <span className="verb-source">
                    {unlocked ? `${unitTitle} · ${lessonTitle}` : `unlocks in ${unitTitle} · ${lessonTitle}`}
                  </span>
                </div>
                {unlocked && (
                  <div className="conj-table">
                    {CONJUGATIONS[verb].forms.map((form) => (
                      <button
                        key={form.es}
                        type="button"
                        className="conj-row"
                        onClick={() => speakSpanish(form.es)}
                        title="Play audio"
                      >
                        <span className="conj-pronoun">{form.pronoun}</span>
                        <span className="conj-es">{form.es}</span>
                        <span className="conj-en">{form.en}</span>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
          <p className="conj-hint">// tap a row to hear it · drills appear in PRACTICE.BIN</p>
        </div>
      </main>
    </div>
  )
}
