"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/lib/content/siteConfig";
import { staggerFloat, driftUp } from "@/lib/motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "circle(0% at 100% 0%)" }}
          animate={{ clipPath: "circle(150% at 100% 0%)" }}
          exit={{ clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-8 pb-10 pt-8 text-parchment"
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl italic">{siteConfig.studioName}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="relative h-6 w-6"
            >
              <span className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 rotate-45 bg-parchment" />
              <span className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 -rotate-45 bg-parchment" />
            </button>
          </div>

          <motion.nav
            variants={staggerFloat(0.07, 0.15)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-1"
          >
            {siteConfig.navLinks.map((link) => (
              <motion.div key={link.href} variants={driftUp} className="overflow-hidden py-2">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-serif text-4xl italic leading-none"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            variants={driftUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            className="flex flex-col gap-4"
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="w-fit rounded-full border border-parchment px-8 py-3.5 text-[11px] uppercase tracking-[0.2em]"
            >
              Get Your Quote
            </Link>
            <p className="text-[11px] uppercase tracking-[0.18em] text-parchment/45">{siteConfig.phone}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
