'use client'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const signatures = [
  {
    num: '01',
    emoji: '🧀',
    name: 'Olive Cream Cheese',
    photo: '/photos/food2.jpg',
    photofallback: '/instagram/post1.jpg',
    desc: "Made in-house every morning. A family recipe that became Medford's most-requested spread.",
    tag: 'Fan Favorite',
    tagColor: 'olive',
  },
  {
    num: '02',
    emoji: '🥯',
    name: 'Everything BEC',
    photo: '/photos/food1.jpg',
    photofallback: '/instagram/post2.jpg',
    desc: 'Two generations perfecting the timing on bacon, egg, and cheese. On an everything bagel. Before 7 AM.',
    tag: 'Most Ordered',
    tagColor: 'poppy',
  },
  {
    num: '03',
    emoji: '🐟',
    name: 'Lox & Cream Cheese',
    photo: '/photos/food3.jpg',
    photofallback: '/instagram/post3.jpg',
    desc: "A New York classic, made the way Joel's family learned it. Cold-smoked salmon on a fresh bagel.",
    tag: 'Classic',
    tagColor: 'sesame',
  },
]

export default function Signatures() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="eyebrow">The Signatures</p>
          <h2 className="section-headline">What People Come Back For</h2>
        </motion.div>

        <div className="signatures-grid">
          {signatures.map((item, i) => (
            <motion.div
              key={item.num}
              className="signature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            >
              <div
                className="sig-photo-bg"
                style={{
                  backgroundImage: `url('${item.photo}'), url('${item.photofallback}')`,
                }}
                aria-hidden="true"
              />
              <div className="sig-overlay" aria-hidden="true" />

              <div className="sig-content">
                <span className="sig-emoji" aria-hidden="true">
                  {item.emoji}
                </span>
                <span className={`signature-tag ${item.tagColor}`}>
                  {item.tag}
                </span>
                <h3 className="signature-name">{item.name}</h3>
                <p className="signature-desc">{item.desc}</p>
                <span className="signature-num" aria-hidden="true">
                  {item.num}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
