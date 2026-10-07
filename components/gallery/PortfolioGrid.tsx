"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { LivePortfolioItem } from "@/lib/content/livePortfolio";

type PortfolioGridProps = {
  items: LivePortfolioItem[];
  onSelect: (item: LivePortfolioItem) => void;
};

function depthMove(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const nx = (e.clientX - r.left) / r.width - 0.5;
  const ny = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--tx", `${(-nx * 18).toFixed(1)}px`);
  el.style.setProperty("--ty", `${(-ny * 18).toFixed(1)}px`);
  el.style.setProperty("--rx", `${(nx * 7).toFixed(1)}deg`);
  el.style.setProperty("--ry", `${(-ny * 7).toFixed(1)}deg`);
}

function depthReset(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  ["--tx", "--ty", "--rx", "--ry"].forEach((p) => el.style.removeProperty(p));
}

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
            initial={{ opacity: 0, scale: 0.94, rotateX: 22, transformPerspective: 1200 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, transformPerspective: 1200 }}
            exit={{ opacity: 0, scale: 0.94, rotateX: -12, transformPerspective: 1200 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            data-cursor-hover="View"
            onPointerMove={depthMove}
            onPointerLeave={depthReset}
            className={`group relative mb-5 block w-full overflow-hidden bg-blush/40 md:mb-8 ${
              item.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            {/* Depth: the photo shifts and turns against the cursor, the label
                drifts the other way, so the two read as separate layers. */}
            <div
              className="absolute inset-0 transition-transform duration-200 ease-out"
              style={{
                transform:
                  "perspective(900px) rotateX(var(--ry,0deg)) rotateY(var(--rx,0deg)) translate3d(var(--tx,0px), var(--ty,0px), 0) scale(1.12)",
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p
                className="eyebrow text-parchment/90 transition-transform duration-200 ease-out"
                style={{ transform: "translate3d(calc(var(--tx,0px) * -1.6), calc(var(--ty,0px) * -1.6), 0)" }}
              >
                {item.category}
              </p>
            </div>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
