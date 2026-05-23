import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://nirvanaintelix.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Nirvana Intelix — Digital products built for the MENA market",
  description:
    "Nirvana Intelix is a product studio building and operating digital products for the Middle East — from our Webziq multi-tenant platform to AI commerce, content platforms, marketplaces, community networks and Islamic technology.",
  keywords: [
    "Nirvana Intelix",
    "Webziq",
    "MENA",
    "Saudi Arabia",
    "Product studio",
    "Multi-tenant SaaS",
    "AI commerce",
    "Headless commerce",
    "Arabic SaaS",
    "BigCommerce",
    "Next.js",
  ],
  authors: [{ name: "Nirvana Intelix" }],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nirvana Intelix — Digital products for the MENA market",
    description:
      "Product studio building and operating MENA-focused digital products: Webziq platform, AI commerce, content platforms, marketplaces, communities and Islamic technology.",
    type: "website",
    url: SITE_URL,
    siteName: "Nirvana Intelix",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nirvana Intelix — Digital products built for the MENA market",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirvana Intelix — Digital products for MENA",
    description:
      "Webziq platform + 8 products in production for the Middle East market.",
    images: ["/og.png"],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nirvana Intelix",
  alternateName: "Nirvana Intelix Product Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  description:
    "Product studio building and operating digital products for the MENA market. Maker of the Webziq multi-tenant website platform.",
  founder: {
    "@type": "Person",
    name: "Ankit Bansal",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: ["SA", "IN"],
    addressLocality: "Riyadh / New Delhi",
  },
  sameAs: [
    "https://github.com/nirvana-intelix-org",
    "https://webziq.com",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <div className="noise pointer-events-none fixed inset-0 z-[1] opacity-50 mix-blend-multiply" />
        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  );
}
