import { Inter } from 'next/font/google'
import Image from 'next/image'

import WisdomLogo from '@/assets/WisdomLogo'
import { useState } from 'react'
import {
  ArtifactsIcon,
  RealitiesIcon,
  SystemsIcon
} from '@/features/Madness/Hero/features/Icons'

// eslint-disable-next-line new-cap
const inter = Inter({
  subsets: ['latin'],
  display: 'swap' // Recommended for better user experience
})

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1 // Month is 0-indexed

const wings = {
  sys: {
    num: '01',
    title: 'Systems',
    icon: <SystemsIcon className="size-6" />,
    subtitle: 'Digital Infrastructure & Code',
    desc: 'We engineer high-performance enterprise web applications and custom interactive experiences. No rigid page builders or bloated, generic packages—just fast, human-coded, scalable digital architecture designed to withstand high-volume operations.',
    points: [
      'Bespoke enterprise applications and platforms',
      'High-motion, immersive creative frontend sites',
      'Clean, custom-coded headless CMS setups'
    ],
    colorClass: 'bg-indigo-500 text-white',
    accentTextClass: 'text-indigo-500',
    accentBgClass: 'bg-indigo-500'
  },
  art: {
    num: '02',
    title: 'Artifacts',
    icon: <ArtifactsIcon className="size-6" />,
    subtitle: 'Physical Branding & Tactile Craft',
    desc: 'We forge razor-sharp brand identities and translate them into physical, textured realities. Disrupting traditional graphic design by manipulating raw paper, clay prototypes, alternative typography, and sensory product packaging.',
    points: [
      'Core brand books, custom typography, and logic',
      'Luxury menus and physical collateral with heavy textures',
      'Bespoke physical fabrication, event tents, and wraps'
    ],
    colorClass: 'bg-rose-500 text-white',
    accentTextClass: 'text-rose-500',
    accentBgClass: 'bg-rose-500'
  },
  real: {
    num: '03',
    title: 'Realities',
    icon: <RealitiesIcon className="size-6" />,
    subtitle: 'Creative Direction & Concept',
    desc: 'The overarching narrative and conceptual blueprint before execution begins. We build complete concept bibles that direct avant-garde cocktail programs, michelin-star menus, acoustic and lighting architecture, and raw visual storytelling for brands born to break rules.',
    points: [
      'Auteur-driven creative direction and concept bibles',
      'Liquid R&D, flavor mapping, and culinary identity',
      'Experiential choreography and spatial curation'
    ],
    colorClass: 'bg-white text-black',
    accentTextClass: 'text-white',
    accentBgClass: 'bg-white'
  }
}

const HeroText = ({
  dark = true,
  text = true
}: {
  dark?: boolean;
  text?: boolean;
}) => {
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

  return (
    <div
      className={
        'xs:bottom-10 select-none absolute right-0 bottom-0 z-50 flex w-full p-4 sm:bottom-0 sm:p-10'
      }
    >
      <div
        className={`${inter.className} mx-auto flex w-full border border-t-2 border-gray-500/30 p-10 text-left`}
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="mb-3 w-16">
              <WisdomLogo />
            </div>
            <div className="flex w-auto flex-row items-center justify-between gap-4">
              <p className="hidden text-xs font-bold sm:flex">{`© ${year}/${month}`}</p>
              <div>
                <Image
                  alt={'Gradient Circle Image'}
                  height={30}
                  src={'/images/web-app-manifest-192x192.png'}
                  width={30}
                />
              </div>
              <p className="w-20 text-xs leading-4">
                Wisdom & Madness Design Co.
              </p>
            </div>
          </div>
          {text && (
            <div
              className={
                'grid w-full grid-cols-1 gap-10 font-mono text-xs tracking-tight transition-all duration-700 ease-in-out lg:grid-cols-5'
              }
            >
              <div
                className={`flex flex-col gap-3 transition-colors duration-300 lg:col-span-2 lg:border-r lg:pr-6 lg:pb-0 xl:pb-6 2xl:col-span-1 ${
                  dark ? 'border-neutral-400' : 'border-neutral-800'
                }`}
              >
                <span className="ml-1.5 text-xs font-bold tracking-widest">
                  WE CREATE... ... ...
                </span>

                <div className="mt-2 flex flex-col gap-2">
                  {(['sys', 'art', 'real'] as const).map((key) => {
                    const isSelected = selectedWing === key
                    const wing = wings[key]

                    return (
                      <button
                        key={key}
                        className={`group relative z-10 flex transform items-center justify-start gap-4 overflow-hidden rounded-full border-0 p-3 text-left transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] hover:-translate-x-1 ${
                          isSelected
                            ? 'font-bold'
                            : 'cursor-pointer text-neutral-400 hover:text-white'
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
                          className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${getWingTextColor(key, isSelected)}`}
                        >
                          {wing.icon}
                        </div>
                        <div className="relative z-10 flex flex-col pr-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`font-mono text-[1rem] font-bold tracking-wide uppercase transition-colors duration-500 ${getWingTextColor(key, isSelected)}`}
                            >
                              {wing.title}
                            </span>
                          </div>
                          <span
                            className={`font-mono text-xs tracking-normal transition-colors duration-500 lg:hidden xl:block ${
                              isSelected
                                ? key === 'real'
                                  ? 'text-black/70'
                                  : 'text-white/80'
                                : 'text-neutral-700'
                            }`}
                          >
                            {wing.subtitle}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div
                className={`col-span-1 flex min-h-60 flex-col justify-start text-lg leading-relaxed transition-all duration-500 select-none lg:col-span-3 xl:mt-2 2xl:col-span-4 ${
                  dark ? 'text-neutral-800' : 'text-neutral-400'
                }`}
              >
                <div
                  key={selectedWing || 'idle'}
                  className="animate-[fadeIn_0.5s_ease-out_both] xl:mt-7 xl:max-w-2/3"
                >
                  <span
                    className={`${wings[activeWing].accentTextClass} hidden font-mono text-[1rem] font-bold tracking-wide uppercase transition-colors duration-500 lg:block xl:hidden`}
                  >
                    {wings[activeWing].subtitle}
                  </span>
                  <p className="font-mono font-light text-black normal-case mix-blend-difference">
                    {selectedWing
                      ? wings[activeWing].desc
                      : 'Select a creative wing to unpack our capabilities, specifications, and core philosophies.'}
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
                  {/*    className={`absolute top-0 left-0 h-full w-10 animate-[loadingLine_8s_infinite_ease-in-out] ${wings[activeWing].accentBgClass}`}*/}
                  {/*  />*/}
                  {/*</div>*/}

                  <ul
                    className={`mt-4 grid grid-cols-1 gap-x-8 gap-y-3 font-mono text-xs uppercase transition-opacity duration-300 select-none ${
                      selectedWing
                        ? 'opacity-100'
                        : 'pointer-events-none opacity-20'
                    } ${dark ? 'text-neutral-700' : 'text-neutral-300'}`}
                  >
                    {wings[activeWing].points.map(
                      (point: string, index: number) => (
                        <li
                          key={`${activeWing}-${index}`}
                          className="flex animate-[slideUp_0.4s_ease-out_both] items-start gap-2"
                          style={{ animationDelay: `${index * 60}ms` }}
                        >
                          <span
                            className={`font-bold select-none ${wings[activeWing].accentTextClass}`}
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
      </div>
    </div>
  )
}

export default HeroText
