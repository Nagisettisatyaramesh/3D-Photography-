"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { brand, type BrandImageKey } from "@/lib/content/brandImages";

// Frames placed along a winding path into the screen; scrolling flies the
// camera forward through them.
const frames: { key: BrandImageKey; x: number; y: number; label: string }[] = [
  { key: "preWedding1", x: -220, y: -40, label: "Pre-Wedding" },
  { key: "weddingCeremony3", x: 240, y: 30, label: "The Big Day" },
  { key: "halfSaree2", x: -260, y: 60, label: "Half Saree" },
  { key: "weddingBrideOrange", x: 200, y: -50, label: "Bride" },
  { key: "childMakeover2", x: -180, y: 20, label: "Child Makeover" },
  { key: "preWedding3", x: 230, y: 40, label: "Together" },
  { key: "weddingGroomPink", x: 0, y: -20, label: "Groom" },
];

const GAP = 760;

export function CameraPath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });
  const z = useTransform(smooth, [0, 1], [0, GAP * (frames.length - 0.4)]);
  const rotateY = useTransform(smooth, [0, 0.5, 1], [-6, 6, -6]);
  const titleOpacity = useTransform(smooth, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative bg-black" style={{ height: `${frames.length * 70 + 60}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ perspective: 900 }}>
        <motion.div
          style={{ opacity: titleOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-parchment"
        >
          <p className="eyebrow mb-4 text-terracotta">Fly through the gallery</p>
          <p className="font-serif text-5xl italic md:text-7xl">Keep scrolling.</p>
        </motion.div>

        <motion.div style={{ z, rotateY, transformStyle: "preserve-3d" }} className="absolute inset-0">
          {frames.map((f, i) => (
            <div
              key={f.key}
              className="absolute left-1/2 top-1/2 aspect-[3/4] w-[220px] md:w-[340px]"
              style={{ transform: `translate3d(calc(-50% + ${f.x}px), calc(-50% + ${f.y}px), ${-(i + 1) * GAP}px)` }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-md shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
                <Image src={brand[f.key]} alt={f.label} fill sizes="340px" className="scale-110 object-cover" />
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 font-serif text-xl italic text-parchment">
                  {f.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.75))]" />
      </div>
    </section>
  );
}
