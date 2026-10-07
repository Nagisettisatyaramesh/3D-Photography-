"use client";

import { motion, type Variants } from "motion/react";
import { viewportOnce } from "@/lib/motion";

type RevealTextProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
  triggerOnMount?: boolean;
};

const line: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.1,
    },
  }),
};

export function RevealText({
  lines,
  className,
  lineClassName,
  as: Tag = "h1",
  delay = 0,
  stagger = 0.1,
  triggerOnMount = false,
}: RevealTextProps) {
  return (
    <Tag className={className}>
      {lines.map((text, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={lineClassName ?? "block"}
            custom={i}
            variants={line}
            initial="hidden"
            {...(triggerOnMount
              ? { animate: "visible" }
              : { whileInView: "visible", viewport: viewportOnce })}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
