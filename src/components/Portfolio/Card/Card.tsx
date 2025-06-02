import React, { SetStateAction, useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import CaseStudy from '@/components/Portfolio/CaseStudy/CaseStudy'
import Pando from '@/components/Portfolio/Pando/Pando'
import CardContainer from '@/components/Portfolio/Card/CardContainer'
import Druid from '../Druid/Druid'
import Cupendium from '@/components/Portfolio/Cupendium/Cupendium'

const Card = ({
  current,
  name,
  setCurrent,
  z
}: {
  current: string;
  name: string;
  setCurrent: React.Dispatch<SetStateAction<string>>;
  z: number;
}) => {
  const [closing, setClosing] = useState(false)
  const isCurrentCard = current === name
  const startY = useRef(0)
  const currentY = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    currentY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isCurrentCard) return
    
    currentY.current = e.touches[0].clientY
    const diff = currentY.current - startY.current

    if (diff > 100) { // Threshold for closing
      setClosing(true)
      setCurrent('')
    }
  }

  return (
    <div
      className={`relative ${current !== '' && 'overflow-y-clip'}`}
      data-prevent-scroll="true"
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      <CaseStudy
        closing={closing}
        open={isCurrentCard}
        setClosing={setClosing}
        setCurrent={setCurrent}
      >
        {current === 'Pando' && (<Pando />)}
        {current === 'Druid' && (<Druid />)}
        {current === 'Cupendium' && (<Cupendium />)}
      </CaseStudy>
      <CardContainer closing={closing} current={current} name={name} setClosing={setClosing} setCurrent={setCurrent}>
        <Image
          alt="image"
          className="rounded-xl [touch-action:none]"
          fill
          sizes="(max-width: 768px) 288px, 240px"
          src={`/images/Portfolio/Cards/${name}BG.png`}
        />
        <div
          className="absolute inset-0 grid place-content-center rounded-xl [touch-action:none]"
          style={{
            transform: `translateZ(${z}px)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <Image
            alt="image"
            fill
            sizes="(max-width: 768px) 288px, 240px"
            src={`/images/Portfolio/Cards/${name}FG.png`}
          />
        </div>
      </CardContainer>
    </div>
  )
}

export default Card