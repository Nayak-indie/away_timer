# Away Timer

A minimal, dark-themed desktop timer for productivity and interruption tracking. Stay focused while reading PDFs or studying — when life interrupts you, Away Timer automatically extends your session by the time you were away.

![Away Timer](https://img.shields.io/badge/platform-Windows-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Flexible durations** — Set timers via presets (15m, 25m, 45m, 1h) or custom input (`30m`, `1h`, `1:30:00`)
- **Away Mode** — Pause your countdown and track distraction time; returning adds elapsed away time back to your session
- **Session stats** — Original duration, remaining time, accumulated away time, and live status
- **Always on top** — Pin the compact window above PDFs and study materials
- **Persistent state** — Timer progress survives app restarts
- **Compact design** — ~320px wide floating window with a modern dark UI

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm 9+

### Development

```bash
npm install
npm run dev
```

This launches the Electron app with hot reload.

### Build Windows Installer

```bash
npm run build
```

The NSIS installer (`.exe`) is output to `release/`.

## Usage

1. Set your session duration using presets or custom input
2. Click **Start** to begin the countdown
3. Got distracted? Click **Away Mode** — the timer pauses and tracks time away
4. Click **Back** when you return — away time is added to your remaining session
5. Use the pin icon to keep the window always on top

## Tech Stack

- **Electron** — Cross-platform desktop shell
- **React 19** + **TypeScript** — UI layer
- **Vite** — Build tooling and dev server
- **electron-builder** — Windows NSIS installer packaging

## Project Structure

```
away-timer/
├── electron/          # Main process & preload scripts
├── src/
│   ├── components/    # UI components
│   ├── hooks/         # Timer logic hook
│   ├── types/         # TypeScript definitions
│   └── utils/         # Time formatting & parsing
├── .github/workflows/ # CI/CD release pipeline
└── release/           # Built installers (gitignored)
```

## License

MIT
