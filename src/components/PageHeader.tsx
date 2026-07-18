import { Reveal, WordReveal } from "./motion";

export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rok-50 to-paper pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[26rem] w-[26rem] rounded-full bg-rok-200/40 blur-[110px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rok-600">
            {kicker}
          </p>
        </Reveal>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] text-ink sm:text-5xl md:text-6xl">
          <WordReveal text={title} delay={0.15} />
        </h1>
        {intro && (
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
