export type TimerStatus = 'idle' | 'running' | 'paused' | 'away' | 'completed'

export interface TimerState {
  originalDuration: number
  remainingTime: number
  totalAwayTime: number
  status: TimerStatus
  awayStartTime: number | null
  lastUpdated: number
}

export interface PersistedState {
  timer: TimerState
  alwaysOnTop: boolean
  windowBounds?: {
    x: number
    y: number
    width: number
    height: number
  }
}

export interface ElectronAPI {
  getState: () => Promise<PersistedState | null>
  saveState: (state: PersistedState) => Promise<void>
  setAlwaysOnTop: (value: boolean) => Promise<void>
  getAlwaysOnTop: () => Promise<boolean>
  minimize: () => void
  close: () => void
  onUpdaterEvent: (callback: (event: string, data?: any) => void) => () => void
  installUpdate: () => void
  trackEvent: (eventName: string, properties?: any) => void
  getVersion?: () => Promise<string>
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}
