import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Photography Portfolio — Kakinada",
  description:
    "Candid wedding, pre-wedding, haldi, half saree and child makeover photography from Unique Creations, wedding photographers in Kakinada.",
  keywords: ["candid wedding photographer Kakinada", "Telugu wedding photography", "pre-wedding shoot Kakinada"],
  alternates: { canonical: "/photography" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
