import { useEffect, useRef, useState } from 'react'
import { productVideoUrl } from '../config'
import { useLanguage } from '../i18n/LanguageContext'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function readsReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(reducedMotionQuery).matches
}

export function ProductVideo() {
  const { copy } = useLanguage()
  const [reducedMotion, setReducedMotion] = useState(readsReducedMotion)
  const videoRef = useRef<HTMLVideoElement>(null)
  const video = copy.product.video

  useEffect(() => {
    const preference = window.matchMedia(reducedMotionQuery)
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)

    preference.addEventListener('change', onChange)
    return () => preference.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const player = videoRef.current

    if (!player) {
      return
    }

    if (reducedMotion) {
      player.pause()
      return
    }

    void player.play().catch(() => {
      // Native controls remain available when a browser blocks autoplay.
    })
  }, [reducedMotion])

  return (
    <section
      className="section-pad product-video-section"
      id="product-video"
      aria-labelledby="product-video-title"
    >
      <div className="page-shell">
        <div className="product-heading-row">
          <h2 id="product-video-title">{video.title}</h2>
        </div>

        <div className="product-video-frame">
          <video
            aria-label={video.ariaLabel}
            autoPlay={!reducedMotion}
            className="product-video"
            controls
            loop
            muted
            playsInline
            preload="metadata"
            ref={videoRef}
            src={productVideoUrl}
          >
            {video.fallback}
          </video>
        </div>
      </div>
    </section>
  )
}
