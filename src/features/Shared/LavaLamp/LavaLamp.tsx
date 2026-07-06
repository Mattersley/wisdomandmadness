'use client'

import './LavaLamp.css'
import React, { memo } from 'react'

const GooeyFilter = () => (
    <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
        <defs>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"/>
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    result="goo"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                />
                <feBlend in="SourceGraphic" in2="goo"/>
            </filter>
        </defs>
    </svg>
)

// Use memo to prevent LavaLamp from rerendering when features or HeroText rerenders
const LavaLamp = memo(() => {
    return (
        <div className="absolute inset-0 z-0 overflow-clip rounded-3xl opacity-60">
            <div className="gradient-bg h-full w-full">
                <GooeyFilter/>

                <div className="gradients-container">
                    <div className="g1"/>
                    <div className="g2"/>
                    <div className="g3"/>
                    <div className="g4"/>
                    <div className="g5"/>
                </div>
            </div>
        </div>
    )
})

LavaLamp.displayName = 'LavaLamp'

export default LavaLamp
