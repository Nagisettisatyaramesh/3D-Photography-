"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { brand } from "@/lib/content/brandImages";
import { driftUp, expandReveal, viewportOnce } from "@/lib/motion";
import { FloatingButton } from "@/components/ui/FloatingButton";

export function QuoteCTA() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black px-6 py-28 text-center text-parchment md:py-40">
      <motion.div variants={expandReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="absolute inset-0 opacity-40">
        <Image src={brand.halfSaree1} alt="" fill className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

      <div className="relative z-10">
        <motion.p
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-script text-4xl text-terracotta-soft md:text-5xl"
        >
          Let&apos;s start with your story.
        </motion.p>
        <motion.p
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-md text-parchment/70"
        >
          Tell us your date and vision. We&apos;ll come back with a proposal built around it.
        </motion.p>
        <motion.div
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <FloatingButton href="/contact" variant="terracotta" size="md">
            Start Your Journey
          </FloatingButton>
        </motion.div>
      </div>
    </section>
  );
}
