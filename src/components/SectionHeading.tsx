import { Reveal } from "./motion";

export function SectionHeading({
  kicker,
  title,
  intro,
  dark = false,
  align = "left",
}: {
  kicker: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.25em] ${
          dark ? "text-rok-300" : "text-rok-600"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-[2.75rem] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-rok-200/80" : "text-ink-soft"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
