/**
 * Central SEO config. After deploying, set NEXT_PUBLIC_SITE_URL on Vercel to
 * the real domain (e.g. https://rokinc.org) so canonical URLs, the sitemap,
 * and social cards all point to the right place.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rokinc.vercel.app";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

type PageSeo = {
  title: string;
  description: string;
  /** Route path starting with "/", e.g. "/donate". */
  path: string;
  /** Social-card image; defaults to the site-wide card. */
  image?: string;
};

/**
 * Full per-page metadata: canonical + Open Graph + Twitter card. Next.js does
 * not deep-merge `openGraph` with the root layout's, so without this each
 * page's shared links would show the homepage title/description.
 */
export function pageMetadata({ title, description, path, image }: PageSeo) {
  const img = image ?? "/og.png";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "ROKinc",
      type: "website" as const,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [img],
    },
  };
}

export const SEO_KEYWORDS = [
  "ROKinc",
  "Rosemary Ohenewaa Kwaning Inc",
  "Christian nonprofit",
  "Christian NGO Ghana",
  "charity Ghana",
  "widows and orphans outreach",
  "prison ministry Ghana",
  "hospital outreach",
  "high school missions",
  "Visiting Jesus Project",
  "Matthew 25",
  "donate Ghana charity",
  "gospel outreach",
  "nonprofit Accra",
  "nonprofit Kumasi",
];
