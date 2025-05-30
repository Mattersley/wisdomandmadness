import IconWithCaption from '@/components/ui/IconWithCaption/IconWithCaption'
import { useState } from 'react'
import { motion } from 'motion/react'
import Egg from '@/components/Egg/Egg'

const features = [
  {
    caption: 'We LISTEN',
    blurb:
      'Client-focussed. In our initial meetings we will discuss your needs in extreme detail. We want to make sure you get everything you need and want and more.',
    icon: (
      <>
        <path d="M6 10a7 7 0 1 1 13 3.6a10 10 0 0 1 -2 2a8 8 0 0 0 -2 3a4.5 4.5 0 0 1 -6.8 1.4"></path>
        <path d="M10 10a3 3 0 1 1 5 2.2"></path>
      </>
    )
  },
  {
    caption: 'Mobile-First',
    blurb: '64% of internet traffic comes from mobile devices. We always start our development by building the mobile version, then we build out the desktop version. No more text and images cut off the screen - your customers will see 100% of the information.',
    icon: (
      <>
        <path d="M11.5 21h-3.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v6"></path>
        <path d="M11 4h2"></path>
        <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z"></path>
      </>
    )
  },
  {
    caption: 'Accessible-Design',
    blurb: 'We ensure that our products are accessible to inclusive of everyone. We make sure that we adhere to WCAG at the very minimum.',
    icon: (
      <>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1"></path>
        <circle cx="12" cy="7.5" fill="currentColor" r=".5"></circle>
      </>
    )
  },
  {
    caption: 'Score-Aware',
    blurb: 'We ensure that anything we build for you continuously maintains high scores in PageSpeed Insights, Lighthouse, and Core Web Vitals',
    icon: (
      <>
        <path d="M12 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M10 7h4"></path>
        <path d="M10 18v4l2 -1l2 1v-4"></path>
        <path d="M10 19h-2a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2"></path>
      </>
    )
  },
  {
    caption: 'Friendly Support',
    blurb: 'We are always ready to listen and solve any issues you have. On our monthly plans, we are here for you 24/7',
    icon: (
      <>
        <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
        <path d="M9.5 9h.01"></path>
        <path d="M14.5 9h.01"></path>
        <path d="M9.5 13a3.5 3.5 0 0 0 5 0"></path>
      </>
    )
  },
  {
    caption: 'Canadian',
    blurb: 'Proudly registered and operating in Victoria, British Columbia, Canada',
    icon: (
      <>
        <path d="M11.9.38l-3.08,3.6-2.73-.65,1.73,6.94" />
        <path d="M11.9.38l3.08,3.6,2.72-.65-1.73,6.92" />
        <path d="M6.82,17.6L.38,13.69l1.73-1.05-.3-3.45,3.45.3,1.05-1.73,1.52,2.5" />
        <path d="M15.97,10.25l1.51-2.49,1.05,1.73,3.45-.3-.3,3.45,1.73,1.05-6.44,3.91" />
        <path d="M16.97,17.6l.74,2.41-5.82-1.56-5.82,1.56.74-2.41" />
        <path d="M11.9,12.74v11.64" />
      </>
    )
  },
  {
    caption: 'F&B Expertise',
    blurb: 'We build web experiences for all sectors, however we have a wealth of experience and knowledge in the food and beverage industry.',
    icon: (
      <>
        <path d="M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1z"></path>
        <path d="M12 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
        <path d="M16 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
        <path d="M8 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
      </>
    )
  },
  {
    caption: 'Anti-SLOP',
    blurb: 'Our designs are never created by AI. Our dev team has years of development experience prior to the robot uprising. Our values are to reduce the amount of electricity and server time used. AI data centers’ consumption of electricity and water is currently massively environmentally significant.',
    icon: (
      <>
        <path d="M8 4h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2m-4 0h-4a2 2 0 0 1 -2 -2v-4"></path>
        <path d="M12 2v2"></path>
        <path d="M9 12v9"></path>
        <path d="M15 15v6"></path>
        <path d="M5 16l4 -2"></path>
        <path d="M9 18h6"></path>
        <path d="M14 8v.01"></path>
        <path d="M3 3l18 18"></path>
      </>
    )
  },
  {
    caption: 'Friend of DOG',
    blurb: 'We are a dog-friendly company. We have a dog named Bao who is always happy to help you with any questions you may have.',
    icon: (
      <>
        <path d="M11 5h2"></path>
        <path d="M19 12c-.667 5.333 -2.333 8 -5 8h-4c-2.667 0 -4.333 -2.667 -5 -8"></path>
        <path d="M11 16c0 .667 .333 1 1 1s1 -.333 1 -1h-2z"></path>
        <path d="M12 18v2"></path>
        <path d="M10 11v.01"></path>
        <path d="M14 11v.01"></path>
        <path d="M5 4l6 .97l-6.238 6.688a1.021 1.021 0 0 1 -1.41 .111a.953 .953 0 0 1 -.327 -.954l1.975 -6.815z"></path>
        <path d="M19 4l-6 .97l6.238 6.688c.358 .408 .989 .458 1.41 .111a.953 .953 0 0 0 .327 -.954l-1.975 -6.815z"></path>
      </>
    )
  },
  {
    caption: 'Marketing Expertise',
    blurb: '',
    icon: (
      <>
        <path d="M11.933 5h-6.933v16h13v-8"></path>
        <path d="M14 17h-5"></path>
        <path d="M9 13h5v-4h-5z"></path>
        <path d="M15 5v-2"></path>
        <path d="M18 6l2 -2"></path>
        <path d="M19 9h2"></path>
      </>
    )
  },
  {
    caption: 'Ethical Design',
    blurb: 'On top of ensuring our products are accessible, we ensure that our designs are ethical, sustainable, and your privacy and data protection is a key tenet. We are always transparent with any questions you may have about our practises.',
    icon: (
      <>
        <path d="M12 5.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"></path>
        <path d="M12 21.368l5.095 -5.096a3.088 3.088 0 1 0 -4.367 -4.367l-.728 .727l-.728 -.727a3.088 3.088 0 1 0 -4.367 4.367l5.095 5.096z"></path>
      </>
    )
  },
  {
    caption: 'Planet-Aware',
    blurb: 'Our goal is to produce sustainable digital products that optimise server usage, have low data loads, minimise use of non-renewable resources, and are built to last with minimal external packages.',
    icon: (
      <>
        <path d="M7 18v-11c0 -1.105 .895 -2 2 -2h.5c.276 0 .5 -.224 .5 -.5s.224 -.5 .5 -.5h3c.276 0 .5 .224 .5 .5s.224 .5 .5 .5h.5c1.105 0 2 .895 2 2v1m-8 12c-1.105 0 -2 -.895 -2 -2"></path>
        <path d="M13 17.143c0 -2.84 2.09 -5.143 4.667 -5.143h2.333v.857c0 2.84 -2.09 5.143 -4.667 5.143h-2.333z"></path>
        <path d="M13 21v-3"></path>
      </>
    )
  },
  {
    caption: 'Local-First',
    blurb: 'Wherever possible we aim to reduce use of large corporations and opt for local businesses and services. We are always looking for ways to improve our local-first culture and are always open to new ideas and opportunities.',
    icon: (
      <>
        <path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4"></path>
        <path d="M9 15l-4.5 4.5"></path>
        <path d="M14.5 4l5.5 5.5"></path>
      </>
    )
  },
  {
    caption: 'Friend of CAT',
    blurb: 'We are a cat-friendly company. Our cat is not happy and will not help you with any questions you may have.',
    icon: (
      <>
        <path d="M20 3v10a8 8 0 1 1 -16 0v-10l3.432 3.432a7.963 7.963 0 0 1 4.568 -1.432c1.769 0 3.403 .574 4.728 1.546l3.272 -3.546z"></path>
        <path d="M2 16h5l-4 4"></path>
        <path d="M22 16h-5l4 4"></path>
        <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        <path d="M9 11v.01"></path>
        <path d="M15 11v.01"></path>
      </>
    )
  },
  {
    caption: 'Chicken?',
    blurb: 'Egg?',
    icon: (
      <>
        <path d="M11.39,2.86c3.74,1.15,4.8,4.75,4.8,4.75l1.45,15.56" />
        <path d="M.37,23.16L1.74,7.61s1.06-3.6,4.8-4.75c.23-.07.46-.13.71-.18" />
        <ellipse cx="5.47" cy="10.58" rx=".27" ry="1.05" />
        <ellipse cx="12.85" cy="10.58" rx=".27" ry="1.05" />
        <path d="M8.2,19.24c.32.7,1.3.7,1.62,0,.67-1.44,1.52-2.9,1.52-2.9,0,0,.73,0,1.36-.62s.28-1.07-.51-1.13-1.53-1.75-3.18-1.75c-1.65,0-2.39,1.7-3.18,1.75s-1.13.51-.51,1.13,1.36.62,1.36.62c0,0,.84,1.45,1.52,2.9Z" />
        <path d="M8.96,9.12c2.2.26,2.27-4.14,2.27-4.14,0,0,.56-3.77-.43-4.02s-2.22-1.73-3.52,1.24c-.08.19-.15.36-.21.52-.85,2.32.83,1.46.83,1.46l.51.12s-1.13,2.22-.94,2.9.46,1.79,1.5,1.92Z" />
      </>
    )
  }
]

const FeatureList = () => {
  const [currentFeature, setCurrentFeature] = useState('We LISTEN')
  const [position, setPosition] = useState({ top: -15, left: 10 })

  const handleFeatureClick = (
    feature: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const parentRect = target.parentElement?.getBoundingClientRect()

    if (parentRect) {
      setPosition({
        top: rect.top - parentRect.top - 15,
        left: rect.left - parentRect.left + 10
      })
    }
    setCurrentFeature(feature)
  }

  const currentBlurb = () => {
    if (features.find((feature) => feature.caption === currentFeature)) {
      return features.find((feature) => feature.caption === currentFeature)
        ?.blurb
    }
  }

  return (
    <>
      <div className="flex flex-row items-center rounded-3xl border border-white/60 bg-white/10 p-8">
        <div className="flex flex-row">
          <div className="relative grid w-full grid-cols-3 md:grid-cols-5 gap-8 gap-y-10">
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <defs>
                <filter id="goo-effect">
                  <feGaussianBlur
                    in="SourceGraphic"
                    result="blur"
                    stdDeviation="20"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    result="goo"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -11"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>

            <div
              className="pointer-events-none absolute inset-0"
              style={{ filter: 'url(#goo-effect)' }}
            >
              <motion.div
                animate={{
                  top: position.top,
                  left: position.left,
                  scale: currentFeature ? 1 : 0.5
                }}
                className={`${
                  currentFeature ? 'opacity-100' : 'opacity-0'
                } absolute -z-10 size-20 rounded-[6rem] bg-gradient-to-br from-rose-500 to-indigo-500 transition-opacity duration-200`}
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  mass: 1.5,
                  velocity: 2
                }}
              />
              {/* Add "echo" elements for more gooey effect */}
              <motion.div
                animate={{
                  top: position.top + 10,
                  left: position.left + 10,
                  scale: currentFeature ? 0.8 : 0.4
                }}
                className={`${
                  currentFeature ? 'opacity-70' : 'opacity-0'
                } absolute -z-10 size-16 rounded-[6rem] bg-gradient-to-br from-rose-500 to-indigo-500`}
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  damping: 8,
                  mass: 2,
                  velocity: 3,
                  delay: 0.05
                }}
              />
              <motion.div
                animate={{
                  top: position.top + 20,
                  left: position.left + 20,
                  scale: currentFeature ? 0.6 : 0.3
                }}
                className={`${
                  currentFeature ? 'opacity-40' : 'opacity-0'
                } absolute -z-10 size-12 rounded-[6rem] bg-gradient-to-br from-rose-500 to-indigo-500`}
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 60,
                  damping: 6,
                  mass: 2.5,
                  velocity: 4,
                  delay: 0.1
                }}
              />
            </div>

            {features.map((feature, index) => (
              <IconWithCaption
                key={`feature-${index}`}
                caption={feature.caption}
                current={currentFeature}
                iconPaths={feature.icon}
                onClick={(event) => handleFeatureClick(feature.caption, event)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-[90%] sm:w-[65%] xl:w-[30%] justify-center">
        {currentBlurb() === 'Egg?' && (
          <div className="text-white">
            <Egg id={4} />
          </div>
        )}
        <p className="bg-gradient-to-tr from-[#3F5EFB] to-[#FC466B] bg-clip-text text-transparent italic">
          {currentBlurb()}
        </p>

      </div>
    </>
  )
}

export default FeatureList
