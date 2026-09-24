"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { brand, type BrandImageKey } from "@/lib/content/brandImages";
import { driftUp, viewportOnce } from "@/lib/motion";

const faces: { key: BrandImageKey; label: string; transform: string }[] = [
  { key: "weddingCeremony2", label: "The Big Day", transform: "translateZ(var(--cube-half))" },
  { key: "preWedding2", label: "Pre-Wedding", transform: "rotateY(90deg) translateZ(var(--cube-half))" },
  { key: "halfSaree2", label: "Half Saree", transform: "rotateY(180deg) translateZ(var(--cube-half))" },
  { key: "childMehndi", label: "Child Makeover", transform: "rotateY(-90deg) translateZ(var(--cube-half))" },
];

const chapters = ["Pre-Wedding", "Haldi & Makeover", "The Big Day", "Half Saree & Child Makeover"];

export function ChapterCube() {
  return (
    <section className="grid items-center gap-16 bg-black px-6 py-28 text-parchment md:grid-cols-2 md:px-12 md:py-40">
      <div className="flex h-[420px] items-center justify-center md:h-[520px]" style={{ perspective: 1500 }}>
        <div className="cube3d relative h-[240px] w-[240px] [--cube-half:120px] md:h-[320px] md:w-[320px] md:[--cube-half:160px]">
          {faces.map((f) => (
            <div key={f.key} className="absolute inset-0 overflow-hidden rounded-sm" style={{ transform: f.transform }}>
              <Image src={brand[f.key]} alt={f.label} fill sizes="320px" className="scale-[1.15] object-cover" />
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-4 pt-10 font-serif text-2xl italic">
                {f.label}
              </p>
            </div>
          ))}
          <div className="absolute inset-0 border border-terracotta/40 bg-ink" style={{ transform: "rotateX(90deg) translateZ(var(--cube-half))" }} />
          <div className="absolute inset-0 border border-terracotta/40 bg-ink" style={{ transform: "rotateX(-90deg) translateZ(var(--cube-half))" }} />
        </div>
      </div>

      <motion.div variants={driftUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <p className="eyebrow mb-4 text-terracotta">Stories</p>
        <h2 className="font-serif text-4xl italic leading-[1.05] md:text-6xl">A celebration, told one ritual at a time.</h2>
        <ul className="mt-10 max-w-md border-t border-parchment/15">
          {chapters.map((c, i) => (
            <li key={c} className="flex items-baseline justify-between border-b border-parchment/15 py-4">
              <span className="font-serif text-xl italic md:text-2xl">{c}</span>
              <span className="eyebrow text-terracotta">{`0${i + 1}`}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
