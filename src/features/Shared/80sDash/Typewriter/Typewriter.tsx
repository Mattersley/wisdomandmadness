import { motion, useMotionValue, useTransform } from 'motion/react'
import CursorBlinker from '@/features/Shared/80sDash/Typewriter/components/CursorBlinker'
import { useEffect, useState } from 'react'
import { animate } from 'motion'
import RedoAnimText from '@/features/Shared/80sDash/Typewriter/components/RedoAnimText'

export interface IAnimTextProps {
  change?: boolean;
  cursorSize?: number;
  delay: number;
  instant?: boolean;
  onEnd?: () => void;
  removeAfter?: boolean;
  speed: number;
  text: string;
}

const Typewriter = ({ delay, change = true, cursorSize = 3, instant, onEnd, removeAfter = false, speed, text }: IAnimTextProps) => {
  const [done, setDone] = useState(false)
  const [hide, setHide] = useState(true)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) =>
    text.slice(0, latest)
  )

  useEffect(() => {
    setTimeout(() => setHide(false), delay * 1000)
    const controls = animate(count, text.length, {
      type: 'tween',
      delay: delay,
      duration: speed,
      ease: 'easeInOut',
      onComplete: () => {
        if (removeAfter) {
          setHide(true)
          setDone(true)
        }
        setDone(true)
        if (onEnd) {
          setTimeout(() => onEnd(), 1000)
        }
      }
    })
    return controls.stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span>
      <motion.span>{displayText}</motion.span>
      {done && (
        <>
          <br /> <br />
        </>
      )}
      {change && <RedoAnimText delay={delay + 1} />}
      {!hide && <CursorBlinker size={cursorSize} />}
    </span>
  )
}

export default Typewriter