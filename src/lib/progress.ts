import { useCallback, useEffect, useState } from 'react'
import type { Progress } from '../types'
import { lessonOrder } from '../data/course'

const STORAGE_KEY = 'lingoapp-progress'
export const MAX_HEARTS = 5

function todayISO(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate(),
  ).padStart(2, '0')}`
}

function yesterdayISO(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`
}

function freshProgress(): Progress {
  return {
    xp: 0,
    hearts: MAX_HEARTS,
    streak: 0,
    lastActiveDate: null,
    lastHeartRefill: todayISO(),
    completedLessons: {},
    wordStats: {},
  }
}

/** Coerce untrusted data (storage, imported save codes) into a valid Progress shape. */
export function sanitizeProgress(raw: unknown): Progress {
  const fresh = freshProgress()
  if (typeof raw !== 'object' || raw === null) return fresh
  const r = raw as Record<string, unknown>

  const num = (v: unknown, fallback: number) =>
    typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : fallback
  const dateStr = (v: unknown) => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null)

  const completedLessons: Record<string, number> = {}
  if (typeof r.completedLessons === 'object' && r.completedLessons !== null) {
    for (const [key, value] of Object.entries(r.completedLessons as Record<string, unknown>)) {
      if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
        completedLessons[key] = value
      }
    }
  }

  const wordStats: Progress['wordStats'] = {}
  if (typeof r.wordStats === 'object' && r.wordStats !== null) {
    for (const [key, value] of Object.entries(r.wordStats as Record<string, unknown>)) {
      if (typeof value !== 'object' || value === null) continue
      const v = value as Record<string, unknown>
      const seen = num(v.seen, 0)
      const missed = num(v.missed, 0)
      if (seen > 0 || missed > 0) wordStats[key] = { seen, missed }
    }
  }

  return {
    xp: num(r.xp, 0),
    hearts: Math.min(MAX_HEARTS, num(r.hearts, MAX_HEARTS)),
    streak: num(r.streak, 0),
    lastActiveDate: dateStr(r.lastActiveDate),
    lastHeartRefill: dateStr(r.lastHeartRefill),
    completedLessons,
    wordStats,
  }
}

function load(): Progress {
  let stored: Progress
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    stored = raw ? sanitizeProgress(JSON.parse(raw)) : freshProgress()
  } catch {
    stored = freshProgress()
  }

  // Hearts refill once per day. The refill date is stamped (and persisted via
  // the save effect in useProgress) so a same-day reload can't refill again.
  if (stored.lastHeartRefill !== todayISO()) {
    stored.hearts = MAX_HEARTS
    stored.lastHeartRefill = todayISO()
  }
  // A missed day (other than today/yesterday) breaks the streak
  if (
    stored.lastActiveDate &&
    stored.lastActiveDate !== todayISO() &&
    stored.lastActiveDate !== yesterdayISO()
  ) {
    stored.streak = 0
  }
  return stored
}

function save(progress: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Storage full or unavailable — the app still works for this session
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  // Persist outside the setState updater (updaters must stay pure), and on
  // mount so load-time adjustments (daily refill stamp) are written back.
  useEffect(() => {
    save(progress)
  }, [progress])

  const loseHeart = useCallback(() => {
    setProgress((p) => ({ ...p, hearts: Math.max(0, p.hearts - 1) }))
  }, [])

  const completeLesson = useCallback((lessonId: string | null, xpEarned: number) => {
    setProgress((p) => {
      const today = todayISO()
      const streak =
        p.lastActiveDate === today ? p.streak : p.lastActiveDate === yesterdayISO() ? p.streak + 1 : 1
      return {
        ...p,
        xp: p.xp + xpEarned,
        hearts: Math.min(MAX_HEARTS, p.hearts + 1),
        streak,
        lastActiveDate: today,
        // Practice sessions (lessonId null) earn XP/streak but no crowns
        completedLessons:
          lessonId === null
            ? p.completedLessons
            : { ...p.completedLessons, [lessonId]: (p.completedLessons[lessonId] ?? 0) + 1 },
      }
    })
  }, [])

  const recordWordResult = useCallback((key: string, correct: boolean) => {
    setProgress((p) => {
      const prev = p.wordStats[key] ?? { seen: 0, missed: 0 }
      return {
        ...p,
        wordStats: {
          ...p.wordStats,
          [key]: { seen: prev.seen + 1, missed: prev.missed + (correct ? 0 : 1) },
        },
      }
    })
  }, [])

  const refillHearts = useCallback(() => {
    setProgress((p) => ({ ...p, hearts: MAX_HEARTS }))
  }, [])

  /** Wholesale replacement, used when loading a save file. */
  const replaceProgress = useCallback((next: Progress) => {
    setProgress(next)
  }, [])

  return { progress, loseHeart, completeLesson, refillHearts, replaceProgress, recordWordResult }
}

/** A lesson is unlocked when every lesson before it has been completed at least once. */
export function isLessonUnlocked(progress: Progress, lessonId: string): boolean {
  const index = lessonOrder.indexOf(lessonId)
  if (index <= 0) return true
  return lessonOrder.slice(0, index).every((id) => (progress.completedLessons[id] ?? 0) > 0)
}
