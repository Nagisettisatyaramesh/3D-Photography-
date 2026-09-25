import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Films & Trailers",
  description: "Cinematic wedding films, trailers, engagement and pre-wedding videos by Unique Creations, Kakinada.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
