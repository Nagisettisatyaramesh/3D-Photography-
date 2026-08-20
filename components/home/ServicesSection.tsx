"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { services, pricingNote } from "@/lib/content/services";
import { brand } from "@/lib/content/brandImages";
import { driftUp, expandReveal, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingButton } from "@/components/ui/FloatingButton";

export function ServicesSection() {
  return (
    <section className="px-6 py-28 md:px-12 md:py-40">
      <SectionHeading
        eyebrow="Services"
        title="What we bring to your celebration."
        className="mb-6"
      />
      <p className="max-w-md text-sm text-ink/55 md:text-base">{pricingNote}</p>

      <div className="mt-20 flex flex-col gap-24 md:gap-32">
        {services.slice(0, 4).map((service, i) => (
          <div
            key={service.slug}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
          >
            <motion.div
              variants={expandReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={`relative aspect-[4/3] w-full overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}
            >
              <Image
                src={brand[service.image]}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </motion.div>

            <motion.div
              variants={driftUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={i % 2 === 1 ? "md:order-1" : ""}
            >
              <p className="font-serif text-3xl italic md:text-4xl">{service.name}</p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">
                {service.description}
              </p>
              <p className="mt-6 eyebrow text-terracotta">
                Starting from ₹{service.startingPrice.toLocaleString("en-IN")}
              </p>
              <div className="mt-7">
                <FloatingButton href="/contact" variant="outline-dark" size="sm">
                  Get Your Quote
                </FloatingButton>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
