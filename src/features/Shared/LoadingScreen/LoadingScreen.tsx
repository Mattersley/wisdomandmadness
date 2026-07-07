'use client'

import React, { useSyncExternalStore } from 'react'
import WisdomAndMadnessLogo from '@/assets/WisdomLogo'
import { sceneLoaderStore } from '@/hooks/sceneLoader' // Ensure correct path mapping

// A stable, immutable fallback object reference used explicitly for Server-Side Rendering
const SERVER_SNAPSHOT = { stage: 'loading', isSlow: false }

const LoadingScreen = () => {
  // useSyncExternalStore takes 3 arguments:
  // 1. The subscription function
  // 2. A reference to the current client state snapshot object
  // 3. A reference to the stable server state snapshot object
  const loaderState = useSyncExternalStore(
    (callback) => sceneLoaderStore.subscribe(callback),
    () => sceneLoaderStore.getSnapshot(), // Returns a stable object reference from the store file scope
    () => SERVER_SNAPSHOT // Returns the stable reference from the global file scope
  )

  const { stage, isSlow } = loaderState

  // If the store is hidden, completely skip rendering the markup
  if (stage === 'hidden') return null

  const fadeDurationSeconds = 2

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white select-none"
      style={{
        opacity: stage === 'loading' ? 1 : 0,
        pointerEvents: stage === 'loading' ? 'auto' : 'none',
        transition: `opacity ${fadeDurationSeconds}s cubic-bezier(0.25, 1, 0.5, 1)`,
        willChange: 'opacity'
      }}
    >
      <div className="crt flex size-full flex-col items-center justify-center">
        <div className="mb-6 flex w-auto scale-110 flex-row items-center justify-between gap-4">
          <div
            className="rotate-90"
            style={{
              WebkitMask:
                'linear-gradient(0deg, #000 55%, #0000 0) bottom / 100% 18.18%',
              mask: 'linear-gradient(0deg, #000 55%, #0000 0) bottom / 100% 18.18%',
              width: '40px',
              aspectRatio: 1,
              borderRadius: '100%',
              background:
                'linear-gradient(0deg, #3f5efb 0%, #fc466b 100%) bottom / 110% 0% no-repeat #ddd',
              animation: 'l8 4s infinite steps(7)'
            }}
          />
          <a
            className="cursor-alias"
            href="mailto:webinquiry@wisdomandmadness.com"
          >
            <p className="w-20 text-xs leading-4">
              Wisdom & Madness Design Co.
            </p>
          </a>
        </div>

        <p className="text-neutral-500">Loading...</p>

        <div
          style={{
            opacity: isSlow && stage === 'loading' ? 1 : 0,
            pointerEvents: isSlow && stage === 'loading' ? 'auto' : 'none',
            transition: 'opacity 0.5s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <p className="mt-6 rounded-md border border-amber-400 bg-amber-200/10 px-4 py-2 text-center text-sm text-amber-400">
            ⚠️ Connection seems slow. Please hang tight!
          </p>
          <button
            className="mt-6 flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md border border-fuchsia-400 px-2 py-1 text-center font-mono text-sm text-fuchsia-400 hover:bg-fuchsia-400 hover:text-white"
            type="button"
          >
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://w3.org"
            >
              <path d="M12 18l.01 0" />
              <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
              <path d="M6.343 12.343a7.963 7.963 0 0 1 3.864 -2.14m4.163 .155a7.965 7.965 0 0 1 3.287 2" />
              <path d="M3.515 9.515a12 12 0 0 1 3.544 -2.455m3.101 -.92a12 12 0 0 1 10.325 3.374" />
              <path d="M3 3l18 18" />
            </svg>
            I&#39;M OFFLINE
          </button>
        </div>

        <div className="absolute right-10 bottom-2 size-10">
          <WisdomAndMadnessLogo />
        </div>
      </div>
    </div>
  )
}
export default LoadingScreen