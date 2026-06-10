'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Order', href: '#order' },
  { label: 'Catering', href: '#catering' },
  { label: 'Find Us', href: '#find-us' },
]

const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    let ticking = false

    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        rafId = requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={barRef} className="scroll-progress" />
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // Whether the shop is open right now — drives the Order Now pulse.
  // Computed after mount so server/client markup match (no hydration flash).
  const [shopOpen, setShopOpen] = useState(false)

  useEffect(() => {
    const h = new Date().getHours()
    const day = new Date().getDay()
    // Mon–Sat: 6 AM–3 PM, Sun: 7 AM–2 PM (matches Hero/Location/layout)
    setShopOpen(day === 0 ? h >= 7 && h < 14 : h >= 6 && h < 15)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <ScrollProgress />
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            Joel&apos;s Bagels
          </a>

          <nav className="nav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
            <a
              href={DOORDASH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`nav-cta ${shopOpen ? 'nav-order-open' : ''}`}
            >
              Order Now
            </a>
          </nav>

          <button
            className={`nav-hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                className="nav-drawer-link"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href={DOORDASH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-drawer-cta"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Order on DoorDash →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
