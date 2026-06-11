'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'

const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

/* Scroll-scrubbed assembly: pinned full-screen stage, the BEC photo unmasks
   and scales while the three words slap on like deli stickers, then the
   price stamp lands. Progress is computed per-frame from the section's own
   bounding rect — framer's useScroll(target) cached stale offsets for this
   260vh section, freezing the chips mid-fade. */
export default function BuildScrub() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total > 0) {
        scrollYProgress.set(Math.min(1, Math.max(0, -rect.top / total)))
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [scrollYProgress])

  const clip = useTransform(scrollYProgress, [0, 0.32], [22, 0])
  const clipPath = useMotionTemplate`inset(${clip}% round 28px)`
  const photoScale = useTransform(scrollYProgress, [0, 0.32], [0.78, 1])

  const c1o = useTransform(scrollYProgress, [0.36, 0.44], [0, 1])
  const c1y = useTransform(scrollYProgress, [0.36, 0.44], [44, 0])
  const c2o = useTransform(scrollYProgress, [0.48, 0.56], [0, 1])
  const c2y = useTransform(scrollYProgress, [0.48, 0.56], [44, 0])
  const c3o = useTransform(scrollYProgress, [0.6, 0.68], [0, 1])
  const c3y = useTransform(scrollYProgress, [0.6, 0.68], [44, 0])

  const stampScale = useTransform(scrollYProgress, [0.74, 0.84], [0, 1])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1])

  return (
    <section className="build-section" ref={ref} aria-label="The Everything BEC, built">
      <div className="build-sticky">
        <div className="build-ghost" aria-hidden="true">
          Saturday
        </div>

        <motion.div className="build-header" style={{ opacity: headerOpacity }}>
          <p className="eyebrow">Scroll to Build It</p>
          <h2 className="section-headline">The Saturday Order.</h2>
        </motion.div>

        <div className="build-photo-wrap">
          <span className="build-paper" aria-hidden="true" />
          <motion.span className="build-ticket" style={{ opacity: headerOpacity }}>
            Joel&apos;s · Order №112 · Saturday 8:04 AM
          </motion.span>
          <motion.div
            className="build-photo"
            style={{ clipPath, scale: photoScale }}
          >
            <Image
              src="/photos/bec-hand.jpg"
              alt="The Everything BEC, held up to the light"
              fill
              sizes="(max-width: 900px) 86vw, 760px"
            />
          </motion.div>

          <motion.span className="build-chip build-chip-1" style={{ opacity: c1o, y: c1y }}>
            Bacon.
          </motion.span>
          <motion.span className="build-chip build-chip-2" style={{ opacity: c2o, y: c2y }}>
            Egg.
          </motion.span>
          <motion.span className="build-chip build-chip-3" style={{ opacity: c3o, y: c3y }}>
            Cheese.
          </motion.span>

          <motion.a
            className="build-stamp"
            href={DOORDASH_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ scale: stampScale }}
            whileHover={{ scale: 1.08, rotate: -6 }}
          >
            $6.50
            <br />
            order it →
          </motion.a>
        </div>
      </div>
    </section>
  )
}
