"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { brand } from "@/lib/content/brandImages";
import { siteConfig } from "@/lib/content/siteConfig";
import { usePointerDrift } from "@/lib/motion";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { FloatingChip } from "@/components/ui/FloatingChip";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const pointer = usePointerDrift(sectionRef, 14);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-parchment">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ scale: imageScale, x: pointer.x, y: pointer.y }} className="absolute -inset-4">
          <Image
            src={brand.weddingCeremony2}
            alt="Groom seated during a Telugu wedding ceremony, warmly lit hall"
            fill
            priority
            className="object-cover object-[center_28%]"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-between px-6 pb-6 pt-28 md:px-12 md:pb-12 md:pt-36"
      >
        <div className="flex items-start justify-between">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="eyebrow text-parchment/75"
          >
            {siteConfig.eyebrow}
          </motion.p>

          <FloatingChip range={[16, -16]} className="hidden sm:inline-flex" dark>
            Est. Andhra Pradesh
          </FloatingChip>
        </div>

        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-script mb-2 text-3xl text-terracotta-soft md:text-4xl"
          >
            {siteConfig.tagline}
          </motion.p>

          <h1 className="font-serif text-[13vw] italic leading-[0.92] text-parchment sm:text-7xl md:text-8xl lg:text-[7rem]">
            {siteConfig.headline.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block overflow-hidden"
              >
                <span className="block">{line}</span>
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <FloatingButton href="/stories" variant="terracotta" size="md">
              Explore Stories
            </FloatingButton>
            <FloatingButton href="/contact" variant="outline-light" size="md">
              Start Your Journey
            </FloatingButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-parchment/50"
        />
      </motion.div>
    </section>
  );
}
