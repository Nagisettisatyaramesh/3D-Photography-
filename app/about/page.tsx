"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { unsplashUrl } from "@/lib/content/images";
import { brand } from "@/lib/content/brandImages";
import { siteConfig } from "@/lib/content/siteConfig";
import { team } from "@/lib/content/team";
import { driftUp, staggerFloat, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/ui/RevealText";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  { value: 250, suffix: "+", label: "Celebrations" },
  { value: 8, suffix: "+", label: "Years of Craft" },
  { value: 7, suffix: "", label: "Ceremony Types" },
];

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
            src={brand.groomHaldi1}
            alt="Candid moment from a Haldi ceremony"
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

        <div className="mt-16 flex flex-wrap justify-center gap-14">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl italic md:text-5xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="eyebrow mt-2 text-ink/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blush/40 px-6 py-24 md:px-12 md:py-32">
        <SectionHeading eyebrow="The Team" title="The people behind the camera." align="center" className="mb-16" />
        <motion.div
          variants={staggerFloat(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4"
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={driftUp} className="text-center">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[180px] overflow-hidden">
                <Image
                  src={unsplashUrl(member.image, { w: 500, q: 78 })}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
              <p className="mt-4 font-serif text-lg italic">{member.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ink/45">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
