'use client'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Joel%27s+Bagels+1699+Medford+Ave+Medford+NY+11763'

type Review = {
  name: string
  stars: number
  ago: string
  text: string
  initials: string
  lang?: string
}

const reviews: Review[] = [
  {
    name: 'Mike R.',
    stars: 5,
    ago: '2 weeks ago',
    text: 'Best bagels on Long Island. Been coming here for 10 years. The olive cream cheese is something special — nothing like it anywhere else on the island.',
    initials: 'MR',
  },
  {
    name: 'Sarah T.',
    stars: 5,
    ago: '1 month ago',
    text: 'Everything bagel with bacon egg and cheese. Perfect every single morning. Staff knows my order by heart at this point. Genuinely the best breakfast spot in Medford.',
    initials: 'ST',
  },
  {
    name: 'Danny P.',
    stars: 5,
    ago: '3 weeks ago',
    text: 'Freshest bagels in all of Suffolk County. The bialy is underrated, and the lox platter is worth every penny. Joel runs a tight ship.',
    initials: 'DP',
  },
  {
    name: 'Lisa M.',
    stars: 4,
    ago: '1 month ago',
    text: 'Gets really busy on weekend mornings which honestly tells you everything you need to know. Worth every minute of the wait. Consistent quality every time.',
    initials: 'LM',
  },
  {
    name: 'Tom K.',
    stars: 5,
    ago: '2 months ago',
    text: "The lox and cream cheese is genuinely the best I've had. Real New York bagel shop energy. Not a chain, not fancy — just perfect bagels made with care.",
    initials: 'TK',
  },
  {
    name: 'Ana G.',
    stars: 5,
    ago: '3 weeks ago',
    text: 'Fui con mi familia y el servicio fue increíble. Los bagels son fresquísimos y el personal es muy amable. Mi favorito es el bagel con queso crema de oliva.',
    initials: 'AG',
    lang: 'es',
  },
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
            280+ reviews on Google
          </a>
        </motion.div>

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
              {review.lang === 'es' && (
                <span className="review-lang-tag">🇵🇷 en español</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
