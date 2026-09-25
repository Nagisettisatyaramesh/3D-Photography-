import type { Metadata } from "next";
import Script from "next/script";
import { Bodoni_Moda, Petit_Formal_Script, Urbanist } from "next/font/google";
import "./globals.css";
import { getWebsiteSettings } from "@/lib/content/liveSettings";

// AI Website Assistant chatbot widget — only loaded when its source is set
// in the environment. (It used to fall back to a temporary tunnel URL that
// is no longer reachable, which made every page request a dead script.)
const CHATBOT_WIDGET_SRC = process.env.NEXT_PUBLIC_CHATBOT_WIDGET_SRC;
const CHATBOT_CLIENT_ID = process.env.NEXT_PUBLIC_CHATBOT_CLIENT_ID || "UNIQUE_CREATIONS_001";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://3-d-photography.vercel.app";

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
  const description = `Wedding photography and cinematic films by ${settings.studioName} — ${settings.tagline}.`;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${settings.studioName} — ${settings.tagline}`,
      template: `%s — ${settings.studioName}`,
    },
    description,
    openGraph: {
      type: "website",
      siteName: settings.studioName,
      title: `${settings.studioName} — ${settings.tagline}`,
      description,
      images: [{ url: "/brand/wedding-ceremony-2.jpg", alt: `${settings.studioName} wedding photography` }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodoni.variable} ${script.variable} ${urbanist.variable}`}>
      <body className="bg-parchment text-ink antialiased">
        {children}
        {CHATBOT_WIDGET_SRC && (
          <Script src={CHATBOT_WIDGET_SRC} data-client-id={CHATBOT_CLIENT_ID} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
