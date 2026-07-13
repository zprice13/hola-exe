type Speaker = 'rosana' | 'leo'

interface VoiceCast {
  base: SpeechSynthesisVoice | null
  rosana: SpeechSynthesisVoice | null
  leo: SpeechSynthesisVoice | null
}

let cachedCast: VoiceCast | undefined

// Common first names of female/male Spanish system voices (iOS, macOS,
// Android, Windows) — used to cast genuinely different voices per character.
const FEMALE_NAMES = ['mónica', 'monica', 'paulina', 'marisol', 'angélica', 'angelica', 'soledad', 'francisca', 'isabela', 'ximena', 'sabina', 'helena', 'elvira', 'lucía', 'lucia', 'female']
const MALE_NAMES = ['diego', 'juan', 'jorge', 'carlos', 'andrés', 'andres', 'felipe', 'enrique', 'álvaro', 'alvaro', 'reed', 'male']

function castVoices(): VoiceCast {
  if (cachedCast !== undefined) return cachedCast
  const voices = (window.speechSynthesis?.getVoices() ?? []).filter((v) =>
    v.lang.toLowerCase().startsWith('es'),
  )
  const byName = (names: string[]) =>
    voices.find((v) => names.some((n) => v.name.toLowerCase().includes(n))) ?? null

  const base = voices[0] ?? null
  const rosana = byName(FEMALE_NAMES) ?? base
  // Any different voice beats pitch-shifting the same one
  const leo = byName(MALE_NAMES) ?? voices.find((v) => v !== rosana) ?? base
  cachedCast = { base, rosana, leo }
  return cachedCast
}

// Voice list often loads asynchronously; invalidate the cache when it arrives.
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    cachedCast = undefined
  })
}

export function speakSpanish(text: string, options?: { speaker?: Speaker }) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'es-ES'
  utterance.rate = 0.9

  const cast = castVoices()
  let voice = cast.base
  if (options?.speaker === 'rosana') {
    voice = cast.rosana
    // Distinct system voice → light touch; same voice → push the pitch hard
    utterance.pitch = cast.rosana !== cast.leo ? 1.05 : 1.35
  } else if (options?.speaker === 'leo') {
    voice = cast.leo
    utterance.pitch = cast.rosana !== cast.leo ? 0.95 : 0.6
    utterance.rate = 0.82
  }
  if (voice) utterance.voice = voice
  window.speechSynthesis.speak(utterance)
}
