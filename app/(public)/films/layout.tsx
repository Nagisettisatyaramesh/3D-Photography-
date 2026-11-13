import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinematic Wedding Films in Kakinada",
  description:
    "Cinematic wedding films, teasers, engagement and pre-wedding videos by Unique Creations, a wedding videographer in Kakinada, Andhra Pradesh.",
  keywords: ["wedding videographer in Kakinada", "cinematic wedding films Kakinada", "wedding teaser video Andhra Pradesh"],
  alternates: { canonical: "/films" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
