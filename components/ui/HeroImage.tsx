"use client";

import Image from "next/image";
import { motion } from "motion/react";

/** `position` sets which part of the photo stays in view when the cover crops it,
 * e.g. "50% 0%" keeps the top. */
export function HeroImage({ src, alt, position }: { src: string; alt: string; position?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading="eager"
        fetchPriority="high"
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
    </motion.div>
  );
}
