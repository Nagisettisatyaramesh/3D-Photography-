import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Photography Packages & Prices in Kakinada",
  description:
    "Wedding photography, cinematic films, pre-wedding, half saree, haldi and child makeover packages in Kakinada — starting prices and custom quotes.",
  keywords: ["wedding photography packages Kakinada", "wedding photographer price Kakinada", "half saree function photography", "child makeover photoshoot Kakinada"],
  alternates: { canonical: "/services" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
