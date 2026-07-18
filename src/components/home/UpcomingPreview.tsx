import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { formatDate } from "@/lib/content";
import type { UpcomingEvent } from "@/lib/types";

export function UpcomingPreview({ events }: { events: UpcomingEvent[] }) {
  const next = events.slice(0, 2);
  if (!next.length) return null;

  return (
    <section className="bg-paper-warm py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="What's next"
            title="We're already on our way."
            intro="Upcoming outreaches you can pray for, join, or help make possible."
          />
          <Reveal delay={0.2}>
            <Link
              href="/upcoming"
              className="group flex items-center gap-2 rounded-full border border-rok-200 px-5 py-3 text-sm font-semibold text-rok-800 transition-all hover:border-rok-300 hover:bg-rok-50"
            >
              All upcoming
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-8 md:grid-cols-2">
          {next.map((event) => (
            <StaggerItem key={event.id}>
              <div className="group relative overflow-hidden rounded-3xl shadow-lg shadow-rok-900/10">
                {event.banner && (
                  <Image
                    src={event.banner}
                    alt={event.title}
                    width={1600}
                    height={900}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-rok-950/90 via-rok-950/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rok-300">
                    {formatDate(event.date)} · {event.location}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 max-w-lg text-sm leading-relaxed text-rok-100/85">
                    {event.description}
                  </p>
                  {event.needsSupport && (
                    <Link
                      href="/donate"
                      className="mt-4 inline-block rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-rok-900 transition-all hover:bg-white"
                    >
                      Support this outreach
                    </Link>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
