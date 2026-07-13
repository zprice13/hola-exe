import type { Unit } from '../types'

/**
 * Spanish for English speakers — a 12-unit A1 starter course.
 * Each lesson's vocab and sentences are turned into exercises at runtime.
 *
 * Authoring rules (enforced by scripts/validate-course, learned the hard way):
 * - every content word in a sentence must be taught in that lesson or earlier
 *   (feminine/plural inflections of taught words are OK — word banks show them)
 * - enAlt: alternate English translations accepted in typed exercises
 *   (contractions, synonyms a learner would plausibly type)
 * - esAlt: alternate Spanish word orders accepted in word-bank exercises
 *   (written punctuation-free, matching how the word bank tokenizes)
 * - vocab glosses must be unique in both languages course-wide, or multiple
 *   choice can generate a second correct answer
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
      {
        id: 'basics-3',
        title: 'Courtesy',
        vocab: [
          { es: 'perdón', en: 'excuse me (to get past)' },
          { es: 'lo siento', en: 'I am sorry' },
          { es: 'de nada', en: 'you are welcome' },
          { es: 'hasta luego', en: 'see you later' },
          { es: 'bienvenido', en: 'welcome (to a place)' },
          { es: 'señor', en: 'sir' },
          { es: 'señora', en: "ma'am" },
        ],
        sentences: [
          { es: 'perdón, señor', en: 'excuse me, sir' },
          {
            es: 'lo siento, adiós',
            en: 'I am sorry, goodbye',
            enAlt: ["I'm sorry, goodbye", "I'm sorry, bye", 'I am sorry, bye'],
          },
          {
            es: 'hasta luego, señora',
            en: "see you later, ma'am",
            enAlt: ['see you later, madam'],
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
      {
        id: 'people-3',
        title: 'Describing people',
        vocab: [
          { es: 'el amigo', en: 'the friend' },
          { es: 'la familia', en: 'the family' },
          { es: 'alto', en: 'tall' },
          { es: 'joven', en: 'young' },
          { es: 'viejo', en: 'old' },
          { es: 'simpático', en: 'nice (friendly)' },
          { es: 'inteligente', en: 'intelligent' },
        ],
        sentences: [
          {
            es: 'mi amigo es alto',
            en: 'my friend is tall',
            enAlt: ["my friend's tall"],
          },
          {
            es: 'él es joven y simpático',
            en: 'he is young and nice',
            enAlt: ["he's young and nice", 'he is young and friendly', "he's young and friendly"],
            esAlt: ['es joven y simpático'],
          },
          {
            es: 'mi familia es inteligente',
            en: 'my family is intelligent',
            enAlt: ['my family is smart', "my family's intelligent", "my family's smart"],
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
            enAlt: ['I would like the menu, please', "I'd like the menu, please"],
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
      {
        id: 'food-3',
        title: 'Drinks & snacks',
        vocab: [
          { es: 'el vino', en: 'the wine' },
          { es: 'la cerveza', en: 'the beer' },
          { es: 'el jugo', en: 'the juice' },
          { es: 'la naranja', en: 'the orange' },
          { es: 'el queso', en: 'the cheese' },
          { es: 'la sopa', en: 'the soup' },
          { es: 'bebo', en: 'I drink' },
        ],
        sentences: [
          {
            es: 'bebo el jugo de naranja',
            en: 'I drink the orange juice',
            enAlt: ['I am drinking the orange juice', "I'm drinking the orange juice"],
            esAlt: ['yo bebo el jugo de naranja'],
          },
          {
            es: 'el queso es delicioso',
            en: 'the cheese is delicious',
            enAlt: ["the cheese's delicious"],
          },
          {
            es: 'quiero la sopa, por favor',
            en: 'I want the soup, please',
            enAlt: ['I would like the soup, please', "I'd like the soup, please"],
            esAlt: ['por favor quiero la sopa', 'yo quiero la sopa por favor'],
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
      {
        id: 'travel-3',
        title: 'At the hotel',
        vocab: [
          { es: 'el pasaporte', en: 'the passport' },
          { es: 'la maleta', en: 'the suitcase' },
          { es: 'el billete', en: 'the ticket' },
          { es: 'el autobús', en: 'the bus' },
          { es: 'la habitación', en: 'the hotel room' },
          { es: 'la llave', en: 'the key' },
        ],
        sentences: [
          { es: 'necesito la llave', en: 'I need the key', esAlt: ['yo necesito la llave'] },
          {
            es: '¿dónde está la maleta?',
            en: 'where is the suitcase?',
            enAlt: ["where's the suitcase?"],
          },
          {
            es: 'el autobús va al aeropuerto',
            en: 'the bus goes to the airport',
            enAlt: ['the bus is going to the airport', "the bus's going to the airport"],
          },
        ],
      },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Count and talk about quantity',
    color: '#33ff66',
    lessons: [
      {
        id: 'numbers-1',
        title: 'One to five',
        vocab: [
          { es: 'uno', en: 'one' },
          { es: 'dos', en: 'two' },
          { es: 'tres', en: 'three' },
          { es: 'cuatro', en: 'four' },
          { es: 'cinco', en: 'five' },
          { es: 'el número', en: 'the number' },
          { es: 'tengo', en: 'I have' },
        ],
        sentences: [
          {
            es: 'tengo dos hermanos',
            en: 'I have two brothers',
            enAlt: ['I have two siblings'],
            esAlt: ['yo tengo dos hermanos'],
          },
          { es: 'el número cinco', en: 'the number five', enAlt: ['number five'] },
          { es: 'uno, dos, tres', en: 'one, two, three' },
        ],
      },
      {
        id: 'numbers-2',
        title: 'Six to ten',
        vocab: [
          { es: 'seis', en: 'six' },
          { es: 'siete', en: 'seven' },
          { es: 'ocho', en: 'eight' },
          { es: 'nueve', en: 'nine' },
          { es: 'diez', en: 'ten' },
          { es: 'tienes', en: 'you have' },
        ],
        sentences: [
          {
            es: '¿tienes ocho manzanas?',
            en: 'do you have eight apples?',
            enAlt: ['have you got eight apples?', 'you have eight apples?'],
          },
          {
            es: 'tengo seis manzanas y siete naranjas',
            en: 'I have six apples and seven oranges',
            esAlt: ['yo tengo seis manzanas y siete naranjas'],
          },
          { es: 'el número diez', en: 'the number ten', enAlt: ['number ten'] },
        ],
      },
      {
        id: 'numbers-3',
        title: 'How much?',
        vocab: [
          { es: 'el dinero', en: 'the money' },
          { es: 'el euro', en: 'the euro' },
          { es: 'cuesta', en: 'it costs' },
          { es: '¿cuánto?', en: 'how much?' },
          { es: 'mucho', en: 'a lot' },
          { es: 'poco', en: 'not much' },
        ],
        sentences: [
          {
            es: '¿cuánto cuesta?',
            en: 'how much does it cost?',
            enAlt: ['how much is it?', 'how much does this cost?'],
          },
          { es: 'cuesta cinco euros', en: 'it costs five euros' },
          {
            es: 'tengo poco dinero',
            en: 'I have little money',
            enAlt: ["I don't have much money"],
            esAlt: ['yo tengo poco dinero'],
          },
        ],
      },
    ],
  },
  {
    id: 'time',
    title: 'Time & Days',
    description: 'Days of the week and telling time',
    color: '#ff5fd7',
    lessons: [
      {
        id: 'time-1',
        title: 'Days of the week',
        vocab: [
          { es: 'el lunes', en: 'Monday' },
          { es: 'el martes', en: 'Tuesday' },
          { es: 'el miércoles', en: 'Wednesday' },
          { es: 'el jueves', en: 'Thursday' },
          { es: 'el viernes', en: 'Friday' },
          { es: 'hoy', en: 'today' },
          { es: 'mañana', en: 'tomorrow' },
        ],
        sentences: [
          {
            es: 'hoy es lunes',
            en: 'today is Monday',
            enAlt: ["it's Monday today", 'it is Monday today', "today's Monday"],
            esAlt: ['es lunes hoy'],
          },
          {
            es: 'mañana es viernes',
            en: 'tomorrow is Friday',
            enAlt: ["it's Friday tomorrow", 'it is Friday tomorrow', "tomorrow's Friday"],
            esAlt: ['es viernes mañana'],
          },
          {
            es: 'el lunes y el martes',
            en: 'Monday and Tuesday',
            enAlt: ['on Monday and Tuesday', 'on Monday and on Tuesday'],
          },
        ],
      },
      {
        id: 'time-2',
        title: 'The week',
        vocab: [
          { es: 'el sábado', en: 'Saturday' },
          { es: 'el domingo', en: 'Sunday' },
          { es: 'la semana', en: 'the week' },
          { es: 'el día', en: 'the day' },
          { es: 'la noche', en: 'the night' },
          { es: 'ahora', en: 'now' },
          { es: 'tiene', en: 'he/she has' },
        ],
        sentences: [
          {
            es: 'la semana tiene siete días',
            en: 'the week has seven days',
            enAlt: ['a week has seven days'],
          },
          {
            es: 'hoy es domingo',
            en: 'today is Sunday',
            enAlt: ["it's Sunday today", 'it is Sunday today', "today's Sunday"],
            esAlt: ['es domingo hoy'],
          },
          {
            es: 'la noche es bonita',
            en: 'the night is pretty',
            enAlt: ['the night is beautiful', "the night's pretty"],
          },
        ],
      },
      {
        id: 'time-3',
        title: 'What time is it?',
        vocab: [
          { es: 'la hora', en: 'the hour' },
          { es: 'el minuto', en: 'the minute' },
          { es: '¿qué hora es?', en: 'what time is it?' },
          { es: 'temprano', en: 'early' },
          { es: 'tarde', en: 'late' },
          { es: 'el momento', en: 'the moment' },
        ],
        sentences: [
          { es: '¿qué hora es?', en: 'what time is it?', enAlt: ["what's the time?", 'what is the time?'] },
          {
            es: 'es tarde, buenas noches',
            en: 'it is late, good night',
            enAlt: ["it's late, good night"],
          },
          {
            es: 'el desayuno es temprano',
            en: 'the breakfast is early',
            enAlt: ['breakfast is early'],
          },
        ],
      },
    ],
  },
  {
    id: 'colors',
    title: 'Colors & Clothes',
    description: 'Describe what you see and wear',
    color: '#ffb000',
    lessons: [
      {
        id: 'colors-1',
        title: 'Colors',
        vocab: [
          { es: 'rojo', en: 'red' },
          { es: 'azul', en: 'blue' },
          { es: 'verde', en: 'green' },
          { es: 'negro', en: 'black' },
          { es: 'blanco', en: 'white' },
          { es: 'amarillo', en: 'yellow' },
        ],
        sentences: [
          { es: 'la manzana es roja', en: 'the apple is red', enAlt: ["the apple's red"] },
          { es: 'el café es negro', en: 'the coffee is black', enAlt: ["the coffee's black"] },
          { es: 'verde y azul', en: 'green and blue' },
        ],
      },
      {
        id: 'colors-2',
        title: 'Clothes',
        vocab: [
          { es: 'la camisa', en: 'the shirt' },
          { es: 'los pantalones', en: 'the pants' },
          { es: 'los zapatos', en: 'the shoes' },
          { es: 'el vestido', en: 'the dress' },
          { es: 'la chaqueta', en: 'the jacket' },
          { es: 'llevo', en: 'I wear' },
          { es: 'son', en: 'they are' },
        ],
        sentences: [
          {
            es: 'llevo una camisa blanca',
            en: 'I wear a white shirt',
            enAlt: ['I am wearing a white shirt', "I'm wearing a white shirt"],
            esAlt: ['yo llevo una camisa blanca'],
          },
          { es: 'los zapatos son negros', en: 'the shoes are black' },
          { es: 'el vestido es azul', en: 'the dress is blue', enAlt: ["the dress's blue"] },
        ],
      },
      {
        id: 'colors-3',
        title: 'Shopping',
        vocab: [
          { es: 'la tienda', en: 'the store' },
          { es: 'compro', en: 'I buy' },
          { es: 'caro', en: 'expensive' },
          { es: 'barato', en: 'cheap' },
          { es: 'nuevo', en: 'new' },
          { es: 'el precio', en: 'the price' },
        ],
        sentences: [
          {
            es: 'compro una chaqueta nueva',
            en: 'I buy a new jacket',
            enAlt: ['I am buying a new jacket', "I'm buying a new jacket"],
            esAlt: ['yo compro una chaqueta nueva'],
          },
          {
            es: 'la camisa es barata',
            en: 'the shirt is cheap',
            enAlt: ["the shirt's cheap"],
          },
          {
            es: 'el vino es caro',
            en: 'the wine is expensive',
            enAlt: ["the wine's expensive"],
          },
        ],
      },
    ],
  },
  {
    id: 'home',
    title: 'Home',
    description: 'Around the house',
    color: '#00e5ff',
    lessons: [
      {
        id: 'home-1',
        title: 'Rooms',
        vocab: [
          { es: 'la casa', en: 'the house' },
          { es: 'la cocina', en: 'the kitchen' },
          { es: 'el dormitorio', en: 'the bedroom' },
          { es: 'el baño', en: 'the bathroom' },
          { es: 'la sala', en: 'the living room' },
          { es: 'la puerta', en: 'the door' },
          { es: 'grande', en: 'big' },
        ],
        sentences: [
          { es: 'mi casa es grande', en: 'my house is big', enAlt: ["my house's big", 'my house is large'] },
          {
            es: 'el baño está a la izquierda',
            en: 'the bathroom is to the left',
            enAlt: ['the bathroom is on the left', "the bathroom's on the left", "the bathroom's to the left"],
            esAlt: ['a la izquierda está el baño'],
          },
          { es: 'la puerta es blanca', en: 'the door is white', enAlt: ["the door's white"] },
        ],
      },
      {
        id: 'home-2',
        title: 'Furniture',
        vocab: [
          { es: 'la mesa', en: 'the table' },
          { es: 'la silla', en: 'the chair' },
          { es: 'la cama', en: 'the bed' },
          { es: 'la lámpara', en: 'the lamp' },
          { es: 'la ventana', en: 'the window' },
          { es: 'pequeño', en: 'small' },
        ],
        sentences: [
          {
            es: 'la cama está en el dormitorio',
            en: 'the bed is in the bedroom',
            enAlt: ["the bed's in the bedroom"],
            esAlt: ['en el dormitorio está la cama'],
          },
          { es: 'la mesa es pequeña', en: 'the table is small', enAlt: ["the table's small"] },
          {
            es: 'la ventana está cerca',
            en: 'the window is near',
            enAlt: [
              'the window is close',
              "the window's near",
              "the window's close",
              'the window is nearby',
              "the window's nearby",
            ],
          },
        ],
      },
      {
        id: 'home-3',
        title: 'Living at home',
        vocab: [
          { es: 'vivo', en: 'I live' },
          { es: 'cocino', en: 'I cook' },
          { es: 'limpio', en: 'I clean' },
          { es: 'el jardín', en: 'the garden' },
          { es: 'el gato', en: 'the cat' },
          { es: 'el perro', en: 'the dog' },
        ],
        sentences: [
          {
            es: 'vivo en la ciudad',
            en: 'I live in the city',
            enAlt: ['I am living in the city', "I'm living in the city"],
            esAlt: ['yo vivo en la ciudad'],
          },
          {
            es: 'el gato está en el jardín',
            en: 'the cat is in the garden',
            enAlt: ["the cat's in the garden"],
          },
          {
            es: 'cocino en la cocina',
            en: 'I cook in the kitchen',
            enAlt: ['I am cooking in the kitchen', "I'm cooking in the kitchen"],
            esAlt: ['yo cocino en la cocina'],
          },
        ],
      },
    ],
  },
  {
    id: 'work',
    title: 'Work & School',
    description: 'Jobs, studying, and the office',
    color: '#33ff66',
    lessons: [
      {
        id: 'work-1',
        title: 'Jobs',
        vocab: [
          { es: 'trabajo', en: 'I work' },
          { es: 'el médico', en: 'the doctor' },
          { es: 'el profesor', en: 'the teacher' },
          { es: 'el estudiante', en: 'the student' },
          { es: 'la oficina', en: 'the office' },
          { es: 'el jefe', en: 'the boss' },
        ],
        sentences: [
          {
            es: 'trabajo en una oficina',
            en: 'I work in an office',
            enAlt: ['I am working in an office', "I'm working in an office"],
            esAlt: ['yo trabajo en una oficina'],
          },
          {
            es: 'él es profesor',
            en: 'he is a teacher',
            enAlt: ["he's a teacher", 'he is a professor', "he's a professor"],
          },
          {
            es: 'el jefe es simpático',
            en: 'the boss is nice',
            enAlt: ['the boss is friendly', "the boss's nice"],
          },
        ],
      },
      {
        id: 'work-2',
        title: 'School',
        vocab: [
          { es: 'la escuela', en: 'the school' },
          { es: 'el libro', en: 'the book' },
          { es: 'la palabra', en: 'the word' },
          { es: 'aprendo', en: 'I learn' },
          { es: 'leo', en: 'I read' },
          { es: 'escribo', en: 'I write' },
          { es: 'español', en: 'Spanish' },
        ],
        sentences: [
          {
            es: 'aprendo español',
            en: 'I learn Spanish',
            enAlt: ['I am learning Spanish', "I'm learning Spanish"],
            esAlt: ['yo aprendo español'],
          },
          {
            es: 'leo un libro',
            en: 'I read a book',
            enAlt: ['I am reading a book', "I'm reading a book"],
            esAlt: ['yo leo un libro'],
          },
          {
            es: 'escribo la palabra',
            en: 'I write the word',
            enAlt: ['I am writing the word', "I'm writing the word"],
            esAlt: ['yo escribo la palabra'],
          },
        ],
      },
      {
        id: 'work-3',
        title: 'At the office',
        vocab: [
          { es: 'ocupado', en: 'busy' },
          { es: 'fácil', en: 'easy' },
          { es: 'difícil', en: 'difficult' },
          { es: 'importante', en: 'important' },
          { es: 'la reunión', en: 'the meeting' },
          { es: 'el correo', en: 'the email' },
        ],
        sentences: [
          {
            es: 'el español es difícil',
            en: 'Spanish is difficult',
            enAlt: ['Spanish is hard'],
          },
          { es: 'estoy ocupado', en: 'I am busy', enAlt: ["I'm busy"], esAlt: ['yo estoy ocupado'] },
          {
            es: 'la reunión es importante',
            en: 'the meeting is important',
            enAlt: ["the meeting's important"],
          },
        ],
      },
    ],
  },
  {
    id: 'weather',
    title: 'Weather & Nature',
    description: 'Seasons, weather, and the outdoors',
    color: '#ff5fd7',
    lessons: [
      {
        id: 'weather-1',
        title: 'The weather',
        vocab: [
          { es: 'hace sol', en: 'it is sunny' },
          { es: 'hace frío', en: 'it is cold' },
          { es: 'hace calor', en: 'it is hot' },
          { es: 'llueve', en: 'it rains' },
          { es: 'el sol', en: 'the sun' },
          { es: 'la lluvia', en: 'the rain' },
        ],
        sentences: [
          {
            es: 'hoy hace sol',
            en: 'today it is sunny',
            enAlt: ['it is sunny today', "it's sunny today", "today it's sunny"],
            esAlt: ['hace sol hoy'],
          },
          {
            es: 'llueve mucho',
            en: 'it rains a lot',
            enAlt: ['it is raining a lot', "it's raining a lot"],
          },
          {
            es: 'hace frío en la noche',
            en: 'it is cold at night',
            enAlt: ["it's cold at night", 'it is cold in the night', "it's cold in the night"],
            esAlt: ['en la noche hace frío'],
          },
        ],
      },
      {
        id: 'weather-2',
        title: 'Seasons',
        vocab: [
          { es: 'el verano', en: 'the summer' },
          { es: 'el invierno', en: 'the winter' },
          { es: 'la primavera', en: 'the spring' },
          { es: 'el otoño', en: 'the autumn' },
          { es: 'la nieve', en: 'the snow' },
          { es: 'nieva', en: 'it snows' },
        ],
        sentences: [
          {
            es: 'nieva en el invierno',
            en: 'it snows in the winter',
            enAlt: ['it snows in winter'],
            esAlt: ['nieva en invierno', 'en el invierno nieva'],
          },
          {
            es: 'hace calor en el verano',
            en: 'it is hot in the summer',
            enAlt: ["it's hot in the summer", 'it is hot in summer', "it's hot in summer"],
            esAlt: ['en el verano hace calor', 'hace calor en verano'],
          },
          {
            es: 'la primavera es bonita',
            en: 'the spring is pretty',
            enAlt: ['spring is pretty', 'the spring is beautiful', 'spring is beautiful'],
          },
        ],
      },
      {
        id: 'weather-3',
        title: 'Nature',
        vocab: [
          { es: 'la montaña', en: 'the mountain' },
          { es: 'el río', en: 'the river' },
          { es: 'el mar', en: 'the sea' },
          { es: 'el árbol', en: 'the tree' },
          { es: 'la flor', en: 'the flower' },
          { es: 'el cielo', en: 'the sky' },
        ],
        sentences: [
          {
            es: 'la montaña es alta',
            en: 'the mountain is tall',
            enAlt: ['the mountain is high', "the mountain's tall", "the mountain's high"],
          },
          { es: 'el cielo es azul', en: 'the sky is blue', enAlt: ["the sky's blue"] },
          { es: 'las flores son bonitas', en: 'the flowers are pretty', enAlt: ['the flowers are beautiful'] },
        ],
      },
    ],
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    description: 'Music, sports, and going out',
    color: '#ffb000',
    lessons: [
      {
        id: 'hobbies-1',
        title: 'Things I like',
        vocab: [
          { es: 'me gusta', en: 'I like' },
          { es: 'la música', en: 'the music' },
          { es: 'el deporte', en: 'the sport' },
          { es: 'el fútbol', en: 'soccer' },
          { es: 'bailo', en: 'I dance' },
          { es: 'canto', en: 'I sing' },
        ],
        sentences: [
          {
            es: 'me gusta la música',
            en: 'I like music',
            enAlt: ['I like the music'],
            esAlt: ['la música me gusta'],
          },
          {
            es: 'bailo y canto',
            en: 'I dance and sing',
            enAlt: ['I dance and I sing'],
            esAlt: ['yo bailo y canto'],
          },
          {
            es: 'me gusta el fútbol',
            en: 'I like soccer',
            enAlt: ['I like football'],
            esAlt: ['el fútbol me gusta'],
          },
        ],
      },
      {
        id: 'hobbies-2',
        title: 'Going out',
        vocab: [
          { es: 'el cine', en: 'the cinema' },
          { es: 'la película', en: 'the movie' },
          { es: 'el parque', en: 'the park' },
          { es: 'el restaurante', en: 'the restaurant' },
          { es: 'camino', en: 'I walk' },
          { es: 'la fiesta', en: 'the party' },
          { es: 'bueno', en: 'good (quality)' },
        ],
        sentences: [
          {
            es: 'camino en el parque',
            en: 'I walk in the park',
            enAlt: ['I am walking in the park', "I'm walking in the park"],
            esAlt: ['yo camino en el parque'],
          },
          {
            es: 'la película es buena',
            en: 'the movie is good',
            enAlt: ['the film is good', "the movie's good"],
          },
          {
            es: 'la fiesta es en el restaurante',
            en: 'the party is at the restaurant',
            enAlt: ['the party is in the restaurant', "the party's at the restaurant"],
          },
        ],
      },
      {
        id: 'hobbies-3',
        title: 'Music & games',
        vocab: [
          { es: 'juego', en: 'I play (games)' },
          { es: 'toco', en: 'I play (music)' },
          { es: 'la guitarra', en: 'the guitar' },
          { es: 'la canción', en: 'the song' },
          { es: 'escucho', en: 'I listen to' },
          { es: 'el videojuego', en: 'the video game' },
        ],
        sentences: [
          {
            es: 'toco la guitarra',
            en: 'I play the guitar',
            enAlt: ['I am playing the guitar', "I'm playing the guitar"],
            esAlt: ['yo toco la guitarra'],
          },
          {
            es: 'escucho la canción',
            en: 'I listen to the song',
            enAlt: ['I am listening to the song', "I'm listening to the song"],
            esAlt: ['yo escucho la canción'],
          },
          {
            es: 'juego con mi amigo',
            en: 'I play with my friend',
            enAlt: ['I am playing with my friend', "I'm playing with my friend"],
            esAlt: ['yo juego con mi amigo'],
          },
        ],
      },
    ],
  },
  {
    id: 'health',
    title: 'Health & Body',
    description: 'The body and feeling well',
    color: '#00e5ff',
    lessons: [
      {
        id: 'health-1',
        title: 'The body',
        vocab: [
          { es: 'la cabeza', en: 'the head' },
          { es: 'la mano', en: 'the hand' },
          { es: 'el pie', en: 'the foot' },
          { es: 'el ojo', en: 'the eye' },
          { es: 'la boca', en: 'the mouth' },
          { es: 'el corazón', en: 'the heart' },
        ],
        sentences: [
          {
            es: 'la mano y el pie',
            en: 'the hand and the foot',
            enAlt: ['the hand and foot'],
          },
          { es: 'los ojos son azules', en: 'the eyes are blue' },
          { es: 'la boca es pequeña', en: 'the mouth is small', enAlt: ["the mouth's small"] },
        ],
      },
      {
        id: 'health-2',
        title: 'Feeling sick',
        vocab: [
          { es: 'enfermo', en: 'sick' },
          { es: 'me duele', en: 'it hurts' },
          { es: 'el hospital', en: 'the hospital' },
          { es: 'la medicina', en: 'the medicine' },
          { es: 'cansado', en: 'tired' },
          { es: 'la salud', en: 'health' },
        ],
        sentences: [
          {
            es: 'estoy enfermo',
            en: 'I am sick',
            enAlt: ["I'm sick", 'I am ill', "I'm ill"],
            esAlt: ['yo estoy enfermo'],
          },
          {
            es: 'me duele la cabeza',
            en: 'my head hurts',
            enAlt: ['I have a headache'],
            esAlt: ['la cabeza me duele'],
          },
          {
            es: 'necesito la medicina',
            en: 'I need the medicine',
            enAlt: ['I need medicine'],
            esAlt: ['yo necesito la medicina'],
          },
        ],
      },
      {
        id: 'health-3',
        title: 'Staying well',
        vocab: [
          { es: 'duermo', en: 'I sleep' },
          { es: 'corro', en: 'I run' },
          { es: 'fuerte', en: 'strong' },
          { es: 'feliz', en: 'happy' },
          { es: 'triste', en: 'sad' },
          { es: 'la vida', en: 'the life' },
        ],
        sentences: [
          {
            es: 'duermo mucho',
            en: 'I sleep a lot',
            enAlt: ['I am sleeping a lot', "I'm sleeping a lot"],
            esAlt: ['yo duermo mucho'],
          },
          {
            es: 'corro en el parque',
            en: 'I run in the park',
            enAlt: ['I am running in the park', "I'm running in the park"],
            esAlt: ['yo corro en el parque'],
          },
          {
            es: 'la vida es bonita',
            en: 'life is pretty',
            enAlt: ['life is beautiful', 'the life is pretty'],
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
