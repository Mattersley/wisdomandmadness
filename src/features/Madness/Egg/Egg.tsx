import { useContext } from 'react'
import { EggContext } from '@/context/eggContext'

const Egg = ({ id }: { id: number }) => {
  const { eggs, eggFound } = useContext(EggContext)

  const handleEggFound = () => {
    eggFound(id)
  }

  return (
    <>
      {!eggs.eggList[id].found && (
        <button className="cursor-hover-text group relative size-full" onClick={handleEggFound}>
          <p className="absolute -top-2 -left-1.5 z-[100] hidden font-mono text-3xl font-bold tracking-tighter group-hover:block group-hover:animate-bounce">
            ??
          </p>
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
            <path d="M19 14.083c0 4.154 -2.966 6.74 -7 6.917c-4.2 0 -7 -2.763 -7 -6.917c0 -5.538 3.5 -11.09 7 -11.083c3.5 .007 7 5.545 7 11.083z" />
          </svg>
        </button>
      )}
    </>
  )
}

export default Egg
