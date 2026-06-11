'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const INSTAGRAM_URL = 'https://www.instagram.com/joelsbagelscafe'

// Real posts from @joelsbagelscafe, self-hosted in /public/instagram so the
// images are permanent (Instagram CDN URLs are signed and expire). Each tile
// still falls back to a brand gradient if its image ever fails to load.
const instagramPosts = [
  {
    imageUrl: '/instagram/post1.jpg',
    caption:
      'The Chicken BLT — freshly breaded, crispy bacon, pressed to perfection.',
    url: 'https://www.instagram.com/p/DZYXfGAA0Wd/',
    likes: 79,
    isVideo: true,
    fallback: 'linear-gradient(135deg, #8B5E3C 0%, #C4955A 100%)',
  },
  {
    imageUrl: '/instagram/post2.jpg',
    caption:
      'The Brunson — custom Knicks Everything Bagel, bacon, egg & cheese, hash brown, chipotle.',
    url: 'https://www.instagram.com/p/DZLhV1zA9MR/',
    likes: 114,
    isVideo: true,
    fallback: 'linear-gradient(135deg, #4A5C3F 0%, #6B8C5A 100%)',
  },
  {
    imageUrl: '/instagram/post3.jpg',
    caption: 'Game 1 Fuel — The Hungry Knick on a custom Knicks bagel.',
    url: 'https://www.instagram.com/p/DZGj_L3g_wv/',
    likes: 200,
    isVideo: true,
    fallback: 'linear-gradient(135deg, #1C1410 0%, #8B5E3C 100%)',
  },
  {
    imageUrl: '/instagram/post4.jpg',
    caption: 'Knicks Bagels are officially here. What are YOU putting on yours?',
    url: 'https://www.instagram.com/p/DZDc9DGTa2c/',
    likes: 150,
    isVideo: true,
    fallback: 'linear-gradient(135deg, #C4955A 0%, #E8C49A 100%)',
  },
  {
    imageUrl: '/instagram/post5.jpg',
    caption:
      "Welcome to Joel's Bagels — fresh bagels, breakfast, lunch, coffee daily.",
    url: 'https://www.instagram.com/p/DY-lIXpz1gI/',
    likes: 212,
    isVideo: true,
    fallback: 'linear-gradient(135deg, #8B5E3C 0%, #1C1410 100%)',
  },
]

function PlayBadge() {
  return (
    <span className="instagram-play" aria-label="Video post">
      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M3 1.5 10.5 6 3 10.5z" />
      </svg>
    </span>
  )
}

function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function InstagramTile({
  post,
  index,
}: {
  post: (typeof instagramPosts)[number]
  index: number
}) {
  const [failed, setFailed] = useState(false)

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="instagram-tile"
      style={{ background: post.fallback }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
    >
      {!failed && (
        <Image
          src={post.imageUrl}
          alt={post.caption}
          fill
          unoptimized
          sizes="(max-width: 560px) 50vw, (max-width: 900px) 33vw, 200px"
          style={{ objectFit: 'cover' }}
          onError={() => setFailed(true)}
        />
      )}
      {post.isVideo && <PlayBadge />}
      <span className="instagram-likes" aria-label={`${post.likes} likes`}>
        ♥ {post.likes}
      </span>
      <span className="instagram-tile-overlay">
        <InstagramIcon />
        <span className="instagram-overlay-caption">{post.caption}</span>
        View on Instagram
      </span>
    </motion.a>
  )
}

export default function Instagram() {
  return (
    <section className="section instagram-section">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="eyebrow">From the Counter</p>
          <h2 className="section-headline">Fresh on the Feed</h2>
        </motion.div>

        <div className="instagram-grid">
          {instagramPosts.map((post, i) => (
            <InstagramTile key={post.url} post={post} index={i} />
          ))}
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-tile instagram-follow-tile"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.36, ease: EASE }}
          >
            <InstagramIcon />
            <span>Follow along</span>
            <strong>@joelsbagelscafe</strong>
          </motion.a>
        </div>

        <div className="instagram-cta-row">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Follow @joelsbagelscafe
          </a>
        </div>
      </div>
    </section>
  )
}
