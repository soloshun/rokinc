"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { WordReveal } from "@/components/motion";
import { ORG } from "@/lib/copy";

export function Hero({ images }: { images: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [imgA, imgB, imgC] = images;
  const cardIn = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-rok-50 via-paper to-paper"
    >
      {/* soft plum glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-15%] h-[36rem] w-[36rem] rounded-full bg-rok-200/50 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-rok-100/70 blur-[100px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <motion.div style={{ opacity: fade }}>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-rok-600 sm:text-sm"
          >
            {ORG.fullName}
          </motion.p>

          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.08] text-ink sm:text-6xl lg:text-[4.2rem]">
            <WordReveal
              text="Creating change in humanity through the love of Christ."
              delay={0.25}
              highlight={["love", "Christ."]}
            />
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            We carry the gospel — and food, clothing, medicine, and hope — to
            widows, orphans, the sick, the imprisoned, and the young people of
            Ghana and beyond.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/donate"
              className="rounded-full bg-rok-800 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rok-800/20 transition-all hover:-translate-y-0.5 hover:bg-rok-700 hover:shadow-xl hover:shadow-rok-800/25 active:translate-y-0"
            >
              Give Today
            </Link>
            <Link
              href="/projects"
              className="group flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-rok-800 transition-colors hover:text-rok-600"
            >
              See our work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* floating photo stack */}
        <div className="relative mx-auto hidden h-[30rem] w-full max-w-md sm:block lg:h-[34rem]">
          <motion.div
            {...cardIn(0.6)}
            style={{ y: ySlow }}
            className="absolute left-0 top-6 w-[62%] rotate-[-4deg] overflow-hidden rounded-2xl shadow-2xl shadow-rok-900/20"
          >
            <Image
              src={imgA}
              alt="ROKinc outreach"
              width={560}
              height={700}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          <motion.div
            {...cardIn(0.85)}
            style={{ y: yFast }}
            className="absolute right-0 top-0 w-[48%] rotate-[5deg] overflow-hidden rounded-2xl shadow-xl shadow-rok-900/15"
          >
            <Image
              src={imgB}
              alt="Children at a ROKinc outreach"
              width={440}
              height={550}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          <motion.div
            {...cardIn(1.1)}
            style={{ y: ySlow }}
            className="absolute bottom-0 right-[10%] w-[54%] rotate-[-2deg] overflow-hidden rounded-2xl shadow-xl shadow-rok-900/15"
          >
            <Image
              src={imgC}
              alt="Sharing supplies in the community"
              width={480}
              height={380}
              className="aspect-[5/4] w-full object-cover"
            />
          </motion.div>

          {/* verse chip */}
          <motion.div
            {...cardIn(1.35)}
            className="absolute -left-2 bottom-10 rounded-2xl border border-rok-100 bg-white/90 px-5 py-4 shadow-lg shadow-rok-900/10 backdrop-blur"
          >
            <p className="font-display text-sm italic text-rok-800">
              “You did it for me.”
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-rok-500">
              Matthew 25:40
            </p>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-rok-300 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-rok-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
