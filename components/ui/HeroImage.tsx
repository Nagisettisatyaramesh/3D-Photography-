"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    >
      <Image src={src} alt={alt} fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
    </motion.div>
  );
}
