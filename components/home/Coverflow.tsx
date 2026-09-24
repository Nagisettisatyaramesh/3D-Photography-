"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { brand, type BrandImageKey } from "@/lib/content/brandImages";
import { driftUp, viewportOnce } from "@/lib/motion";
import { FloatingButton } from "@/components/ui/FloatingButton";

// [image, caption, rotateY deg, translateZ px] — centre frame faces front,
// the rest fan back toward the edges; hover pulls any frame out of the stack.
const cards: [BrandImageKey, string, number, number][] = [
  ["preWedding1", "Pre-Wedding", 44, -120],
  ["weddingCeremony3", "Wedding Day", 32, -70],
  ["weddingBrideOrange", "Wedding Day", 18, -30],
  ["preWedding2", "Pre-Wedding", 0, 30],
  ["halfSaree1", "Half Saree", -18, -30],
  ["makeoverGroomDark", "Makeover", -32, -70],
  ["childMakeover2", "Child Makeover", -44, -120],
];

export function Coverflow() {
  return (
    <section className="overflow-hidden py-28 md:py-40">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 px-6 md:px-12">
        <motion.div variants={driftUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <p className="eyebrow mb-4 text-terracotta">Photography Showcase</p>
          <h2 className="max-w-md font-serif text-4xl italic leading-[1.05] md:text-5xl">A gallery in depth.</h2>
        </motion.div>
        <FloatingButton href="/photography" variant="outline-dark">
          View Full Portfolio
        </FloatingButton>
      </div>

      <div className="flex h-[440px] items-center justify-center md:h-[560px]" style={{ perspective: 1800 }}>
        {cards.map(([key, caption, rot, z], i) => (
          <div
            key={key}
            className="cf3d relative h-[300px] w-[190px] shrink-0 overflow-hidden rounded-md shadow-[0_40px_70px_rgba(20,17,16,0.5)] md:h-[400px] md:w-[270px]"
            style={{
              marginLeft: i ? -64 : 0,
              zIndex: 10 - Math.abs(3 - i),
              transform: `rotateY(${rot}deg) translateZ(${z}px)`,
            }}
          >
            <Image src={brand[key]} alt={caption} fill sizes="270px" className="scale-110 object-cover" />
          </div>
        ))}
      </div>
      <p className="eyebrow mt-2 text-center text-ink/45">Hover a frame to pull it forward</p>
    </section>
  );
}
