import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description: "Tell us your date and vision — Unique Creations will reply with a proposal built around your celebration.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
