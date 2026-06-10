const items = [
  'Fresh Bagels Daily',
  '★ Olive Cream Cheese',
  'Bacon Egg & Cheese',
  'Everything Bagel',
  'Open 6 AM',
  'Medford, New York',
  'Made Fresh',
  '★ 4.5 on Google',
  'All-Day Breakfast',
  'Family Run',
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
