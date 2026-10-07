"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { LivePortfolioItem } from "@/lib/content/livePortfolio";
import { driftUp, viewportOnce } from "@/lib/motion";

/** A 3D photo album: each leaf turns on the spine, front and back both
 * carrying a photo. Click either page, use the buttons, or the arrow keys. */
export function AlbumBook({ items }: { items: LivePortfolioItem[] }) {
  const photos = items.slice(0, 12);
  const leafCount = Math.ceil(photos.length / 2);
  const [turned, setTurned] = useState(0); // number of leaves flipped to the left

  if (photos.length < 2) return null;

  const next = () => setTurned((t) => Math.min(leafCount, t + 1));
  const prev = () => setTurned((t) => Math.max(0, t - 1));
  const shift = turned === 0 ? "25%" : turned === leafCount ? "-25%" : "0%";

  return (
    <section
      className="px-6 py-24 md:px-12 md:py-32"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      aria-label="Photo album"
    >
      <motion.div variants={driftUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mb-12 text-center">
        <p className="eyebrow mb-3 text-terracotta">The Album</p>
        <h2 className="font-serif text-4xl italic md:text-6xl">Turn the pages.</h2>
      </motion.div>

      <div className="mx-auto w-full max-w-4xl" style={{ perspective: 2200 }}>
        <div
          className="relative mx-auto aspect-[3/2] w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transformStyle: "preserve-3d", transform: `translateX(${shift}) rotateX(8deg)` }}
        >
          <div className="absolute inset-0 rounded-md bg-ink shadow-[0_60px_100px_-40px_rgba(20,17,16,0.7)]" style={{ transform: "translateZ(-6px)" }} />
          <div className="absolute bottom-0 left-1/2 top-0 w-px bg-black/40" style={{ transform: "translateZ(1px)" }} />

          {Array.from({ length: leafCount }).map((_, i) => {
            const flipped = i < turned;
            const front = photos[i * 2];
            const back = photos[i * 2 + 1];
            return (
              <div
                key={i}
                className="absolute inset-y-0 right-0 w-1/2 origin-left transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${flipped ? -180 : 0}deg)`,
                  zIndex: flipped ? i : leafCount - i,
                }}
              >
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next page"
                  className="absolute inset-0 overflow-hidden rounded-r-md bg-parchment"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {front && <Image src={front.image} alt={front.title} fill sizes="(min-width: 768px) 420px, 45vw" className="object-contain p-3" />}
                  <span className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/25 to-transparent" />
                </button>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous page"
                  className="absolute inset-0 overflow-hidden rounded-l-md bg-parchment"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  {back && <Image src={back.image} alt={back.title} fill sizes="(min-width: 768px) 420px, 45vw" className="object-contain p-3" />}
                  <span className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/25 to-transparent" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={prev}
          disabled={turned === 0}
          className="eyebrow border-b border-current pb-1 text-ink/70 hover:text-terracotta disabled:opacity-30"
        >
          ← Previous
        </button>
        <span className="eyebrow text-ink/45">
          {turned} / {leafCount}
        </span>
        <button
          type="button"
          onClick={next}
          disabled={turned === leafCount}
          className="eyebrow border-b border-current pb-1 text-ink/70 hover:text-terracotta disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </section>
  );
}
