import { useEffect, useState } from 'react'
import { formatTime } from '@/utils/time'
import type { TimerState } from '@/types/timer'
import './TimerDisplay.css'

interface TimerDisplayProps {
  timer: TimerState
  awayElapsed: number
}

export function TimerDisplay({ timer, awayElapsed }: TimerDisplayProps) {
  const isAway = timer.status === 'away'
  const displayTime = timer.remainingTime

  const [refundAnimation, setRefundAnimation] = useState<{ amount: number, id: number } | null>(null)
  const [prevStatus, setPrevStatus] = useState(timer.status)
  const [lastAwayElapsed, setLastAwayElapsed] = useState(0)

  useEffect(() => {
    if (isAway && awayElapsed > 0) {
      setLastAwayElapsed(awayElapsed)
    }
  }, [isAway, awayElapsed])

  useEffect(() => {
    if (prevStatus === 'away' && timer.status === 'running' && lastAwayElapsed > 0) {
      setRefundAnimation({ amount: lastAwayElapsed, id: Date.now() })
      setTimeout(() => setRefundAnimation(null), 3000)
    }
    setPrevStatus(timer.status)
  }, [timer.status, prevStatus, lastAwayElapsed])

  return (
    <div className={`timer-display ${timer.status}`}>
      <div className="timer-display__main">
        <span className="timer-display__time">{formatTime(displayTime)}</span>
        <span className="timer-display__label">remaining</span>
        
        {refundAnimation && (
          <span key={refundAnimation.id} className="timer-display__refund">
            +{formatTime(refundAnimation.amount)}
          </span>
        )}
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
