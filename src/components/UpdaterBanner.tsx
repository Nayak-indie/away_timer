import { useEffect, useState } from 'react'
import './UpdaterBanner.css'

type UpdateState = 'idle' | 'checking' | 'available' | 'not-available' | 'downloading' | 'downloaded' | 'error'

export function UpdaterBanner() {
  const [status, setStatus] = useState<UpdateState>('idle')
  const [progress, setProgress] = useState(0)
  const [version, setVersion] = useState('')

  useEffect(() => {
    if (!window.electronAPI?.onUpdaterEvent) return

    const cleanup = window.electronAPI.onUpdaterEvent((event, data) => {
      if (event === 'checking') setStatus('checking')
      else if (event === 'available') {
        setStatus('available')
        if (data?.version) setVersion(data.version)
      } else if (event === 'progress') {
        setStatus('downloading')
        if (data?.percent !== undefined) setProgress(data.percent)
      } else if (event === 'downloaded') {
        setStatus('downloaded')
      } else if (event === 'not-available' || event === 'error') {
        setStatus(event as UpdateState)
        // Auto hide after 3 seconds
        setTimeout(() => setStatus('idle'), 3000)
      }
    })
    return cleanup
  }, [])

  const handleInstall = () => {
    window.electronAPI?.installUpdate()
  }

  if (status === 'idle') return null

  return (
    <div className={`updater-banner status-${status}`}>
      <div className="updater-banner__content">
        {status === 'checking' && <span>Checking for updates...</span>}
        {status === 'not-available' && <span>Up to date!</span>}
        {status === 'available' && <span>Update {version} found...</span>}
        {status === 'error' && <span className="error-text">Update failed</span>}
        
        {status === 'downloading' && (
          <div className="updater-banner__progress-container">
            <span>Downloading {version && `v${version}`} — {Math.round(progress)}%</span>
            <div className="updater-banner__progress-bar">
              <div className="updater-banner__progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
        
        {status === 'downloaded' && (
          <div className="updater-banner__ready">
            <span>Update Ready</span>
            <button className="updater-banner__btn" onClick={handleInstall}>
              Restart to Install
            </button>
          </div>
        )}
      </div>
      
      {/* Compact mode badge */}
      <div className="updater-banner__badge" title={status === 'downloaded' ? 'Update Ready' : 'Updating...'}>
        {status === 'downloaded' ? (
           <button onClick={handleInstall} className="updater-banner__badge-btn">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2zM12 2l-7 7h4v6h6V9h4l-7-7z"/></svg>
           </button>
        ) : (
           <span className="updater-banner__badge-icon">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
           </span>
        )}
      </div>
    </div>
  )
}
