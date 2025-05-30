import { useContext, useEffect, useState } from 'react'
import { EggContext } from '@/context/eggContext'

const EggCounter = () => {
  const { eggs, resetEggCount } = useContext(EggContext)
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    if (eggs.eggs > 0) {
      setIsPulsing(true)
      const timer = setTimeout(() => setIsPulsing(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [eggs.eggs])

  return (
    <>
      {eggs.eggs > 0 && (
        <button
          className={`group relative flex flex-row items-center gap-2 rounded-3xl bg-yellow-500 p-2 text-white transition-transform ${
            isPulsing ? 'animate-bounce' : ''
          }`}
          onClick={resetEggCount}
          type="button"
        >
          <span className="absolute -left-10 z-[100] hidden text-white group-hover:block">
            <svg
              fill="none"
              height="30"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" stroke="none" />
              <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" />
            </svg>
          </span>
          <svg
            fill="white"
            height="34"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            width="34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
            <path d="M19 14.083c0 4.154 -2.966 6.74 -7 6.917c-4.2 0 -7 -2.763 -7 -6.917c0 -5.538 3.5 -11.09 7 -11.083c3.5 .007 7 5.545 7 11.083z" />
          </svg>
          <p className="absolute left-[1.3rem] font-mono text-xs font-bold text-yellow-500">
            {eggs.eggs}
          </p>
        </button>
      )}
    </>
  )
}

export default EggCounter
