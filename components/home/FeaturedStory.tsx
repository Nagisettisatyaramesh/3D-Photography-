"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { brand } from "@/lib/content/brandImages";
import { driftUp, expandReveal, useParallax, viewportOnce } from "@/lib/motion";
import { FloatingChip } from "@/components/ui/FloatingChip";
import { FloatingButton } from "@/components/ui/FloatingButton";

export function FeaturedStory() {
  const { nodeRef: backRef, y: backY } = useParallax([40, -40]);
  const { nodeRef: frontRef, y: frontY } = useParallax([-30, 30]);

  return (
    <section className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
        <motion.div
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow mb-5 text-terracotta">A Featured Story</p>
          <h2 className="font-serif text-4xl italic leading-[1.05] md:text-5xl">
            The Big Day, told the way it happened.
          </h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">
            The rich traditions and vibrant rituals of a Telugu wedding, captured with
            artistry and elegance — from the sacred moments of the ceremony to the
            joyful celebrations with family and friends.
          </p>
          <div className="mt-9">
            <FloatingButton href="/photography" variant="outline-dark">
              View the Gallery
            </FloatingButton>
          </div>
        </motion.div>

        <div className="relative h-[540px] md:h-[620px]">
          <motion.div
            ref={backRef as React.RefObject<HTMLDivElement>}
            style={{ y: backY }}
            variants={expandReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="absolute right-0 top-0 h-[75%] w-[72%] overflow-hidden"
          >
            <Image
              src={brand.weddingCeremony2}
              alt="Groom seated during the wedding ceremony"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 36vw, 80vw"
            />
          </motion.div>

          <motion.div
            ref={frontRef as React.RefObject<HTMLDivElement>}
            style={{ y: frontY }}
            variants={expandReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.2 }}
            className="absolute bottom-0 left-0 h-[55%] w-[52%] overflow-hidden border-4 border-parchment shadow-[0_30px_70px_-25px_rgba(20,17,16,0.45)]"
          >
            <Image
              src={brand.weddingBridePlate}
              alt="Bride holding a traditional ritual object"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 26vw, 60vw"
            />
          </motion.div>

          <div className="absolute -left-2 top-6 md:left-4">
            <FloatingChip range={[14, -14]} rotate={-3}>
              Telugu Wedding
            </FloatingChip>
          </div>
        </div>
      </div>
    </section>
  );
}
