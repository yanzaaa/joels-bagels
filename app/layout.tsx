import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/lib/lenis";
import Cursor from "@/components/Cursor";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const SITE_URL = "https://joels-bagels.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Joel's Bagels | Fresh Bagels & Breakfast · Medford, NY",
  description:
    "Long Island's favorite bagel shop. Fresh bagels, BECs, and the Knicks Everything Bagel in Medford, NY. Open daily at 6 AM.",
  keywords: [
    "bagels Medford NY",
    "bagel shop Medford NY",
    "breakfast Medford New York",
    "best bagels Long Island",
    "bagel shop Suffolk County",
    "bacon egg cheese bagel near me",
    "Joel's Bagels",
    "olive cream cheese bagel",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Joel's Bagels · Medford, NY",
    description:
      "Long Island's favorite bagel shop. Fresh-baked daily — home of the Knicks Everything Bagel.",
    url: "/",
    siteName: "Joel's Bagels",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/instagram/post4.jpg",
        width: 640,
        height: 1136,
        alt: "The Knicks Everything Bagel at Joel's Bagels, Medford NY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel's Bagels | Fresh Bagels & Breakfast · Medford, NY",
    description:
      "Long Island's favorite bagel shop. Open daily at 6 AM — home of the Knicks Everything Bagel.",
    images: ["/instagram/post4.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1C1410",
};

const schema = {
  "@context": "https://schema.org",
  // Bakery + Restaurant both subtype LocalBusiness; declaring both lets
  // Google surface the listing for "bagel shop" and "breakfast restaurant".
  "@type": ["Bakery", "Restaurant"],
  name: "Joel's Bagels",
  image: [`${SITE_URL}/instagram/post4.jpg`, `${SITE_URL}/photos/food1.jpg`],
  address: {
    "@type": "PostalAddress",
    streetAddress: "1699 Route 112",
    addressLocality: "Medford",
    addressRegion: "NY",
    postalCode: "11763",
    addressCountry: "US",
  },
  telephone: "+16313079206",
  url: SITE_URL,
  menu: `${SITE_URL}/#menu`,
  acceptsReservations: false,
  sameAs: [
    "https://www.instagram.com/joelsbagelscafe",
    "https://www.doordash.com/store/1144158",
  ],
  priceRange: "$",
  servesCuisine: ["Bagels", "Breakfast", "Deli", "Coffee"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "06:00",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "07:00",
      closes: "14:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "280",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions inject attributes on
          html/body that differ from the server-rendered markup */}
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
