'use client'
import { useState } from 'react'

export default function KnicksBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="knicks-banner">
      <div className="knicks-banner-inner">
        <span className="knicks-ball" aria-hidden="true">
          🏀
        </span>
        <span className="knicks-text">
          <strong>Knicks Everything Bagel</strong> — available daily while the
          playoff run continues
        </span>
        <span className="knicks-colors">💙🧡 LET&apos;S GO KNICKS</span>
      </div>
      <button
        className="knicks-dismiss"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss Knicks banner"
      >
        ✕
      </button>
    </div>
  )
}
