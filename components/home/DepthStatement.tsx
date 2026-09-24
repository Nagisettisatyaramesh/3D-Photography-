"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { brand, type BrandImageKey } from "@/lib/content/brandImages";
import { siteConfig } from "@/lib/content/siteConfig";

// Each layer drifts by a different multiplier of the cursor offset, so the
// photos read as sitting at different depths behind the statement.
const layers: { key: BrandImageKey; pos: string; size: string; depth: number }[] = [
  { key: "preWedding1", pos: "left-[4%] top-[14%]", size: "h-[230px] w-[170px] md:h-[400px] md:w-[300px]", depth: -28 },
  { key: "weddingBrideOrange", pos: "right-[6%] top-[8%]", size: "h-[190px] w-[140px] md:h-[350px] md:w-[260px]", depth: 46 },
  { key: "childMakeover2", pos: "right-[14%] bottom-[8%]", size: "h-[150px] w-[120px] md:h-[290px] md:w-[220px]", depth: -84 },
  { key: "weddingGroomPink", pos: "left-[12%] bottom-[6%]", size: "h-[140px] w-[110px] md:h-[270px] md:w-[200px]", depth: -84 },
];

function Layer({ item, mx, my }: { item: (typeof layers)[number]; mx: ReturnType<typeof useSpring>; my: ReturnType<typeof useSpring> }) {
  const x = useTransform(mx, (v) => v * item.depth);
  const y = useTransform(my, (v) => v * item.depth * 0.7);
  const rotateY = useTransform(mx, (v) => v * item.depth * -0.2);
  return (
    <motion.div
      style={{ x, y, rotateY }}
      className={`absolute ${item.pos} ${item.size} overflow-hidden rounded-md shadow-[0_40px_70px_rgba(0,0,0,0.6)]`}
    >
      <Image src={brand[item.key]} alt="" fill sizes="300px" className="scale-110 object-cover" />
    </motion.div>
  );
}

export function DepthStatement() {
  const ref = useRef<HTMLElement>(null);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const mx = useSpring(nx, { stiffness: 70, damping: 20 });
  const my = useSpring(ny, { stiffness: 70, damping: 20 });
  const textX = useTransform(mx, (v) => v * 12);
  const textY = useTransform(my, (v) => v * 8);

  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    nx.set((e.clientX - r.left) / r.width - 0.5);
    ny.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[700px] items-center justify-center overflow-hidden bg-ink px-6 py-24 text-parchment md:min-h-[820px]"
      style={{ perspective: 1200 }}
    >
      {layers.map((l) => (
        <Layer key={l.key} item={l} mx={mx} my={my} />
      ))}
      <motion.div style={{ x: textX, y: textY }} className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="eyebrow mb-6 text-terracotta">Our belief</p>
        <p className="font-serif text-5xl italic leading-[1.06] md:text-7xl">Every moment is a story worth cherishing.</p>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-parchment/70 md:text-lg">
          {siteConfig.brandStatement}
        </p>
      </motion.div>
    </section>
  );
}
