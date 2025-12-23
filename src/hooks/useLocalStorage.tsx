import { useSyncExternalStore, useCallback } from 'react'

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // 1. Subscribe to 'storage' events (covers other tabs)
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('storage', callback)
    return () => window.removeEventListener('storage', callback)
  }, [])

  // 2. Get Snapshot (must be referentially stable if returning objects)
  const getSnapshot = () => {
    const raw = localStorage.getItem(key)
    if (raw === null) return initialValue
    try {
      return JSON.parse(raw) as T
    } catch {
      return initialValue
    }
  }

  // 3. Server Snapshot (prevents hydration mismatch in Next.js/Remix)
  const getServerSnapshot = () => initialValue

  // 4. Connect to store
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // 5. Update wrapper
  const setValue = useCallback(
    (newValue: T) => {
      const stringifiedValue = JSON.stringify(newValue)
      localStorage.setItem(key, stringifiedValue)

      // The 'storage' event doesn't fire in the same tab that changed it.
      // We manually dispatch it to notify useSyncExternalStore in this tab.
      window.dispatchEvent(
        new StorageEvent('storage', { key, newValue: stringifiedValue })
      )
    },
    [key]
  )

  return [value, setValue]
}
