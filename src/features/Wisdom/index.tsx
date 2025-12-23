import Image from 'next/image'
import React, { useContext } from 'react'
import { WormContext } from '@/context/wormContext'
import WisdomLogo from '@/assets/WisdomLogo'

const Wisdom = () => {
  const { setWorm, observerNumber, setSeenSplash } = useContext(WormContext)
  const [rando, setRando] = React.useState(() => Math.random())
  const today = new Date()

  return (
    <div className="grid h-screen w-screen grid-cols-1 bg-gray-100 p-6 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 xl:grid-cols-12">
      <div className="relative flex flex-col items-center overflow-clip rounded-3xl bg-white shadow-xl select-none lg:col-span-2">
        {/*<div className="flex flex-row gap-2 p-6">*/}
        {/*  <div className="font-inter flex w-full flex-col items-center justify-center tracking-widest">*/}
        {/*    <button*/}
        {/*      className="flex w-full flex-row items-center justify-center bg-indigo-400/50 p-3 py-4 text-sm text-white hover:bg-indigo-400"*/}
        {/*      onClick={() => setWorm('wisdom')}*/}
        {/*      type="button"*/}
        {/*    >*/}
        {/*      <svg*/}
        {/*        className="mr-2 size-7"*/}
        {/*        fill="none"*/}
        {/*        stroke="currentColor"*/}
        {/*        strokeLinecap="round"*/}
        {/*        strokeLinejoin="round"*/}
        {/*        strokeWidth="1"*/}
        {/*        viewBox="0 0 24 24"*/}
        {/*        xmlns="http://www.w3.org/2000/svg"*/}
        {/*      >*/}
        {/*        <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"></path>*/}
        {/*        <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"></path>*/}
        {/*        <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"></path>*/}
        {/*        <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"></path>*/}
        {/*        <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"></path>*/}
        {/*        <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"></path>*/}
        {/*      </svg>*/}
        {/*      <p className="">WISDOM</p>*/}
        {/*    </button>*/}
        {/*  </div>*/}
        <div className="my-10 h-10 w-20 rounded-full bg-gray-100 shadow-inner" />
        <div className="absolute top-8 right-8 w-10 text-gray-300">
          <WisdomLogo />
        </div>
        <p className="font-inter mt-2 rounded-4xl border-2 p-2 px-6 text-2xl">
          Observer
        </p>
        <p className="font-vt323 pt-2 text-4xl text-rose-700">
          {observerNumber}
        </p>
        <p className="font-vt323 -mt-2 text-xl text-rose-700">
          {today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
        <p className="font-vt323 absolute top-24 -left-20 h-2 -rotate-90 p-2 px-6 text-xs text-gray-500">
          {rando * 10} SYNO-TRANSMUTE EVENT
        </p>
        <div className="absolute top-36 left-6 h-24 w-2 bg-gray-200" />
        <div className="absolute -top-1 left-6 h-42 w-px bg-gray-200" />
        <div className="emboss absolute top-1/2 w-52 text-gray-100 opacity-40">
          <WisdomLogo />
        </div>
        <div className="flex h-full w-full flex-row items-end justify-end p-10">
          <div className="flex w-auto flex-row items-center justify-between">
            <div>
              <Image
                alt={'Gradient Circle Image'}
                height={35}
                src={'/images/web-app-manifest-192x192.png'}
                width={35}
              />
            </div>
            <p className="ml-3 w-20 text-sm leading-4">
              Wisdom & Madness Design Co.
            </p>
          </div>
        </div>
        <div className="h-12 w-full rounded-b-3xl bg-linear-to-r from-[#3F5EFB] to-[#FC466B]" />
      </div>
      <div className="col-span-10 mt-10 px-10 xl:mt-0">
        <div className="hidden relative xl:flex w-full flex-row items-center justify-between gap-2 border-y border-b-2 border-gray-200 border-b-gray-400 px-2 py-2">
          <div className="flex flex-row justify-center text-gray-500">
            <p className="mt-5 ml-2 text-xs tracking-widest">WORK</p>
          </div>
          <div className="flex flex-row">
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
              <path d="M21 21l-6 -6"></path>
            </svg>
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute right-10 bottom-10 flex flex-row">
        <div className="font-inter relative flex w-full tracking-widest sm:flex-col sm:items-end sm:justify-end">
          <button
            className="mr-2 sm:mr-0 flex size-14 items-center justify-center rounded-full bg-gray-300 text-indigo-600 hover:bg-white sm:mb-2"
            onClick={() => setSeenSplash(false)}
            type="button"
          >
            <svg
              fill="none"
              height="32"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
              <path d="M12 9l0 3" />
              <path d="M12 15l.01 0" />
            </svg>
          </button>
          <button
            className="flex h-14 w-40 items-center justify-center gap-2 rounded-4xl bg-linear-to-r from-[#3F5EFB] to-[#FC466B] text-sm text-white hover:bg-linear-to-b sm:h-52 sm:w-14 sm:flex-col sm:bg-linear-to-t sm:pt-4 sm:pb-6"
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
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12.057a1.9 1.9 0 0 0 .614 .743c1.06 .713 2.472 .112 3.043 -.919c.839 -1.513 -.022 -3.368 -1.525 -4.08c-2 -.95 -4.371 .154 -5.24 2.086c-1.095 2.432 .29 5.248 2.71 6.246c2.931 1.208 6.283 -.418 7.438 -3.255c1.36 -3.343 -.557 -7.134 -3.896 -8.41c-3.855 -1.474 -8.2 .68 -9.636 4.422c-1.63 4.253 .823 9.024 5.082 10.576c4.778 1.74 10.118 -.941 11.833 -5.59a9.354 9.354 0 0 0 .577 -2.813" />
            </svg>
            <p className="text-xs leading-4 sm:mt-2 sm:w-3 sm:tracking-tight sm:break-all">
              MADNESS
            </p>
          </button>
          <div className="-ml-4 size-14 rounded-full bg-linear-to-r from-[#3F5EFB] to-[#FC466B] opacity-80 hover:bg-linear-to-b sm:-mt-6 sm:ml-0 sm:bg-linear-to-t"></div>
        </div>
      </div>
    </div>
  )
}

export default Wisdom
