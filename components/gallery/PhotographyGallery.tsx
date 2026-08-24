"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { LivePortfolioItem } from "@/lib/content/livePortfolio";
import { CategoryFilter } from "@/components/gallery/CategoryFilter";
import { PortfolioGrid } from "@/components/gallery/PortfolioGrid";
import { Lightbox } from "@/components/gallery/Lightbox";

export function PhotographyGallery({ items, categories }: { items: LivePortfolioItem[]; categories: string[] }) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<LivePortfolioItem | null>(null);

  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((p) => p.category === category)),
    [items, category]
  );

  return (
    <>
      <div className="px-6 pt-14 md:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
          <CategoryFilter categories={categories} active={category} onChange={setCategory} />
        </motion.div>
      </div>

      <div className="mt-10 px-6 pb-28 md:px-12 md:pb-40">
        <PortfolioGrid items={filtered} onSelect={setActive} />
      </div>

      <Lightbox items={filtered} activeItem={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </>
  );
}
