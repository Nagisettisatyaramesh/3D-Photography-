"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { brand, type BrandImageKey } from "@/lib/content/brandImages";
import { categoryCopy, type PortfolioCategory } from "@/lib/content/portfolio";
import { driftUp, expandReveal, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/ui/RevealText";
import { FloatingButton } from "@/components/ui/FloatingButton";

const journey: { category: PortfolioCategory; image: BrandImageKey }[] = [
  { category: "Pre-Wedding", image: "preWedding2" },
  { category: "Groom's Haldi", image: "groomHaldi1" },
  { category: "Bride's Haldi", image: "brideHaldi2" },
  { category: "Makeover", image: "makeoverBrideCloseup" },
  { category: "Wedding Day", image: "weddingCeremony2" },
  { category: "Half Saree", image: "halfSaree3" },
];

export default function StoriesPage() {
  return (
    <main>
      <section className="relative flex h-[65svh] min-h-[460px] w-full items-end overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image src={brand.brideHaldi1} alt="Bride's Haldi portrait" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
        </motion.div>
        <div className="relative z-10 px-6 pb-16 text-parchment md:px-12 md:pb-24">
          <p className="eyebrow mb-4 text-terracotta-soft">Stories</p>
          <RevealText
            as="h1"
            lines={["A celebration, told", "one ritual at a time."]}
            triggerOnMount
            className="font-serif text-5xl italic leading-[1.05] md:text-7xl"
          />
        </div>
      </section>

      <div className="flex flex-col">
        {journey.map((step, i) => (
          <section
            key={step.category}
            className={`grid min-h-[80vh] items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-12 ${
              i % 2 === 1 ? "bg-blush/40" : ""
            }`}
          >
            <motion.div
              variants={expandReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={`relative aspect-[4/5] w-full overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}
            >
              <Image
                src={brand[step.image]}
                alt={step.category}
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
              <p className="eyebrow mb-4 text-terracotta">{`0${i + 1}`}</p>
              <p className="font-serif text-4xl italic leading-[1.05] md:text-5xl">{step.category}</p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">
                {categoryCopy[step.category]}
              </p>
            </motion.div>
          </section>
        ))}
      </div>

      <section className="bg-black px-6 py-24 text-center text-parchment md:py-32">
        <p className="font-serif text-3xl italic md:text-5xl">Ready to start yours?</p>
        <div className="mt-8">
          <FloatingButton href="/contact" variant="terracotta" size="md">
            Create Your Custom Quote
          </FloatingButton>
        </div>
      </section>
    </main>
  );
}
