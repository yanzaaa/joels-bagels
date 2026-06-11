'use client'
import { motion } from 'framer-motion'
import { useForm } from '@formspree/react'

const EASE = [0.16, 1, 0.3, 1] as const

const highlights = [
  {
    icon: '☕',
    title: 'Office Mornings',
    desc: 'Bagels, spreads, and coffee for your team. We handle the setup, you take the credit.',
  },
  {
    icon: '🎉',
    title: 'Private Events',
    desc: 'Birthdays, graduations, celebrations. Platters starting at $45.',
  },
  {
    icon: '🏫',
    title: 'School & Community',
    desc: 'PTA meetings, fundraisers, sports teams. Volume pricing available.',
  },
]

function CateringForm() {
  // Live Formspree form (verified returning 200) — inquiries land in email.
  const [state, handleSubmit] = useForm('mzdqvawv')

  if (state.succeeded) {
    return (
      <div className="form-success">
        <div className="success-icon">✓</div>
        <h3>We&apos;ll be in touch!</h3>
        <p>
          Expect a call within 24 hours. Or reach us directly:{' '}
          <a href="tel:+16313079206">(631) 307-9206</a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="catering-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="catering-name">Your name *</label>
          <input
            id="catering-name"
            type="text"
            name="name"
            required
            placeholder="Full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="catering-phone">Phone number *</label>
          <input
            id="catering-phone"
            type="tel"
            name="phone"
            required
            placeholder="(631) 555-0000"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="catering-date">Event date</label>
          <input id="catering-date" type="date" name="date" />
        </div>
        <div className="form-group">
          <label htmlFor="catering-guests">Number of people</label>
          <input
            id="catering-guests"
            type="number"
            name="guests"
            min="1"
            placeholder="How many?"
          />
        </div>
      </div>
      <div className="form-group full">
        <label htmlFor="catering-message">Tell us about your event</label>
        <textarea
          id="catering-message"
          name="message"
          rows={4}
          placeholder="Type of event, any special requests, budget range..."
        />
      </div>
      <button type="submit" disabled={state.submitting} className="form-submit">
        {state.submitting ? 'Sending...' : 'Send Inquiry →'}
      </button>
    </form>
  )
}

export default function Catering() {
  return (
    <section className="section catering-section" id="catering">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="eyebrow">Catering</p>
          <h2 className="section-headline">Feeding a Crowd?</h2>
          <p className="catering-sub">
            Office breakfasts, birthday parties, school events, corporate
            catering — we&apos;ve fed them all.
          </p>
        </motion.div>

        <div className="catering-cards">
          {highlights.map((card, i) => (
            <motion.div
              key={card.title}
              className="catering-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
            >
              <div className="catering-card-icon" aria-hidden="true">
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <CateringForm />
        </motion.div>
      </div>
    </section>
  )
}
