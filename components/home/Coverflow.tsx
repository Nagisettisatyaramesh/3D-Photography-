"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useSiteImages } from "@/components/providers/SiteImagesProvider";
import type { SiteImageKey } from "@/lib/content/siteImages";
import { driftUp, viewportOnce } from "@/lib/motion";
import { FloatingButton } from "@/components/ui/FloatingButton";

// [image, caption, rotateY deg, translateZ px] — one slot per stack
// position, ordered to move through the categories (bride, beach, half
// saree, ceremony, pre-wedding, makeover, child makeover) rather than
// repeating a category back-to-back; centre frame faces front, the rest
// fan back toward the edges; hover pulls any frame forward.
const cards: [SiteImageKey, string, number, number][] = [
  ["gallery-1", "Wedding Day", 44, -120],
  ["gallery-2", "Pre-Wedding", 32, -70],
  ["gallery-3", "Half Saree", 18, -30],
  ["gallery-4", "Wedding Day", 0, 30],
  ["gallery-5", "Pre-Wedding", -18, -30],
  ["gallery-6", "Makeover", -32, -70],
  ["gallery-7", "Child Makeover", -44, -120],
];

export function Coverflow() {
  const image = useSiteImages();
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
            <Image
              src={image(key)}
              alt={caption}
              fill
              // Requested well above the frame's CSS size (190/270px): these
              // cards sit at steep rotateY angles, and Chromium rasterizes
              // an image at its CSS size *before* perspective-warping it to
              // that angle, so an exact-size source looks visibly softened
              // once foreshortened. The extra source pixels survive that warp.
              sizes="(max-width: 768px) 420px, 560px"
              quality={92}
              loading={i < 3 ? "eager" : undefined}
              fetchPriority={i < 3 ? "high" : undefined}
              className="scale-110 object-cover"
            />
          </div>
        ))}
      </div>
      <p className="eyebrow mt-2 text-center text-ink/45">Hover a frame to pull it forward</p>
    </section>
  );
}
