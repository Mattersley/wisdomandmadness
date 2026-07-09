import Blobover from '@/features/Shared/Popover/Blobover'
import React, { useContext } from 'react'
import { WormContext } from '@/context/wormContext'

const Inquire = () => {
  const { setWorm } = useContext(WormContext)
  return (
    <div className="flex h-screen flex-col items-center bg-indigo-500/40">
      <div className="relative flex flex-row items-center gap-4 justify-start w-11/12 p-4 mt-10 rounded-full bg-indigo-500">
        <h2 className='text-white ml-6 font-instrument text-2xl font-bold'>Project Inquiry</h2>
        <p className=" text-white text-xs">Tell us about your vision.</p>
      </div>
      <div className="mt-8 w-11/12 bg-white rounded-3xl p-10 h-full">
        WIZZ
      </div>
      <div className="mb-10 mt-7">
        <Blobover
          colour="black"
          position="right"
          trigger={
            <button
              className="size-12 cursor-pointer items-center justify-center rounded-[50%] bg-neutral-950 text-white hover:bg-gray-500 sm:size-16"
              onClick={() => setWorm('madness')}
              type="button"
            >
              <span className="size-full">
                <svg
                  className="mx-auto size-6 sm:size-8"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                </svg>
              </span>
            </button>
          }
        >
          HOME
        </Blobover>
      </div>
    </div>
  )
}

export default Inquire
