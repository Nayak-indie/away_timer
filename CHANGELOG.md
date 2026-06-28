# Changelog

## [1.1.2] - "Telemetry & Insights Update"

### Added
- **Anonymous Analytics**: Integrated PostHog to track anonymous usage patterns (App launches, Timer starts, Away mode usage).
- **Device UUIDs**: Generates a unique, anonymous device ID on first launch for aggregate behavior analysis without collecting personal data.

## [1.1.0] - "Auto-Update Foundation"

### Added
- **Auto-Updater Engine**: Added robust background update checking via `electron-updater` and `electron-log`. Checks automatically run on startup and every 6 hours.
- **Dark-Themed Updater UI**: Added a slick in-app banner for update progress, and a dynamic compact mode badge.
- **The Last Manual Download**: From this version forward, you will never need to manually download or run an installer again!

## [1.0.2] - "Focus Refund Update"

### Added
- **Continuous Timer Logic**: Away mode no longer pauses the timer. Instead, it tracks the duration you were gone and refunds the time upon your return.
- **Compact Mode**: Shrink the window down to 140x140 to activate a hyper-compact UI perfect for keeping beside PDFs and documents.
- **Focus Refund Animation**: Added a visual floating +Time cue when away time is compensated.
- **Funny EULA**: Added a lighthearted "Focus Refund" license agreement to the Windows installer.

### Changed
- Re-architected away time math to ensure offline logic supports continuous countdowns.
- Reduced minimum window constraints from 280x420 to 140x140.
