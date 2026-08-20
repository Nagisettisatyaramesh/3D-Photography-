import type { BrandImageKey } from "./brandImages";

export type Service = {
  slug: string;
  name: string;
  description: string;
  deliverables: string[];
  startingPrice: number;
  image: BrandImageKey;
};

// Starting prices are illustrative placeholders — set and maintained by the
// admin (Phase B), never fixed in code. Every quotation is built to the
// specific celebration; these numbers exist only to set expectations.
export const services: Service[] = [
  {
    slug: "wedding-photography",
    name: "Wedding Photography",
    description:
      "A complete visual story of your celebration — candid and traditional coverage that moves with the day rather than staging it.",
    deliverables: ["Full-day candid + traditional coverage", "Multiple photographers", "Edited high-resolution gallery"],
    startingPrice: 150000,
    image: "weddingCeremony2",
  },
  {
    slug: "cinematic-films",
    name: "Cinematic Wedding Films",
    description:
      "Your day, cut to be watched again — a film built around sound, pace and the moments that mattered most.",
    deliverables: ["Cinematic highlight film", "Full ceremony documentation", "4K delivery"],
    startingPrice: 120000,
    image: "weddingGroomPink",
  },
  {
    slug: "pre-wedding",
    name: "Pre-Wedding",
    description:
      "A relaxed shoot away from the wedding-day schedule, designed to capture the chemistry between the two of you before the big day.",
    deliverables: ["Full-day, multi-location shoot", "Creative concepts & styling support", "Edited image set"],
    startingPrice: 45000,
    image: "preWedding2",
  },
  {
    slug: "haldi-makeover",
    name: "Haldi & Makeover Coverage",
    description:
      "The colour, ritual and candid joy of Haldi and makeover functions — every detail preserved as it actually happened.",
    deliverables: ["Half or full-day coverage", "Candid family documentation", "Edited image set"],
    startingPrice: 35000,
    image: "brideHaldi1",
  },
  {
    slug: "half-saree",
    name: "Half Saree Function",
    description:
      "A celebration of tradition and the gentle transition into womanhood — photographed with the same care as a wedding.",
    deliverables: ["Full ceremony coverage", "Family portraits", "Edited image set"],
    startingPrice: 45000,
    image: "halfSaree2",
  },
  {
    slug: "destination",
    name: "Destination Weddings",
    description:
      "We travel with a small, considered crew so the story stays intimate wherever your celebration is happening.",
    deliverables: ["Multi-day event coverage", "Travel & logistics handled", "Full photo + film team"],
    startingPrice: 250000,
    image: "weddingCeremony1",
  },
];

export const pricingNote =
  "Every wedding is different. Your quote should be too — we'll build a personalised proposal based on your events, coverage, location and deliverables.";
