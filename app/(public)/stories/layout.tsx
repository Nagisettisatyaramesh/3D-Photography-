import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories",
  description: "A celebration told one ritual at a time — from pre-wedding to the big day, half saree and child makeover.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
