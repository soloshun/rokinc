export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coverImage: string;
  images: string[];
  featured: boolean;
};

export type UpcomingEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  banner?: string;
  registrationLink?: string;
  needsSupport: boolean;
};

export type SiteSettings = {
  ceoName: string;
  contactEmail: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  youtube: string;
};

export type DonationMethod = {
  method: string;
  accountName: string;
  accountNumber: string;
  extra?: string;
  note?: string;
};
