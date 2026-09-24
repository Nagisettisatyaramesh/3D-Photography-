import type { Metadata } from "next";
import Script from "next/script";
import { Bodoni_Moda, Petit_Formal_Script, Urbanist } from "next/font/google";
import "./globals.css";
import { getWebsiteSettings } from "@/lib/content/liveSettings";

// AI Website Assistant chatbot widget. The env vars let the widget source
// and client id be swapped (e.g. once the backend moves off its temporary
// test tunnel to a permanent deployment) without another code change; the
// fallbacks below are today's values so the widget still works if those
// vars aren't set in Vercel's project settings yet.
const CHATBOT_WIDGET_SRC =
  process.env.NEXT_PUBLIC_CHATBOT_WIDGET_SRC || "https://cegle-223-196-192-103.free.pinggy.net/widget.js";
const CHATBOT_CLIENT_ID = process.env.NEXT_PUBLIC_CHATBOT_CLIENT_ID || "UNIQUE_CREATIONS_001";

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
      <body className="bg-parchment text-ink antialiased">
        {children}
        <Script src={CHATBOT_WIDGET_SRC} data-client-id={CHATBOT_CLIENT_ID} strategy="afterInteractive" />
      </body>
    </html>
  );
}
