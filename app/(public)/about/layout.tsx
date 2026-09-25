import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Unique Creations is a photography and videography studio in Kakinada, Andhra Pradesh, capturing weddings and celebrations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
