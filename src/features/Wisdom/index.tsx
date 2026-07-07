import React, { useContext } from 'react'
import { WormContext } from '@/context/wormContext'
import IDCard from '@/features/Wisdom/features/IDCard/IDCard'
import { DitheringShader } from '@/features/Dither/components/ui/dithering-shader'
import Egg from '@/features/Madness/Egg/Egg'
import { EggContext } from '@/context/eggContext'

const Wisdom = () => {
  const { setWorm } = useContext(WormContext)
  const { eggs } = useContext(EggContext)
  const showHiddenEgg = eggs.eggs !== 0 && !eggs.eggList[6].found

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
      {/*<div className="absolute h-screen w-screen">*/}
      {/*  <div className="grid size-full grid-cols-12 grid-rows-8 gap-0 rounded-3xl bg-linear-to-r p-10 opacity-20">*/}
      {/*    {Array.from({ length: 60 }).map((_, i) => (*/}
      {/*      <div*/}
      {/*        key={i}*/}
      {/*        className={`-mt-px -ml-px border border-gray-300 bg-indigo-600/10 ${(i % 4) + Math.floor(Math.random() * 3) === 0 && "row-span-2 rounded-full bg-indigo-600/5"} ${(i % 2) + Math.floor(Math.random() * 7.5) === 0 ? "col-span-2 row-span-1 rounded-full bg-rose-600/5" : "col-span-1 row-span-1 rounded-xl"}`}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*    <div className="col-span-4 col-start-5 row-span-6 row-start-2 bg-gray-100"></div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="z-1 flex flex-col items-center justify-center">
        <div className="mb-7 text-center text-white">
          <p className="font-vt323 text-6xl">Welcome Observer.</p>
          <p className="text-xl">Your ID card has been assigned</p>
        </div>
        {!showHiddenEgg && (
          <div className="absolute top-1/2 right-1/2 -mt-17 -mr-15 -translate-x-1/2 -translate-y-1/2 text-6xl">
            <span>🥚</span>
            <span className="absolute right-9 z-50 -mt-7 -mr-4 scale-290 text-transparent">
              <Egg id={6} />
            </span>
          </div>
        )}
        <div className="relative" style={{ contain: "layout" }}>
          {/* Fixed dimensions container to prevent layout shifts */}

          <div className="relative h-[700px] w-[400px] overflow-y-hidden">
            <IDCard />
          </div>
        </div>
      </div>

      <div className="absolute right-10 bottom-10 flex flex-row">
        <div className="font-inter relative flex w-full tracking-widest sm:flex-col sm:items-end sm:justify-end">
          {/*<button*/}
          {/*  className="mr-2 flex size-14 items-center justify-center rounded-full bg-gray-300 text-indigo-600 hover:bg-white sm:mr-0 sm:mb-2"*/}
          {/*  type="button"*/}
          {/*>*/}
          {/*  <svg*/}
          {/*    fill="none"*/}
          {/*    height="32"*/}
          {/*    stroke="currentColor"*/}
          {/*    strokeLinecap="round"*/}
          {/*    strokeLinejoin="round"*/}
          {/*    strokeWidth="1"*/}
          {/*    viewBox="0 0 24 24"*/}
          {/*    width="32"*/}
          {/*    xmlns="http://www.w3.org/2000/svg"*/}
          {/*  >*/}
          {/*    <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />*/}
          {/*    <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />*/}
          {/*    <path d="M12 9l0 3" />*/}
          {/*    <path d="M12 15l.01 0" />*/}
          {/*  </svg>*/}
          {/*</button>*/}
          <button
            className="flex size-14 items-center justify-center rounded-full bg-linear-to-r from-[#3F5EFB] to-[#FC466B] pt-2 text-sm text-white hover:bg-linear-to-b sm:bg-linear-to-t"
            onClick={() => setWorm("madness")}
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
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12.057a1.9 1.9 0 0 0 .614 .743c1.06 .713 2.472 .112 3.043 -.919c.839 -1.513 -.022 -3.368 -1.525 -4.08c-2 -.95 -4.371 .154 -5.24 2.086c-1.095 2.432 .29 5.248 2.71 6.246c2.931 1.208 6.283 -.418 7.438 -3.255c1.36 -3.343 -.557 -7.134 -3.896 -8.41c-3.855 -1.474 -8.2 .68 -9.636 4.422c-1.63 4.253 .823 9.024 5.082 10.576c4.778 1.74 10.118 -.941 11.833 -5.59a9.354 9.354 0 0 0 .577 -2.813" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wisdom
