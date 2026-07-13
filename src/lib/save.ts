import type { Progress } from '../types'
import { sanitizeProgress } from './progress'

/**
 * Save codes are a versioned prefix + base64(JSON) of the progress object.
 * Small enough to paste in a text message, durable enough to survive one.
 */
const PREFIX = 'HOLA1:'

export function encodeSave(progress: Progress): string {
  const bytes = new TextEncoder().encode(JSON.stringify(progress))
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return PREFIX + btoa(bin)
}

export function decodeSave(code: string): Progress | null {
  try {
    const raw = code.replace(/\s+/g, '')
    const b64 = raw.startsWith(PREFIX) ? raw.slice(PREFIX.length) : raw
    const bin = atob(b64)
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes))
    if (typeof parsed !== 'object' || parsed === null) return null
    return sanitizeProgress(parsed)
  } catch {
    return null
  }
}

export function downloadSave(code: string) {
  const blob = new Blob([code], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'hola-exe.sav'
  a.click()
  URL.revokeObjectURL(url)
}
