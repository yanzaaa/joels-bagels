'use client'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const INSTAGRAM_URL = 'https://www.instagram.com/joelsbagelscafe'

// TODO: Replace with real Instagram photos
// or connect Instagram Basic Display API
const placeholders = [
  {
    gradient: 'linear-gradient(135deg, #8B5E3C 0%, #C4955A 100%)',
    label: 'Fresh bagels',
  },
  {
    gradient: 'linear-gradient(135deg, #4A5C3F 0%, #6B8C5A 100%)',
    label: 'Olive cream cheese',
  },
  {
    gradient: 'linear-gradient(135deg, #1C1410 0%, #8B5E3C 100%)',
    label: 'BEC special',
  },
  {
    gradient: 'linear-gradient(135deg, #C4955A 0%, #E8C49A 100%)',
    label: 'Morning rush',
  },
  {
    gradient: 'linear-gradient(135deg, #8B5E3C 0%, #1C1410 100%)',
    label: 'The shop',
  },
  {
    gradient: 'linear-gradient(135deg, #E8400C 0%, #C4955A 100%)',
    label: 'Daily specials',
  },
]

function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Instagram() {
  return (
    <section className="section instagram-section">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="eyebrow">From the Counter</p>
          <h2 className="section-headline">Fresh on the Feed</h2>
        </motion.div>

        <div className="instagram-grid">
          {placeholders.map((tile, i) => (
            <motion.a
              key={tile.label}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-tile"
              style={{ background: tile.gradient }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            >
              <span className="instagram-tile-label">{tile.label}</span>
              <span className="instagram-tile-overlay">
                <InstagramIcon />
                View on Instagram
              </span>
            </motion.a>
          ))}
        </div>

        <div className="instagram-cta-row">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Follow @joelsbagelscafe
          </a>
        </div>
      </div>
    </section>
  )
}
