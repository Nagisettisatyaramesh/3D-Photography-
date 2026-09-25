"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { brand } from "@/lib/content/brandImages";
import { siteConfig } from "@/lib/content/siteConfig";
import { driftUp, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/ui/RevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingButton } from "@/components/ui/FloatingButton";

export default function AboutPage() {
  return (
    <main>
      <section className="relative flex h-[70svh] min-h-[480px] w-full items-end overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={brand.halfSaree2}
            alt="Traditional function decor"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
        </motion.div>
        <div className="relative z-10 px-6 pb-16 text-parchment md:px-12 md:pb-24">
          <p className="eyebrow mb-4 text-parchment/70">About {siteConfig.studioName}</p>
          <RevealText
            as="h1"
            lines={["Photographers,", "storytellers,", "keepers of detail."]}
            triggerOnMount
            className="font-serif text-5xl italic leading-[1] md:text-7xl"
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <motion.p
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-script text-3xl text-terracotta md:text-4xl"
        >
          {siteConfig.tagline}
        </motion.p>
        <motion.p
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.1 }}
          className="mt-8 text-base leading-relaxed text-ink/70"
        >
          {siteConfig.brandStatement}
        </motion.p>
      </section>

      <section className="bg-blush/40 px-6 py-24 text-center md:px-12 md:py-32">
        <SectionHeading eyebrow="Our Work" title="See how we tell the story." align="center" className="mb-10" />
        <div className="flex flex-wrap items-center justify-center gap-4">
          <FloatingButton href="/photography" variant="ink">
            View Photography
          </FloatingButton>
          <FloatingButton href="/films" variant="outline-dark">
            Watch Films
          </FloatingButton>
          <FloatingButton href={siteConfig.youtube} variant="outline-dark">
            YouTube Channel
          </FloatingButton>
        </div>
      </section>
    </main>
  );
}
