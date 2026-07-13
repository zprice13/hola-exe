let cachedVoice: SpeechSynthesisVoice | null | undefined

function spanishVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined) return cachedVoice
  const voices = window.speechSynthesis?.getVoices() ?? []
  cachedVoice = voices.find((v) => v.lang.startsWith('es')) ?? null
  return cachedVoice
}

// Voice list often loads asynchronously; invalidate the cache when it arrives.
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    cachedVoice = undefined
  })
}

export function speakSpanish(text: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'es-ES'
  utterance.rate = 0.9
  const voice = spanishVoice()
  if (voice) utterance.voice = voice
  window.speechSynthesis.speak(utterance)
}
