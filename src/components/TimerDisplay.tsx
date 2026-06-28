import { formatTime } from '@/utils/time'
import type { TimerState } from '@/types/timer'
import './TimerDisplay.css'

interface TimerDisplayProps {
  timer: TimerState
  awayElapsed: number
}

export function TimerDisplay({ timer, awayElapsed }: TimerDisplayProps) {
  const isAway = timer.status === 'away'
  const displayTime = isAway ? timer.remainingTime : timer.remainingTime

  return (
    <div className={`timer-display ${timer.status}`}>
      <div className="timer-display__main">
        <span className="timer-display__time">{formatTime(displayTime)}</span>
        <span className="timer-display__label">remaining</span>
      </div>

      {isAway && (
        <div className="timer-display__away animate-fade-in">
          <span className="timer-display__away-label">Away for</span>
          <span className="timer-display__away-time">{formatTime(awayElapsed)}</span>
        </div>
      )}

      {timer.status === 'completed' && (
        <div className="timer-display__complete animate-fade-in">
          Session complete
        </div>
      )}
    </div>
  )
}
