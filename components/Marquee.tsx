const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

type Item = { text: string; tone?: 'knicks' | 'cta'; href?: string }

const items: Item[] = [
  { text: 'Fresh Bagels Daily' },
  { text: 'Home of the Knicks Bagel', tone: 'knicks' },
  { text: 'First Batch 4:30 AM' },
  { text: 'Order on DoorDash', tone: 'cta', href: DOORDASH_URL },
  { text: 'Olive Cream Cheese' },
  { text: 'Route 112 · Medford' },
  { text: 'BEC, Hot All Day' },
  { text: '4.5★ · 280 Reviews' },
]

function Tick({ item }: { item: Item }) {
  const cls = `ticker-item${item.tone ? ` ticker-${item.tone}` : ''}`
  const inner = (
    <>
      <span className="ticker-dot" aria-hidden="true" />
      {item.text}
    </>
  )
  if (item.href) {
    return (
      <a className={cls} href={item.href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return <span className={cls}>{inner}</span>
}

export default function Marquee() {
  return (
    <div className="ticker">
      <div className="ticker-glow" aria-hidden="true" />
      <div className="marquee-track">
        {/* Track is duplicated for a seamless -50% translate loop */}
        {[0, 1].map((dup) => (
          <div key={dup} style={{ display: 'flex' }} aria-hidden={dup === 1}>
            {items.map((item) => (
              <Tick key={item.text} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
