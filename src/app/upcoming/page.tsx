import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { DonateCTA } from "@/components/DonateCTA";
import { Stagger, StaggerItem } from "@/components/motion";
import { formatDate, getUpcomingEvents } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { ORG } from "@/lib/copy";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Upcoming Projects",
  description:
    "Upcoming ROKinc outreaches, mission trips, and programs — and how you can pray, join, or give.",
  path: "/upcoming",
});

export default async function UpcomingPage() {
  const events = await getUpcomingEvents();

  // Event markup so upcoming outreaches can appear as events in search.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": events.map((event) => ({
      "@type": "Event",
      name: event.title,
      description: event.description,
      startDate: event.date || undefined,
      location: event.location
        ? { "@type": "Place", name: event.location }
        : undefined,
      image: event.banner ? absoluteUrl(event.banner) : undefined,
      url: absoluteUrl("/upcoming"),
      organizer: {
        "@type": "Organization",
        name: ORG.fullName,
        url: absoluteUrl("/"),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        kicker="Upcoming Projects"
        title="The next chapter is already being written."
        intro="These outreaches are on the calendar and in our prayers. Each one becomes possible through people like you."
      />

      <section className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Stagger className="relative space-y-10" gap={0.15}>
            {/* timeline rail */}
            <div
              aria-hidden
              className="absolute bottom-6 left-[7px] top-2 hidden w-px bg-rok-200 sm:block"
            />
            {events.map((event) => (
              <StaggerItem key={event.id} className="relative sm:pl-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-9 hidden h-[15px] w-[15px] rounded-full border-[3px] border-rok-500 bg-white sm:block"
                />
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-rok-100 transition-shadow duration-500 hover:shadow-xl hover:shadow-rok-900/10">
                  {event.banner && (
                    <div className="relative">
                      <Image
                        src={event.banner}
                        alt={event.title}
                        width={1600}
                        height={900}
                        className="aspect-[16/7] w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rok-950/40 to-transparent" />
                    </div>
                  )}
                  <div className="p-7 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rok-500">
                      {formatDate(event.date)} · {event.location}
                    </p>
                    <h2 className="mt-2.5 font-display text-2xl leading-snug text-ink sm:text-3xl">
                      {event.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                      {event.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {event.needsSupport && (
                        <Link
                          href="/donate"
                          className="rounded-full bg-rok-800 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-rok-700"
                        >
                          Support this outreach
                        </Link>
                      )}
                      {event.registrationLink && (
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-rok-200 px-5 py-2.5 text-sm font-semibold text-rok-800 transition-all hover:border-rok-300 hover:bg-rok-50"
                        >
                          Register / Join
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <DonateCTA />
    </>
  );
}
