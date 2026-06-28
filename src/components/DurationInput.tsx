import { useState, useCallback } from 'react'
import { parseDuration, formatTime } from '@/utils/time'
import type { TimerStatus } from '@/types/timer'
import './DurationInput.css'

interface DurationInputProps {
  originalDuration: number
  status: TimerStatus
  onSetDuration: (seconds: number) => void
  disabled?: boolean
}

const PRESETS = [
  { label: '15m', seconds: 15 * 60 },
  { label: '25m', seconds: 25 * 60 },
  { label: '45m', seconds: 45 * 60 },
  { label: '1h', seconds: 60 * 60 },
]

export function DurationInput({
  originalDuration,
  status,
  onSetDuration,
  disabled,
}: DurationInputProps) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const isLocked = disabled || (status !== 'idle' && status !== 'completed')

  const handleSubmit = useCallback(() => {
    const seconds = parseDuration(input)
    if (seconds === null) {
      setError('Try 25, 1h, 45m, or 1:30:00')
      return
    }
    setError('')
    onSetDuration(seconds)
    setInput('')
  }, [input, onSetDuration])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="duration-input">
      <div className="duration-input__header">
        <span className="duration-input__label">Session</span>
        <span className="duration-input__current">{formatTime(originalDuration)}</span>
      </div>

      {!isLocked && (
        <>
          <div className="duration-input__presets">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                className={`duration-input__preset ${
                  originalDuration === preset.seconds ? 'active' : ''
                }`}
                onClick={() => onSetDuration(preset.seconds)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="duration-input__custom">
            <input
              type="text"
              className="duration-input__field"
              placeholder="Custom: 30m, 1h, 1:30:00"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setError('')
              }}
              onKeyDown={handleKeyDown}
            />
            <button className="duration-input__set-btn" onClick={handleSubmit}>
              Set
            </button>
          </div>
          {error && <span className="duration-input__error">{error}</span>}
        </>
      )}
    </div>
  )
}
