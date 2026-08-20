import type { BrandImageKey } from "./brandImages";

export const portfolioCategories = [
  "Pre-Wedding",
  "Groom's Haldi",
  "Bride's Haldi",
  "Makeover",
  "Wedding Day",
  "Half Saree",
  "Child Makeover",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export const categoryCopy: Record<PortfolioCategory, string> = {
  "Pre-Wedding":
    "Designed to beautifully capture the love and chemistry between couples before their big day — creative concepts, stunning backdrops and cinematic storytelling.",
  "Groom's Haldi":
    "The vibrant essence of the Haldi — candid moments, joyful colour and the warmth of family, preserved as a cherished memory.",
  "Bride's Haldi":
    "The grace and charm of a bride's traditional Haldi — the radiant glow of turmeric, laughter, and the blessings of loved ones.",
  Makeover:
    "The vibrant charm of a stylish makeover — a perfect blend of tradition and modern elegance, from décor to the bride's stunning look.",
  "Wedding Day":
    "The rich traditions and vibrant rituals of a Telugu wedding — every sacred moment and joyful celebration, preserved as a timeless story of love and culture.",
  "Half Saree":
    "A celebration of tradition, grace and the gentle transition from childhood to womanhood — wrapped in vibrant silks and timeless rituals.",
  "Child Makeover":
    "Every child is a little bundle of magic — pure smiles, sparkling eyes and endless innocence, gently enhanced rather than changed.",
};

export type PortfolioItem = {
  id: string;
  image: BrandImageKey;
  category: PortfolioCategory;
  orientation: "portrait" | "landscape";
};

export const portfolio: PortfolioItem[] = [
  { id: "pw1", image: "preWedding1", category: "Pre-Wedding", orientation: "landscape" },
  { id: "pw2", image: "preWedding2", category: "Pre-Wedding", orientation: "landscape" },
  { id: "pw3", image: "preWedding3", category: "Pre-Wedding", orientation: "portrait" },

  { id: "gh1", image: "groomSolo", category: "Groom's Haldi", orientation: "portrait" },
  { id: "gh2", image: "groomHaldi1", category: "Groom's Haldi", orientation: "portrait" },
  { id: "gh3", image: "groomHaldi2", category: "Groom's Haldi", orientation: "portrait" },

  { id: "bh1", image: "brideHaldiPot", category: "Bride's Haldi", orientation: "portrait" },
  { id: "bh2", image: "brideHaldiJewelry", category: "Bride's Haldi", orientation: "portrait" },
  { id: "bh3", image: "brideHaldi1", category: "Bride's Haldi", orientation: "portrait" },
  { id: "bh4", image: "brideHaldi2", category: "Bride's Haldi", orientation: "portrait" },

  { id: "mk1", image: "makeoverBrideCloseup", category: "Makeover", orientation: "landscape" },
  { id: "mk2", image: "makeoverCoupleBw", category: "Makeover", orientation: "portrait" },
  { id: "mk3", image: "makeoverJewelryDetail", category: "Makeover", orientation: "portrait" },
  { id: "mk4", image: "makeoverGroomDark", category: "Makeover", orientation: "landscape" },

  { id: "wd1", image: "weddingGroomPink", category: "Wedding Day", orientation: "portrait" },
  { id: "wd2", image: "weddingBridePlate", category: "Wedding Day", orientation: "landscape" },
  { id: "wd3", image: "weddingBrideOrange", category: "Wedding Day", orientation: "portrait" },
  { id: "wd4", image: "weddingCeremony1", category: "Wedding Day", orientation: "portrait" },
  { id: "wd5", image: "weddingCeremony2", category: "Wedding Day", orientation: "landscape" },
  { id: "wd6", image: "weddingCeremony3", category: "Wedding Day", orientation: "portrait" },

  { id: "hs1", image: "halfSaree1", category: "Half Saree", orientation: "landscape" },
  { id: "hs2", image: "halfSaree2", category: "Half Saree", orientation: "landscape" },
  { id: "hs3", image: "halfSaree3", category: "Half Saree", orientation: "portrait" },

  { id: "cm1", image: "childMakeover1", category: "Child Makeover", orientation: "landscape" },
  { id: "cm2", image: "childMakeover2", category: "Child Makeover", orientation: "portrait" },
  { id: "cm3", image: "childMehndi", category: "Child Makeover", orientation: "landscape" },
  { id: "cm4", image: "childMakeover3", category: "Child Makeover", orientation: "portrait" },
];
