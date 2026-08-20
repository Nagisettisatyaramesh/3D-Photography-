"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/content/siteConfig";
import { buildWhatsAppLink } from "@/lib/utils";
import { brand } from "@/lib/content/brandImages";
import { driftUp, expandReveal, staggerFloat, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/ui/RevealText";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

const contactDetails = [
  { label: "Phone", value: siteConfig.phone, icon: "phone" as const },
  { label: "Email", value: siteConfig.email, icon: "mail" as const },
  { label: "Studio", value: siteConfig.address, icon: "pin" as const },
];

const contactLinks = [
  {
    label: "WhatsApp",
    href: buildWhatsAppLink("Hi! I'd love to talk about my wedding date.", siteConfig.whatsapp),
    icon: "whatsapp" as const,
  },
  { label: "Instagram", href: siteConfig.instagram, icon: "instagram" as const },
  { label: "Google Maps", href: siteConfig.mapsUrl, icon: "pin" as const },
];

export default function ContactPage() {
  return (
    <main>
      <section className="relative flex h-[55svh] min-h-[420px] w-full items-end overflow-hidden bg-black">
        <motion.div
          variants={expandReveal}
          initial="hidden"
          animate="visible"
          className="absolute inset-0"
        >
          <Image
            src={brand.weddingCeremony3}
            alt="Bride receiving a blessing during the ceremony"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
        </motion.div>

        <div className="relative z-10 px-6 pb-14 text-parchment md:px-12 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="eyebrow mb-4 text-terracotta-soft"
          >
            Contact
          </motion.p>
          <RevealText
            as="h1"
            lines={["Let's start with", "your story."]}
            triggerOnMount
            delay={0.7}
            className="font-serif text-5xl italic leading-[1.05] md:text-7xl"
          />
        </div>
      </section>

      <section className="bg-blush/40 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <motion.div
            variants={staggerFloat(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col justify-between"
          >
            <div>
              <motion.p variants={driftUp} className="eyebrow mb-3 text-terracotta">
                Get in Touch
              </motion.p>
              <motion.p variants={driftUp} className="max-w-sm font-serif text-2xl italic leading-snug md:text-3xl">
                We&apos;d love to hear about your celebration, wherever it&apos;s happening.
              </motion.p>

              <div className="mt-12 flex flex-col gap-8">
                {contactDetails.map((detail) => (
                  <motion.div key={detail.label} variants={driftUp} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-terracotta/40 text-terracotta">
                      <Icon name={detail.icon} />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-ink/45">{detail.label}</p>
                      <p className="mt-1 text-base leading-relaxed text-ink">{detail.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={driftUp} className="mt-14 flex flex-col gap-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover="true"
                  className="group flex items-center justify-between border-t border-ink/10 py-4 text-sm transition-colors hover:text-terracotta"
                >
                  <span className="flex items-center gap-3">
                    <Icon name={link.icon} className="h-4 w-4" />
                    {link.label}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              ))}
              <div className="border-t border-ink/10" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={expandReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="border border-ink/10 bg-parchment p-8 shadow-[0_30px_60px_-30px_rgba(20,17,16,0.25)] md:p-12"
          >
            <p className="eyebrow mb-2 text-terracotta">Enquiry</p>
            <p className="mb-10 font-serif text-2xl italic">Tell us about your day.</p>
            <EnquiryForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function Icon({ name, className }: { name: "phone" | "mail" | "pin" | "whatsapp" | "instagram"; className?: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
  const cls = className ?? "h-4 w-4";

  switch (name) {
    case "phone":
      return (
        <svg {...common} className={cls}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 5c0-.6.4-1 1-1h3.2c.5 0 .9.3 1 .8l.8 3.3c.1.4 0 .9-.4 1.2l-1.7 1.4a13 13 0 0 0 5.4 5.4l1.4-1.7c.3-.4.8-.5 1.2-.4l3.3.8c.5.1.8.5.8 1V19c0 .6-.4 1-1 1h-1.5C9.6 20 4 14.4 4 6.5V5Z"
          />
        </svg>
      );
    case "mail":
      return (
        <svg {...common} className={cls}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 7 7.5 6 7.5-6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common} className={cls}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
          />
          <circle cx="12" cy="9.5" r="2.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4c-4.3 0-7.8 3.5-7.8 7.8 0 1.38.36 2.72 1.05 3.9L4 20l4.42-1.16a7.8 7.8 0 0 0 3.63.9h.01c4.3 0 7.8-3.5 7.8-7.8a7.75 7.75 0 0 0-2.26-5.62Zm-5.55 12a6.5 6.5 0 0 1-3.3-.9l-.24-.14-2.62.69.7-2.55-.16-.26a6.47 6.47 0 0 1-1-3.46 6.5 6.5 0 0 1 6.5-6.5 6.46 6.46 0 0 1 4.6 1.91 6.46 6.46 0 0 1 1.9 4.6 6.5 6.5 0 0 1-6.5 6.5Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} className={cls}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
