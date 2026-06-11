'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from '@/components/Reveal'

export default function Story() {
  const ref = useRef<HTMLDivElement>(null)
  // Counter-drift: the two photos move at different speeds while the section
  // scrolls through the viewport — depth without a single scroll listener.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yMain = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yInset = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section className="section story-section" id="story" ref={ref}>
      <div className="container">
        <div className="story-grid">
          <div className="story-photos">
            <motion.div className="story-photo story-photo-main" style={{ y: yMain }}>
              <Image
                src="/photos/interior-counter.jpg"
                alt="The counter and deli cases inside Joel's Bagels"
                fill
                sizes="(max-width: 900px) 78vw, 40vw"
              />
            </motion.div>
            <motion.div className="story-photo story-photo-inset" style={{ y: yInset }}>
              <Image
                src="/photos/interior-line.jpg"
                alt="Regulars ordering at the counter on a weekday morning"
                fill
                sizes="(max-width: 900px) 52vw, 26vw"
              />
            </motion.div>
            <span className="story-sticker" aria-hidden="true">
              Est.
              <br />
              Day One
            </span>
            <span className="story-receipt" aria-hidden="true">
              Joel&apos;s Bagels · Medford NY · Reg 2 · 8:04 AM
            </span>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow">The Counter</p>
              <h2 className="section-headline">
                Walk In Like <em>a Regular.</em>
              </h2>
              <blockquote className="story-quote">
                “He makes you feel like you are the most important person once
                you set foot in his establishment.”
              </blockquote>
              <p className="story-quote-attr">
                — Jaime D. · Google review, 5 stars
              </p>
              <p className="story-body">
                An Ecuadorian family recipe, two generations deep, rolled and
                baked behind this counter every morning since day one. The crew
                knows the regulars by their order — and on Knicks game days,
                the blue-and-orange bagels go before nine.
              </p>
              <span className="story-motto">
                Fast food isn’t good. Good food isn’t fast.
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
