import type { Unit } from '../types'

/**
 * Spanish for English speakers — starter course.
 * Each lesson's vocab and sentences are turned into exercises at runtime.
 *
 * enAlt: alternate English translations accepted in typed exercises
 * esAlt: alternate Spanish word orders accepted in word-bank exercises
 *        (written punctuation-free, matching how the word bank tokenizes)
 */
export const course: Unit[] = [
  {
    id: 'basics',
    title: 'Basics',
    description: 'Say hello and introduce yourself',
    color: '#33ff66',
    lessons: [
      {
        id: 'basics-1',
        title: 'Greetings',
        vocab: [
          { es: 'hola', en: 'hello' },
          { es: 'adiós', en: 'goodbye' },
          { es: 'gracias', en: 'thank you' },
          { es: 'por favor', en: 'please' },
          { es: 'sí', en: 'yes' },
          { es: 'no', en: 'no' },
        ],
        sentences: [
          {
            es: 'hola, gracias',
            en: 'hello, thank you',
            enAlt: ['hi, thank you', 'hello, thanks', 'hi, thanks'],
          },
          { es: 'sí, por favor', en: 'yes, please' },
          { es: 'no, gracias', en: 'no, thank you', enAlt: ['no, thanks'] },
        ],
      },
      {
        id: 'basics-2',
        title: 'Introductions',
        vocab: [
          { es: 'buenos días', en: 'good morning' },
          { es: 'buenas noches', en: 'good night' },
          { es: 'me llamo', en: 'my name is' },
          { es: '¿cómo estás?', en: 'how are you?' },
          { es: 'bien', en: 'well' },
          { es: 'estoy bien', en: 'I am well' },
          { es: 'mucho gusto', en: 'nice to meet you' },
        ],
        sentences: [
          {
            es: 'hola, me llamo Ana',
            en: 'hello, my name is Ana',
            enAlt: ['hi, my name is Ana', "hello, my name's Ana", "hi, my name's Ana"],
          },
          { es: 'buenos días, ¿cómo estás?', en: 'good morning, how are you?' },
          {
            es: 'estoy bien, gracias',
            en: 'I am well, thank you',
            enAlt: [
              "I'm well, thank you",
              'I am well, thanks',
              "I'm well, thanks",
              'I am fine, thank you',
              "I'm fine, thank you",
              'I am fine, thanks',
              "I'm fine, thanks",
              'I am good, thank you',
              "I'm good, thank you",
              'I am good, thanks',
              "I'm good, thanks",
            ],
            esAlt: ['yo estoy bien gracias', 'gracias estoy bien'],
          },
        ],
      },
    ],
  },
  {
    id: 'people',
    title: 'People',
    description: 'Talk about yourself and others',
    color: '#ff5fd7',
    lessons: [
      {
        id: 'people-1',
        title: 'Pronouns',
        vocab: [
          { es: 'yo', en: 'I' },
          { es: 'tú', en: 'you' },
          { es: 'él', en: 'he' },
          { es: 'ella', en: 'she' },
          { es: 'nosotros', en: 'we' },
          { es: 'ellos', en: 'they' },
          { es: 'soy', en: 'I am' },
          { es: 'eres', en: 'you are' },
          { es: 'es', en: 'is' },
        ],
        sentences: [
          { es: 'yo soy Ana', en: 'I am Ana', enAlt: ["I'm Ana"], esAlt: ['soy Ana'] },
          {
            es: 'tú eres mi amigo',
            en: 'you are my friend',
            enAlt: ["you're my friend"],
            esAlt: ['eres mi amigo'],
          },
          { es: 'ella es doctora', en: 'she is a doctor', enAlt: ["she's a doctor"] },
        ],
      },
      {
        id: 'people-2',
        title: 'Family',
        vocab: [
          { es: 'la madre', en: 'the mother' },
          { es: 'el padre', en: 'the father' },
          { es: 'la hermana', en: 'the sister' },
          { es: 'el hermano', en: 'the brother' },
          { es: 'el niño', en: 'the boy' },
          { es: 'la niña', en: 'the girl' },
        ],
        sentences: [
          { es: 'él es mi hermano', en: 'he is my brother', enAlt: ["he's my brother"] },
          {
            es: 'la niña es mi hermana',
            en: 'the girl is my sister',
            enAlt: ["the girl's my sister"],
          },
          {
            es: 'mi madre y mi padre',
            en: 'my mother and my father',
            enAlt: ['my mother and father', 'my mom and my dad', 'my mom and dad'],
          },
        ],
      },
    ],
  },
  {
    id: 'food',
    title: 'Food',
    description: 'Order food and drinks',
    color: '#ffb000',
    lessons: [
      {
        id: 'food-1',
        title: 'At the table',
        vocab: [
          { es: 'el agua', en: 'the water' },
          { es: 'el pan', en: 'the bread' },
          { es: 'la manzana', en: 'the apple' },
          { es: 'la leche', en: 'the milk' },
          { es: 'el café', en: 'the coffee' },
          { es: 'comer', en: 'to eat' },
          { es: 'beber', en: 'to drink' },
        ],
        sentences: [
          {
            es: 'yo como pan',
            en: 'I eat bread',
            enAlt: ['I am eating bread', "I'm eating bread"],
            esAlt: ['como pan'],
          },
          {
            es: 'ella bebe agua',
            en: 'she drinks water',
            enAlt: ['she is drinking water', "she's drinking water"],
            esAlt: ['bebe agua'],
          },
          { es: 'el café con leche', en: 'the coffee with milk', enAlt: ['coffee with milk'] },
        ],
      },
      {
        id: 'food-2',
        title: 'At the restaurant',
        vocab: [
          { es: 'el menú', en: 'the menu' },
          { es: 'la cuenta', en: 'the bill' },
          { es: 'el desayuno', en: 'the breakfast' },
          { es: 'quiero', en: 'I want' },
          { es: 'la cena', en: 'the dinner' },
          { es: 'delicioso', en: 'delicious' },
        ],
        sentences: [
          {
            es: 'quiero el menú, por favor',
            en: 'I want the menu, please',
            enAlt: ['I would like the menu, please'],
            esAlt: ['por favor quiero el menú', 'yo quiero el menú por favor'],
          },
          {
            es: 'la cena es deliciosa',
            en: 'the dinner is delicious',
            enAlt: ['dinner is delicious', "the dinner's delicious"],
          },
          {
            es: 'la cuenta, por favor',
            en: 'the bill, please',
            enAlt: ['the check, please'],
            esAlt: ['por favor la cuenta'],
          },
        ],
      },
    ],
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Find your way around',
    color: '#00e5ff',
    lessons: [
      {
        id: 'travel-1',
        title: 'Places',
        vocab: [
          { es: 'el hotel', en: 'the hotel' },
          { es: 'la playa', en: 'the beach' },
          { es: 'el tren', en: 'the train' },
          { es: 'el aeropuerto', en: 'the airport' },
          { es: '¿dónde está?', en: 'where is it?' },
          { es: 'la ciudad', en: 'the city' },
          { es: 'va', en: 'goes' },
          { es: 'bonita', en: 'pretty' },
        ],
        sentences: [
          {
            es: '¿dónde está el hotel?',
            en: 'where is the hotel?',
            enAlt: ["where's the hotel?"],
          },
          {
            es: 'el tren va a la ciudad',
            en: 'the train goes to the city',
            enAlt: ['the train is going to the city', "the train's going to the city"],
          },
          {
            es: 'la playa es bonita',
            en: 'the beach is pretty',
            enAlt: ['the beach is nice', "the beach's pretty"],
          },
        ],
      },
      {
        id: 'travel-2',
        title: 'Getting around',
        vocab: [
          { es: 'a la izquierda', en: 'to the left' },
          { es: 'a la derecha', en: 'to the right' },
          { es: 'cerca', en: 'near' },
          { es: 'lejos', en: 'far' },
          { es: 'el taxi', en: 'the taxi' },
          { es: 'el mapa', en: 'the map' },
          { es: 'necesito', en: 'I need' },
        ],
        sentences: [
          {
            es: 'el hotel está a la derecha',
            en: 'the hotel is to the right',
            enAlt: ['the hotel is on the right', "the hotel's to the right", "the hotel's on the right"],
            esAlt: ['a la derecha está el hotel'],
          },
          {
            es: 'el aeropuerto está lejos',
            en: 'the airport is far',
            enAlt: ['the airport is far away', "the airport's far", "the airport's far away"],
          },
          {
            es: 'necesito un taxi',
            en: 'I need a taxi',
            enAlt: ['I need a cab'],
            esAlt: ['yo necesito un taxi'],
          },
        ],
      },
    ],
  },
]

export function findLesson(lessonId: string) {
  for (const unit of course) {
    const lesson = unit.lessons.find((l) => l.id === lessonId)
    if (lesson) return { unit, lesson }
  }
  return null
}

/** Flat, ordered list of lesson ids used for unlock progression. */
export const lessonOrder: string[] = course.flatMap((u) => u.lessons.map((l) => l.id))
