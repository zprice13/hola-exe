import { useCallback, useState } from 'react'
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

const defaultProgress: Progress = {
  xp: 0,
  hearts: MAX_HEARTS,
  streak: 0,
  lastActiveDate: null,
  lastHeartRefill: null,
  completedLessons: {},
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress
    const stored = { ...defaultProgress, ...(JSON.parse(raw) as Partial<Progress>) }

    // Hearts refill once per day
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
  } catch {
    return defaultProgress
  }
}

function save(progress: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  const update = useCallback((updater: (prev: Progress) => Progress) => {
    setProgress((prev) => {
      const next = updater(prev)
      save(next)
      return next
    })
  }, [])

  const loseHeart = useCallback(() => {
    update((p) => ({ ...p, hearts: Math.max(0, p.hearts - 1) }))
  }, [update])

  const completeLesson = useCallback(
    (lessonId: string, xpEarned: number) => {
      update((p) => {
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
    },
    [update],
  )

  const refillHearts = useCallback(() => {
    update((p) => ({ ...p, hearts: MAX_HEARTS }))
  }, [update])

  return { progress, loseHeart, completeLesson, refillHearts }
}

/** A lesson is unlocked when every lesson before it has been completed at least once. */
export function isLessonUnlocked(progress: Progress, lessonId: string): boolean {
  const index = lessonOrder.indexOf(lessonId)
  if (index <= 0) return true
  return lessonOrder.slice(0, index).every((id) => (progress.completedLessons[id] ?? 0) > 0)
}
