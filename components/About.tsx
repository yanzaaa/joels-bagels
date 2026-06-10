'use client'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const badges = [
  '🇪🇨 Ecuadorian Owned',
  '👨‍👩‍👧 Family Run',
  '📍 Medford, NY',
  '☀️ Open Since Day One',
  '🏀 Home of the Knicks Bagel',
]

const cardStats = [
  { number: '2', title: 'Generations', sub: 'of family behind the counter' },
  { number: '6', title: 'AM Every Day', sub: 'without exception' },
  { number: '280+', title: '5-Star Reviews', sub: 'from the community' },
]

export default function About() {
  return (
    <section className="about-section section-textured" id="about">
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="about-eyebrow">Our Story</p>

        <h2 className="about-headline">
          Two Generations.
          <br />
          <span>One Counter.</span>
        </h2>

        <div className="about-body">
          <p>
            Joel&apos;s family came to Long Island with a simple idea: feed
            people well, treat them like family, and do it every morning
            without fail. That was the beginning of Joel&apos;s Bagels.
          </p>
          <p>
            Two generations later, the recipe hasn&apos;t changed. Fresh
            bagels. Made daily. The same faces behind the counter — Kelly,
            Jason, Rolando, Maria, and Joel himself — who know your order
            before you finish saying it.
          </p>
          <p>
            We&apos;re an Ecuadorian-owned, family-run business in the heart
            of Medford. Not a chain. Not a franchise. Just a family that shows
            up at 6 AM and takes pride in what comes out of the kitchen.
          </p>
          <p className="about-quote">
            &ldquo;Joel always makes you feel like family.&rdquo;
            <span className="about-quote-attr">
              — Charles Palmer, regular customer
            </span>
          </p>
        </div>

        <div className="about-badges">
          {badges.map((badge) => (
            <span key={badge} className="about-badge">
              {badge}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="about-visual"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
      >
        <div className="about-card">
          {cardStats.map((stat) => (
            <div key={stat.title} className="about-card-inner">
              <div className="about-number">{stat.number}</div>
              <div className="about-card-text">
                <strong>{stat.title}</strong>
                <span>{stat.sub}</span>
              </div>
            </div>
          ))}
          <div className="about-card-footer">
            <span>Medford&apos;s bagel shop. Long Island&apos;s favorite.</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
