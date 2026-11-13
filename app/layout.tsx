import type { Metadata } from "next";
import Script from "next/script";
import { Bodoni_Moda, Petit_Formal_Script, Urbanist } from "next/font/google";
import "./globals.css";
import { getWebsiteSettings } from "@/lib/content/liveSettings";
import { SITE_URL, jsonLdScript, localBusinessJsonLd, siteKeywords } from "@/lib/seo";

// AI Website Assistant chatbot widget — only loaded when its source is set
// in the environment. (It used to fall back to a temporary tunnel URL that
// is no longer reachable, which made every page request a dead script.)
const CHATBOT_WIDGET_SRC = process.env.NEXT_PUBLIC_CHATBOT_WIDGET_SRC;
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
  const title = `${settings.studioName} — Wedding Photographers in Kakinada`;
  const description = `${settings.studioName} is a wedding photography and cinematic films studio in Kakinada, Andhra Pradesh — candid wedding, pre-wedding, half saree, haldi and child makeover shoots across East Godavari.`;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${settings.studioName}`,
    },
    description,
    keywords: siteKeywords,
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    other: {
      "geo.region": "IN-AP",
      "geo.placename": "Kakinada",
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: "/",
      siteName: settings.studioName,
      title,
      description,
      images: [{ url: "/brand/share-logo-square.png", width: 1200, height: 1200, alt: `${settings.studioName} logo` }],
    },
    twitter: { card: "summary_large_image", images: ["/brand/share-logo-square.png"] },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getWebsiteSettings();
  return (
    <html lang="en-IN" className={`${bodoni.variable} ${script.variable} ${urbanist.variable}`}>
      <body className="bg-parchment text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(localBusinessJsonLd(settings))} />
        {children}
        {CHATBOT_WIDGET_SRC && (
          <Script src={CHATBOT_WIDGET_SRC} data-client-id={CHATBOT_CLIENT_ID} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
