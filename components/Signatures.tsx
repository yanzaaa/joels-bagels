'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const signatures = [
  {
    num: '01',
    name: 'Olive Cream Cheese',
    desc: 'People drive from three towns over. Made in-house every morning with Kalamatas. Same recipe since day one.',
    tag: 'Fan Favorite',
    tagColor: 'olive',
    photo: '/photos/melt.jpg',
    alt: 'A toasted bagel split open, spread melting into both halves',
  },
  {
    num: '02',
    name: 'Everything BEC',
    desc: 'Bacon. Egg. Cheese. Everything bagel, hot from the oven. $6.50. The Saturday morning line tells you everything.',
    tag: 'Most Ordered',
    tagColor: 'poppy',
    photo: '/photos/bec-hand.jpg',
    alt: 'Bacon egg and cheese on an everything bagel, held in hand',
  },
  {
    num: '03',
    name: 'Lox & Cream Cheese',
    desc: 'Cold-smoked salmon. Plain cream cheese. Toasted everything. Under $8 — this sandwich costs $22 in the city.',
    tag: 'Classic',
    tagColor: 'sesame',
    photo: '/photos/everything-bagel.jpg',
    alt: 'A toasted everything bagel on parchment paper',
  },
]

export default function Signatures() {
  return (
    <section className="section signatures-section">
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
              <div className="signature-photo">
                <Image
                  src={item.photo}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 800px) 90vw, 30vw"
                />
              </div>
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
