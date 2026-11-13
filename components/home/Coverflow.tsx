"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useSiteImages } from "@/components/providers/SiteImagesProvider";
import type { SiteImageKey } from "@/lib/content/siteImages";
import { driftUp, viewportOnce } from "@/lib/motion";
import { FloatingButton } from "@/components/ui/FloatingButton";

// [image, caption, rotateY deg, translateZ px] — one slot per stack
// position. The two middle frames face almost front and the rest fan back
// toward the edges; hover pulls any frame forward.
const cards: [SiteImageKey, string, number, number][] = [
  ["galleryDepth1", "Bridal portrait", 46, -120],
  ["galleryDepth2", "Half saree portrait", 34, -75],
  ["galleryDepth3", "Ceremony blessing", 21, -35],
  ["galleryDepth4", "Pre-wedding on the beach", 7, 20],
  ["galleryDepth5", "Couple in traditional attire", -7, 20],
  ["galleryDepth6", "Fireworks at a celebration", -21, -35],
  ["galleryDepth7", "Half saree function", -34, -75],
  ["galleryDepth8", "Couple portrait", -46, -120],
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
              marginLeft: i ? -92 : 0,
              zIndex: 10 - Math.floor(Math.abs(3.5 - i)),
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
