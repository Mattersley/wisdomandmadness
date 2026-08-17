'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'

const PREFIXES = [
  'VORTEX',
  'ALPHA',
  'CHRONOS',
  'PHANTOM',
  'APEX',
  'COBALT',
  'SPECTRE'
]
const SUFFIXES = [
  'SHADOW',
  'ECHO',
  'STRIKE',
  'BEACON',
  'RAVEN',
  'MATRIX',
  'VECTOR'
]

interface SecretCodeContextType {
  generatedCode: string;
  isUnlocked: boolean;
  errorMsg: string;
  regenerateCode: () => void;
  verifyCode: (input: string) => boolean;
  relock: () => void;
}

const SecretCodeContext = createContext<SecretCodeContextType | undefined>(
  undefined
)

export const SecretCodeProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  // Generate a random valid dictionary code string
  const createRandomCode = (): string => {
    const p = PREFIXES[Math.floor(Math.random() * PREFIXES.length)]
    const s = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]
    const num = Math.floor(10 + Math.random() * 90)
    return `${p}_${s}_${num}`
  }

  const regenerateCode = () => {
    setGeneratedCode(createRandomCode())
  }

  // Sync state initially from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem('agency_feature_unlocked')
    if (savedStatus === 'true') {
      setIsUnlocked(true)
    } else {
      regenerateCode()
    }
  }, [])

  // Validation execution engine
  const verifyCode = (input: string): boolean => {
    const sanitized = input.trim().toUpperCase()

    // Check 1: Exact current matching token
    if (sanitized === generatedCode) {
      grantAccess()
      return true
    }

    // Check 2: Dynamic structural layout parsing rule
    const parts = sanitized.split('_')
    if (parts.length === 3) {
      const hasPrefix = PREFIXES.includes(parts[0])
      const hasSuffix = SUFFIXES.includes(parts[1])
      const hasValidNum = !isNaN(Number(parts[2])) && parts[2].length === 2

      if (hasPrefix && hasSuffix && hasValidNum) {
        grantAccess()
        return true
      }
    }

    setErrorMsg('Access Denied: Invalid Clearance Code.')
    return false
  }

  const grantAccess = () => {
    setErrorMsg('')
    setIsUnlocked(true)
    localStorage.setItem('agency_feature_unlocked', 'true')
  }

  const relock = () => {
    localStorage.removeItem('agency_feature_unlocked')
    setIsUnlocked(false)
    setErrorMsg('')
    regenerateCode()
  }

  return (
    <SecretCodeContext.Provider
      value={{
        generatedCode,
        isUnlocked,
        errorMsg,
        regenerateCode,
        verifyCode,
        relock
      }}
    >
      {children}
    </SecretCodeContext.Provider>
  )
}

// Custom consumption hook
export const useSecretCode = () => {
  const context = useContext(SecretCodeContext)
  if (!context) {
    throw new Error(
      'useSecretCode must be wrapped within a SecretCodeProvider'
    )
  }
  return context
}
