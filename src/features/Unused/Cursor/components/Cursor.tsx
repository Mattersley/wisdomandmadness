'use client'
import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import {AnimatePresence, motion} from 'motion/react'
import './Cursor.css'
import useCursorAnimation from '@/features/Unused/Cursor/hooks/useCursorAnimation'
import useInteractiveElements from '@/features/Unused/Cursor/hooks/useInteractiveElements'

interface CursorProps {
  helpMode: boolean;
}

// TODO: morph dot into arrows etc hovering over inputs
// TODO: tap/touch
// TODO: stop cursor creating scrollbars when near sides of screen

const Cursor = ({helpMode}: CursorProps) => {
    // --- Refs ---
    const cursorVisible = useRef(false)
    const cursorEnlarged = useRef(false)
    const cursorCoordinates = useRef({x: 0, y: 0})
    const mousePosition = useRef({x: 0, y: 0})

    // --- DOM Refs ---
    const cursorDotOutline = useRef<HTMLDivElement>(null)
    const cursorDot = useRef<HTMLDivElement>(null)
    const cursorTextRef = useRef<HTMLDivElement>(null)

    // --- State ---
    const [cursorText, setCursorText] = useState({
        text: '',
        textSize: 0,
        color: '#ffffff'
    })
    const [helpModeOn, setHelpModeOn] = useState(true)

    useEffect(() => {
        setHelpModeOn(!helpMode)
    }, [helpMode])

    // --- Visual Updaters ---
    const updateCursorVisibility = useCallback(() => {
        const opacity = cursorVisible.current ? '1' : '0'
        if (cursorDot.current) cursorDot.current.style.opacity = opacity
        if (cursorDotOutline.current) cursorDotOutline.current.style.opacity = opacity
    }, [])

    const updateTextVisibility = useCallback(() => {
        if (cursorTextRef.current) {
            cursorTextRef.current.style.opacity = helpModeOn ? '1' : '0'
            cursorTextRef.current.style.transition = 'opacity 0.3s'
        }
    }, [helpModeOn])

    const updateCursorSize = useCallback(() => {
        if (!cursorDot.current || !cursorDotOutline.current) return
        const scaleDot = cursorEnlarged.current ? 0.7 : 1
        const scaleOutline = cursorEnlarged.current ? 7 : 1

        cursorDot.current.style.transform = `translate(-50%, -50%) scale(${scaleDot})`
        cursorDotOutline.current.style.transform = `translate(-50%, -50%) scale(${scaleOutline})`
    }, [])

    // --- Event Handlers ---
    const onMouseMove = useCallback(
        (event: MouseEvent) => {
            const {clientX, clientY} = event
            mousePosition.current = {x: clientX, y: clientY}

            // Immediate positioning for the dot and text (no lag)
            if (cursorDot.current && cursorTextRef.current) {
                cursorDot.current.style.top = `${clientY}px`
                cursorDot.current.style.left = `${clientX}px`
                cursorTextRef.current.style.top = `${clientY}px`
                cursorTextRef.current.style.left = `${clientX}px`
            }

            if (!cursorVisible.current) {
                cursorVisible.current = true
                updateCursorVisibility()
            }
            updateTextVisibility()
        },
        [updateCursorVisibility, updateTextVisibility]
    )

    // --- Effects ---

    // 1. Global Document Events
    useEffect(() => {
        const onMouseEnter = () => {
            cursorVisible.current = true
            updateCursorVisibility()
        }
        const onMouseLeave = () => {
            cursorVisible.current = false
            updateCursorVisibility()
        }
        const onMouseDown = () => {
            cursorEnlarged.current = true
            updateCursorSize()
        }
        const onMouseUp = () => {
            cursorEnlarged.current = false
            updateCursorSize()
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseenter', onMouseEnter)
        document.addEventListener('mouseleave', onMouseLeave)
        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mouseup', onMouseUp)

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseenter', onMouseEnter)
            document.removeEventListener('mouseleave', onMouseLeave)
            document.removeEventListener('mousedown', onMouseDown)
            document.removeEventListener('mouseup', onMouseUp)
        }
    }, [onMouseMove, updateCursorSize, updateCursorVisibility])

    // 2. Animation Loop
    useCursorAnimation(cursorCoordinates, mousePosition, cursorDotOutline)

    // 3. Interactive Element Listeners
    useInteractiveElements(cursorEnlarged, updateCursorSize, setCursorText)

    return (
        <div className="hidden md:block">
            <div
                className="pointer-events-none fixed top-1/2 left-1/2 z-[100] size-[12px] -translate-x-1/2 -translate-y-1/2 opacity-50 transition-transform"
                id="cursor-dot-outline"
                ref={cursorDotOutline}
            />
            <div
                className="pointer-events-none fixed top-1/2 left-1/2 z-[100] size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#ffffff] transition-opacity"
                id="cursor-dot"
                ref={cursorDot}
            />
            <div
                className="pointer-events-none fixed top-1/2 left-1/2 z-[100] size-20 -translate-x-1/2 -translate-y-1/2 cursor-text rounded-2xl font-mono text-xs transition-all"
                id="cursor-text"
                ref={cursorTextRef}
            >
                <AnimatePresence>
                    {cursorText.text !== '' && (
                        <motion.div
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            initial={{opacity: 0}}
                            transition={{duration: 0.7}}
                        >
                            <svg
                                id="cursor-text-svg"
                                viewBox="0 0 60 60"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M 10, 30 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0"
                                    fill="none"
                                    id="circlePath"
                                    stroke="none"
                                    strokeWidth="0"
                                />
                                <text
                                    fill={cursorText.color}
                                    fontFamily="monospace"
                                    fontSize={cursorText.textSize}
                                >
                                    <textPath href="#circlePath" startOffset="0%">
                                        {cursorText.text}
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
// ... existing code ...

export default Cursor
