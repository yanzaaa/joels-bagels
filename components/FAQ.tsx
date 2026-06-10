'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

type Faq = { q: string; a: string }

const faqs: Faq[] = [
  {
    q: 'What time do you open?',
    a: "Monday through Saturday we open at 6 AM and close at 3 PM. Sundays we open at 7 AM and close at 2 PM. We're open every day — no exceptions.",
  },
  {
    q: 'Do you have online ordering?',
    a: "Yes! We're on DoorDash for pickup and delivery. Hit the 'Order on DoorDash' button anywhere on this page. No delivery fee on your first order.",
  },
  {
    q: 'What makes your cream cheese different?',
    a: "It's made in-house, fresh daily. We have 20+ varieties — but the olive cream cheese is the one people come back for. Try it once and you'll understand.",
  },
  {
    q: 'Do you cater events?',
    a: "Absolutely. Office breakfasts, birthday parties, school events, sports teams — we've done it all. Fill out the catering form above or call us at (631) 307-9206 and Joel will take care of you personally.",
  },
  {
    q: 'Is the food fresh every day?',
    a: "Every single morning. Nothing sits overnight. If it's in the case, it was made today. That's not a marketing line — it's just how we operate.",
  },
  {
    q: 'Are you a family business?',
    a: "Two generations deep. Joel started the shop and the whole family has been behind the counter since day one. When you come in, you're not a customer — you're a regular waiting to happen.",
  },
  {
    q: 'Do you have parking?',
    a: 'Yes, plenty of parking right out front at 1699 Route 112 in Medford.',
  },
  {
    q: 'Can I order a custom bagel creation?',
    a: "Of course. Tell us what you want. We have 13+ bagel varieties, 20+ cream cheeses, and a full deli. Mix and match — that's the whole point.",
  },
]

function FAQItem({ faq, index }: { faq: Faq; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className={`faq-item ${open ? 'open' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
    >
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{faq.q}</span>
        <span className="faq-icon" aria-hidden="true">
          +
        </span>
      </button>
      <div className="faq-answer">
        <p>{faq.a}</p>
      </div>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section className="section section-textured" id="faq">
      <div className="faq-section">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="faq-headline">Questions? We Got You.</h2>
          <p className="faq-sub">
            The stuff people ask us at the counter, answered.
          </p>
        </motion.div>

        {faqs.map((faq, i) => (
          <FAQItem key={faq.q} faq={faq} index={i} />
        ))}
      </div>
    </section>
  )
}
