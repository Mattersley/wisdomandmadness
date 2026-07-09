import { useFont } from '@react-three/drei'

const STORAGE_KEY = 'app_scene_has_loaded'
const SLOW_CONNECTION_TIMEOUT = 5000

export const isAlreadyLoaded = () => {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(STORAGE_KEY) === 'true'
}

// 1. Maintain a single, stable state object reference in file scope
let loaderStateSnapshot = {
  stage: isAlreadyLoaded() ? 'hidden' : 'loading',
  isSlow: false
}

const listeners = new Set()
let warningTimer = null

export const sceneLoaderStore = {
  // 2. ADD THIS METHOD TO RESOLVE THE TS2339 COMPILER ERROR
  getSnapshot: () => loaderStateSnapshot,

  getStage: () => loaderStateSnapshot.stage,
  getIsSlow: () => loaderStateSnapshot.isSlow,

  subscribe: (callback) => {
    listeners.add(callback)
    return () => listeners.delete(callback)
  },

  // Notify all listeners of any mutations
  _emit: () => {
    listeners.forEach((cb) => cb())
  },

  complete: (fadeDuration = 2000) => {
    if (warningTimer) clearTimeout(warningTimer)
    if (loaderStateSnapshot.stage !== 'loading') return

    // Mutate the object reference immutably so useSyncExternalStore detects changes
    loaderStateSnapshot = { ...loaderStateSnapshot, stage: 'fading' }
    sceneLoaderStore._emit()

    setTimeout(() => {
      loaderStateSnapshot = { ...loaderStateSnapshot, stage: 'hidden' }
      sceneLoaderStore._emit()
    }, fadeDuration)
  }
}

// Global parallel asset preloader
export const preloadSceneAssets = () => {
  if (isAlreadyLoaded()) return Promise.resolve()

  // Start the connection timer
  warningTimer = setTimeout(() => {
    if (loaderStateSnapshot.stage === 'loading') {
      loaderStateSnapshot = { ...loaderStateSnapshot, isSlow: true }
      sceneLoaderStore._emit()
    }
  }, SLOW_CONNECTION_TIMEOUT)

  const assets = [
    () => useFont.preload('/fonts/Instrument.json'),
    () => useFont.preload('/fonts/VagraReg.json')
  ]

  return Promise.all(assets.map((load) => load())).then(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    }
  })
}
