import Link from "next/link";
import { Reveal, WordReveal } from "./motion";

export function DonateCTA() {
  return (
    <section className="relative overflow-hidden bg-rok-900 py-24 sm:py-28">
      <div className="grain absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-rok-600/30 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-[20rem] w-[20rem] rounded-full bg-rok-700/40 blur-[100px]"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="font-display text-3xl leading-tight text-white sm:text-5xl">
          <WordReveal text="Someone is waiting on the other side of your generosity." />
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-rok-200/85 sm:text-lg">
            A meal. A school uniform. A hospital visit. A Bible in a young
            hand. Your gift becomes the love of Christ, delivered in person.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/donate"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-rok-900 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              Give Today
            </Link>
            <Link
              href="/upcoming"
              className="rounded-full border border-rok-500/60 px-8 py-4 text-sm font-semibold text-rok-100 transition-all hover:border-rok-300 hover:text-white"
            >
              See what&apos;s coming
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
