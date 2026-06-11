'use client'
import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion'

const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

/* The Saturday Order, as a true scroll-scrubbed assembly: five real
   ingredient layers (generated + matted, swappable for studio shots later)
   drop onto the stack one by one while spec chips stamp in beside them.
   Progress is computed per-frame from the section's bounding rect — see
   the stale-offset note below. */

type LayerCfg = {
  src: string
  width: string
  yFrom: number
  yTo: number
  range: [number, number]
  num: string
  label: string
  note: string
}

const LAYERS: LayerCfg[] = [
  {
    src: '/photos/bec/bottom.webp',
    width: '100%',
    yFrom: 340,
    yTo: 0,
    range: [0.1, 0.24],
    num: '01',
    label: 'Everything bagel',
    note: 'toasted',
  },
  {
    src: '/photos/bec/egg.webp',
    width: '72%',
    yFrom: -380,
    yTo: -30,
    range: [0.26, 0.4],
    num: '02',
    label: 'Two eggs',
    note: 'folded',
  },
  {
    src: '/photos/bec/cheese.webp',
    width: '64%',
    yFrom: -400,
    yTo: -52,
    range: [0.42, 0.54],
    num: '03',
    label: 'American',
    note: 'melted',
  },
  {
    src: '/photos/bec/bacon.webp',
    width: '76%',
    yFrom: -420,
    yTo: -76,
    range: [0.56, 0.68],
    num: '04',
    label: 'Bacon',
    note: 'crisp',
  },
  {
    src: '/photos/bec/top.webp',
    width: '94%',
    yFrom: -460,
    yTo: -130,
    range: [0.7, 0.84],
    num: '05',
    label: 'The crown',
    note: 'hot from the oven',
  },
]

function Layer({
  progress,
  cfg,
  index,
}: {
  progress: MotionValue<number>
  cfg: LayerCfg
  index: number
}) {
  const y = useTransform(progress, cfg.range, [cfg.yFrom, cfg.yTo])
  const opacity = useTransform(
    progress,
    [cfg.range[0], cfg.range[0] + 0.05],
    [0, 1]
  )
  const rotate = useTransform(progress, cfg.range, [index % 2 ? -8 : 8, 0])

  return (
    <motion.div
      className="build-layer"
      style={{
        y,
        opacity,
        rotate,
        z: index * 24,
        width: cfg.width,
        zIndex: index + 1,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cfg.src} alt="" loading="lazy" />
    </motion.div>
  )
}

function SpecChip({
  progress,
  cfg,
}: {
  progress: MotionValue<number>
  cfg: LayerCfg
}) {
  const opacity = useTransform(
    progress,
    [cfg.range[0] + 0.02, cfg.range[0] + 0.08],
    [0, 1]
  )
  const x = useTransform(
    progress,
    [cfg.range[0] + 0.02, cfg.range[0] + 0.08],
    [-26, 0]
  )

  return (
    <motion.span className="build-spec-chip" style={{ opacity, x }}>
      <em>{cfg.num}</em>
      {cfg.label} <em>· {cfg.note}</em>
    </motion.span>
  )
}

export default function BuildScrub() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollYProgress = useMotionValue(0)

  // framer's useScroll(target) caches stale offsets on this 260vh section,
  // freezing the scrub — so progress comes from the live bounding rect.
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

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const paperOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1])
  const stampScale = useTransform(scrollYProgress, [0.86, 0.94], [0, 1])

  // Act two: the layered blueprint resolves into the real thing — the
  // assembly fades back while an actual flat-top shot scales in. Appetite
  // comes from the real photo; the layers earn their keep as the diagram.
  const layersOpacity = useTransform(scrollYProgress, [0.62, 0.72], [1, 0])
  const resultOpacity = useTransform(scrollYProgress, [0.66, 0.78], [0, 1])
  const resultScale = useTransform(scrollYProgress, [0.66, 0.82], [0.82, 1])
  const resultY = useTransform(scrollYProgress, [0.66, 0.82], [44, 0])

  // Camera push: the whole stack tips toward you and settles as it builds,
  // with per-layer translateZ giving real parallax between ingredients.
  const stageRotX = useTransform(scrollYProgress, [0, 0.85], [16, 4])
  const stageScale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1])
  const shadowScaleX = useTransform(scrollYProgress, [0.1, 0.84], [0.5, 1])
  const shadowOpacity = useTransform(scrollYProgress, [0.06, 0.2], [0, 0.55])

  return (
    <section className="build-section" ref={ref} aria-label="The Everything BEC, built layer by layer">
      <div className="build-sticky">
        <div className="build-ghost" aria-hidden="true">
          Saturday
        </div>

        <motion.div className="build-header" style={{ opacity: headerOpacity }}>
          <p className="eyebrow">Scroll to Build It</p>
          <h2 className="section-headline">The Saturday Order.</h2>
        </motion.div>

        <div className="build-spec" aria-hidden="true">
          {LAYERS.map((cfg) => (
            <SpecChip key={cfg.num} progress={scrollYProgress} cfg={cfg} />
          ))}
        </div>

        <motion.div
          className="build-stack"
          style={{
            rotateX: stageRotX,
            scale: stageScale,
            transformPerspective: 1100,
          }}
        >
          <motion.span
            className="build-shadow"
            aria-hidden="true"
            style={{ scaleX: shadowScaleX, opacity: shadowOpacity }}
          />
          <motion.span
            className="build-paper"
            aria-hidden="true"
            style={{ opacity: paperOpacity }}
          />
          <motion.span className="build-ticket" style={{ opacity: headerOpacity }}>
            Joel&apos;s · Order №112 · Saturday 8:04 AM
          </motion.span>

          <motion.div style={{ opacity: layersOpacity }}>
            {LAYERS.map((cfg, i) => (
              <Layer key={cfg.src} progress={scrollYProgress} cfg={cfg} index={i} />
            ))}
          </motion.div>

          <motion.div
            className="build-result"
            style={{ opacity: resultOpacity, scale: resultScale, y: resultY }}
          >
            <span className="build-steam s1" aria-hidden="true" />
            <span className="build-steam s2" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/sausage-egg.jpg"
              alt="The Saturday Order, hot off the flat-top"
              loading="lazy"
            />
            <span className="build-result-caption">
              Hot off the flat-top — every Saturday since day one
            </span>
          </motion.div>

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
        </motion.div>
      </div>
    </section>
  )
}
