"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { PortfolioItem } from "@/lib/content/portfolio";
import { brand } from "@/lib/content/brandImages";

type PortfolioGridProps = {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
};

export function PortfolioGrid({ items, onSelect }: PortfolioGridProps) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 md:gap-8 lg:columns-3">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.button
            type="button"
            key={item.id}
            layout
            onClick={() => onSelect(item)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            data-cursor-hover="View"
            className={`group relative mb-5 block w-full overflow-hidden bg-blush/40 md:mb-8 ${
              item.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={brand[item.image]}
              alt={item.category}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="eyebrow text-parchment/90">{item.category}</p>
            </div>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
