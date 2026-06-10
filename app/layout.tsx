import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/lib/lenis";
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

export const metadata: Metadata = {
  title: "Joel's Bagels · Medford, NY · Long Island's Favorite Bagel Shop",
  description:
    "Fresh bagels baked daily in Medford, Long Island. Famous for olive cream cheese and all-day breakfast sandwiches. 4.5 stars · 280+ reviews. Open 6 AM daily.",
  keywords: [
    "bagel shop Medford NY",
    "best bagels Long Island",
    "Joel's Bagels",
    "bagels Medford Avenue",
    "breakfast sandwiches Suffolk County",
    "bagels near me Medford",
    "olive cream cheese bagel",
  ],
  openGraph: {
    title: "Joel's Bagels · Medford, NY",
    description: "Long Island's favorite bagel shop. Fresh-baked daily.",
    url: "https://joelsbagels.com",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1410",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Joel's Bagels",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1699 Medford Ave",
    addressLocality: "Medford",
    addressRegion: "NY",
    postalCode: "11763",
    addressCountry: "US",
  },
  telephone: "+16313079206",
  url: "https://joelsbagels.com",
  priceRange: "$",
  servesCuisine: "American",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "06:00",
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
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
