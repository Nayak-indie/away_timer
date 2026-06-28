import './TitleBar.css'

interface TitleBarProps {
  alwaysOnTop: boolean
  onToggleAlwaysOnTop: () => void
}

export function TitleBar({ alwaysOnTop, onToggleAlwaysOnTop }: TitleBarProps) {
  return (
    <div className="title-bar">
      <div className="title-bar__drag">
        <span className="title-bar__icon">⏱</span>
        <span className="title-bar__title">Away Timer</span>
      </div>
      <div className="title-bar__controls">
        <button
          className={`title-bar__btn ${alwaysOnTop ? 'active' : ''}`}
          onClick={onToggleAlwaysOnTop}
          title="Always on top"
        >
          <PinIcon filled={alwaysOnTop} />
        </button>
        <button
          className="title-bar__btn"
          onClick={() => window.electronAPI?.minimize?.()}
          title="Minimize"
        >
          <MinimizeIcon />
        </button>
        <button
          className="title-bar__btn title-bar__btn--close"
          onClick={() => window.electronAPI?.close?.()}
          title="Close"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

function PinIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M12 17v5M9 10.76a2 2 0 01-1.11 1.79l-1.78.9A2 2 0 005 15.24V16a1 1 0 001 1h12a1 1 0 001-1v-.76a2 2 0 00-1.11-1.79l-1.78-.9A2 2 0 0115 10.76V6a1 1 0 00-1-1h-4a1 1 0 00-1 1v4.76z" />
    </svg>
  )
}

function MinimizeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  )
}
