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
  }
}

/** Coerce whatever was in storage into a valid Progress shape, field by field. */
function sanitize(raw: unknown): Progress {
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

  return {
    xp: num(r.xp, 0),
    hearts: Math.min(MAX_HEARTS, num(r.hearts, MAX_HEARTS)),
    streak: num(r.streak, 0),
    lastActiveDate: dateStr(r.lastActiveDate),
    lastHeartRefill: dateStr(r.lastHeartRefill),
    completedLessons,
  }
}

function load(): Progress {
  let stored: Progress
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    stored = raw ? sanitize(JSON.parse(raw)) : freshProgress()
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

  const completeLesson = useCallback((lessonId: string, xpEarned: number) => {
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
        completedLessons: {
          ...p.completedLessons,
          [lessonId]: (p.completedLessons[lessonId] ?? 0) + 1,
        },
      }
    })
  }, [])

  const refillHearts = useCallback(() => {
    setProgress((p) => ({ ...p, hearts: MAX_HEARTS }))
  }, [])

  return { progress, loseHeart, completeLesson, refillHearts }
}

/** A lesson is unlocked when every lesson before it has been completed at least once. */
export function isLessonUnlocked(progress: Progress, lessonId: string): boolean {
  const index = lessonOrder.indexOf(lessonId)
  if (index <= 0) return true
  return lessonOrder.slice(0, index).every((id) => (progress.completedLessons[id] ?? 0) > 0)
}
