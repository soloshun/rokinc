"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Stagger, StaggerItem } from "./motion";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <Stagger className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {images.map((src, i) => (
          <StaggerItem key={src} className="break-inside-avoid">
            <button
              onClick={() => setActive(i)}
              className="group block w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rok-500"
              aria-label={`Open photo ${i + 1} of ${title}`}
            >
              {/* h-auto lets each photo keep its natural aspect ratio — the
                  masonry columns flow around whatever shape is uploaded */}
              <Image
                src={src}
                alt={`${title} — photo ${i + 1}`}
                width={900}
                height={900}
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-rok-950/95 p-4 backdrop-blur-sm sm:p-10"
            onClick={close}
            role="dialog"
            aria-modal
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* plain img: lightbox images are full-bleed originals */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[active]}
                alt={`${title} — photo ${active + 1}`}
                className="max-h-[82svh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <p className="mt-3 text-center text-xs text-rok-300">
                {active + 1} / {images.length}
              </p>
            </motion.div>

            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
            >
              ✕
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); step(-1); }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
                >
                  ←
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); step(1); }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
                >
                  →
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
