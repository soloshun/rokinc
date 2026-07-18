import { Reveal } from "@/components/motion";
import { MISSION_STATEMENT } from "@/lib/copy";

export function Mission() {
  return (
    <section className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rok-600">
            Our Mission
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mt-8 border-l-2 border-rok-300 pl-6 sm:pl-10">
            <p className="font-display text-xl leading-[1.6] text-ink sm:text-2xl sm:leading-[1.65]">
              {MISSION_STATEMENT}
            </p>
          </blockquote>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap gap-3 pl-6 sm:pl-10">
            {["Proclaiming the gospel", "Compassionate assistance", "Equipping young people"].map(
              (pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-rok-200 bg-rok-50 px-4 py-2 text-sm font-medium text-rok-800"
                >
                  {pill}
                </span>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
