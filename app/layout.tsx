import type { Metadata } from "next";
import { Bodoni_Moda, Petit_Formal_Script, Urbanist } from "next/font/google";
import "./globals.css";
import { getWebsiteSettings } from "@/lib/content/liveSettings";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const script = Petit_Formal_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings();
  return {
    title: `${settings.studioName} — ${settings.tagline}`,
    description: `Wedding photography and films by ${settings.studioName}.`,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodoni.variable} ${script.variable} ${urbanist.variable}`}>
      <body className="bg-parchment text-ink antialiased">{children}</body>
    </html>
  );
}
