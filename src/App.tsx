import { useCallback, useEffect, useRef, useState } from 'react'
import { TitleBar } from '@/components/TitleBar'
import { TimerDisplay } from '@/components/TimerDisplay'
import { DurationInput } from '@/components/DurationInput'
import { ControlButtons } from '@/components/ControlButtons'
import { StatsPanel } from '@/components/StatsPanel'
import { useTimer } from '@/hooks/useTimer'
import type { TimerState } from '@/types/timer'
import './App.css'

export default function App() {
  const [alwaysOnTop, setAlwaysOnTop] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const persist = useCallback(
    (timer: TimerState, aot: boolean) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = setTimeout(() => {
        window.electronAPI?.saveState({ timer, alwaysOnTop: aot })
      }, 300)
    },
    []
  )

  const { timer, awayElapsed, setDuration, start, pause, reset, enterAway, exitAway, loadState } =
    useTimer((state) => {
      if (loaded) persist(state, alwaysOnTop)
    })

  useEffect(() => {
    async function init() {
      const saved = await window.electronAPI?.getState()
      if (saved?.timer) {
        loadState(saved.timer as TimerState)
      }
      if (saved?.alwaysOnTop !== undefined) {
        setAlwaysOnTop(saved.alwaysOnTop)
      } else {
        const aot = await window.electronAPI?.getAlwaysOnTop()
        if (aot !== undefined) setAlwaysOnTop(aot)
      }
      setLoaded(true)
    }
    init()
  }, [loadState])

  const handleToggleAlwaysOnTop = useCallback(async () => {
    const next = !alwaysOnTop
    setAlwaysOnTop(next)
    await window.electronAPI?.setAlwaysOnTop(next)
    persist(timer, next)
  }, [alwaysOnTop, timer, persist])

  if (!loaded) {
    return (
      <div className="app app--loading">
        <div className="app__loader" />
      </div>
    )
  }

  return (
    <div className="app">
      <TitleBar alwaysOnTop={alwaysOnTop} onToggleAlwaysOnTop={handleToggleAlwaysOnTop} />
      <main className="app__content">
        <TimerDisplay timer={timer} awayElapsed={awayElapsed} />
        <DurationInput
          originalDuration={timer.originalDuration}
          status={timer.status}
          onSetDuration={setDuration}
        />
        <ControlButtons
          status={timer.status}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onEnterAway={enterAway}
          onExitAway={exitAway}
        />
        <StatsPanel timer={timer} awayElapsed={awayElapsed} />
      </main>
    </div>
  )
}
