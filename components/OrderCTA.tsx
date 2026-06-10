'use client'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

export default function OrderCTA() {
  return (
    <section className="section" id="order">
      <div className="container order-section">
        <motion.div
          className="order-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="eyebrow">Order Now</p>
          <h2>
            Skip the line.
            <br />
            <span>Get your bagels.</span>
          </h2>
          <p>
            Pickup or delivery available through DoorDash. No delivery fee on
            your first order.
          </p>
          <p className="order-available">Available daily · Starting 6 AM</p>
        </motion.div>

        <motion.div
          className="order-right"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          <div className="doordash-card">
            <div className="doordash-logo">DoorDash</div>
            <p>Joel&apos;s Bagels · Medford, NY</p>
            <a
              href="https://www.doordash.com/store/1144158"
              target="_blank"
              rel="noopener noreferrer"
              className="doordash-btn"
            >
              Order Pickup or Delivery →
            </a>
            <p className="doordash-note">Opens the DoorDash app</p>
          </div>

          <a
            href="https://www.instagram.com/joelsbagelscafe"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
          >
            Follow @joelsbagelscafe for daily specials
          </a>
        </motion.div>
      </div>
    </section>
  )
}
