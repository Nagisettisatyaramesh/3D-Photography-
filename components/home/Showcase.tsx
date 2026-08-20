"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { portfolio } from "@/lib/content/portfolio";
import { brand } from "@/lib/content/brandImages";
import { driftUp, viewportOnce } from "@/lib/motion";
import { FloatingButton } from "@/components/ui/FloatingButton";

const featured = portfolio.filter((p) =>
  ["pw2", "gh2", "bh4", "mk1", "wd2", "hs3", "cm3", "wd4"].includes(p.id)
);

export function Showcase() {
  return (
    <section className="py-28 md:py-40">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6 px-6 md:px-12">
        <motion.div
          variants={driftUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow mb-4 text-terracotta">Photography Showcase</p>
          <h2 className="max-w-md font-serif text-4xl italic leading-[1.05] md:text-5xl">
            A gallery, not a checklist.
          </h2>
        </motion.div>
        <FloatingButton href="/photography" variant="outline-dark">
          View Full Portfolio
        </FloatingButton>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:gap-8 md:px-12">
        {featured.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: (i % 4) * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative shrink-0 snap-start overflow-hidden ${
              item.orientation === "portrait"
                ? "h-[62vh] w-[68vw] sm:w-[38vw] md:h-[68vh] md:w-[24vw]"
                : "h-[46vh] w-[80vw] sm:w-[52vw] md:h-[50vh] md:w-[34vw]"
            }`}
          >
            <Image
              src={brand[item.image]}
              alt={item.category}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="(min-width: 768px) 30vw, 70vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="eyebrow text-parchment/85">{item.category}</p>
            </div>
          </motion.div>
        ))}

        <Link
          href="/photography"
          data-cursor-hover="true"
          className="flex h-[46vh] w-[50vw] shrink-0 snap-start flex-col items-center justify-center gap-3 border border-ink/15 text-center sm:w-[30vw] md:h-[50vh] md:w-[18vw]"
        >
          <span className="font-serif text-2xl italic">See it all</span>
          <span className="eyebrow text-terracotta">→</span>
        </Link>
      </div>
    </section>
  );
}
