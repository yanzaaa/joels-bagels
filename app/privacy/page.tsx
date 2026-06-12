import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Privacy Policy · Joel's Bagels",
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <div className="legal-body">
      <main className="legal-page">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Joel&apos;s Bagels · Medford, NY · Last updated June 2026</p>

        <p>
          Joel&apos;s Bagels (&quot;we&quot;) operates this website to share our menu, hours,
          location, and ways to order. We keep data collection to the minimum
          needed to run the site.
        </p>

        <h2>What we collect</h2>
        <p>
          If you join our email list, your email address is stored with our
          email provider (Klaviyo) and used only to send Joel&apos;s Bagels updates
          and specials. You can unsubscribe at any time using the link in any
          email. If you submit a catering inquiry, the details you enter
          (name, phone, event info) are delivered to us through our form
          provider (Formspree) so we can call you back.
        </p>

        <h2>What we don&apos;t do</h2>
        <p>
          We don&apos;t sell your information, run third-party ad trackers, or
          collect payment details on this site. Ordering and payment happen on
          DoorDash, which has its own privacy policy. The embedded Google Map
          is provided by Google and subject to Google&apos;s terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Call us at <a href="tel:+16313079206">(631) 307-9206</a>{' '}
          or stop by 1699 Route 112, Medford, NY 11763.
        </p>

        <p>
          <Link href="/">← Back to the bagels</Link>
        </p>
      </main>
    </div>
  )
}
