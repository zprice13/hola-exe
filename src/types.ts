export interface VocabItem {
  es: string
  en: string
}

export interface SentenceItem {
  es: string
  en: string
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
      speak?: string
    }
  | {
      type: 'match'
      pairs: { es: string; en: string }[]
    }
  | {
      type: 'type'
      prompt: string
      answer: string
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
