import React, { SetStateAction } from 'react'
import Image from 'next/image'
import CardImageContainer from '@/features/Madness/Portfolio/components/SlideUpCards/Card/components/CardImageContainer'
import useSwipeToClose from '@/features/Madness/Portfolio/components/SlideUpCards/Card/hooks/useSwipeToClose'

interface CardProps {
  closing: boolean;
  current: string;
  name: string;
  setClosing: React.Dispatch<SetStateAction<boolean>>;
  setCurrent: React.Dispatch<SetStateAction<string>>;
  z: number;
}

const Card = ({
  closing,
  current,
  name,
  setClosing,
  setCurrent,
  z
}: CardProps) => {
  const { handleTouchStart, handleTouchMove } = useSwipeToClose(
    100,
    current === name,
    () => setClosing(true)
  )

  return (
    <>
      <div
        className={`relative ${current !== '' ? 'overflow-y-clip' : ''}`}
        data-prevent-scroll="true"
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        <CardImageContainer
          current={current}
          name={name}
          setClosing={setClosing}
          setCurrent={setCurrent}
        >
          <Image
            alt="image"
            className="relative touch-none rounded-xl"
            fill
            sizes="(max-width: 768px) 288px, 240px"
            src={`/images/Portfolio/Cards/${name}BG.png`}
          />
          <div
            className="absolute inset-0 grid touch-none place-content-center rounded-xl"
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
        </CardImageContainer>
      </div>
    </>
  )
}

export default Card
