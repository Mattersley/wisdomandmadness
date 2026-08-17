import React, { useContext, useEffect, useState } from 'react'
import { WormContext } from '@/context/wormContext'
import IDCard from '@/features/ID/features/IDCard/IDCard'
import { DitheringShader } from '@/features/Unused/Dither/components/ui/dithering-shader'
import Egg from '@/features/Madness/Eggs/Egg'
import { EggContext } from '@/features/Madness/Eggs/context/eggContext'
import SecretGenerator from '@/features/SecretCode/SecretGenerator'

const ID = () => {
  const { eggs } = useContext(EggContext)
  const { setWorm } = useContext(WormContext)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showEgg, setShowEgg] = useState(false)

  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setShowEgg(true)
      }, 530)
    }
  }, [isAnimating])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
      <div className="absolute h-screen w-full overflow-hidden">
        <DitheringShader
          className="absolute size-full"
          colorBack="#3F5EFB"
          colorFront="#FC466B"
          pxSize={2}
          shape="warp"
          speed={0.9}
          type="8x8"
        />
      </div>

      {/* Main card and title content container */}
      <div className="z-1 flex flex-col items-center justify-center">
        <div className="mb-7 text-center text-white select-none">
          <p className="font-vt323 text-6xl">Welcome Observer.</p>
          <p className="text-xl">Your ID card has been assigned</p>
        </div>

        {!eggs.eggList[6].found && (
          <div
            className={`${showEgg && 'z-100'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl`}
          >
            <Egg displayAs="emoji" id={6} />
          </div>
        )}

        <div className="relative" style={{ contain: 'layout' }}>
          <div className="relative h-[700px] w-[400px] overflow-y-clip">
            <IDCard isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
          </div>
        </div>

        {isAnimating && showEgg && (
          <div className="absolute bottom-10">
            <SecretGenerator />
          </div>
        )}
      </div>

      <div className="absolute top-10 right-10 flex flex-row">
        <div className="font-inter relative flex w-full tracking-widest sm:flex-col sm:items-end sm:justify-end">
          <button
            className="flex size-14 items-center justify-center rounded-full bg-linear-to-r from-[#3F5EFB] to-[#FC466B] pt-2 text-sm text-white hover:bg-linear-to-b sm:bg-linear-to-t"
            onClick={() => setWorm('madness')}
            type="button"
          >
            <svg
              className="size-7 sm:mb-2"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.3"
              viewBox="0 0 24 24"
              xmlns="http://w3.org"
            >
              <path d="M10 12.057a1.9 1.9 0 0 0 .614 .743c1.06 .713 2.472 .112 3.043 -.919c.839 -1.513 -.022 -3.368 -1.525 -4.08c-2 -.95 -4.371 .154 -5.24 2.086c-1.095 2.432 .29 5.248 2.71 6.246c2.931 1.208 6.283 -.418 7.438 -3.255c1.36 -3.343 -.557 -7.134 -3.896 -8.41c-3.855 -1.474 -8.2 .68 -9.636 4.422c-1.63 4.253 .823 9.024 5.082 10.576c4.778 1.74 10.118 -.941 11.833 -5.59a9.354 9.354 0 0 0 .577 -2.813" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ID
