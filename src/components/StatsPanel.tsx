import { useEffect, useState } from 'react'
import { formatTime, getStatusLabel } from '@/utils/time'
import type { TimerState } from '@/types/timer'
import './StatsPanel.css'

interface StatsPanelProps {
  timer: TimerState
  awayElapsed: number
}

export function StatsPanel({ timer, awayElapsed }: StatsPanelProps) {
  const [version, setVersion] = useState('')
  const statusLabel = getStatusLabel(timer.status)
  const totalAway = timer.status === 'away'
    ? timer.totalAwayTime + awayElapsed
    : timer.totalAwayTime

  useEffect(() => {
    window.electronAPI?.getVersion?.().then((v) => {
      if (v) setVersion(v)
    })
  }, [])

  return (
    <div className="stats-panel">
      <div className="stats-panel__row">
        <div className="stats-panel__label">Status</div>
        <div className={`stats-panel__value status--${timer.status}`}>
          <span className="status-indicator"></span>
          {statusLabel}
        </div>
      </div>
      
      {totalAway > 0 && (
        <div className="stats-panel__row">
          <div className="stats-panel__label">Refunded Time</div>
          <div className="stats-panel__value away-time">
            +{formatTime(totalAway)}
          </div>
        </div>
      )}
      
      {version && <div className="stats-panel__version">v{version}</div>}
    </div>
  )
}
