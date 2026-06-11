'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Joel%27s+Bagels+1699+Route+112+Medford+NY+11763'

const hours = [
  { day: 'Monday', open: '6:00 AM', close: '3:00 PM' },
  { day: 'Tuesday', open: '6:00 AM', close: '3:00 PM' },
  { day: 'Wednesday', open: '6:00 AM', close: '3:00 PM' },
  { day: 'Thursday', open: '6:00 AM', close: '3:00 PM' },
  { day: 'Friday', open: '6:00 AM', close: '3:00 PM' },
  { day: 'Saturday', open: '6:00 AM', close: '3:00 PM' },
  { day: 'Sunday', open: '7:00 AM', close: '2:00 PM' },
]

function HoursTable() {
  // Resolved after mount so the server and client render the same markup
  const [todayIndex, setTodayIndex] = useState<number | null>(null)

  useEffect(() => {
    // getDay(): 0 = Sunday; hours[] starts at Monday
    setTodayIndex((new Date().getDay() + 6) % 7)
  }, [])

  return (
    <table className="hours-table">
      <tbody>
        {hours.map((row, i) => (
          <tr key={row.day} className={i === todayIndex ? 'today' : ''}>
            <td>{row.day}</td>
            <td>
              {row.open} – {row.close}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Location() {
  return (
    <section className="section" id="find-us">
      <div className="location-ghost" aria-hidden="true">
        Rt. 112
      </div>
      <div className="container location-grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="eyebrow">Find Us</p>
          <h2 className="location-address">1699 Route 112</h2>
          <p className="location-city">Medford, New York 11763</p>
          <a href="tel:+16313079206" className="location-phone">
            (631) 307-9206
          </a>
          <div>
            <span className="route-badge">NY · Route 112 · Medford</span>
          </div>
          <div className="location-directions">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get Directions →
            </a>
          </div>
          <HoursTable />
        </motion.div>

        <motion.div
          className="map-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          <div className="location-polaroid">
            <div className="location-photo">
              <Image
                src="/photos/storefront.jpg"
                alt="Joel's Bagels storefront on Route 112 in Medford"
                fill
                sizes="(max-width: 900px) 90vw, 40vw"
                style={{ objectPosition: '50% 35%' }}
              />
            </div>
            <span className="location-polaroid-caption">
              Look for the awning — right on Route 112
            </span>
          </div>
          <iframe
            src="https://www.google.com/maps?q=1699+Route+112+Medford+NY+11763&output=embed"
            width="100%"
            height="300"
            style={{
              border: 0,
              borderRadius: 12,
              filter: 'grayscale(30%) contrast(110%)',
              display: 'block',
            }}
            loading="lazy"
            allowFullScreen
            title="Map to Joel's Bagels, 1699 Route 112, Medford NY"
          />
        </motion.div>
      </div>
    </section>
  )
}
