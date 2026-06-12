const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray lockfile in the home directory makes Turbopack mis-infer the
  // workspace root; pin it to this project explicitly.
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Allow only the Google Maps embed to frame anything; the site
          // itself must never be framed (clickjacking).
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
