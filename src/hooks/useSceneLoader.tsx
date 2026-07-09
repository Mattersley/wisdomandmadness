import { useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'

// Unique storage key for your application session
const STORAGE_KEY = 'app_scene_has_loaded'

const useSceneLoader = (fadeDuration = 2, timeoutDelay = 5000) => {
  // Check sessionStorage immediately on initial initialization
  const [stage, setStage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasLoaded = sessionStorage.getItem(STORAGE_KEY) === 'true'
      if (hasLoaded) return 'hidden'
    }
    return 'loading'
  })

  const { progress } = useProgress()
  const [isConnectionSlow, setIsConnectionSlow] = useState(false)

  // Track if this is a skipped instance to bypass progress readings
  const isAlreadyLoaded = stage === 'hidden'

  // 1. Slow Connection Watcher
  useEffect(() => {
    if (isAlreadyLoaded) return

    const timer = setTimeout(() => setIsConnectionSlow(true), timeoutDelay)
    return () => clearTimeout(timer)
  }, [timeoutDelay, isAlreadyLoaded])

  // 2. Clear loader only when explicitly commanded by the Canvas scene
  const completeLoadingPipeline = () => {
    if (stage !== 'loading') return

    // Save to browser session storage so a refresh skips loading
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    }

    setStage('fading')

    setTimeout(() => {
      setStage('hidden')
    }, fadeDuration * 1000)
  }

  return {
    progress: isAlreadyLoaded ? 100 : progress,
    opacity: stage === 'loading' ? 1 : 0,
    isHidden: stage === 'hidden',
    completeLoadingPipeline,
    fadeDuration,
    showSlowWarning: isConnectionSlow && stage === 'loading'
  }
}

export default useSceneLoader
