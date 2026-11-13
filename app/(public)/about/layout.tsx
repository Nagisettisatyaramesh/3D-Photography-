import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Kakinada Photography Studio",
  description:
    "Unique Creations is a wedding photography and videography studio in Rama Rao Peta, Kakinada, Andhra Pradesh — capturing weddings and celebrations across East Godavari.",
  keywords: ["photography studio in Kakinada", "photographers in Kakinada", "wedding photographers near me"],
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
