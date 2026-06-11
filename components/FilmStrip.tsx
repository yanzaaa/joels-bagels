import Image from 'next/image'
import Reveal from '@/components/Reveal'

// Real photos — Joel's Google Maps gallery + Instagram stills, self-hosted.
const frames = [
  { src: '/photos/hero-bagel.jpg', caption: 'Sesame, schmeared' },
  { src: '/photos/bec-hand.jpg', caption: 'The Everything BEC' },
  { src: '/photos/melt.jpg', caption: 'Still warm' },
  { src: '/photos/deli-club.jpg', caption: 'Stacked proper' },
  { src: '/photos/french-toast.jpg', caption: 'French toast, Sunday style' },
  { src: '/photos/sausage-egg.jpg', caption: 'Sausage, egg & cheese' },
  { src: '/photos/bagel-racks.jpg', caption: 'This morning’s batch' },
  { src: '/photos/everything-bagel.jpg', caption: 'Everything, toasted' },
  { src: '/instagram/post4.jpg', caption: 'The Knicks bagel 💙🧡' },
  { src: '/photos/omelette.jpg', caption: 'Western, no shortcuts' },
]

// Second row drifts the opposite way at a different speed — two layers of
// motion read as a wall, not a widget.
const framesB = [
  { src: '/photos/chicken-cutlet.jpg', caption: 'Cutlet, pressed hot' },
  { src: '/photos/platter.jpg', caption: 'The full spread' },
  { src: '/photos/deli-club.jpg', caption: 'Triple decker' },
  { src: '/instagram/post2.jpg', caption: 'The Brunson 🏀' },
  { src: '/photos/interior-counter.jpg', caption: 'The counter' },
  { src: '/photos/storefront.jpg', caption: 'Route 112' },
  { src: '/instagram/post5.jpg', caption: 'Behind the counter' },
  { src: '/photos/interior-line.jpg', caption: '8 AM regulars' },
]

function Track({
  list,
  reverse = false,
}: {
  list: typeof frames
  reverse?: boolean
}) {
  return (
    <div className={`filmstrip-track ${reverse ? 'reverse' : ''}`}>
      {[0, 1].map((dup) => (
        <div key={dup} style={{ display: 'flex', gap: 28 }} aria-hidden={dup === 1}>
          {list.map((frame) => (
            <figure key={`${dup}-${frame.src}`} className="filmstrip-frame">
              <div className="filmstrip-photo">
                <Image
                  src={frame.src}
                  alt={frame.caption}
                  fill
                  sizes="250px"
                  quality={70}
                />
              </div>
              <figcaption className="filmstrip-caption">
                {frame.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function FilmStrip() {
  return (
    <section className="filmstrip-section" aria-label="Photos from the counter">
      <Reveal className="filmstrip-header">
        <p className="eyebrow">Straight From the Case</p>
        <h2 className="section-headline">Scroll Past This. We Dare You.</h2>
      </Reveal>

      {/* Tracks are duplicated for a seamless -50% drift loop; hover pauses. */}
      <Track list={frames} />
      <Track list={framesB} reverse />
    </section>
  )
}
