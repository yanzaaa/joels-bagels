const items = [
  '🥯 Fresh Bagels Daily',
  '🏀 Knicks Everything Bagel',
  '🧀 Olive Cream Cheese',
  '⏰ Open Daily · 6 AM',
  '🇪🇨 Ecuadorian Family Recipe',
  '🥚 Best BEC on Long Island',
  '📍 1699 Route 112 · Medford',
  '⭐ 4.5 Stars · 280 Reviews',
  '🚗 Order on DoorDash',
  '💙🧡 Home of the Knicks Bagel',
]

export default function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {/* Track is duplicated for a seamless -50% translate loop */}
        {[0, 1].map((dup) => (
          <div key={dup} style={{ display: 'flex' }}>
            {items.map((item) => (
              <span key={item} className="marquee-item">
                {item}
                <span className="marquee-dot">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
