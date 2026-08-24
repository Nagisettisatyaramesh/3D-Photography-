"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { LiveService } from "@/lib/content/liveServices";
import { driftUp, expandReveal, viewportOnce } from "@/lib/motion";
import { FloatingButton } from "@/components/ui/FloatingButton";

export function ServiceDetailRow({ service, index }: { service: LiveService; index: number }) {
  const reverse = index % 2 === 1;

  return (
    <section id={service.slug} className="grid gap-6 px-6 md:grid-cols-2 md:gap-10 md:px-12">
      <motion.div
        variants={expandReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={`relative aspect-[4/3] w-full overflow-hidden ${reverse ? "md:order-2" : ""}`}
      >
        {service.image && (
          <Image src={service.image} alt={service.name} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
        )}
      </motion.div>

      <motion.div
        variants={driftUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={`flex flex-col justify-center ${reverse ? "md:order-1" : ""}`}
      >
        <p className="eyebrow text-ink/35">{`0${index + 1}`}</p>
        <p className="mt-4 font-serif text-4xl italic md:text-5xl">{service.name}</p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">{service.description}</p>
        <ul className="mt-7 flex flex-col gap-2">
          {service.deliverables.map((item) => (
            <li key={item} className="text-sm text-ink/55">
              — {item}
            </li>
          ))}
        </ul>
        {service.priceVisible && service.startingPrice != null && (
          <p className="mt-6 eyebrow text-terracotta">Starting from ₹{service.startingPrice.toLocaleString("en-IN")}</p>
        )}
        {service.pricingNote && <p className="mt-2 text-xs text-ink/45">{service.pricingNote}</p>}
        <div className="mt-7">
          <FloatingButton href="/contact" variant="outline-dark">
            Get Your Quote
          </FloatingButton>
        </div>
      </motion.div>
    </section>
  );
}
