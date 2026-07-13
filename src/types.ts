export interface VocabItem {
  es: string
  en: string
}

export interface SentenceItem {
  es: string
  en: string
  /** Alternate English translations accepted in typed exercises */
  enAlt?: string[]
  /** Alternate Spanish token sequences (punctuation-free) accepted in word-bank exercises */
  esAlt?: string[]
}

export interface Lesson {
  id: string
  title: string
  vocab: VocabItem[]
  sentences: SentenceItem[]
}

export interface Unit {
  id: string
  title: string
  description: string
  color: string
  lessons: Lesson[]
}

export type Exercise =
  | {
      type: 'choice'
      /** Text shown to the learner */
      prompt: string
      /** Language of the prompt, so we know which direction we're translating */
      promptLang: 'es' | 'en'
      correct: string
      options: string[]
      /** Spanish text to speak aloud, if any */
      speak?: string
    }
  | {
      type: 'wordBank'
      prompt: string
      answerTokens: string[]
      bankTokens: string[]
      /** All accepted token sequences, as space-joined strings (primary answer first) */
      accept: string[]
      /** The original Spanish sentence, with punctuation, for display */
      display: string
      speak?: string
    }
  | {
      type: 'match'
      pairs: { es: string; en: string }[]
    }
  | {
      type: 'type'
      prompt: string
      /** All accepted English translations (primary answer first) */
      answers: string[]
      speak?: string
    }

export interface Progress {
  xp: number
  hearts: number
  streak: number
  /** ISO date (YYYY-MM-DD) of the last day a lesson was completed */
  lastActiveDate: string | null
  /** ISO date hearts were last refilled */
  lastHeartRefill: string | null
  completedLessons: Record<string, number> // lessonId -> times completed
}
