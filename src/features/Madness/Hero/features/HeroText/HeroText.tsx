import Image from 'next/image'

import WisdomLogo from '@/assets/WisdomLogo'
import { useContext, useState } from 'react'
import herotext from '@/features/Madness/data/herotext'
import Egg from '@/features/Madness/Eggs/Egg'
import { EggContext } from '@/features/Madness/Eggs/context/eggContext'

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1 // Month is 0-indexed

const HeroText = ({
  dark = true,
  text = true
}: {
  dark?: boolean;
  text?: boolean;
}) => {
  const { eggs } = useContext(EggContext)
  const [activeWing, setActiveWing] = useState<'sys' | 'art' | 'real'>('sys')
  const [selectedWing, setSelectedWing] = useState<
    'sys' | 'art' | 'real' | null
  >('sys')

  const getWingTextColor = (
    key: 'sys' | 'art' | 'real',
    isSelected: boolean
  ): string => {
    if (isSelected) {
      return key === 'real' ? 'text-black' : 'text-white'
    }

    if (key === 'sys') return 'text-indigo-500'
    if (key === 'art') return 'text-rose-500'
    return 'text-white'
  }

  const handleWingClick = (key: 'sys' | 'art' | 'real') => {
    if (selectedWing === key) {
      setSelectedWing(null)
    } else {
      setSelectedWing(key)
      setActiveWing(key)
    }
  }

  const colours = ['text-indigo-500/50', 'text-rose-500/50', 'text-white/50']

  return (
    <div
      className={
        'xs:bottom-10 absolute right-0 bottom-0 z-50 flex w-full p-4 select-none sm:bottom-0 sm:p-10'
      }
    >
      <div className="font-inter mx-auto flex w-full border border-gray-500/30 p-7 text-left sm:p-10">
        <div className="absolute top-0 right-1/2 mt-6 -mr-45 hidden flex-col items-center xl:flex">
          <div className="-mt-18 w-10 border-b border-gray-500/10" />
          <div className="mx-auto h-46 border-r border-gray-500/10" />
          <div className="-mt-6 flex w-90 flex-row items-center justify-between border-t border-gray-500/10">
            <div className="h-4 border-r border-gray-500/10" />
            <div className="h-4 border-r border-gray-500/10" />
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="mb-3 w-16">
              <WisdomLogo />
            </div>
            <div className="flex w-auto flex-row items-center justify-end">
              <p className="mr-3 hidden text-xs font-bold sm:flex">{`© ${year}/${month}`}</p>
              <div>
                <Image
                  alt={'Gradient Circle Image'}
                  className="mr-3"
                  height={30}
                  src={'/images/web-app-manifest-192x192.png'}
                  width={30}
                />
              </div>
              <p className="-mr-4 max-w-20 text-xs leading-4">
                Wisdom & Madness Design Co.
              </p>
            </div>
          </div>
          {text && (
            <div className="flex w-full flex-col font-mono text-xs tracking-tight transition-all duration-700 ease-in-out">
              <div
                className={`flex w-full flex-col gap-3 transition-colors duration-300 ${
                  dark ? 'border-neutral-400' : 'border-neutral-800'
                }`}
              >
                <span className="ml-1.5 text-xs font-bold tracking-widest">
                  WE CREATE... ... ...
                </span>

                <div className="mt-2 mb-6 flex w-full flex-row items-center justify-center gap-2 sm:gap-4">
                  {(['sys', 'art', 'real'] as const).map((key) => {
                    const isSelected = selectedWing === key
                    const wing = herotext[key]

                    return (
                      <div
                        key={key}
                        className="flex flex-col items-center gap-2"
                      >
                        <button
                          key={key}
                          className={`group relative z-10 flex min-h-16 min-w-16 transform items-center justify-start gap-4 overflow-hidden rounded-full border-0 p-3 text-left transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] hover:-translate-x-1 ${
                            isSelected
                              ? 'font-bold'
                              : 'cursor-pointer text-neutral-400 opacity-60 hover:text-white'
                          }`}
                          onClick={() => handleWingClick(key)}
                          type="button"
                        >
                          <div
                            className={`absolute top-3 left-3 z-0 size-12 origin-center rounded-full transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${wing.colorClass} ${
                              isSelected ? 'scale-[25]' : 'scale-110'
                            }`}
                          />
                          <div
                            className={`relative z-10 hidden size-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 lg:flex ${getWingTextColor(key, isSelected)}`}
                          >
                            {wing.icon}
                          </div>
                          <div
                            className={`${key === 'real' ? 'text-neutral-800' : 'text-white'} relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 lg:hidden`}
                          >
                            {wing.icon}
                          </div>
                          <div className="relative z-10 hidden flex-col pr-4 lg:flex">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`font-vt323 text-[1.4rem] font-bold tracking-wider uppercase transition-colors duration-500 ${getWingTextColor(key, isSelected)}`}
                              >
                                {wing.title}
                              </span>
                            </div>
                          </div>
                        </button>
                        <span
                          className={`${selectedWing === key ? wing.accentTextClass : `${wing.accentTextClass}/50`} font-vt323 text-lg font-bold tracking-wider uppercase transition-colors duration-500 lg:hidden`}
                        >
                          {wing.title}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div
                className={`flex w-full flex-col items-center justify-center text-lg leading-relaxed transition-all duration-500 select-none sm:px-6 ${
                  dark ? 'text-neutral-800' : 'text-neutral-400'
                }`}
              >
                <div
                  key={selectedWing || 'idle'}
                  className="mt-4 animate-[fadeIn_0.5s_ease-out_both] text-center leading-0"
                >
                  <span
                    className={`${herotext[activeWing].accentTextClass} font-vt323 text-center text-xl tracking-wide uppercase transition-colors duration-500 sm:text-xl lg:text-2xl xl:text-3xl`}
                  >
                    {selectedWing !== null && herotext[activeWing].subtitle}
                  </span>
                  <p className="mt-4 text-center font-mono text-xs font-light text-black normal-case mix-blend-difference sm:text-sm lg:text-lg">
                    {selectedWing
                      ? herotext[activeWing].desc
                      : 'Select an option to unpack our capabilities, specifications, and core philosophies.'}
                  </p>
                </div>

                <div className="mt-4 w-full">
                  {/*<div className="relative mb-5 h-px w-full overflow-hidden">*/}
                  {/*  <div*/}
                  {/*    className={*/}
                  {/*      'absolute inset-0 transition-colors duration-300'*/}
                  {/*    }*/}
                  {/*  />*/}
                  {/*  <div*/}
                  {/*    className={`absolute top-0 left-0 h-full w-10 animate-[loadingLine_8s_infinite_ease-in-out] ${herotext[activeWing].accentBgClass}`}*/}
                  {/*  />*/}
                  {/*</div>*/}
                  {activeWing === 'real' && !eggs.eggList[1].found && (
                    <div className="absolute bottom-13 right-13 z-1000 -ml-3 opacity-40">
                      <Egg id={1} />
                    </div>
                  )}
                  <ul
                    className={`mt-4 flex flex-col justify-between gap-2 font-mono text-xs uppercase transition-opacity duration-300 select-none sm:flex-row sm:gap-4 lg:gap-10 2xl:mx-auto 2xl:max-w-2/3 ${
                      selectedWing
                        ? 'opacity-100'
                        : 'pointer-events-none hidden'
                    } ${dark ? 'text-neutral-700' : 'text-neutral-300'}`}
                  >
                    {herotext[activeWing].points.map(
                      (point: string, index: number) => (
                        <li
                          key={`${activeWing}-${index}`}
                          className="flex animate-[slideUp_0.4s_ease-out_both] items-start gap-2"
                          style={{ animationDelay: `${index * 60}ms` }}
                        >
                          <span
                            className={`font-bold select-none ${herotext[activeWing].accentTextClass}`}
                          >
                            →
                          </span>
                          <span className="tracking-tight transition-all duration-300 hover:text-white">
                            {point}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute right-1/2 bottom-0 h-10 border-r border-gray-500/10" />
      </div>
    </div>
  )
}

export default HeroText
