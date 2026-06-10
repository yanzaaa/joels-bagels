'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'

const EASE = [0.16, 1, 0.3, 1] as const
const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

function SteamRising() {
  const steams = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="steam-container">
      {steams.map((i) => (
        <motion.div
          key={i}
          className="steam"
          style={{
            left: `${15 + i * 13}%`,
            bottom: '0',
          }}
          animate={{
            y: [0, -120, -200],
            opacity: [0, 0.15, 0],
            scaleX: [0.8, 1.2, 1.6],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.9,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// Sesame seeds scattered across the right half of the hero. Positions are
// fixed (not Math.random) so server and client render identical markup.
const SEEDS = [
  { left: '54%', top: '14%', r: '24deg' },
  { left: '62%', top: '28%', r: '-40deg' },
  { left: '70%', top: '10%', r: '65deg' },
  { left: '77%', top: '36%', r: '12deg' },
  { left: '84%', top: '18%', r: '-72deg' },
  { left: '91%', top: '44%', r: '33deg' },
  { left: '58%', top: '52%', r: '-18deg' },
  { left: '66%', top: '66%', r: '80deg' },
  { left: '74%', top: '58%', r: '-55deg' },
  { left: '82%', top: '74%', r: '8deg' },
  { left: '89%', top: '62%', r: '-30deg' },
  { left: '95%', top: '80%', r: '47deg' },
]

function HeroSeeds() {
  return (
    <div className="hero-seeds" aria-hidden="true">
      {SEEDS.map((seed, i) => (
        <span
          key={i}
          className="hero-seed"
          style={
            {
              left: seed.left,
              top: seed.top,
              '--r': seed.r,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

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

  // Hours: Mon–Sat 6 AM – 3 PM, Sun 7 AM – 2 PM.
  // NOTE for future editors: Sunday opens at 7 AM, NOT 6 AM — keep the
  // openHour/closeHour branches below in sync with Location.tsx and layout.tsx.
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
        <span className="stat-label">★ Google Rating</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <Counter to={280} suffix="+" />
        <span className="stat-label">Reviews</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-num">6 AM</span>
        <span className="stat-label">Daily</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <Counter to={20} suffix="+" />
        <span className="stat-label">Cream Cheeses</span>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-vignette" />

      <SteamRising />
      <HeroSeeds />

      <div className="hero-content">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        >
          Medford, New York · Est. Daily 6AM
        </motion.p>

        <h1 className="hero-headline">
          {['Long Island’s', 'Favorite'].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: EASE }}
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            className="accent"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54, duration: 0.8, ease: EASE }}
          >
            Bagel.
          </motion.span>
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
        >
          A family recipe. Two generations. Medford&apos;s favorite morning stop
          — now with the Knicks Everything Bagel.
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
      </div>

      <div className="hero-photo-panel" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/food1.jpg"
          alt="Fresh food at Joel's Bagels Medford NY"
          className="hero-food-photo"
        />
        <div className="hero-photo-fade" />
        <div className="hero-photo-badge">
          <span className="badge-dot" />
          <span>Made fresh this morning</span>
        </div>
      </div>

      <StatsBar />
    </section>
  )
}
