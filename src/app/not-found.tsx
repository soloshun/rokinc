import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center bg-gradient-to-b from-rok-50 to-paper px-5 pt-24 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rok-500">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          This page has wandered off.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          But no one wanders farther than love can reach. Let&apos;s get you home.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-rok-800 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-rok-700"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
