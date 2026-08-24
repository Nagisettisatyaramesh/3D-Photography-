"use client";

import { motion } from "motion/react";
import { buildWhatsAppLink } from "@/lib/utils";

export function WhatsAppButton({ whatsapp }: { whatsapp: string }) {
  return (
    <motion.a
      href={buildWhatsAppLink("Hi! I'd love to talk about my wedding date.", whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover="Chat"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { delay: 1.6, duration: 0.6 },
        y: { delay: 2.2, duration: 3.2, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{ scale: 1.08, y: 0 }}
      whileTap={{ scale: 0.94 }}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-parchment shadow-[0_20px_45px_-15px_rgba(226,146,111,0.65)] md:bottom-8 md:right-8"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4c-4.3 0-7.8 3.5-7.8 7.8 0 1.38.36 2.72 1.05 3.9L4 20l4.42-1.16a7.8 7.8 0 0 0 3.63.9h.01c4.3 0 7.8-3.5 7.8-7.8a7.75 7.75 0 0 0-2.26-5.62Zm-5.55 12a6.5 6.5 0 0 1-3.3-.9l-.24-.14-2.62.69.7-2.55-.16-.26a6.47 6.47 0 0 1-1-3.46 6.5 6.5 0 0 1 6.5-6.5 6.46 6.46 0 0 1 4.6 1.91 6.46 6.46 0 0 1 1.9 4.6 6.5 6.5 0 0 1-6.5 6.5Zm3.56-4.87c-.2-.1-1.15-.57-1.33-.63-.18-.07-.31-.1-.44.1-.13.2-.5.63-.62.76-.11.13-.23.14-.42.05-.2-.1-.83-.3-1.58-.97a5.9 5.9 0 0 1-1.09-1.35c-.11-.2-.01-.3.09-.4.09-.1.2-.23.3-.34.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.37c-.13 0-.34.05-.52.24-.18.2-.68.66-.68 1.6s.7 1.86.8 1.99c.09.13 1.38 2.1 3.34 2.95.47.2.83.32 1.12.42.47.15.9.13 1.24.08.38-.06 1.15-.47 1.31-.92.16-.46.16-.85.11-.93-.05-.09-.18-.14-.38-.24Z" />
      </svg>
    </motion.a>
  );
}
