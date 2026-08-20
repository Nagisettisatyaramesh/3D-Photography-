"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { testimonials } from "@/lib/content/testimonials";
import { unsplashUrl } from "@/lib/content/images";
import { driftUp, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="py-28 md:py-40">
      <div className="px-6 md:px-12">
        <SectionHeading eyebrow="Testimonials" title="From the couples themselves." className="mb-16" />
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:px-12">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.names}
            variants={driftUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: i * 0.05 }}
            className="flex w-[85%] shrink-0 snap-start flex-col gap-6 sm:w-[46%] lg:w-[30%]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={unsplashUrl(t.image, { w: 900, q: 78 })}
                alt={t.names}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 30vw, 80vw"
              />
            </div>
            <p className="font-serif text-xl italic leading-snug">&ldquo;{t.quote}&rdquo;</p>
            <p className="eyebrow text-ink/45">
              {t.names} · {t.location}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
