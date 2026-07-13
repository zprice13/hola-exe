export interface VerbForms {
  translation: string
  forms: { pronoun: string; es: string; en: string }[]
}

/**
 * Present-tense tables for the verbs whose conjugated forms appear in the
 * course. Each verb is formally introduced (table card + pronoun-form quiz)
 * by the lesson whose `conjugates` field names it.
 */
export const CONJUGATIONS: Record<string, VerbForms> = {
  ser: {
    translation: 'to be',
    forms: [
      { pronoun: 'yo', es: 'soy', en: 'I am' },
      { pronoun: 'tú', es: 'eres', en: 'you are' },
      { pronoun: 'él / ella', es: 'es', en: 'he / she is' },
      { pronoun: 'ellos', es: 'son', en: 'they are' },
    ],
  },
  estar: {
    translation: 'to be (place, feeling)',
    forms: [
      { pronoun: 'yo', es: 'estoy', en: 'I am' },
      { pronoun: 'tú', es: 'estás', en: 'you are' },
      { pronoun: 'él / ella', es: 'está', en: 'he / she is' },
      { pronoun: 'ellos', es: 'están', en: 'they are' },
    ],
  },
  tener: {
    translation: 'to have',
    forms: [
      { pronoun: 'yo', es: 'tengo', en: 'I have' },
      { pronoun: 'tú', es: 'tienes', en: 'you have' },
      { pronoun: 'él / ella', es: 'tiene', en: 'he / she has' },
      { pronoun: 'ellos', es: 'tienen', en: 'they have' },
    ],
  },
  comer: {
    translation: 'to eat',
    forms: [
      { pronoun: 'yo', es: 'como', en: 'I eat' },
      { pronoun: 'tú', es: 'comes', en: 'you eat' },
      { pronoun: 'él / ella', es: 'come', en: 'he / she eats' },
      { pronoun: 'ellos', es: 'comen', en: 'they eat' },
    ],
  },
  beber: {
    translation: 'to drink',
    forms: [
      { pronoun: 'yo', es: 'bebo', en: 'I drink' },
      { pronoun: 'tú', es: 'bebes', en: 'you drink' },
      { pronoun: 'él / ella', es: 'bebe', en: 'he / she drinks' },
      { pronoun: 'ellos', es: 'beben', en: 'they drink' },
    ],
  },
  ir: {
    translation: 'to go',
    forms: [
      { pronoun: 'yo', es: 'voy', en: 'I go' },
      { pronoun: 'tú', es: 'vas', en: 'you go' },
      { pronoun: 'él / ella', es: 'va', en: 'he / she goes' },
      { pronoun: 'ellos', es: 'van', en: 'they go' },
    ],
  },
}
