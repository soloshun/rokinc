import type { DonationMethod, Project, SiteSettings, UpcomingEvent } from "./types";

// Placeholder imagery until the ROKinc Google Drive is connected.
// Seeded picsum URLs keep the layout stable between builds.
const img = (seed: string, w = 1400, h = 1000) =>
  `https://picsum.photos/seed/rokinc-${seed}/${w}/${h}`;

// Mixed portrait / landscape / square shapes so galleries flow like a real
// photo wall (real Drive uploads will naturally vary the same way).
const SHAPES: [number, number][] = [
  [900, 1350],
  [1200, 800],
  [1000, 1000],
  [900, 1600],
  [1200, 900],
  [900, 1150],
];
const gallery = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => {
    const [w, h] = SHAPES[i % SHAPES.length];
    return img(`${prefix}-${i + 1}`, w, h);
  });

export const sampleProjects: Project[] = [
  {
    slug: "visiting-jesus-accra",
    title: "The Visiting Jesus Project — Accra",
    description:
      "Following Matthew 25:42–43 onto the streets of Accra — sharing food, water, prayer, and the love of Christ with people experiencing homelessness and those the city walks past.",
    date: "2025-12-20",
    location: "Accra, Ghana",
    coverImage: img("vj-1"),
    images: gallery("vj", 9),
    featured: true,
  },
  {
    slug: "widows-orphans-outreach-2025",
    title: "Widows & Orphans Outreach 2025",
    description:
      "An annual mission bringing clothing, educational materials, health education, medical support, and food to vulnerable widows and orphaned children — and the gospel alongside every gift.",
    date: "2025-08-14",
    location: "Kumasi, Ghana",
    coverImage: img("wo-1"),
    images: gallery("wo", 8),
    featured: true,
  },
  {
    slug: "high-school-missions-tour",
    title: "High School Missions Tour",
    description:
      "Purpose-discovery sessions, leadership development, and mentorship for students — nurturing spiritually grounded young leaders inside their own classrooms.",
    date: "2025-05-09",
    location: "Eastern Region, Ghana",
    coverImage: img("hs-1"),
    images: gallery("hs", 7),
    featured: false,
  },
  {
    slug: "hospital-prison-visits",
    title: "Hospital & Correctional Facility Visits",
    description:
      "Prayer, encouragement, and humanitarian assistance carried into hospitals, rehabilitation centers, and correctional facilities — because Jesus said, “I was sick and in prison, and you visited me.”",
    date: "2025-03-02",
    location: "Greater Accra, Ghana",
    coverImage: img("hp-1"),
    images: gallery("hp", 8),
    featured: false,
  },
];

export const sampleEvents: UpcomingEvent[] = [
  {
    id: "1",
    title: "Widows & Orphans Outreach 2026",
    description:
      "Our next annual outreach to widows and orphaned children — food, clothing, medical support, school materials, and the good news of Jesus.",
    date: "2026-08-15",
    location: "Kumasi, Ghana",
    banner: img("ev-1", 1600, 900),
    needsSupport: true,
  },
  {
    id: "2",
    title: "Visiting Jesus: Prison Ministry Day",
    description:
      "A day of worship, prayer, and practical care inside correctional facilities, answering the call of Matthew 25.",
    date: "2026-10-03",
    location: "Greater Accra, Ghana",
    banner: img("ev-2", 1600, 900),
    needsSupport: true,
  },
  {
    id: "3",
    title: "High School Missions — Purpose Week",
    description:
      "A week of purpose-discovery sessions and mentorship across partner high schools, raising the next generation of grounded leaders.",
    date: "2026-11-10",
    location: "Eastern Region, Ghana",
    banner: img("ev-3", 1600, 900),
    needsSupport: false,
  },
];

export const sampleSettings: SiteSettings = {
  ceoName: "Rosemary Ohenewaa Kwaning",
  contactEmail: "hello@rokinc.org",
  phone: "+233 00 000 0000",
  whatsapp: "+233000000000",
  instagram: "https://instagram.com/rokinc",
  facebook: "https://facebook.com/rokinc",
  youtube: "",
};

// ROKinc currently receives gifts by Mobile Money (Ghana) and an American
// bank account. Numbers below are placeholders until the CEO sends the real
// details — replace them here or in the Donations tab of the Google Sheet.
export const sampleDonationMethods: DonationMethod[] = [
  {
    method: "Mobile Money (Ghana)",
    accountName: "Rosemary Ohenewaa Kwaning Inc.",
    accountNumber: "000 000 0000",
    extra: "MTN MoMo",
    note: "Use “ROKinc + your name” as the reference so we can thank you.",
  },
  {
    method: "Bank Transfer (USA)",
    accountName: "Rosemary Ohenewaa Kwaning Inc.",
    accountNumber: "Account: 000000000000 · Routing: 000000000",
    extra: "American bank account",
    note: "Works for US transfers and international wires. Use “ROKinc + your name” as the reference.",
  },
];
