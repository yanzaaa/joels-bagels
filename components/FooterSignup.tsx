'use client'
import { useState } from 'react'

// Klaviyo client-API subscribe: the company id is the account's public site
// key (safe to expose), the list is double opt-in, so success = confirmation
// email sent, not yet subscribed.
const KLAVIYO_COMPANY_ID = 'XuJTRX'
const KLAVIYO_LIST_ID = 'YsSdUw'

type Status = 'idle' | 'sending' | 'ok' | 'err'

export default function FooterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function subscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'sending') return
    setStatus('sending')

    try {
      const res = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            revision: '2024-10-15',
          },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                profile: {
                  data: {
                    type: 'profile',
                    attributes: {
                      email,
                      properties: { source: 'joels-bagels-footer' },
                    },
                  },
                },
              },
              relationships: {
                list: { data: { type: 'list', id: KLAVIYO_LIST_ID } },
              },
            },
          }),
        }
      )
      if (!res.ok) throw new Error(`Klaviyo responded ${res.status}`)
      setStatus('ok')
      setEmail('')
    } catch {
      setStatus('err')
    }
  }

  return (
    <form className="footer-signup" onSubmit={subscribe}>
      <p className="footer-signup-label">
        Get daily specials + the Knicks bagel drop before anyone else.
      </p>
      <div className="footer-signup-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          autoComplete="email"
        />
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Joining…' : 'Join'}
        </button>
      </div>
      {status === 'ok' && (
        <p className="footer-signup-msg ok" role="status">
          Almost in — check your inbox to confirm.
        </p>
      )}
      {status === 'err' && (
        <p className="footer-signup-msg err" role="status">
          That didn&apos;t go through. Try again, or DM @joelsbagelscafe.
        </p>
      )}
    </form>
  )
}
