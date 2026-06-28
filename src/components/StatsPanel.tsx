import { formatTime, getStatusLabel } from '@/utils/time'
import type { TimerState } from '@/types/timer'
import './StatsPanel.css'

interface StatsPanelProps {
  timer: TimerState
  awayElapsed: number
}

export function StatsPanel({ timer, awayElapsed }: StatsPanelProps) {
  const statusLabel = getStatusLabel(timer.status)
  const totalAway = timer.status === 'away'
    ? timer.totalAwayTime + awayElapsed
    : timer.totalAwayTime

  return (
    <div className="stats-panel">
      <div className="stats-panel__row">
        <span className="stats-panel__key">Status</span>
        <span className={`stats-panel__status status--${timer.status}`}>
          <span className="stats-panel__dot" />
          {statusLabel}
        </span>
      </div>
      <div className="stats-panel__row">
        <span className="stats-panel__key">Original</span>
        <span className="stats-panel__value">{formatTime(timer.originalDuration)}</span>
      </div>
      <div className="stats-panel__row">
        <span className="stats-panel__key">Remaining</span>
        <span className="stats-panel__value">{formatTime(timer.remainingTime)}</span>
      </div>
      <div className="stats-panel__row">
        <span className="stats-panel__key">Away time</span>
        <span className="stats-panel__value stats-panel__value--away">
          {formatTime(totalAway)}
        </span>
      </div>
    </div>
  )
}
