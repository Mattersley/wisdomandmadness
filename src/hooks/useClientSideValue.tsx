'use client'

import { useState, useEffect } from 'react'

/**
 * A hook to generate a value client-side after initial render to prevent hydration errors.
 *
 * @param generateValue - Function that returns the value to be generated client-side.
 * @returns The generated value (type T), or null on the server/before client-side generation.
 */
const useClientSideValue = <T,>(generateValue: () => T): T | null => {
  const [value, setValue] = useState<T | null>(null)

  useEffect(() => {
    // This code only runs on the client side after the first render
    setValue(generateValue())
    // Dependency array is often empty if generateValue is a stable function
    // but included here to follow standard hook patterns.
  }, [generateValue])

  return value
}

export default useClientSideValue
