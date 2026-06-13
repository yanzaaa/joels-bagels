import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/* Branded link-preview card (iMessage / WhatsApp / Slack / X).
   Built at build time as a static asset — no request-time data, so it's
   baked once and cached. The shop's iconic Knicks Everything Bagel sits
   beside the wordmark, turning a raw vertical phone photo into a wide,
   intentional 1.91:1 share card. */

export const alt =
  "Joel's Bagels — Long Island's favorite bagel, fresh every morning in Medford, NY. Home of the Knicks Everything Bagel."
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const asset = (p: string) => join(process.cwd(), p)

  const [playfair, grotesk, dmSans, bagel] = await Promise.all([
    readFile(asset('assets/og/PlayfairDisplay-ExtraBold.ttf')),
    readFile(asset('assets/og/SpaceGrotesk-Medium.ttf')),
    readFile(asset('assets/og/DMSans-Medium.ttf')),
    readFile(asset('assets/og/knicks-bagel.jpg'), 'base64'),
  ])
  const bagelSrc = `data:image/jpeg;base64,${bagel}`

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          fontFamily: 'DM Sans',
        }}
      >
        {/* Brand panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 726,
            height: '100%',
            padding: '0 78px',
            backgroundImage:
              'linear-gradient(135deg, #FBF4E4 0%, #F3E8CF 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Space Grotesk',
              fontSize: 23,
              letterSpacing: 4,
              color: '#A06A38',
              marginBottom: 26,
            }}
          >
            MEDFORD, NY · OPEN DAILY · 6 AM
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Playfair',
              fontSize: 108,
              lineHeight: 0.92,
              letterSpacing: -2,
              color: '#241812',
            }}
          >
            <span>Joel&apos;s</span>
            <span>Bagels.</span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 30,
              lineHeight: 1.3,
              color: '#5A4632',
              marginTop: 28,
              maxWidth: 520,
            }}
          >
            Long Island&apos;s favorite bagel — homemade fresh every single
            morning.
          </div>

          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              fontFamily: 'Space Grotesk',
              fontSize: 20,
              letterSpacing: 1.5,
              color: '#FBEFD9',
              background: '#C73309',
              padding: '13px 22px',
              borderRadius: 999,
              marginTop: 38,
            }}
          >
            HOME OF THE KNICKS EVERYTHING BAGEL
          </div>
        </div>

        {/* Photo panel — the iconic Knicks cross-section */}
        <div
          style={{
            display: 'flex',
            position: 'relative',
            width: 474,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <img
            src={bagelSrc}
            width={474}
            height={630}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Soft seam so the photo melts into the cream instead of a hard cut */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 0,
              left: 0,
              width: 130,
              height: '100%',
              backgroundImage:
                'linear-gradient(90deg, #F3E8CF 0%, rgba(243,232,207,0) 100%)',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Playfair', data: playfair, style: 'normal', weight: 800 },
        { name: 'Space Grotesk', data: grotesk, style: 'normal', weight: 500 },
        { name: 'DM Sans', data: dmSans, style: 'normal', weight: 500 },
      ],
    }
  )
}
