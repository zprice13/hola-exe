import type { Exercise, Lesson, Progress, SentenceItem, VocabItem } from '../types'
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
    .map((t) => t.replace(/^[,.!?¿¡—]+|[,.!?¿¡—]+$/g, ''))
    .filter(Boolean)
}

// Bare subject pronouns are excluded as distractors: Spanish drops them freely,
// so offering "yo" next to "quiero..." would make a second correct answer possible.
const PRONOUN_DISTRACTORS = new Set(['yo', 'tú', 'él', 'ella', 'nosotros', 'ellos'])

function wordBankDistractors(answerTokens: string[], count: number): string[] {
  const pool = course
    .flatMap((u) => u.lessons)
    .flatMap((l) => l.sentences)
    .flatMap((s) => tokenize(s.es))
    .filter((t) => !answerTokens.includes(t) && !PRONOUN_DISTRACTORS.has(t))
  return shuffle([...new Set(pool)]).slice(0, count)
}

function choiceExercise(item: VocabItem): Exercise {
  // Alternate direction: recognize Spanish, or produce Spanish
  const esToEn = Math.random() < 0.5
  if (esToEn) {
    return {
      type: 'choice',
      prompt: item.es,
      promptLang: 'es',
      correct: item.en,
      options: shuffle([item.en, ...pickDistractors(item, 'en', 3)]),
      speak: item.es,
      key: item.es,
    }
  }
  return {
    type: 'choice',
    prompt: item.en,
    promptLang: 'en',
    correct: item.es,
    options: shuffle([item.es, ...pickDistractors(item, 'es', 3)]),
    key: item.es,
  }
}

function wordBankExercise(sentence: SentenceItem): Exercise {
  const answerTokens = tokenize(sentence.es)
  return {
    type: 'wordBank',
    prompt: sentence.en,
    answerTokens,
    bankTokens: shuffle([...answerTokens, ...wordBankDistractors(answerTokens, 3)]),
    accept: [answerTokens.join(' '), ...(sentence.esAlt ?? [])],
    display: sentence.es,
    speak: sentence.es,
    key: sentence.es,
  }
}

function typeExercise(sentence: SentenceItem): Exercise {
  return {
    type: 'type',
    prompt: sentence.es,
    answers: [sentence.en, ...(sentence.enAlt ?? [])],
    speak: sentence.es,
    key: sentence.es,
  }
}

/** Items whose Spanish and English are identical (e.g. "no") carry zero
 *  information as recognition exercises, so they only appear inside sentences. */
function askable(vocab: VocabItem[]): VocabItem[] {
  return vocab.filter((v) => v.es !== v.en)
}

/** Build a shuffled exercise sequence for one lesson session. */
export function buildExercises(lesson: Lesson): Exercise[] {
  const exercises: Exercise[] = []
  const askableVocab = askable(lesson.vocab)

  for (const item of askableVocab) exercises.push(choiceExercise(item))
  for (const sentence of lesson.sentences) exercises.push(wordBankExercise(sentence))

  if (lesson.sentences.length > 0) {
    const target = lesson.sentences[Math.floor(Math.random() * lesson.sentences.length)]
    exercises.push(typeExercise(target))
  }

  const shuffled = shuffle(exercises)
  // Matching makes a good warm-up, so it always leads the session
  const matchable = askableVocab.length >= 3 ? askableVocab : lesson.vocab
  shuffled.unshift({
    type: 'match',
    pairs: shuffle(matchable).slice(0, 5),
  })
  return shuffled
}

/** Weighted sample without replacement. */
function weightedSample<T>(items: T[], weightOf: (item: T) => number, count: number): T[] {
  const pool = [...items]
  const picked: T[] = []
  while (picked.length < count && pool.length > 0) {
    const weights = pool.map(weightOf)
    const total = weights.reduce((a, b) => a + b, 0)
    let roll = Math.random() * total
    let index = 0
    for (; index < pool.length - 1; index++) {
      roll -= weights[index]
      if (roll <= 0) break
    }
    picked.push(pool.splice(index, 1)[0])
  }
  return picked
}

/**
 * Build a practice session from completed lessons, weighted toward words the
 * learner has missed most (and words never drilled). Returns [] if nothing is
 * completed yet.
 */
export function buildPracticeSession(progress: Progress, size = 8): Exercise[] {
  const done = new Set(
    Object.entries(progress.completedLessons)
      .filter(([, n]) => n > 0)
      .map(([id]) => id),
  )
  const lessons = course.flatMap((u) => u.lessons).filter((l) => done.has(l.id))
  const vocab = askable(lessons.flatMap((l) => l.vocab))
  if (vocab.length === 0) return []

  const weightOf = (item: VocabItem) => {
    const stats = progress.wordStats[item.es]
    if (!stats) return 3 // never drilled — prime practice material
    return Math.max(0.5, 1 + stats.missed * 3 - stats.seen * 0.2)
  }

  const picked = weightedSample(vocab, weightOf, size)
  const exercises: Exercise[] = picked.map(choiceExercise)

  const sentences = lessons.flatMap((l) => l.sentences)
  const sentenceWeight = (s: SentenceItem) => {
    const stats = progress.wordStats[s.es]
    return stats ? Math.max(0.5, 1 + stats.missed * 3 - stats.seen * 0.2) : 2
  }
  for (const sentence of weightedSample(sentences, sentenceWeight, 2)) {
    exercises.push(wordBankExercise(sentence))
  }

  const shuffled = shuffle(exercises)
  shuffled.unshift({
    type: 'match',
    pairs: shuffle(picked).slice(0, Math.min(5, picked.length)),
  })
  return shuffled
}

/** Lenient comparison for typed answers: case, punctuation and extra spaces don't matter. */
export function answersMatch(expected: string, actual: string): boolean {
  return normalize(expected) === normalize(actual)
}

/** True if the attempt matches any accepted answer. */
export function anyAnswerMatches(accepted: string[], actual: string): boolean {
  return accepted.some((a) => answersMatch(a, actual))
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[,.!?¿¡'’"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
