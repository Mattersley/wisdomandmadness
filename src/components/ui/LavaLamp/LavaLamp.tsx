'use client'

import './LavaLamp.css'
import { useEffect } from 'react'
import useIsSSR from '@/hooks/useIsSSR'

const LavaLamp = () => {
  const isSSR = useIsSSR()

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const interBubble =
        document.querySelector<HTMLDivElement>('.interactive')!
      let curX = 0
      let curY = 0
      let tgX = 0
      let tgY = 0

      function move() {
        curX += (tgX - curX) / 20
        curY += (tgY - curY) / 20
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
        requestAnimationFrame(() => {
          move()
        })
      }

      window.addEventListener('mousemove', (event) => {
        tgX = event.clientX
        tgY = event.clientY
      })

      move()
    })
  }, [])

  // Only render on client side to avoid hydration mismatch
  if (isSSR) {
    return null
  }

  return (
    <div className="relative mx-auto size-full">
      <div className="gradient-bg rounded-3xl opacity-60">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur-sm"
                stdDeviation="10"
              />
              <feColorMatrix
                in="blur-sm"
                mode="matrix"
                result="goo"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1" />
          <div className="g2" />
          <div className="g3" />
          <div className="g4" />
          <div className="g5" />
        </div>
      </div>
    </div>
  )
}

export default LavaLamp
