import { useContext, useEffect, useState } from 'react'
import { EggContext } from '@/features/Madness/Eggs/context/eggContext'

const EggCounter = () => {
  const { eggs, resetEggCount } = useContext(EggContext)
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    if (eggs.eggs > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPulsing(true)
      const timer = setTimeout(() => setIsPulsing(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [eggs.eggs])

  return (
    <>
      {eggs.eggs > 0 && (
        <div
          className={`shadow-3xl group relative mr-4 flex w-80 flex-row items-center gap-2 rounded-3xl bg-yellow-500/20 p-2 text-white transition-transform hover:bg-yellow-500 ${
            isPulsing ? "animate-bounce" : ""
          }`}
        >
          {eggs.eggList.map((egg) => (
            <div key={egg.name} className="flex w-full">
              {egg.found ? (
                <div className="relative flex items-center justify-center">
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
                  <p className="absolute font-mono text-xs font-bold text-yellow-500">
                    {egg.id}
                  </p>
                </div>
              ) : (
                <div className="mx-auto flex items-center justify-center text-center font-mono text-2xl font-bold text-yellow-600/40 select-none">
                  ?
                </div>
              )}
            </div>
          ))}
          <button
            className="absolute -right-6 cursor-pointer text-red-800"
            onClick={resetEggCount}
          >
            X
          </button>
        </div>
      )}
    </>
  );
}

export default EggCounter
