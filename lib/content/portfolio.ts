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

// Verbatim from the studio's own portfolio deck (the PDF they hand to
// couples) — do not paraphrase; this is the studio's own voice.
export const categoryCopy: Record<PortfolioCategory, string> = {
  "Pre-Wedding":
    "At Unique Creations, our Pre-Wedding shoots are designed to beautifully capture the love and chemistry between couples before their big day. With creative concepts, stunning backdrops, and cinematic storytelling, we turn your journey of togetherness into timeless memories that reflect your unique bond.",
  "Groom's Haldi":
    "At Unique Creations, we capture the vibrant essence of the Groom's Haldi with candid moments, joyful colors, and heartfelt emotions. From playful rituals to the warmth of family and friends, our photography and videography ensure every detail of this lively celebration is preserved as a cherished memory forever.",
  "Bride's Haldi":
    "At Unique Creations, we beautifully capture the grace and charm of a Bride's traditional Haldi ceremony. From the radiant glow of turmeric to the laughter and blessings of loved ones, our photography and videography preserve every vibrant detail, turning these heartfelt rituals into timeless memories filled with love and tradition.",
  Makeover:
    "At Unique Creations, we showcase the vibrant charm of a Stylish Makeover Haldi with a perfect blend of tradition and modern elegance. From trendy décor to the bride's stunning look and the joyful vibe of the celebration, our photography and videography capture every lively detail, turning the event into a collection of unforgettable memories.",
  "Wedding Day":
    "At Unique Creations, we beautifully capture the rich traditions and vibrant rituals of a Telugu wedding with artistry and elegance. From the sacred moments of the ceremony to the joyful celebrations with family and friends, our photography and videography preserve every detail, ensuring your special day is remembered as a timeless story of love and culture.",
  "Half Saree":
    "A celebration of tradition, grace and the gentle transition from childhood to womanhood. Wrapped in vibrant silks, radiant smiles, and timeless rituals, every moment tells a story of culture, blessings, and family love.",
  "Child Makeover":
    "Every child is a little bundle of magic — pure smiles, sparkling eyes, and endless innocence. A child makeover isn't about changing who they are, but gently enhancing their natural charm while letting their personality shine through.",
};

export type PortfolioItem = {
  id: string;
  image: BrandImageKey;
  category: PortfolioCategory;
  orientation: "portrait" | "landscape";
};

export const portfolio: PortfolioItem[] = [
  { id: "pw1", image: "preWedding1", category: "Pre-Wedding", orientation: "portrait" },
  { id: "pw2", image: "preWedding2", category: "Pre-Wedding", orientation: "portrait" },
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
  { id: "mk4", image: "makeoverGroomDark", category: "Makeover", orientation: "portrait" },

  { id: "wd1", image: "weddingGroomPink", category: "Wedding Day", orientation: "portrait" },
  { id: "wd2", image: "weddingBridePlate", category: "Wedding Day", orientation: "landscape" },
  { id: "wd3", image: "weddingBrideOrange", category: "Wedding Day", orientation: "portrait" },
  { id: "wd4", image: "weddingCeremony1", category: "Wedding Day", orientation: "portrait" },
  { id: "wd5", image: "weddingCeremony2", category: "Wedding Day", orientation: "landscape" },
  { id: "wd6", image: "weddingCeremony3", category: "Wedding Day", orientation: "portrait" },

  { id: "hs1", image: "halfSaree1", category: "Half Saree", orientation: "landscape" },
  { id: "hs2", image: "halfSaree2", category: "Half Saree", orientation: "landscape" },
  { id: "hs3", image: "halfSaree3", category: "Half Saree", orientation: "portrait" },

  { id: "cm1", image: "childMakeover1", category: "Child Makeover", orientation: "portrait" },
  { id: "cm2", image: "childMakeover2", category: "Child Makeover", orientation: "landscape" },
  { id: "cm3", image: "childMehndi", category: "Child Makeover", orientation: "landscape" },
  { id: "cm4", image: "childMakeover3", category: "Child Makeover", orientation: "portrait" },
];
