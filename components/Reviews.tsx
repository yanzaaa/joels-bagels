'use client'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Joel%27s+Bagels+1699+Route+112+Medford+NY+11763'

type Review = {
  name: string
  stars: number
  ago: string
  text: string
  initials: string
}

// Real Google reviews for Joel's Bagels
const reviews: Review[] = [
  {
    name: 'shaw iqbal',
    stars: 5,
    ago: '1 month ago',
    text: 'We are from FL and were looking for great NY bagel shop. This place was great and service was excellent. Food is very affordable and fresh. I would highly recommend.',
    initials: 'SI',
  },
  {
    name: 'jaime dellipizzi',
    stars: 5,
    ago: '4 months ago',
    text: "The owner is a lovely man who greets you with a warm smile every time — he's actually the reason I keep returning! He makes you feel like you are the most important person once you set foot in his establishment. The bagels are fresh and delicious, the egg sandwiches are divine!",
    initials: 'JD',
  },
  {
    name: 'Charles Palmer',
    stars: 5,
    ago: '5 months ago',
    text: 'Always a pleasure. Good food, fair prices, and a great bunch of people who worked there. Joel always makes you feel like family.',
    initials: 'CP',
  },
  {
    name: 'Tracy K',
    stars: 5,
    ago: '5 months ago',
    text: "Always so welcoming and truly appreciate your business! I love Joel's bagels! No better deli or bagel store out there!",
    initials: 'TK',
  },
  {
    name: 'Steven Figueiredo',
    stars: 5,
    ago: '6 months ago',
    text: 'Best spot around. Everyone at my job orders from here and even on my days off I drive a town over to get the best bagels and sandwiches around! Kelly is amazing!',
    initials: 'SF',
  },
]

// Real numbers from the Google Maps listing (scraped 2026-06-11)
const distribution = [
  { stars: 5, count: 215 },
  { stars: 4, count: 23 },
  { stars: 3, count: 17 },
  { stars: 2, count: 9 },
  { stars: 1, count: 16 },
]

const reviewTags = [
  { label: 'polite staff', count: 11 },
  { label: 'deli', count: 10 },
  { label: 'egg sandwiches', count: 8 },
  { label: 'bacon egg cheese', count: 6 },
  { label: 'family owned', count: 3 },
  { label: 'local place', count: 3 },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="review-stars" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
      {'☆'.repeat(5 - count)}
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="section">
      <div className="container">
        <div className="reviews-summary-grid">
          <motion.div
            className="reviews-summary"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="eyebrow">The Word Around Town</p>
            <div className="reviews-rating">4.5</div>
            <div className="reviews-stars" aria-hidden="true">
              ★★★★<span style={{ opacity: 0.45 }}>★</span>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reviews-count"
            >
              280 reviews on Google
            </a>
          </motion.div>

          {/* Real distribution from Google Maps (scraped 2026-06-11) */}
          <div className="review-dist" aria-label="Rating distribution">
            {distribution.map((row, i) => (
              <div key={row.stars} className="review-dist-row">
                <span className="review-dist-label">{row.stars}★</span>
                <div className="review-dist-track">
                  <motion.div
                    className="review-dist-fill"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: row.count / 280 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      delay: 0.15 + i * 0.07,
                      duration: 0.8,
                      ease: EASE,
                    }}
                    style={{ width: '100%' }}
                  />
                </div>
                <span className="review-dist-count">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What 280 reviews actually talk about — real Google review tags */}
        <div className="review-tags" aria-label="Most mentioned in reviews">
          {reviewTags.map((tag) => (
            <span key={tag.label} className="review-tag">
              {tag.label} <strong>×{tag.count}</strong>
            </span>
          ))}
        </div>

        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              className="review-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <div className="review-head">
                <div className="review-avatar">{review.initials}</div>
                <div>
                  <div className="review-name">{review.name}</div>
                  <div className="review-ago">{review.ago}</div>
                </div>
              </div>
              <Stars count={review.stars} />
              <p className="review-text">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
