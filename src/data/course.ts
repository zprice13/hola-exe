import type { Unit } from '../types'

/**
 * Spanish for English speakers — starter course.
 * Each lesson's vocab and sentences are turned into exercises at runtime.
 */
export const course: Unit[] = [
  {
    id: 'basics',
    title: 'Basics',
    description: 'Say hello and introduce yourself',
    color: '#58cc02',
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
          { es: 'hola, gracias', en: 'hello, thank you' },
          { es: 'sí, por favor', en: 'yes, please' },
          { es: 'no, gracias', en: 'no, thank you' },
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
          { es: 'mucho gusto', en: 'nice to meet you' },
        ],
        sentences: [
          { es: 'hola, me llamo Ana', en: 'hello, my name is Ana' },
          { es: 'buenos días, ¿cómo estás?', en: 'good morning, how are you?' },
          { es: 'estoy bien, gracias', en: 'I am well, thank you' },
        ],
      },
    ],
  },
  {
    id: 'people',
    title: 'People',
    description: 'Talk about yourself and others',
    color: '#ce82ff',
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
        ],
        sentences: [
          { es: 'yo soy Ana', en: 'I am Ana' },
          { es: 'tú eres mi amigo', en: 'you are my friend' },
          { es: 'ella es doctora', en: 'she is a doctor' },
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
          { es: 'él es mi hermano', en: 'he is my brother' },
          { es: 'la niña es mi hermana', en: 'the girl is my sister' },
          { es: 'mi madre y mi padre', en: 'my mother and my father' },
        ],
      },
    ],
  },
  {
    id: 'food',
    title: 'Food',
    description: 'Order food and drinks',
    color: '#ff9600',
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
        ],
        sentences: [
          { es: 'yo como pan', en: 'I eat bread' },
          { es: 'ella bebe agua', en: 'she drinks water' },
          { es: 'el café con leche', en: 'the coffee with milk' },
        ],
      },
      {
        id: 'food-2',
        title: 'At the restaurant',
        vocab: [
          { es: 'el menú', en: 'the menu' },
          { es: 'la cuenta', en: 'the bill' },
          { es: 'beber', en: 'to drink' },
          { es: 'quiero', en: 'I want' },
          { es: 'la cena', en: 'the dinner' },
          { es: 'delicioso', en: 'delicious' },
        ],
        sentences: [
          { es: 'quiero el menú, por favor', en: 'I want the menu, please' },
          { es: 'la cena es deliciosa', en: 'the dinner is delicious' },
          { es: 'la cuenta, por favor', en: 'the bill, please' },
        ],
      },
    ],
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Find your way around',
    color: '#1cb0f6',
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
        ],
        sentences: [
          { es: '¿dónde está el hotel?', en: 'where is the hotel?' },
          { es: 'el tren va a la ciudad', en: 'the train goes to the city' },
          { es: 'la playa es bonita', en: 'the beach is pretty' },
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
        ],
        sentences: [
          { es: 'el hotel está a la derecha', en: 'the hotel is to the right' },
          { es: 'el aeropuerto está lejos', en: 'the airport is far' },
          { es: 'necesito un taxi', en: 'I need a taxi' },
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
