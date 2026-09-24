"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { brand, type BrandImageKey } from "@/lib/content/brandImages";
import { siteConfig } from "@/lib/content/siteConfig";
import { driftUp, staggerFloat, viewportOnce } from "@/lib/motion";
import { FloatingButton } from "@/components/ui/FloatingButton";

const tiles: { image: BrandImageKey; alt: string }[] = [
  { image: "preWedding1", alt: "Pre-wedding portrait" },
  { image: "weddingCeremony1", alt: "Wedding ceremony moment" },
  { image: "halfSaree1", alt: "Half saree function" },
  { image: "weddingBrideOrange", alt: "Bride portrait" },
  { image: "childMakeover2", alt: "Child makeover portrait" },
  { image: "preWedding3", alt: "Pre-wedding couple portrait" },
];

const handle = siteConfig.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "");

export function InstagramFeed() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <motion.div
        variants={driftUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <p className="eyebrow mb-3 text-terracotta">{handle}</p>
        <p className="font-serif text-4xl italic md:text-5xl">Follow the story as it unfolds.</p>
      </motion.div>

      <motion.div
        variants={staggerFloat(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-5xl grid-cols-3 gap-2 md:gap-3"
      >
        {tiles.map((tile) => (
          <motion.a
            key={tile.image}
            variants={driftUp}
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={brand[tile.image]}
              alt={tile.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(min-width: 768px) 30vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/40">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-7 w-7 text-parchment opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        variants={driftUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={{ delay: 0.15 }}
        className="mt-10 flex justify-center"
      >
        <FloatingButton href={siteConfig.instagram} variant="outline-dark" size="sm">
          Follow on Instagram
        </FloatingButton>
      </motion.div>
    </section>
  );
}
