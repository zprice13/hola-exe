import type { Exercise, Lesson, VocabItem } from '../types'
import { course } from '../data/course'

export function shuffle<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pickDistractors(correct: VocabItem, lang: 'es' | 'en', count: number): string[] {
  const pool = course
    .flatMap((u) => u.lessons)
    .flatMap((l) => l.vocab)
    .map((v) => v[lang])
    .filter((text) => text !== correct[lang])
  return shuffle([...new Set(pool)]).slice(0, count)
}

function tokenize(sentence: string): string[] {
  return sentence
    .split(/\s+/)
    .map((t) => t.replace(/^[,.!?¿¡]+|[,.!?¿¡]+$/g, ''))
    .filter(Boolean)
}

function wordBankDistractors(answerTokens: string[], count: number): string[] {
  const pool = course
    .flatMap((u) => u.lessons)
    .flatMap((l) => l.sentences)
    .flatMap((s) => tokenize(s.es))
    .filter((t) => !answerTokens.includes(t))
  return shuffle([...new Set(pool)]).slice(0, count)
}

/** Build a shuffled exercise sequence for one lesson session. */
export function buildExercises(lesson: Lesson): Exercise[] {
  const exercises: Exercise[] = []

  for (const item of lesson.vocab) {
    // Alternate direction: recognize Spanish, then produce Spanish
    const esToEn = Math.random() < 0.5
    if (esToEn) {
      exercises.push({
        type: 'choice',
        prompt: item.es,
        promptLang: 'es',
        correct: item.en,
        options: shuffle([item.en, ...pickDistractors(item, 'en', 3)]),
        speak: item.es,
      })
    } else {
      exercises.push({
        type: 'choice',
        prompt: item.en,
        promptLang: 'en',
        correct: item.es,
        options: shuffle([item.es, ...pickDistractors(item, 'es', 3)]),
      })
    }
  }

  for (const sentence of lesson.sentences) {
    const answerTokens = tokenize(sentence.es)
    exercises.push({
      type: 'wordBank',
      prompt: sentence.en,
      answerTokens,
      bankTokens: shuffle([...answerTokens, ...wordBankDistractors(answerTokens, 3)]),
      speak: sentence.es,
    })
  }

  if (lesson.sentences.length > 0) {
    const target = lesson.sentences[Math.floor(Math.random() * lesson.sentences.length)]
    exercises.push({
      type: 'type',
      prompt: target.es,
      answer: target.en,
      speak: target.es,
    })
  }

  const shuffled = shuffle(exercises)
  // Matching makes a good warm-up, so it always leads the session
  shuffled.unshift({
    type: 'match',
    pairs: shuffle(lesson.vocab).slice(0, 5),
  })
  return shuffled
}

/** Lenient comparison for typed answers: case, punctuation and extra spaces don't matter. */
export function answersMatch(expected: string, actual: string): boolean {
  return normalize(expected) === normalize(actual)
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[,.!?¿¡'’"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
