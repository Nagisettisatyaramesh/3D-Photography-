import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Stories from Kakinada & East Godavari",
  description:
    "Real celebrations told one ritual at a time — pre-wedding, wedding day, half saree and child makeover stories by Unique Creations, Kakinada.",
  keywords: ["Telugu wedding stories", "wedding photographers East Godavari"],
  alternates: { canonical: "/stories" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
