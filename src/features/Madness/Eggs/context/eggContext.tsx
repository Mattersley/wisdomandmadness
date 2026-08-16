'use client'

import React, { createContext, useCallback, useMemo, useReducer } from 'react'
import eggReducer from '@/features/Madness/Eggs/reducer/eggReducer'
import { EggContextType } from '@/features/Madness/Eggs/context/eggContext.types'
import eggList from '@/features/Madness/data/egglist'

export const EggContext = createContext({} as EggContextType)
EggContext.displayName = 'EggContext'

const createInitialEggState = {
  eggs: 0,
  eggList: eggList
}

export const EggProvider = ({ children }: { children: React.ReactNode }) => {
  const [eggs, dispatch] = useReducer(eggReducer, createInitialEggState)

  const eggFound = useCallback((id: number) => {
    dispatch({ type: 'eggFound', id })
  }, [])

  const resetEggCount = () => {
    dispatch({ type: 'removeEggs' })
  }

  const value = useMemo(
    () => ({
      eggs,
      eggFound,
      resetEggCount
    }),
    [eggFound, eggs]
  )

  return <EggContext.Provider value={value}>{children}</EggContext.Provider>
}
