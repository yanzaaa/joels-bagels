'use client'
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '@/lib/cart'

const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

export default function CartDrawer() {
  const items = useCart((s) => s.items)
  const isOpen = useCart((s) => s.isOpen)
  const closeCart = useCart((s) => s.closeCart)
  const updateQty = useCart((s) => s.updateQty)
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Escape closes; body scroll locks while open (same pattern as Nav drawer).
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
          />
          <motion.div
            className="cd-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320, mass: 0.8 }}
          >
            <div className="cd-header">
              <div className="cd-title">
                <h3>Your Order</h3>
                {count > 0 && (
                  <span className="cd-count">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <motion.button
                ref={closeRef}
                className="cd-close"
                onClick={closeCart}
                whileTap={{ scale: 0.9 }}
                aria-label="Close cart"
              >
                ✕
              </motion.button>
            </div>

            {items.length === 0 ? (
              <div className="cd-empty">
                <span className="cd-empty-icon" aria-hidden="true">
                  🥯
                </span>
                <p>Nothing yet.</p>
                <small>Tap + on any menu item to start your order.</small>
              </div>
            ) : (
              <>
                {/* data-lenis-prevent: Lenis owns the page wheel — without
                    this, scrolling the list scrolls the page behind it. */}
                <div className="cd-items" data-lenis-prevent>
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="cd-item"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="cdi-row">
                          <span className="cdi-name">{item.name}</span>
                          <span className="cdi-price">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="cdi-qty">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            aria-label={`Remove one ${item.name}`}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            aria-label={`Add one ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="cd-footer">
                  <div className="cd-total">
                    <span>Subtotal</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                  <motion.a
                    href={DOORDASH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cd-checkout"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeCart}
                  >
                    Order on DoorDash →
                  </motion.a>
                  <p className="cd-note">
                    Opens Joel&apos;s on DoorDash — rebuild your picks there to
                    check out
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
