"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { LiveService } from "@/lib/content/liveServices";
import { driftUp, expandReveal, viewportOnce } from "@/lib/motion";
import { FloatingButton } from "@/components/ui/FloatingButton";

export function ServiceRow({ service, reverse }: { service: LiveService; reverse: boolean }) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <motion.div
        variants={expandReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={`relative aspect-[4/3] w-full overflow-hidden ${reverse ? "md:order-2" : ""}`}
      >
        {service.image && <Image src={service.image} alt={service.name} fill className="object-cover" sizes="(min-width: 768px) 45vw, 100vw" />}
      </motion.div>

      <motion.div variants={driftUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className={reverse ? "md:order-1" : ""}>
        <p className="font-serif text-3xl italic md:text-4xl">{service.name}</p>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">{service.description}</p>
        {service.priceVisible && service.startingPrice != null && (
          <p className="mt-6 eyebrow text-terracotta">Starting from ₹{service.startingPrice.toLocaleString("en-IN")}</p>
        )}
        <div className="mt-7">
          <FloatingButton href="/contact" variant="outline-dark" size="sm">
            Get Your Quote
          </FloatingButton>
        </div>
      </motion.div>
    </div>
  );
}
