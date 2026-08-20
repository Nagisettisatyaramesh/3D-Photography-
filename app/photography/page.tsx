"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { portfolio, portfolioCategories, type PortfolioItem } from "@/lib/content/portfolio";
import { brand } from "@/lib/content/brandImages";
import { CategoryFilter } from "@/components/gallery/CategoryFilter";
import { PortfolioGrid } from "@/components/gallery/PortfolioGrid";
import { Lightbox } from "@/components/gallery/Lightbox";
import { RevealText } from "@/components/ui/RevealText";

export default function PhotographyPage() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(
    () => (category === "All" ? portfolio : portfolio.filter((p) => p.category === category)),
    [category]
  );

  return (
    <main>
      <section className="relative flex h-[60svh] min-h-[440px] w-full items-end overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={brand.brideHaldi2}
            alt="Bride in traditional attire"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
        </motion.div>
        <div className="relative z-10 px-6 pb-14 text-parchment md:px-12 md:pb-20">
          <p className="eyebrow mb-4 text-terracotta-soft">Photography</p>
          <RevealText
            as="h1"
            lines={["A gallery built on", "light and honesty."]}
            triggerOnMount
            className="font-serif text-5xl italic leading-[1.05] md:text-7xl"
          />
        </div>
      </section>

      <div className="px-6 pt-14 md:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
          <CategoryFilter categories={portfolioCategories} active={category} onChange={setCategory} />
        </motion.div>
      </div>

      <div className="mt-10 px-6 pb-28 md:px-12 md:pb-40">
        <PortfolioGrid items={filtered} onSelect={setActive} />
      </div>

      <Lightbox items={filtered} activeItem={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </main>
  );
}
