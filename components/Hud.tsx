'use client'
import { useEffect, useState } from 'react'

/* Corner telemetry — local shop time, oven status by hour, scroll depth.
   Pure chrome: pointer-events none, hidden under 1100px. */

function shopStatus(hour: number, day: number): { label: string; live: boolean } {
  const isSunday = day === 0
  const openHour = isSunday ? 7 : 6
  const closeHour = isSunday ? 14 : 15
  if (hour >= 4 && hour < openHour) return { label: 'Ovens hot · first batch 4:30a', live: true }
  if (hour >= openHour && hour < closeHour) return { label: 'Counter open · baking now', live: true }
  return { label: `Resting · back ${isSunday || day === 6 ? '7a' : '6a'}`, live: false }
}

export default function Hud() {
  const [now, setNow] = useState<Date | null>(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    setNow(new Date())
    const tick = setInterval(() => setNow(new Date()), 30_000)

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight
        setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      clearInterval(tick)
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!now) return null

  const status = shopStatus(now.getHours(), now.getDay())
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="hud" aria-hidden="true">
      <span>
        Medford, NY — <strong>{time}</strong>
      </span>
      <span className={status.live ? 'hud-live' : undefined}>{status.label}</span>
      <span>
        Scroll <strong>{pct}%</strong>
      </span>
    </div>
  )
}
