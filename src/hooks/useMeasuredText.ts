import { layout, prepare, type PreparedText } from '@chenglou/pretext'
import { useLayoutEffect, useRef, useState } from 'react'

export function useMeasuredText<T extends HTMLElement>(text: string) {
  const ref = useRef<T>(null)
  const [height, setHeight] = useState<number>()

  useLayoutEffect(() => {
    const element = ref.current

    if (!element || typeof ResizeObserver === 'undefined') {
      return
    }

    let preparedText: PreparedText | undefined
    let cancelled = false

    const measure = () => {
      if (!preparedText || cancelled || element.clientWidth <= 0) {
        return
      }

      const styles = window.getComputedStyle(element)
      const parsedLineHeight = Number.parseFloat(styles.lineHeight)
      const lineHeight = Number.isFinite(parsedLineHeight)
        ? parsedLineHeight
        : Number.parseFloat(styles.fontSize) * 1.4
      const nextHeight = Math.ceil(layout(preparedText, element.clientWidth, lineHeight).height)

      setHeight((current) => (current === nextHeight ? current : nextHeight))
    }

    const prepareAndMeasure = () => {
      const styles = window.getComputedStyle(element)
      preparedText = prepare(text, styles.font)
      measure()
    }

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(element)

    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    void fontsReady.then(() => {
      if (!cancelled) {
        prepareAndMeasure()
      }
    })

    return () => {
      cancelled = true
      resizeObserver.disconnect()
    }
  }, [text])

  return {
    ref,
    style: height ? { height: `${height}px` } : undefined,
  }
}
