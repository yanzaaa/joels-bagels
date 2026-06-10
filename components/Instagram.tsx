'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const INSTAGRAM_URL = 'https://www.instagram.com/joelsbagelscafe'

// Real posts from @joelsbagelscafe. NOTE: Instagram CDN URLs are signed and
// expire (the `oe=` param) — each tile falls back to a brand gradient if its
// image stops loading. For a permanent fix, self-host the photos in /public
// or connect the Instagram Basic Display API.
const instagramPosts = [
  {
    imageUrl:
      'https://scontent-lga3-3.cdninstagram.com/v/t51.71878-15/720434859_1681782769637480_4282884551121188447_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2gGxUUpX_lkpbGcpXkQrAMV2IgZCak7Gii60LDdePKoaIPCb3cxDZnvfa8FJQU_iKsM&_nc_ohc=gFgh44Her4MQ7kNvwF9x0Af&_nc_gid=38-g4JiMVdTaEgNhrbfH1Q&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af81AYpiqrh0H3juPVKfJDc6go9DJD7E-vBK3zlU7HhCaA&oe=6A2EE316&_nc_sid=10d13b',
    caption:
      'The Chicken BLT — freshly breaded, crispy bacon, pressed to perfection.',
    url: 'https://www.instagram.com/p/DZYXfGAA0Wd/',
    likes: 63,
    fallback: 'linear-gradient(135deg, #8B5E3C 0%, #C4955A 100%)',
  },
  {
    imageUrl:
      'https://scontent-mia3-3.cdninstagram.com/v/t51.71878-15/715291936_2043423512952381_2017747551536953886_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-mia3-3.cdninstagram.com&_nc_cat=109&_nc_oc=Q6cZ2gG_pgL04GFtCiMzJpa3RvehbYQ9LRtIexsY82CZ5mJSdqPS9JERNVrZUzPn9lnkW8A&_nc_ohc=tE7DPTdMvJkQ7kNvwELizzr&_nc_gid=LL1PsIjht69eqDkIxY4yAg&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af8_8j3b5fd_UugNSsc4amhLLPU9St5aRd2jsta3cVLIUA&oe=6A2EF4D1&_nc_sid=10d13b',
    caption:
      'The Brunson — custom Knicks Everything Bagel, bacon, egg & cheese, hash brown, chipotle.',
    url: 'https://www.instagram.com/p/DZLhV1zA9MR/',
    likes: 113,
    fallback: 'linear-gradient(135deg, #4A5C3F 0%, #6B8C5A 100%)',
  },
  {
    imageUrl:
      'https://scontent-atl3-3.cdninstagram.com/v/t51.71878-15/714383614_1500694505115321_1692487310196340089_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-atl3-3.cdninstagram.com&_nc_cat=109&_nc_oc=Q6cZ2gFIOc2m_xccix1LpAFNs9TvyxC4kPYUwpjUkxpO1Jg68mvjG8khS6kuROHCwTaZjCs&_nc_ohc=o8e8jZRKAd0Q7kNvwERSft4&_nc_gid=Kj4JmzSRNqlb100SVvRxTQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af-33F7dvc_JIGsIxfVpVk8RzfQ9y-jHUsQPaKaTAKdLKQ&oe=6A2EE392&_nc_sid=10d13b',
    caption: 'Game 1 Fuel — The Hungry Knick on a custom Knicks bagel.',
    url: 'https://www.instagram.com/p/DZGj_L3g_wv/',
    likes: 200,
    fallback: 'linear-gradient(135deg, #1C1410 0%, #8B5E3C 100%)',
  },
  {
    imageUrl:
      'https://scontent-ord5-2.cdninstagram.com/v/t51.82787-15/710537153_981238321427042_9155665389898219393_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2gGroq66OL5nvWFyi8goVl4rBymaTbiYNbAbwFf8I-6Tk6y32akGabCc5oaMe8Z3JfU&_nc_ohc=Wo79zJEWtLsQ7kNvwEEz-YJ&_nc_gid=H8QM9RJ9PsLMz6n2gXrvMw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af-L97ft0t_QPRvDOKGZDsb9inYnq-nTPVYcesh9q89b2A&oe=6A2EF5C0&_nc_sid=10d13b',
    caption: 'Knicks Bagels are officially here. What are YOU putting on yours?',
    url: 'https://www.instagram.com/p/DZDc9DGTa2c/',
    likes: 150,
    fallback: 'linear-gradient(135deg, #C4955A 0%, #E8C49A 100%)',
  },
  {
    imageUrl:
      'https://scontent-iad3-1.cdninstagram.com/v/t51.82787-15/711695768_17903669145432709_250627872071877428_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gF0q97KddHVIfXExKI5zKXS6HHf4MDwctU2ROea_ilh7aXFemKjEySebnScrX_MqJo&_nc_ohc=MUW3jjTAPUsQ7kNvwHOsS8v&_nc_gid=NEc6yAWhTCjL7lfUhKxtJw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af9hyUCWtj7SU2KECRR9NOc9bqV5TrY5EHQE3Yi7GaowgQ&oe=6A2F0456&_nc_sid=10d13b',
    caption:
      "Welcome to Joel's Bagels — fresh bagels, breakfast, lunch, coffee daily.",
    url: 'https://www.instagram.com/p/DY-lIXpz1gI/',
    likes: 211,
    fallback: 'linear-gradient(135deg, #8B5E3C 0%, #1C1410 100%)',
  },
]

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
