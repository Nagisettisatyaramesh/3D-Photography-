import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Photography Portfolio",
  description: "Pre-wedding, haldi, makeover, wedding day, half saree and child makeover photography from Unique Creations, Kakinada.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
