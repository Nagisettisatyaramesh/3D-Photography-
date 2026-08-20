"use client";

import { motion } from "motion/react";
import { useParallax } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FloatingChipProps = {
  children: React.ReactNode;
  className?: string;
  range?: [number, number];
  rotate?: number;
  dark?: boolean;
};

/** A small drifting label — dates, locations, editorial captions — used
 * throughout as the site's "floating" visual signature. Never load-bearing
 * content; always paired with a real heading/caption nearby. */
export function FloatingChip({ children, className, range = [30, -30], rotate = 0, dark }: FloatingChipProps) {
  const { nodeRef, y } = useParallax(range);

  return (
    <motion.span
      ref={nodeRef as React.RefObject<HTMLSpanElement>}
      style={{ y, rotate }}
      className={cn(
        "eyebrow inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm",
        dark ? "border-parchment/30 bg-black/20 text-parchment/80" : "border-ink/15 bg-parchment/70 text-ink/70",
        className
      )}
    >
      {children}
    </motion.span>
  );
}
