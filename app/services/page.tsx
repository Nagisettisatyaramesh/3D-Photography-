"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { services, pricingNote } from "@/lib/content/services";
import { brand } from "@/lib/content/brandImages";
import { driftUp, expandReveal, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/ui/RevealText";
import { FloatingButton } from "@/components/ui/FloatingButton";

export default function ServicesPage() {
  return (
    <main>
      <section className="relative flex h-[60svh] min-h-[440px] w-full items-end overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image src={brand.makeoverGroomDark} alt="Groom portrait" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
        </motion.div>
        <div className="relative z-10 px-6 pb-14 text-parchment md:px-12 md:pb-20">
          <p className="eyebrow mb-4 text-terracotta-soft">Services</p>
          <RevealText
            as="h1"
            lines={["What we bring to", "your celebration."]}
            triggerOnMount
            className="font-serif text-5xl italic leading-[1.05] md:text-7xl"
          />
        </div>
      </section>

      <p className="mx-auto max-w-lg px-6 pt-16 text-center text-sm text-ink/60 md:px-12">{pricingNote}</p>

      <div className="mt-16 flex flex-col gap-24 pb-28 md:gap-32 md:pb-40">
        {services.map((service, i) => (
          <section
            key={service.slug}
            id={service.slug}
            className="grid gap-6 px-6 md:grid-cols-2 md:gap-10 md:px-12"
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
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </motion.div>

            <motion.div
              variants={driftUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={`flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}
            >
              <p className="eyebrow text-ink/35">{`0${i + 1}`}</p>
              <p className="mt-4 font-serif text-4xl italic md:text-5xl">{service.name}</p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">
                {service.description}
              </p>
              <ul className="mt-7 flex flex-col gap-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="text-sm text-ink/55">
                    — {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 eyebrow text-terracotta">
                Starting from ₹{service.startingPrice.toLocaleString("en-IN")}
              </p>
              <div className="mt-7">
                <FloatingButton href="/contact" variant="outline-dark">
                  Get Your Quote
                </FloatingButton>
              </div>
            </motion.div>
          </section>
        ))}
      </div>
    </main>
  );
}
