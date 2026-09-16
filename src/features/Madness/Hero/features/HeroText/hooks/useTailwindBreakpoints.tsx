import { useState, useEffect } from 'react'

// Define Tailwind default pixel breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

export function useTailwindBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<
    'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'base'
  >('base')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= breakpoints['2xl']) setBreakpoint('2xl')
      else if (width >= breakpoints.xl) setBreakpoint('xl')
      else if (width >= breakpoints.lg) setBreakpoint('lg')
      else if (width >= breakpoints.md) setBreakpoint('md')
      else if (width >= breakpoints.sm) setBreakpoint('sm')
      else setBreakpoint('base')
    }

    handleResize() // Run on mount
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}
