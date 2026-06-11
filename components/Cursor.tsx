'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const HOVER_TARGETS = 'a, button, [role="button"], input, textarea, select, label'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useSpring(cursorX, { damping: 35, stiffness: 200, mass: 0.6 })
  const trailY = useSpring(cursorY, { damping: 35, stiffness: 200, mass: 0.6 })
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Opt in only on fine-pointer, motion-tolerant devices. The data attribute
    // gates the `cursor: none` CSS, so no-JS and touch users are unaffected.
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    document.documentElement.dataset.cursor = 'on'

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    // Delegated hover detection — survives elements mounted later (cart
    // drawer, menu tabs), unlike binding listeners per element on mount.
    const over = (e: MouseEvent) => {
      const el = e.target as Element | null
      const interactive = !!el?.closest?.(HOVER_TARGETS)
      dotRef.current?.classList.toggle('cursor-hover', interactive)
    }

    const hide = () => {
      dotRef.current?.classList.add('cursor-off')
      trailRef.current?.classList.add('cursor-off')
    }
    const show = () => {
      dotRef.current?.classList.remove('cursor-off')
      trailRef.current?.classList.remove('cursor-off')
    }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)

    return () => {
      delete document.documentElement.dataset.cursor
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Dot — snaps to the pointer */}
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Trail — lags on a spring */}
      <motion.div
        ref={trailRef}
        className="cursor-trail"
        aria-hidden="true"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
