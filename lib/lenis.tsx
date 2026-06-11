'use client'
import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import type Lenis from 'lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | undefined
    let rafId: number

    import('lenis').then(({ default: LenisClass }) => {
      lenis = new LenisClass({
        // lerp-based smoothing (heavier, more cinematic than duration mode).
        // Touch stays native — hijacking mobile momentum scroll feels broken.
        lerp: 0.075,
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  // reducedMotion="user" makes every framer-motion animation respect the OS
  // prefers-reduced-motion setting (transforms collapse to opacity fades).
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
