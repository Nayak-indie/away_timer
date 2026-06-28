import { app, BrowserWindow, ipcMain, screen } from 'electron'
import path from 'path'
import fs from 'fs'

const isDev = !app.isPackaged
const DATA_FILE = path.join(app.getPath('userData'), 'away-timer-state.json')

let mainWindow: BrowserWindow | null = null

interface PersistedState {
  timer: unknown
  alwaysOnTop: boolean
  windowBounds?: { x: number; y: number; width: number; height: number }
}

function loadState(): PersistedState | null {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    }
  } catch {
    // ignore corrupt state
  }
  return null
}

function saveState(state: PersistedState): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8')
  } catch {
    // ignore write errors
  }
}

function createWindow(): void {
  const saved = loadState()
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    width: saved?.windowBounds?.width ?? 320,
    height: saved?.windowBounds?.height ?? 480,
    x: saved?.windowBounds?.x ?? Math.round((width - 320) / 2),
    y: saved?.windowBounds?.y ?? Math.round((height - 480) / 2),
    minWidth: 140,
    minHeight: 140,
    maxWidth: 400,
    frame: false,
    transparent: false,
    resizable: true,
    alwaysOnTop: saved?.alwaysOnTop ?? false,
    backgroundColor: '#0f0f12',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    show: false,
  }

  mainWindow = new BrowserWindow(windowOptions)

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('close', () => {
    if (mainWindow) {
      const bounds = mainWindow.getBounds()
      const current = loadState()
      saveState({
        timer: current?.timer ?? {},
        alwaysOnTop: mainWindow.isAlwaysOnTop(),
        windowBounds: bounds,
      })
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('get-state', () => loadState())

ipcMain.handle('save-state', (_event, state: PersistedState) => {
  const current = loadState()
  saveState({
    ...state,
    windowBounds: current?.windowBounds ?? state.windowBounds,
  })
})

ipcMain.handle('set-always-on-top', (_event, value: boolean) => {
  mainWindow?.setAlwaysOnTop(value)
})

ipcMain.handle('get-always-on-top', () => mainWindow?.isAlwaysOnTop() ?? false)

ipcMain.on('window-minimize', () => mainWindow?.minimize())
ipcMain.on('window-close', () => mainWindow?.close())
