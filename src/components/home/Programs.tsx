import Image from "next/image";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { PROGRAMS } from "@/lib/copy";

const PROGRAM_IMAGES = [
  "https://picsum.photos/seed/rokinc-prog-1/1000/1250",
  "https://picsum.photos/seed/rokinc-prog-2/1000/1250",
  "https://picsum.photos/seed/rokinc-prog-3/1000/1250",
];

const PROGRAM_TAGS = [
  ["Prisons", "Hospitals", "Rehab centers", "Streets", "Schools"],
  ["Widows", "Orphans", "Food & clothing", "Medical support", "Discipleship"],
  ["Mentorship", "Leadership", "Purpose discovery", "Education"],
];

export function Programs() {
  return (
    <section className="bg-paper-warm py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="What we do"
          title="Three ways we answer the call."
          intro="Each program is a doorway — into a prison, a village, a classroom — where the love of Christ walks in with practical help."
        />

        <div className="mt-16 space-y-20 sm:space-y-28">
          {PROGRAMS.map((program, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={program.slug}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  flipped ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal className="relative">
                  <div
                    className={`overflow-hidden rounded-3xl shadow-xl shadow-rok-900/10 ${
                      flipped ? "rotate-[1.5deg]" : "rotate-[-1.5deg]"
                    }`}
                  >
                    <Image
                      src={PROGRAM_IMAGES[i]}
                      alt={program.title}
                      width={1000}
                      height={1250}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:aspect-[5/5]"
                    />
                  </div>
                  <span
                    aria-hidden
                    className={`absolute -top-6 font-display text-[7rem] leading-none text-rok-200 select-none ${
                      flipped ? "-right-4" : "-left-4"
                    }`}
                  >
                    {program.kicker}
                  </span>
                </Reveal>

                <Reveal delay={0.15}>
                  {program.verse && (
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rok-500">
                      Inspired by {program.verse}
                    </p>
                  )}
                  <h3 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">
                    {program.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.85] text-ink-soft sm:text-base">
                    {program.body}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {PROGRAM_TAGS[i].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-rok-700 ring-1 ring-rok-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
