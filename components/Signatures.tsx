'use client'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const signatures = [
  {
    num: '01',
    name: 'Olive Cream Cheese',
    desc: 'The one people drive across Long Island for. Made in-house daily.',
    tag: 'Fan Favorite',
    tagColor: 'olive',
  },
  {
    num: '02',
    name: 'Everything BEC',
    desc: 'Bacon, egg, and cheese on an everything bagel. 6 AM never tasted this good.',
    tag: 'Most Ordered',
    tagColor: 'poppy',
  },
  {
    num: '03',
    name: 'Lox & Cream Cheese',
    desc: 'New York in every bite. Cold-smoked salmon, capers, the works.',
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
              <span className={`signature-tag ${item.tagColor}`}>
                {item.tag}
              </span>
              <h3 className="signature-name">{item.name}</h3>
              <p className="signature-desc">{item.desc}</p>
              <span className="signature-num" aria-hidden="true">
                {item.num}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
