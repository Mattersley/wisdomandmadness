import React, { SetStateAction, useState } from 'react'
import Image from 'next/image'
import CaseStudy from '@/features/Portfolio/CaseStudy/CaseStudy'
import Pando from '@/features/Portfolio/Pando/Pando'
import CardContainer from '@/features/Portfolio/Card/components/CardContainer'
import Druid from '../Druid/Druid'
import Cupendium from '@/features/Portfolio/Cupendium/Cupendium'
import useSwipeToClose from '@/features/Portfolio/Card/hooks/useSwipeToClose'

interface CardProps {
  current: string
  name: string
  setCurrent: React.Dispatch<SetStateAction<string>>
  z: number
}

const Card = ({ current, name, setCurrent, z }: CardProps) => {
  const [closing, setClosing] = useState(false)
  const isCurrentCard = current === name
  const { handleTouchStart, handleTouchMove } = useSwipeToClose(100, isCurrentCard, () =>
    setClosing(true)
  )

  return (
    <>
      <CaseStudy
        closing={closing}
        open={isCurrentCard}
        setClosing={setClosing}
        setCurrent={setCurrent}
      >
        {current === 'Pando' && <Pando />}
        {current === 'Druid' && <Druid />}
        {current === 'Cupendium' && <Cupendium />}
      </CaseStudy>
      <div
        className={`relative ${current !== '' ? 'overflow-y-clip' : ''}`}
        data-prevent-scroll="true"
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        <CardContainer
          current={current}
          name={name}
          setClosing={setClosing}
          setCurrent={setCurrent}
        >
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
      </>
  )
}

export default Card