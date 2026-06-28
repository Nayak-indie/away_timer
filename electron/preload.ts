import { contextBridge, ipcRenderer } from 'electron'
import type { PersistedState } from '../src/types/timer'

contextBridge.exposeInMainWorld('electronAPI', {
  getState: (): Promise<PersistedState | null> => ipcRenderer.invoke('get-state'),
  saveState: (state: PersistedState): Promise<void> => ipcRenderer.invoke('save-state', state),
  setAlwaysOnTop: (value: boolean): Promise<void> => ipcRenderer.invoke('set-always-on-top', value),
  getAlwaysOnTop: (): Promise<boolean> => ipcRenderer.invoke('get-always-on-top'),
  minimize: (): void => ipcRenderer.send('window-minimize'),
  close: (): void => ipcRenderer.send('window-close'),
})
