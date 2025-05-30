'use client'

import Link from 'next/link'
import { useState } from 'react'
import Egg from '@/components/Egg/Egg'

const wnmAcii = `                                                                
                       ##               ##                      
                     #######          ##########                
               ##   #########       #### #########              
             ######    ######     ######   #######  ######      
            ########   ######     #####      ##### ########     
      ###     ######   ######     #####      #####   ######     
    #######   ######   ######     #####     ######    #####     
    #######   ######   #####      #####     ######    #####     
      #####   ######   #####      #####     #####    ######     
      #####   ######   #####  ##  #####     #####    ######     
      ######  #####    #####  ##  #####     #####    ######     
      ######  #####    #####  ##  #####     #####    ######     
      ######  #######  ##### ###  #######   ######   ######     
      ####### ############  ##### ########  #######  #######    
       ######  #########      ##   #######   #####    ######`

const WisdomPage = () => {
  const [dark, setDark] = useState(true)

  return (
    <main
      className={`${dark && 'dark'} flex h-screen w-screen flex-col items-center overflow-x-auto px-10 font-mono dark:bg-[#0e1111] dark:text-[#3ea34b]`}
    >
      <div className="m-0 scale-75 p-0">
        <pre className="font-mono leading-none whitespace-pre">{wnmAcii}</pre>
      </div>
      <h1 className="mb-6 text-xl font-mono font-bold">Wisdom & Madness Design Co.</h1>
      <hr className="h-0.5 mb-6 w-full border border-gray-400 dark:border-[#3ea34b]" />
      <div className="text-left w-full">
        <p className="text-lg font-bold">Intentional Design</p>
        <p>100% custom, human-coded, creative websites</p>
        <p>Innovative pricing structures, 24/7 support, and a dedicated team</p>
        <p>No design, no fee</p>
        <p>From single page websites, to enterprise app development</p>

      </div>
      <div className="absolute top-10 left-10 flex flex-row gap-2">
        <Link href="/">
          <div className="flex size-10 items-center justify-center border p-2 dark:border-[#3ea34b]">
            <div className="absolute w-[3.3rem] -rotate-45 border-t dark:border-[#3ea34b]" />
            <svg
              fill="none"
              height="32"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.3"
              viewBox="0 0 24 24"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"></path>
              <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"></path>
              <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"></path>
              <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"></path>
              <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"></path>
              <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"></path>
            </svg>
          </div>
        </Link>
        <button
          className="flex cursor-pointer size-10 items-center justify-center border border-black p-2 dark:border-[#3ea34b]"
          onClick={() => setDark(!dark)}
        >
          {/*<div className="absolute w-10 -rotate-45 border-t border-black" />*/}
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
        </button>
      </div>
      <div className="absolute right-10 bottom-6"><Egg id={3} /></div>
    </main>
  )
}

export default WisdomPage
