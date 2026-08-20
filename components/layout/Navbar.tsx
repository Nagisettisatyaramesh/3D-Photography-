"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { siteConfig } from "@/lib/content/siteConfig";
import { cn } from "@/lib/utils";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const [floating, setFloating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setFloating(latest > 60);
  });

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center">
        <motion.header
          layout
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
          className={cn(
            "flex items-center justify-between overflow-hidden transition-[background-color,box-shadow,padding] duration-500",
            floating
              ? "mt-4 w-[94%] max-w-5xl rounded-full bg-parchment/85 px-6 py-3 shadow-[0_24px_60px_-28px_rgba(20,17,16,0.4)] backdrop-blur-xl md:px-8"
              : "w-full rounded-none bg-transparent px-6 py-7 md:px-12"
          )}
        >
          <Link href="/" data-cursor-hover="true" className="flex flex-col leading-none">
            <span
              className={cn(
                "font-serif text-lg italic tracking-tight transition-colors duration-500 md:text-xl",
                floating ? "text-ink" : "text-parchment"
              )}
            >
              {siteConfig.studioName}
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-hover="true"
                className={cn(
                  "text-[11px] uppercase tracking-[0.2em] transition-colors duration-500",
                  floating ? "text-ink/70 hover:text-terracotta" : "text-parchment/85 hover:text-parchment"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <FloatingButton href="/contact" variant={floating ? "ink" : "outline-light"} size="sm">
              Get Your Quote
            </FloatingButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            data-cursor-hover="Menu"
            aria-label="Open menu"
            className="flex flex-col gap-1.5 md:hidden"
          >
            <span className={cn("h-px w-6 transition-colors", floating ? "bg-ink" : "bg-parchment")} />
            <span className={cn("h-px w-6 transition-colors", floating ? "bg-ink" : "bg-parchment")} />
          </button>
        </motion.header>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
