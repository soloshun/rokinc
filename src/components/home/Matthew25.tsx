"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MATTHEW_LINES } from "@/lib/copy";
import { Reveal } from "@/components/motion";

/**
 * The heart of the site's story: Jesus' words from Matthew 25 appear one by
 * one, the way ROKinc answers them — one person at a time.
 */
export function Matthew25() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-rok-950 py-24 sm:py-32">
      <div className="grain absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-rok-700/25 blur-[140px]"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rok-400">
            Why we go — Matthew 25
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-white sm:text-4xl">
            Jesus told us exactly where to find Him.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-6">
          {MATTHEW_LINES.map((line, i) => (
            <motion.p
              key={line.word}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-xl italic leading-relaxed text-rok-200/90 sm:text-2xl"
            >
              “I was{" "}
              <span className="not-italic font-semibold text-white">
                {line.word}
              </span>
              {line.text.split(",")[1]?.replace(/\.$/, "") ?? ""}.”
            </motion.p>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16">
          <p className="mx-auto max-w-xl text-base leading-relaxed text-rok-300">
            So we go — to the correctional facility, the hospital ward, the
            street corner, the classroom. Every visit is a visit to Jesus
            Himself.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
