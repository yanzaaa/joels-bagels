'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '@/lib/cart'

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

function BagIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 7h12l1.2 13.2a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 7Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </svg>
  )
}

function CartButton() {
  const count = useCart((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  )
  const openCart = useCart((s) => s.openCart)

  return (
    <button
      className="nav-cart-btn"
      onClick={openCart}
      aria-label={`Open your order${count > 0 ? ` (${count} items)` : ''}`}
    >
      <BagIcon />
      <AnimatePresence>
        {count > 0 && (
          // Keyed on count so each add re-mounts the badge with a spring pop
          <motion.span
            key={count}
            className="nav-cart-badge"
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 16 }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
              className="nav-cta"
            >
              Order Now
            </a>
          </nav>

          <div className="nav-right">
            <CartButton />
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
