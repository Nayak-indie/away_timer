import type { TimerState } from '@/types/timer'

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function parseDuration(input: string): number | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  if (trimmed.includes(':')) {
    const parts = trimmed.split(':').map((p) => parseInt(p, 10))
    if (parts.some(isNaN)) return null

    if (parts.length === 2) {
      const [m, s] = parts
      if (m < 0 || s < 0 || s >= 60) return null
      return m * 60 + s
    }
    if (parts.length === 3) {
      const [h, m, s] = parts
      if (h < 0 || m < 0 || s < 0 || m >= 60 || s >= 60) return null
      return h * 3600 + m * 60 + s
    }
    return null
  }

  const num = parseFloat(trimmed)
  if (isNaN(num) || num <= 0) return null

  if (trimmed.endsWith('h')) {
    return Math.round(num * 3600)
  }
  if (trimmed.endsWith('m')) {
    return Math.round(num * 60)
  }

  return Math.round(num * 60)
}

export function createInitialTimerState(duration: number): TimerState {
  return {
    originalDuration: duration,
    remainingTime: duration,
    totalAwayTime: 0,
    status: 'idle',
    awayStartTime: null,
    lastUpdated: Date.now(),
  }
}

export function getStatusLabel(status: TimerState['status']): string {
  switch (status) {
    case 'running':
      return 'Running'
    case 'paused':
      return 'Paused'
    case 'away':
      return 'Away'
    case 'completed':
      return 'Completed'
    default:
      return 'Ready'
  }
}
