import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Terms of Use · Joel's Bagels",
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <div className="legal-body">
      <main className="legal-page">
        <h1>Terms of Use</h1>
        <p className="legal-updated">Joel&apos;s Bagels · Medford, NY · Last updated June 2026</p>

        <p>
          This website is provided by Joel&apos;s Bagels for general information
          about our shop — menu, hours, location, catering, and ways to order.
          By using the site you agree to these simple terms.
        </p>

        <h2>Menu &amp; pricing</h2>
        <p>
          Menu items, prices, and hours are shown in good faith and can change
          at the counter without notice. Seasonal items (like the Knicks
          bagel) are available while they last. Crowd estimates are typical
          patterns from Google and are not a guarantee of wait times.
        </p>

        <h2>Ordering</h2>
        <p>
          Online ordering and payment are handled by DoorDash under DoorDash&apos;s
          own terms and policies. The order list you build on this site is a
          convenience and does not place an order by itself.
        </p>

        <h2>Content</h2>
        <p>
          Photos and text on this site belong to Joel&apos;s Bagels or are used
          with permission, and may not be reused commercially without asking
          us first. The site is provided as-is, without warranties.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Call <a href="tel:+16313079206">(631) 307-9206</a> or
          visit us at 1699 Route 112, Medford, NY 11763.
        </p>

        <p>
          <Link href="/">← Back to the bagels</Link>
        </p>
      </main>
    </div>
  )
}
