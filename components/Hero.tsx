'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import Stamp from '@/components/Stamp'

// WebGL stays out of the main bundle until a capable desktop asks for it
const HeroScene3D = dynamic(() => import('@/components/HeroScene3D'), {
  ssr: false,
})

const EASE = [0.16, 1, 0.3, 1] as const
const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

function OpenStatusBadge() {
  // Time-dependent UI is rendered after mount to avoid a hydration mismatch.
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (!now) {
    return (
      <div className="status-badge closed">
        <span className="status-dot" />
        Fresh bagels daily · From 6 AM
      </div>
    )
  }

  // Hours: Mon–Sat 6 AM – 3 PM, Sun 7 AM – 2 PM
  const hour = now.getHours()
  const isSunday = now.getDay() === 0
  const openHour = isSunday ? 7 : 6
  const closeHour = isSunday ? 14 : 15
  const isOpen = hour >= openHour && hour < closeHour
  // Next opening is Sunday (7 AM) if it's Sunday before open, or Saturday after close
  const opensSunday =
    (isSunday && hour < 7) || (now.getDay() === 6 && hour >= 15)

  return (
    <div className={`status-badge ${isOpen ? 'open' : 'closed'}`}>
      <span className="status-dot" />
      {isOpen
        ? `Open now · Closes ${isSunday ? '2' : '3'} PM`
        : `Opens ${opensSunday ? '7' : '6'} AM · Fresh bagels daily`}
    </div>
  )
}

function Counter({
  to,
  decimals = 0,
  suffix = '',
}: {
  to: number
  decimals?: number
  suffix?: string
}) {
  const { ref, revealed } = useReveal<HTMLSpanElement>(0.5)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!revealed) return
    const duration = 1500
    const start = performance.now()
    let rafId: number

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(to * eased)
      if (p < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [revealed, to])

  return (
    <span ref={ref} className="stat-num">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

function StatsBar() {
  return (
    <motion.div
      className="stats-bar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: EASE }}
    >
      <div className="stat">
        <Counter to={4.5} decimals={1} />
        <span className="stat-label">★ Google</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <Counter to={280} suffix="+" />
        <span className="stat-label">5-Star Reviews</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-num">6 AM</span>
        <span className="stat-label">Open Daily</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <Counter to={20} suffix="+" />
        <span className="stat-label">Spreads</span>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  // Content drifts up and fades as you scroll away; the collage photos
  // counter-drift at different speeds, which reads as depth.
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, -80])
  const contentOpacity = useTransform(scrollY, [0, 420], [1, 0])
  const mainY = useTransform(scrollY, [0, 600], [0, -46])
  const insetY = useTransform(scrollY, [0, 600], [0, 38])

  // True 3D only where it earns its cost: wide screen, fine pointer,
  // motion-tolerant. Everyone else keeps the 2.5D polaroid collage.
  const [scene3D, setScene3D] = useState(false)
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const wide = window.matchMedia('(min-width: 901px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setScene3D(fine && wide && !reduced)
  }, [])

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-ghost" aria-hidden="true">
        Bagels.
      </div>

      {/* True 3D photo stage on capable desktops */}
      {scene3D && <HeroScene3D />}

      {/* Spinning deli stamp rides above either stage */}
      <motion.div
        className="hero-stamp"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
      >
        <Stamp id="hero" />
      </motion.div>

      {/* Desktop editorial collage — polaroid frames at near-native crops,
          echoing the film strip. Fallback stage when WebGL isn't mounted. */}
      <div
        className="hero-collage"
        aria-hidden="true"
        style={scene3D ? { display: 'none' } : undefined}
      >
        <div className="hero-ring" />
        <motion.div
          className="hc-frame hc-main"
          style={{ y: mainY }}
          initial={{ opacity: 0, y: 60, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
        >
          <div className="hc-photo">
            <Image
              src="/instagram/post4.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 0px, 36vw"
            />
          </div>
          <span className="hc-label">The Knicks bagel — back for the season</span>
        </motion.div>

        <motion.div
          className="hc-frame hc-inset"
          style={{ y: insetY }}
          initial={{ opacity: 0, y: 60, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.72, duration: 0.9, ease: EASE }}
        >
          <div className="hc-photo">
            <Image
              src="/photos/sausage-egg.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 0px, 19vw"
            />
          </div>
          <span className="hc-label">Still warm — this morning</span>
        </motion.div>

        <motion.div
          className="hc-frame hc-third"
          style={{ y: mainY }}
          initial={{ opacity: 0, y: 50, rotate: -7 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
        >
          <div className="hc-photo">
            <Image
              src="/photos/deli-club.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 0px, 14vw"
            />
          </div>
          <span className="hc-label">Stacked proper</span>
        </motion.div>

        <motion.div
          className="hc-frame hc-fourth"
          style={{ y: insetY }}
          initial={{ opacity: 0, y: 50, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
        >
          <div className="hc-photo">
            <Image
              src="/photos/everything-bagel.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 0px, 13vw"
            />
          </div>
          <span className="hc-label">Everything, toasted</span>
        </motion.div>

      </div>

      <motion.div
        className="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
        >
          Medford, New York · Open Every Day · 6 AM
        </motion.p>

        <h1 className="hero-headline">
          {['Long Island’s', 'Favorite'].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: EASE }}
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            className="accent"
            initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          >
            Bagel.
          </motion.span>
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
        >
          A homemade family recipe, made fresh every single morning. The best
          bagel on Long Island — and the Knicks Everything Bagel is back.
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6, ease: EASE }}
        >
          <a
            href={DOORDASH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Order on DoorDash →
          </a>
          <a href="#menu" className="btn-secondary">
            See the Menu
          </a>
        </motion.div>

        <motion.div
          className="hero-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: EASE }}
        >
          <OpenStatusBadge />
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-hint"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="scroll-dot"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        />
      </motion.div>

      <StatsBar />
    </section>
  )
}
