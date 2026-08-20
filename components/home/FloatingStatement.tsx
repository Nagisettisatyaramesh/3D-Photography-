"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/lib/content/siteConfig";
import { driftUp, viewportOnce } from "@/lib/motion";
import { FloatingChip } from "@/components/ui/FloatingChip";

export function FloatingStatement() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:py-48">
      <div className="pointer-events-none absolute left-[6%] top-10 hidden md:block">
        <FloatingChip range={[24, -24]} rotate={-4}>
          Since day one
        </FloatingChip>
      </div>
      <div className="pointer-events-none absolute bottom-10 right-[8%] hidden md:block">
        <FloatingChip range={[-20, 20]} rotate={3}>
          Candid · Traditional · Cinematic
        </FloatingChip>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-serif text-4xl italic leading-[1.15] sm:text-5xl md:text-6xl"
        >
          Every moment is a story worth cherishing.
        </motion.p>

        <motion.p
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink/65 md:text-lg"
        >
          {siteConfig.brandStatement}
        </motion.p>
      </div>
    </section>
  );
}
