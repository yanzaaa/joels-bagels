'use client'
import { useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/* Pointer-tracked 3D tilt — the card leans toward the cursor and springs
   back on leave. Touch devices never fire mousemove, so they're unaffected. */
function TiltCard({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 260, damping: 22 })
  const sry = useSpring(ry, { stiffness: 260, damping: 22 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 9)
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7)
      }}
      onMouseLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

const signatures = [
  {
    num: '01',
    name: 'Olive Cream Cheese',
    desc: 'People drive from three towns over. Made in-house every morning with Kalamatas. Same recipe since day one.',
    tag: 'Fan Favorite',
    tagColor: 'olive',
    photo: '/photos/olive-cc.jpg',
    alt: 'A toasted bagel half spread thick with olive cream cheese',
  },
  {
    num: '02',
    name: 'The Chicken BLT',
    desc: 'Fresh-breaded cutlet, crispy bacon, lettuce, tomato, ranch — pressed hot. Get it before the lunch line does.',
    tag: 'After 11 AM',
    tagColor: 'poppy',
    photo: '/photos/chicken-cutlet.jpg',
    alt: 'The Chicken BLT — breaded cutlet with bacon, pressed hot',
  },
  {
    num: '03',
    name: 'Lox & Cream Cheese',
    desc: 'Cold-smoked salmon. Plain cream cheese. Toasted everything. Nine bucks — the same sandwich runs $22 in the city.',
    tag: 'Classic',
    tagColor: 'sesame',
    photo: '/photos/lox.jpg',
    alt: 'An everything bagel with smoked salmon lox and plain cream cheese',
  },
]

// null = no price sticker (call-it-at-the-counter items)
const stickers: (string | null)[] = ['$2.50', null, '$9.00']
const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

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
            <TiltCard key={item.num} className="signature-card">
              <div className="signature-photo">
                <Image
                  src={item.photo}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 800px) 90vw, 30vw"
                />
                {stickers[i] && <span className="sig-sticker">{stickers[i]}</span>}
              </div>
              <span className={`signature-tag ${item.tagColor}`}>
                {item.tag}
              </span>
              <h3 className="signature-name">{item.name}</h3>
              <p className="signature-desc">{item.desc}</p>
              <a
                className="sig-order"
                href={DOORDASH_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order this on DoorDash →
              </a>
              <span className="signature-num" aria-hidden="true">
                {item.num}
              </span>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
