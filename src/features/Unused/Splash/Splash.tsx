import React, { useContext, useState } from 'react'
import WisdomLogo from '@/assets/WisdomLogo'
import Image from 'next/image'
import Typewriter from '@/features/Unused/80sDash/Typewriter/Typewriter'
import { motion } from 'motion/react'
import { WormContext } from '@/context/wormContext'

const wnmAscii = `                                                                
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

const wnmAscii2 = `                        .                    +-                       
                      .>@@^:.             .~%@}::<+:.                 
                    .^%@@@@@[:           .[@@].^@@@@#):               
             :>+.   :(@@@@@@@#~        .<@@@=.(@@@@@@@@#~    ...      
           .)@@@%*.   .>%@@@@{-       ~#@@@<. .-^@@@@@@{-  .<@@{*.    
          ~#@@@@@@@-   .[@@@@{-      =@@@@@>.     ]@@@@}-.*#@@@@@@}:  
          .:[@@@@@@~   .[@@@@{:      =@@@@@>.     [@@@@[:.~[@@@@@@@*  
  .+%%*:.    ~%@@@@:   .[@@@@}:      +@@@@@>.     [@@@@[:    ^@@@@@+  
.+#@@@@@}.   ~@@@@@.   .[@@@@}.      *@@@@@>.     [@@@@]:    *@@@@@=  
.<#@@@@@#.   ~@@@@%    .[@@@@}.      *@@@@@^.     }@@@@].    ^@@@@@-  
  .=@@@@#.   =@@@@%    .[@@@@}.      ^@@@@@^.     }@@@@(.    >@@@@@:  
   ~@@@@#.   +@@@@#    .[@@@@}       >@@@@@^.     }@@@@(.    )@@@@@.  
   ~@@@@#.   *@@@@{    .[@@@@[  =(:  <@@@@@^.    .{@@@@(.    (@@@@%   
   =@@@@#.   ^@@@@[    .[@@@@[  *[:  <@@@@@*.    .{@@@@).    ]@@@@{   
   +@@@@#.   <@@@@(    .[@@@@[  >]:  <@@@@@*     :{@@@@<     }@@@@}   
   +@@@@#.   (@@@@(:   .[@@@@(  )(.  )@@@@%+.    -#@@@@>     {@@@@]   
   *@@@@@%). [@@@@@@{- .[@@[-.>}%%}- (@@@@@@%(-  -#@@@@%].   {@@@@@]~ 
   *@@@@@@@].[@@@@@@%<:}@%+    .@[:  (@@@@@@@@{: =#@@@@@@*   #@@@@@@(.
   .-)@@@(=:..:^#@%*.>@%^.     .*=.  .-^#@@@%*:.  :<@@#*.    -)@@@{=. 
       .         ..  -).                  ~:.       :.          =~.   `

const wnmAscii3 = `            .=.        .+=...         
          .=@@@#:     =@#-@@@+.       
     .-@@-..=@@@+  .:#@%.:*@@@*.:@#:..
 ... .+@@@+ .%@@=  .=@@#   *@@+-#@@@*.
.*@%+ .*@@+ .%@@=  .=@@*   *@@+  =@@+.
.+@@% .*@@- .%@@=  .=@@+   #@@=  +@@+.
 :%@% .*@@: .%@@=...=@@+  .#@@=  *@@+.
 :%@% .*@@: .%@%-+:.=@@=  .#@@-  #@@=.
 -%@% .#@@- .%@%:+:.=@@=  .#@%-  #@@=.
 -%@@@=#@@@*+@=.:#+.=@@@@+.#@@@-.%@@@-
  .+=. .:+:-*.   .. .:+*:. .+=.  .=*:.
`

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1 // Month is 0-indexed

const Splash = () => {
  const { setWorm, setSeenSplash, observerNumber } = useContext(WormContext)
  const [buttonsVisible, setButtonsVisible] = useState(false)

  const greeting = () => {
    const now = new Date() // Get current date and time
    const hour = now.getHours() // Get the hour (0-23)
    let greeting

    if (hour < 12) {
      greeting = 'Morning' // Before 12 PM (noon)
    } else if (hour >= 12 && hour < 17) {
      // 12 PM up to (but not including) 5 PM (17:00)
      greeting = 'Afternoon'
    } else {
      greeting = 'Evening' // 5 PM (17:00) and later
    }

    return greeting
  }

  const buttonPressed = (choice: 'wisdom' | 'madness') => {
    setWorm(choice)
    setSeenSplash(true)
  }

  return (
    <>
      <div
        className={
          'crt no-scrollbar font-vt323 w-fill relative m-3 h-[98vh] cursor-auto overflow-hidden rounded-[5rem] bg-neutral-800 text-white select-none'
        }
      >
        <div className="relative col-span-6 -mt-20 flex size-full flex-col items-center justify-center sm:mt-0">
          <div className="sm:mb-10">
            <pre className="hidden bg-linear-to-tl from-[#3F5EFB] to-[#FC466B] bg-clip-text leading-none whitespace-pre text-transparent md:block sm:scale-60 md:scale-90">
              <Typewriter
                change={false}
                cursorSize={3}
                delay={0}
                removeAfter={true}
                speed={8}
                text={wnmAscii2}
              />
            </pre>
            <pre className="scale-70 sm:scale-100 bg-linear-to-tl from-[#3F5EFB] to-[#FC466B] bg-clip-text leading-none whitespace-pre text-transparent md:hidden">
              <Typewriter
                change={false}
                cursorSize={3}
                delay={0}
                removeAfter={true}
                speed={8}
                text={wnmAscii3}
              />
            </pre>
            <div className="-mt-12 bg-linear-to-tl from-[#3F5EFB] to-[#FC466B] bg-clip-text text-center leading-none whitespace-pre text-transparent sm:-mt-5 sm:text-xl md:-mt-3 lg:-mt-6 lg:text-2xl lg:mr-10">
              <Typewriter
                change={false}
                cursorSize={3}
                delay={8}
                removeAfter={true}
                speed={2}
                text={'://>WISDOM & MADNESS DESIGN CO.<//'}
              />
            </div>
          </div>
          <div className="text-center leading-2 sm:leading-3">
            <div className="flex flex-col gap-2">
              <div className="mb-10 flex h-full w-full items-center justify-center text-xl tracking-[1rem] uppercase">
                <div className="w-80 text-2xl leading-5 tracking-widest text-wrap sm:mr-2 sm:text-3xl sm:leading-normal md:w-full md:text-4xl">
                  <span className="font-bold">
                    <Typewriter
                      change={false}
                      cursorSize={7}
                      delay={10}
                      removeAfter={true}
                      speed={2}
                      text={`Good ${greeting()} Observer #${observerNumber === 0 ? '0000' : observerNumber}`}
                    />
                  </span>
                  <span className="text-2xl text-[#3ea34b] sm:text-4xl">
                    <Typewriter
                      change={false}
                      cursorSize={7}
                      delay={13}
                      onEnd={() => setButtonsVisible(true)}
                      removeAfter={true}
                      speed={2}
                      text="YOU HAVE A CHOICE"
                    />
                  </span>
                </div>
              </div>
              {buttonsVisible && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="-mt-10"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-5 sm:text-xl">
                    <div className="flex flex-row border-3 border-[#3ea34b]">
                      <svg
                        className="drop-shadow-crt mx-auto hidden size-10 p-1 sm:block"
                        fill="none"
                        stroke="#3ea34b"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.3"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"></path>
                        <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"></path>
                        <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"></path>
                        <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"></path>
                        <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"></path>
                        <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"></path>
                      </svg>
                      <button
                        className="text-shadow-crt w-40 cursor-pointer px-6 py-1 text-2xl tracking-widest uppercase transition duration-150 ease-in-out hover:bg-[#3ea34b] hover:text-[#0e1111] sm:w-32"
                        onClick={() => buttonPressed('wisdom')}
                      >
                        Wisdom
                      </button>
                    </div>
                    <p className="">OR</p>
                    <div className="flex flex-row border-3 border-[#3ea34b]">
                      <button
                        className="text-shadow-crt w-40 cursor-pointer px-6 py-1 text-2xl tracking-widest uppercase transition duration-150 ease-in-out hover:bg-[#3ea34b] hover:text-[#0e1111] sm:w-32"
                        onClick={() => buttonPressed('madness')}
                      >
                        Madness
                      </button>
                      <svg
                        className="drop-shadow-crt mx-auto hidden size-10 p-1 sm:block"
                        fill="none"
                        stroke="#3ea34b"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.3"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 12.057a1.9 1.9 0 0 0 .614 .743c1.06 .713 2.472 .112 3.043 -.919c.839 -1.513 -.022 -3.368 -1.525 -4.08c-2 -.95 -4.371 .154 -5.24 2.086c-1.095 2.432 .29 5.248 2.71 6.246c2.931 1.208 6.283 -.418 7.438 -3.255c1.36 -3.343 -.557 -7.134 -3.896 -8.41c-3.855 -1.474 -8.2 .68 -9.636 4.422c-1.63 4.253 .823 9.024 5.082 10.576c4.778 1.74 10.118 -.941 11.833 -5.59a9.354 9.354 0 0 0 .577 -2.813" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
              <div className="mt-5 text-2xl leading-3 font-bold text-[#3ea34b] sm:text-3xl sm:leading-normal lg:mt-10 lg:text-4xl">
                <Typewriter
                  change={false}
                  cursorSize={7}
                  delay={17}
                  removeAfter={false}
                  speed={6}
                  text="??????"
                />
              </div>
            </div>
          </div>
          <div className="font-inter absolute -bottom-8 flex w-full flex-row items-center justify-between px-10 text-white sm:bottom-20 sm:gap-6 sm:px-30">
            <div className="drop-shadow-crt mr-4 mb-3 w-16">
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
              <a
                className="cursor-alias"
                href="mailto:webinquiry@wisdomandmadness.com"
              >
                <p className="w-20 text-xs leading-4">
                  Wisdom & Madness Design Co.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Splash
