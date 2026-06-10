'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

export default function MobileOrderBar() {
  const [visible, setVisible] = useState(false)
  // Resolved after mount so server/client markup match (no hydration flash).
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const h = new Date().getHours()
    const day = new Date().getDay()
    // Mon–Sat: 6 AM–3 PM, Sun: 7 AM–2 PM
    setIsOpen(day === 0 ? h >= 7 && h < 14 : h >= 6 && h < 15)

    const onScroll = () => setVisible(window.scrollY > 280)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="mob-order-bar"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        >
          <div className="mob-bar-left">
            <span className="mob-bar-name">Joel&apos;s Bagels</span>
            <span className="mob-bar-status">
              {isOpen
                ? '🟢 Open · 1699 Route 112'
                : '🔴 Opens 6 AM · Route 112'}
            </span>
          </div>

          <a
            href={DOORDASH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mob-bar-cta"
          >
            Order Now →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
