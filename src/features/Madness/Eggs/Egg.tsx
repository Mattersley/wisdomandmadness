import { useContext, useState } from 'react'
import { EggContext } from '@/features/Madness/Eggs/context/eggContext'

interface EggProps {
  id: number;
  displayAs?: 'svg' | 'emoji';
}

const Egg = ({ id, displayAs = 'svg' }: EggProps) => {
  const { eggs, eggFound } = useContext(EggContext)
  const [isDisappearing, setIsDisappearing] = useState(false)

  const handleEggFound = () => {
    setIsDisappearing(true)
    // Wait for the 300ms fade-out animation to finish before updating global state
    setTimeout(() => {
      eggFound(id)
    }, 300)
  }

  // Guard clause for global state
  if (eggs.eggList[id].found) return null

  return (
    <button
      className={`group relative flex cursor-help items-center justify-center transition-all duration-300 ease-out select-none ${isDisappearing ? 'pointer-events-none scale-75 opacity-0' : 'opacity-100 hover:scale-110 active:scale-95'} `}
      onClick={handleEggFound}
      type="button"
    >
      {displayAs === 'emoji' ? (
        <span className="inline-flex items-center justify-center leading-none">
          🥚
        </span>
      ) : (
        <svg
          className="size-full"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          width="24"
          xmlns="https://w3.org"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none" />
          <path d="M19 14.083c0 4.154 -2.966 6.74 -7 6.917c-4.2 0 -7 -2.763 -7 -6.917c0 -5.538 3.5 -11.09 7 -11.083c3.5 .007 7 5.545 7 11.083z" />
        </svg>
      )}
    </button>
  )
}

export default Egg
