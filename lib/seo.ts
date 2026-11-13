import { siteConfig } from "@/lib/content/siteConfig";

// Canonical public origin. The live site is uniquecreations.co.in; a test
// deployment can override it with NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_ORIGIN || "https://uniquecreations.co.in"
).replace(/\/+$/, "");

// Structured studio address used for search engines (LocalBusiness JSON-LD).
// Keep it identical to the Google Business Profile listing.
export const studioAddress = {
  streetAddress: "Shop No 5, First Floor, Zilla Parishad Complex, NH 216, Rama Rao Peta",
  addressLocality: "Kakinada",
  addressRegion: "Andhra Pradesh",
  postalCode: "533001",
  addressCountry: "IN",
} as const;

// Towns the studio travels to. Shown to search engines as `areaServed`.
export const areasServed = [
  "Kakinada",
  "Rajahmundry",
  "Samalkot",
  "Pithapuram",
  "Peddapuram",
  "Amalapuram",
  "Tuni",
  "Mandapeta",
  "Ramachandrapuram",
  "East Godavari",
  "Andhra Pradesh",
];

export const siteKeywords = [
  "wedding photographers in Kakinada",
  "best wedding photographer in Kakinada",
  "candid wedding photography Kakinada",
  "wedding videographer in Kakinada",
  "cinematic wedding films Andhra Pradesh",
  "photography studio in Kakinada",
  "photographers near me",
  "wedding photographers near me",
  "Telugu wedding photography",
  "pre-wedding shoot Kakinada",
  "half saree function photography",
  "haldi photography Kakinada",
  "child makeover photoshoot Kakinada",
  "event photographer Kakinada",
  "wedding photographer Rajahmundry",
  "wedding photographer East Godavari",
];

// The placeholder phone in siteConfig must never reach search engines.
const PLACEHOLDER_PHONE = "+91 98765 43210";

type JsonLdInput = {
  studioName: string;
  phone: string;
  email: string;
  instagram: string;
  youtube: string;
};

export function localBusinessJsonLd(settings: JsonLdInput) {
  const phone = settings.phone && settings.phone !== PLACEHOLDER_PHONE ? settings.phone : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#studio`,
    name: settings.studioName,
    description: siteConfig.brandStatement,
    url: SITE_URL,
    image: `${SITE_URL}/brand/share-logo-square.png`,
    logo: `${SITE_URL}/brand/share-logo-square.png`,
    ...(phone ? { telephone: phone } : {}),
    email: settings.email,
    address: { "@type": "PostalAddress", ...studioAddress },
    hasMap: studioMapsUrl,
    areaServed: areasServed.map((name) => ({ "@type": "Place", name })),
    sameAs: [settings.instagram, settings.youtube].filter(Boolean),
    priceRange: "₹₹",
    knowsAbout: [
      "Wedding photography",
      "Cinematic wedding films",
      "Pre-wedding shoots",
      "Half saree function photography",
      "Haldi photography",
      "Child makeover photography",
      "Event photography",
    ],
  };
}

export const studioMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Unique Creations, ${studioAddress.streetAddress}, ${studioAddress.addressLocality}, ${studioAddress.addressRegion} ${studioAddress.postalCode}`,
)}`;

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
