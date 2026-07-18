import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MISSION_STATEMENT, ORG } from "@/lib/copy";
import { SEO_KEYWORDS, SITE_URL } from "@/lib/seo";
import { getSettings } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const viewport: Viewport = {
  themeColor: "#7c2159",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${ORG.name} — ${ORG.tagline}`,
    template: `%s — ${ORG.name}`,
  },
  description: MISSION_STATEMENT,
  keywords: SEO_KEYWORDS,
  applicationName: ORG.name,
  authors: [{ name: ORG.fullName }],
  creator: ORG.fullName,
  category: "Nonprofit",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: ORG.name,
    title: `${ORG.name} — ${ORG.tagline}`,
    description: MISSION_STATEMENT,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${ORG.name} — ${ORG.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${ORG.name} — ${ORG.tagline}`,
    description: ORG.tagline,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  // Schema.org NGO markup — helps Google show ROKinc as an organization
  // (logo, socials, contact) in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: ORG.fullName,
    alternateName: ORG.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    image: `${SITE_URL}/og.png`,
    slogan: ORG.tagline,
    description: MISSION_STATEMENT,
    email: settings.contactEmail,
    telephone: settings.phone,
    areaServed: ["Ghana", "United States"],
    nonprofitStatus: "Nonprofit",
    keywords: SEO_KEYWORDS.join(", "),
    sameAs: [settings.instagram, settings.facebook, settings.youtube].filter(
      Boolean
    ),
    potentialAction: {
      "@type": "DonateAction",
      target: `${SITE_URL}/donate`,
      name: "Donate to ROKinc",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
