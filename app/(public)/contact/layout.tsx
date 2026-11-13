import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Quote — Photographers near you in Kakinada",
  description:
    "Visit Unique Creations at Zilla Parishad Complex, NH 216, Rama Rao Peta, Kakinada 533001, or send your date for a wedding photography quote.",
  keywords: ["photographers near me", "photo studio near me Kakinada", "wedding photography quote Kakinada"],
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
