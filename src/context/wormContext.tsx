'use client'

import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState
} from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

export type WormContextType = {
  currentProject: string;
  seenSplash: boolean;
  observerNumber: number;
  setCurrentProject: React.Dispatch<React.SetStateAction<string>>;
  setSeenSplash: (value: boolean) => void;
  setWorm: (value: 'wisdom' | 'madness' | 'ID' | 'inquire') => void;
  worm: 'wisdom' | 'madness' | 'ID' | 'inquire';
  logoState: 'default' | 'spin' | 'float' | 'wireframe' | 'chaos' | 'explode' | 'ghost' | 'tilt' | 'pulse' | 'disco' | 'jiggle' | 'meltdown';
  setLogoState: (state: 'default' | 'spin' | 'float' | 'wireframe' | 'chaos' | 'explode' | 'ghost' | 'tilt' | 'pulse' | 'disco' | 'jiggle' | 'meltdown') => void;
};

export const WormContext = createContext({} as WormContextType)
WormContext.displayName = 'WormContext'

export const WormProvider = ({ children }: { children: ReactNode }) => {
  const [worm, setWorm] = useLocalStorage<'wisdom' | 'madness' | 'ID' | 'inquire'>('worm', 'madness')
  const [logoState, setLogoState] = useState<'default' | 'spin' | 'float' | 'wireframe' | 'chaos' | 'explode' | 'ghost' | 'tilt' | 'pulse' | 'disco' | 'jiggle' | 'meltdown'>('default')
  const [seenSplash, setSeenSplash] = useLocalStorage('seen-splash', false)
  const [observerNumber, setObserverNumber] = useLocalStorage('observer', 0)
  const [currentProject, setCurrentProject] = useState<string>('')

  useEffect(() => {
    // Directly check localStorage to see if we truly need a new number
    const stored = localStorage.getItem('observer')
    if (!stored || JSON.parse(stored) === 0) {
      const random4Digit = Math.floor(1000 + Math.random() * 9000)
      setObserverNumber(random4Digit)
    }
  }, [setObserverNumber])

  const value = useMemo(
    () => ({
      currentProject,
      seenSplash,
      observerNumber,
      setCurrentProject,
      setSeenSplash,
      setWorm,
      worm,
      logoState,
      setLogoState
    }),
    [currentProject, seenSplash, observerNumber, setSeenSplash, setWorm, worm, logoState]
  )

  return <WormContext.Provider value={value}>{children}</WormContext.Provider>
}
