"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FloatingButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "ink" | "terracotta" | "outline-light" | "outline-dark" | "ghost";
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
  cursorLabel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants: Record<NonNullable<FloatingButtonProps["variant"]>, string> = {
  ink: "bg-ink text-parchment hover:bg-black",
  terracotta: "bg-terracotta text-parchment hover:bg-terracotta-soft",
  "outline-light": "border border-parchment/60 text-parchment hover:border-parchment hover:bg-parchment/10",
  "outline-dark": "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
  ghost: "text-ink hover:text-terracotta",
};

const sizes = {
  sm: "px-6 py-2.5 text-[10px]",
  md: "px-8 py-4 text-[11px]",
};

export function FloatingButton({
  href,
  onClick,
  variant = "ink",
  size = "md",
  className,
  children,
  cursorLabel,
  type = "button",
  disabled,
}: FloatingButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.22,
      y: (e.clientY - rect.top - rect.height / 2) * 0.22,
    });
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 160, damping: 14 }}
      whileTap={{ scale: 0.95 }}
      data-cursor-hover={cursorLabel ?? "true"}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full uppercase tracking-[0.2em] transition-colors duration-300",
        variants[variant],
        sizes[size],
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block">
      {content}
    </button>
  );
}
