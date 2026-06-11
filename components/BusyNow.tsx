'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '@/components/Reveal'

const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

// Real Google Maps popular-times data for Joel's Bagels (scraped 2026-06-11).
// Hours shown span open hours: Mon–Sat 6–15, Sun 7–14.
type DayKey = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

const BUSY: Record<DayKey, { hour: number; pct: number }[]> = {
  Mon: [
    { hour: 6, pct: 19 }, { hour: 7, pct: 36 }, { hour: 8, pct: 50 },
    { hour: 9, pct: 50 }, { hour: 10, pct: 48 }, { hour: 11, pct: 42 },
    { hour: 12, pct: 39 }, { hour: 13, pct: 30 }, { hour: 14, pct: 19 },
  ],
  Tue: [
    { hour: 6, pct: 30 }, { hour: 7, pct: 55 }, { hour: 8, pct: 68 },
    { hour: 9, pct: 74 }, { hour: 10, pct: 68 }, { hour: 11, pct: 60 },
    { hour: 12, pct: 46 }, { hour: 13, pct: 32 }, { hour: 14, pct: 19 },
  ],
  Wed: [
    { hour: 6, pct: 31 }, { hour: 7, pct: 49 }, { hour: 8, pct: 65 },
    { hour: 9, pct: 70 }, { hour: 10, pct: 67 }, { hour: 11, pct: 54 },
    { hour: 12, pct: 43 }, { hour: 13, pct: 33 }, { hour: 14, pct: 21 },
  ],
  Thu: [
    { hour: 6, pct: 40 }, { hour: 7, pct: 62 }, { hour: 8, pct: 68 },
    { hour: 9, pct: 68 }, { hour: 10, pct: 62 }, { hour: 11, pct: 55 },
    { hour: 12, pct: 51 }, { hour: 13, pct: 40 }, { hour: 14, pct: 31 },
  ],
  Fri: [
    { hour: 6, pct: 35 }, { hour: 7, pct: 59 }, { hour: 8, pct: 71 },
    { hour: 9, pct: 70 }, { hour: 10, pct: 69 }, { hour: 11, pct: 66 },
    { hour: 12, pct: 65 }, { hour: 13, pct: 56 }, { hour: 14, pct: 42 },
  ],
  Sat: [
    { hour: 6, pct: 47 }, { hour: 7, pct: 66 }, { hour: 8, pct: 84 },
    { hour: 9, pct: 99 }, { hour: 10, pct: 100 }, { hour: 11, pct: 94 },
    { hour: 12, pct: 76 }, { hour: 13, pct: 57 }, { hour: 14, pct: 36 },
  ],
  Sun: [
    { hour: 7, pct: 42 }, { hour: 8, pct: 67 }, { hour: 9, pct: 82 },
    { hour: 10, pct: 91 }, { hour: 11, pct: 74 }, { hour: 12, pct: 53 },
    { hour: 13, pct: 31 },
  ],
}

const DAYS: DayKey[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const TIPS: Record<DayKey, string> = {
  Mon: 'Mondays are mellow — walk right up.',
  Tue: 'Mid-morning hum. The regulars have it timed.',
  Wed: 'Steady from 8 to 11. Easy in, easy out.',
  Thu: 'The 6 AM crowd means business on Thursdays.',
  Fri: 'Friday holds its rush straight through lunch.',
  Sat: 'Saturday 10 AM is the rush. 6 AM is for the regulars.',
  Sun: 'Sunday peaks at 10 — beat the church crowd at 8.',
}

function hourLabel(h: number) {
  if (h === 12) return '12p'
  return h < 12 ? `${h}a` : `${h - 12}p`
}

function busyWord(pct: number) {
  if (pct >= 85) return 'packed'
  if (pct >= 60) return 'busy'
  if (pct >= 35) return 'steady'
  return 'quiet'
}

export default function BusyNow() {
  // Day defaults resolve after mount so SSR markup is deterministic.
  const [day, setDay] = useState<DayKey>('Sat')
  const [nowHour, setNowHour] = useState<number | null>(null)
  const [today, setToday] = useState<DayKey | null>(null)

  useEffect(() => {
    const now = new Date()
    const todayKey = DAYS[(now.getDay() + 6) % 7] // JS Sunday=0 → our Mon-first
    setToday(todayKey)
    setDay(todayKey)
    setNowHour(now.getHours())
  }, [])

  const bars = BUSY[day]
  const viewingToday = today === day
  const liveBar = viewingToday
    ? bars.find((b) => b.hour === nowHour)
    : undefined

  return (
    <section className="section busy-section" id="the-line">
      <div className="container">
        <Reveal className="process-header">
          <p className="eyebrow">Real Crowd Data · Google Maps</p>
          <h2 className="section-headline">When the Line Moves</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="busy-card">
            <div className="busy-days" role="tablist" aria-label="Pick a day">
              {DAYS.map((d) => (
                <button
                  key={d}
                  role="tab"
                  aria-selected={day === d}
                  className={`busy-day ${day === d ? 'active' : ''}`}
                  onClick={() => setDay(d)}
                >
                  {d}
                  {today === d ? ' ·' : ''}
                </button>
              ))}
            </div>

            <div className="busy-chart" aria-label={`Typical crowds on ${day}`}>
              {bars.map((b, i) => {
                const isNow = viewingToday && b.hour === nowHour
                return (
                  <div key={`${day}-${b.hour}`} className={`busy-col ${isNow ? 'now-col' : ''}`}>
                    <motion.div
                      className={`busy-bar ${isNow ? 'now' : ''}`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        delay: i * 0.035,
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                      }}
                      style={{ height: `${Math.max(b.pct, 4)}%` }}
                      aria-label={`${hourLabel(b.hour)}: ${b.pct}% of peak`}
                    />
                    <span className="busy-hour">{hourLabel(b.hour)}</span>
                  </div>
                )
              })}
            </div>

            <div className="busy-legend">
              {liveBar ? (
                <span className="busy-status">
                  <span className="open-dot" />
                  Right now: usually {busyWord(liveBar.pct)}
                </span>
              ) : (
                <span className="busy-status">
                  Typical crowds, straight from Google Maps
                </span>
              )}
              <span className="busy-tip">{TIPS[day]}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a
              href={DOORDASH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Skip it — order ahead →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
