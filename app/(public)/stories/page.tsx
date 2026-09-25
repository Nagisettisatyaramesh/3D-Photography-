"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { brand, type BrandImageKey } from "@/lib/content/brandImages";
import { categoryCopy, type PortfolioCategory } from "@/lib/content/portfolio";
import { driftUp, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/ui/RevealText";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { Tilt3D } from "@/components/ui/Tilt3D";

const journey: { category: PortfolioCategory; image: BrandImageKey }[] = [
  { category: "Pre-Wedding", image: "preWedding2" },
  { category: "Groom's Haldi", image: "groomHaldi1" },
  { category: "Bride's Haldi", image: "brideHaldi2" },
  { category: "Makeover", image: "makeoverGroomDark" },
  { category: "Wedding Day", image: "weddingCeremony2" },
  { category: "Half Saree", image: "halfSaree2" },
  { category: "Child Makeover", image: "childMakeover2" },
];

function Chapter({ step, index }: { step: (typeof journey)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const numberX = useTransform(scrollYProgress, [0, 1], [index % 2 ? 80 : -80, index % 2 ? -80 : 80]);
  const flip = index % 2 === 1;
  const src = brand[step.image];

  return (
    <section
      ref={ref}
      className={`relative grid min-h-[90vh] items-center gap-10 overflow-hidden px-6 py-24 md:grid-cols-2 md:gap-20 md:px-12 ${
        flip ? "bg-blush/40" : ""
      }`}
    >
      <motion.p
        aria-hidden
        style={{ x: numberX }}
        className="pointer-events-none absolute -top-4 left-0 select-none font-serif text-[34vw] font-extrabold italic leading-none text-terracotta/10 md:text-[22vw]"
      >
        {`0${index + 1}`}
      </motion.p>

      <motion.div
        initial={{ clipPath: "inset(12% 12% 12% 12% round 24px)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 8px)", opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 mx-auto w-full max-w-xl ${flip ? "md:order-2" : ""}`}
      >
        <Tilt3D max={8}>
          <motion.div
            style={{ y: imageY }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-ink shadow-[0_50px_90px_-40px_rgba(20,17,16,0.65)]"
          >
            {/* Blurred copy fills the frame; the sharp copy sits on top uncropped. */}
            <Image src={src} alt="" aria-hidden fill sizes="50vw" className="scale-125 object-cover opacity-60 blur-2xl" />
            <Image src={src} alt={step.category} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-contain p-3" />
          </motion.div>
        </Tilt3D>
      </motion.div>

      <div className={`relative z-10 ${flip ? "md:order-1" : ""}`}>
        <motion.p
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="eyebrow mb-4 text-terracotta"
        >
          Chapter {`0${index + 1}`}
        </motion.p>
        <motion.h2
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.1 }}
          className="font-serif text-5xl italic leading-[1.02] md:text-7xl"
        >
          {step.category}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="my-8 h-px w-24 origin-left bg-terracotta"
        />
        <motion.p
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.25 }}
          className="max-w-md text-base leading-relaxed text-ink/70 md:text-lg"
        >
          {categoryCopy[step.category]}
        </motion.p>
      </div>
    </section>
  );
}

export default function StoriesPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <main>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-terracotta" />

      <section className="relative flex h-[65svh] min-h-[460px] w-full items-end overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image src={brand.childMehndi} alt="Mehndi and bangles detail" fill priority className="object-cover" sizes="100vw" />
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
          <Chapter key={step.category} step={step} index={i} />
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
