"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { services } from "@/lib/content/services";
import { brand } from "@/lib/content/brandImages";
import { driftUp, viewportOnce } from "@/lib/motion";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { FloatingChip } from "@/components/ui/FloatingChip";

export function PricingCTA() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 text-parchment md:px-12 md:py-40">
      <div className="absolute inset-0 opacity-25">
        <Image src={brand.makeoverJewelryDetail} alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-serif text-4xl italic leading-[1.1] md:text-6xl"
        >
          Every wedding is different.
          <br />
          Your quote should be too.
        </motion.p>

        <motion.div
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {services.slice(0, 3).map((s) => (
            <FloatingChip key={s.slug} dark range={[10, -10]}>
              {s.name} · from ₹{Math.round(s.startingPrice / 1000)}K
            </FloatingChip>
          ))}
        </motion.div>

        <motion.div
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.25 }}
          className="mt-12"
        >
          <FloatingButton href="/contact" variant="terracotta" size="md">
            Create Your Custom Quote
          </FloatingButton>
        </motion.div>
      </div>
    </section>
  );
}
