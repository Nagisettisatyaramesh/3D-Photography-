import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Wedding photography, cinematic films, pre-wedding, haldi and makeover coverage — with starting prices and custom quotes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
