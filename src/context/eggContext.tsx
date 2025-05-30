'use client'

import { createContext, useCallback, useMemo, useReducer } from 'react'
import eggReducer from '@/reducers/eggReducer'
import { EggContextType } from '@/context/eggContext.types'


export const EggContext = createContext({} as EggContextType)
EggContext.displayName = 'EggContext'

const createInitialEggState = {
    eggs: 0,
    eggList:
      [{
        id: 0,
        name: 'portfolio',
        found: false
      },{
        id: 1,
        name: 'title',
        found: false
      },{
        id: 2,
        name: 'parallax',
        found: false
      },{
        id: 3,
        name: 'wisdomPage',
        found: false
      },{
        id: 4,
        name: 'aboutFeature',
        found: false
      },{
        id: 5,
        name: 'myName',
        found: false
      }
      ]
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