'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const HOVER_TARGETS = 'a, button, [role="button"], label, .menu-tab, .busy-day'

/* A tiny happy bagel rides the pointer: golden torus, sesame specks, little
   smile. It tilts and grins over clickables, squishes on press, and never
   exists on touch/reduced-motion devices or over form fields (those keep
   native cursors via the CSS gate). */
function BagelFace() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <circle cx="15" cy="15" r="13" fill="#D9913F" />
      <circle cx="15" cy="15" r="12.2" fill="none" stroke="#C07B2E" strokeWidth="1.4" />
      <circle cx="15" cy="16.5" r="4.6" fill="#F5ECD7" />
      {/* sesame */}
      <ellipse cx="8" cy="9" rx="1.5" ry="0.9" fill="#F5ECD7" transform="rotate(-30 8 9)" />
      <ellipse cx="21.5" cy="7.8" rx="1.5" ry="0.9" fill="#F5ECD7" transform="rotate(24 21.5 7.8)" />
      <ellipse cx="25" cy="17" rx="1.4" ry="0.85" fill="#F5ECD7" transform="rotate(80 25 17)" />
      <ellipse cx="5.6" cy="18.5" rx="1.4" ry="0.85" fill="#F5ECD7" transform="rotate(60 5.6 18.5)" />
      <ellipse cx="12" cy="5.4" rx="1.4" ry="0.85" fill="#F5ECD7" transform="rotate(-8 12 5.4)" />
      {/* face */}
      <circle cx="11.2" cy="11.4" r="1.15" fill="#3A2412" />
      <circle cx="18.8" cy="11.4" r="1.15" fill="#3A2412" />
      <path
        d="M 11.4 13.6 Q 15 16.4 18.6 13.6"
        fill="none"
        stroke="#3A2412"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 900, damping: 55, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 900, damping: 55, mass: 0.3 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    document.documentElement.dataset.cursor = 'on'

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const el = e.target as Element | null
      ref.current?.classList.toggle('bagel-happy', !!el?.closest?.(HOVER_TARGETS))
    }
    const down = () => ref.current?.classList.add('bagel-squish')
    const up = () => ref.current?.classList.remove('bagel-squish')
    const hide = () => ref.current?.classList.add('cursor-off')
    const show = () => ref.current?.classList.remove('cursor-off')

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)

    return () => {
      delete document.documentElement.dataset.cursor
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className="cursor-bagel"
      aria-hidden="true"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
    >
      <BagelFace />
    </motion.div>
  )
}
