import {
  sampleDonationMethods,
  sampleEvents,
  sampleProjects,
  sampleSettings,
} from "./sample-data";
import {
  readProjectImageFolders,
  readSheet,
  sheetsConfigured,
} from "./google";
import type { DonationMethod, Project, SiteSettings, UpcomingEvent } from "./types";

const truthy = (v: string) => /^(true|yes|1)$/i.test(v.trim());

export async function getProjects(): Promise<Project[]> {
  if (!sheetsConfigured()) return sampleProjects;
  const [rows, imageFolders] = await Promise.all([
    readSheet("Projects"),
    readProjectImageFolders(),
  ]);
  const projects = rows
    .filter((r) => r.slug && r.title)
    .map((r) => {
      const images = imageFolders.get(r.folder_name || r.slug) ?? [];
      return {
        slug: r.slug.trim(),
        title: r.title,
        description: r.description ?? "",
        date: r.date ?? "",
        location: r.location ?? "",
        coverImage: images[0] ?? r.cover_image ?? "",
        images,
        featured: truthy(r.featured ?? ""),
      };
    });
  return projects.length ? projects : sampleProjects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  if (!sheetsConfigured()) return sampleEvents;
  const rows = await readSheet("Events");
  const events = rows
    .filter((r) => r.title)
    .map((r, i) => ({
      id: r.id || String(i + 1),
      title: r.title,
      description: r.description ?? "",
      date: r.date ?? "",
      location: r.location ?? "",
      banner: r.banner || undefined,
      registrationLink: r.registration_link || undefined,
      needsSupport: truthy(r.needs_support ?? "true"),
    }));
  return events.length ? events : sampleEvents;
}

export async function getSettings(): Promise<SiteSettings> {
  if (!sheetsConfigured()) return sampleSettings;
  const rows = await readSheet("Settings");
  const kv = Object.fromEntries(rows.map((r) => [r.key?.trim(), r.value ?? ""]));
  return {
    ceoName: kv.ceo_name || sampleSettings.ceoName,
    contactEmail: kv.contact_email || sampleSettings.contactEmail,
    phone: kv.phone || sampleSettings.phone,
    whatsapp: kv.whatsapp || sampleSettings.whatsapp,
    instagram: kv.instagram || sampleSettings.instagram,
    facebook: kv.facebook || sampleSettings.facebook,
    youtube: kv.youtube || sampleSettings.youtube,
  };
}

export async function getDonationMethods(): Promise<DonationMethod[]> {
  if (!sheetsConfigured()) return sampleDonationMethods;
  const rows = await readSheet("Donations");
  const methods = rows
    .filter((r) => r.method)
    .map((r) => ({
      method: r.method,
      accountName: r.account_name ?? "",
      accountNumber: r.account_number ?? "",
      extra: r.extra || undefined,
      note: r.note || undefined,
    }));
  return methods.length ? methods : sampleDonationMethods;
}

export function formatDate(date: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
