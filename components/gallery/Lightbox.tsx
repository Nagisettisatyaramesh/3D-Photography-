"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { LivePortfolioItem } from "@/lib/content/livePortfolio";

type LightboxProps = {
  items: LivePortfolioItem[];
  activeItem: LivePortfolioItem | null;
  onClose: () => void;
  onNavigate: (item: LivePortfolioItem) => void;
};

export function Lightbox({ items, activeItem, onClose, onNavigate }: LightboxProps) {
  const index = activeItem ? items.findIndex((i) => i.id === activeItem.id) : -1;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!activeItem) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(items[(index + 1) % items.length]);
      if (e.key === "ArrowLeft") onNavigate(items[(index - 1 + items.length) % items.length]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeItem, index, items, onClose, onNavigate]);

  useEffect(() => {
    document.body.style.overflow = activeItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  return (
    <AnimatePresence>
      {activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/95 p-4 md:p-10"
          onClick={onClose}
        >
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[78vh] w-full max-w-4xl items-center justify-center"
          >
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              width={1400}
              height={1400}
              className="max-h-[78vh] w-auto object-contain"
            />
          </motion.div>

          <div className="mt-6 flex items-center gap-8 text-parchment">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(items[(index - 1 + items.length) % items.length]);
              }}
              data-cursor-hover="Prev"
              className="text-xs uppercase tracking-[0.2em] text-parchment/70 hover:text-parchment"
            >
              ← Prev
            </button>
            <p className="eyebrow">{activeItem.category}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(items[(index + 1) % items.length]);
              }}
              data-cursor-hover="Next"
              className="text-xs uppercase tracking-[0.2em] text-parchment/70 hover:text-parchment"
            >
              Next →
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            data-cursor-hover="Close"
            aria-label="Close"
            className="absolute right-6 top-6 text-xs uppercase tracking-[0.2em] text-parchment/70 hover:text-parchment"
          >
            Close ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
