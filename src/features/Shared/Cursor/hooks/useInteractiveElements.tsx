import { RefObject, useEffect } from 'react'

const useInteractiveElements = (
  cursorEnlarged: RefObject<boolean>,
  updateCursorSize: () => void,
  setCursorText: (state: {
    text: string
    textSize: number
    color: string
  }) => void
) => {
  useEffect(() => {
    // Expand Handlers
    const onHoverStart = () => {
      cursorEnlarged.current = true
      updateCursorSize()
    }
    const onHoverEnd = () => {
      cursorEnlarged.current = false
      updateCursorSize()
    }

    // Text Handlers
    const onTextHoverStart = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const textToDisplay = el.getAttribute('data-cursor-text') || ''
      const textRepeats = Number(el.getAttribute('data-text-repeats')) || 1
      const textSize = Number(el.getAttribute('data-text-size')) || 16
      const textColor = el.getAttribute('data-text-color') || '#ffffff'

      setCursorText({
        text: `${textToDisplay.repeat(textRepeats)} `,
        textSize,
        color: textColor
      })
    }
    const onTextHoverEnd = () => {
      setCursorText({text: '', textSize: 0, color: '#15151550'})
    }

    // Attach Listeners
    const hoverElements = document.querySelectorAll(
      '.cursor-hover-text, .cursor-expand'
    )
    const textElements = document.querySelectorAll('.cursor-hover-text')

    hoverElements.forEach((el) => {
      el.addEventListener('mouseover', onHoverStart)
      el.addEventListener('mouseout', onHoverEnd)
    })
    textElements.forEach((el) => {
      el.addEventListener('mouseover', onTextHoverStart)
      el.addEventListener('mouseout', onTextHoverEnd)
    })

    return () => {
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseover', onHoverStart)
        el.removeEventListener('mouseout', onHoverEnd)
      })
      textElements.forEach((el) => {
        el.removeEventListener('mouseover', onTextHoverStart)
        el.removeEventListener('mouseout', onTextHoverEnd)
      })
    }
  }, [updateCursorSize, setCursorText, cursorEnlarged])
}

export default useInteractiveElements