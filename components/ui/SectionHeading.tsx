"use client";

import { motion } from "motion/react";
import { driftUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
};

export function SectionHeading({ eyebrow, title, align = "left", className, dark }: SectionHeadingProps) {
  return (
    <motion.div
      variants={driftUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(align === "center" && "text-center", className)}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4 text-terracotta", dark && "text-terracotta-soft")}>{eyebrow}</p>
      )}
      <h2 className="font-serif text-4xl italic leading-[1.05] sm:text-5xl md:text-6xl">{title}</h2>
    </motion.div>
  );
}
