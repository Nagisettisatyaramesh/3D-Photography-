"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/lib/content/siteConfig";
import { driftUp, viewportOnce } from "@/lib/motion";

export function FloatingStatement() {
  return (
    <section className="overflow-hidden px-6 py-20 md:py-28">
      <div className="relative mx-auto max-w-4xl text-center">
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
