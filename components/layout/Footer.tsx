import Link from "next/link";
import { siteConfig } from "@/lib/content/siteConfig";
import type { LiveSettings } from "@/lib/content/liveSettings";

export function Footer({ settings }: { settings: LiveSettings }) {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-black px-6 pb-10 pt-24 text-parchment md:px-12">
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 w-full -translate-x-1/2 text-center font-serif text-[22vw] italic leading-none text-parchment/5 md:text-[14vw]"
      >
        {settings.studioName}
      </p>

      <div className="relative mx-auto grid max-w-[1600px] gap-14 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-serif text-3xl italic">{settings.studioName}</p>
          <p className="mt-3 font-script text-2xl text-terracotta-soft">{settings.tagline}</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-parchment/60">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit text-[11px] uppercase tracking-[0.18em] text-terracotta hover:text-parchment"
            >
              Follow on Instagram →
            </a>
            {settings.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit text-[11px] uppercase tracking-[0.18em] text-terracotta hover:text-parchment"
              >
                Watch on YouTube →
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-5 text-parchment/40">Navigate</p>
          <ul className="flex flex-col gap-3">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-parchment/75 hover:text-parchment">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5 text-parchment/40">Services</p>
          <ul className="flex flex-col gap-3">
            {siteConfig.footerLinks.services.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-parchment/75 hover:text-parchment">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5 text-parchment/40">Contact</p>
          <ul className="flex flex-col gap-3 text-sm text-parchment/75">
            <li>{settings.phone}</li>
            <li>{settings.email}</li>
            <li>{settings.address}</li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-[1600px] flex-col items-start justify-between gap-4 border-t border-parchment/10 pt-8 text-xs text-parchment/40 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} {settings.studioName}. All rights reserved.</p>
        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
