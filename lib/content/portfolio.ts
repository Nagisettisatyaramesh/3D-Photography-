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
  { id: "pre-wedding-1", image: "photoPreWedding1", category: "Pre-Wedding", orientation: "portrait" },
  { id: "pre-wedding-2", image: "photoPreWedding2", category: "Pre-Wedding", orientation: "portrait" },
  { id: "pre-wedding-3", image: "photoPreWedding3", category: "Pre-Wedding", orientation: "portrait" },

  { id: "groom-haldi-1", image: "photoGroomHaldi1", category: "Groom's Haldi", orientation: "portrait" },
  { id: "groom-haldi-2", image: "photoGroomHaldi2", category: "Groom's Haldi", orientation: "portrait" },
  { id: "groom-haldi-3", image: "photoGroomHaldi3", category: "Groom's Haldi", orientation: "portrait" },

  { id: "bride-haldi-1", image: "photoBrideHaldi1", category: "Bride's Haldi", orientation: "landscape" },
  { id: "bride-haldi-2", image: "photoBrideHaldi2", category: "Bride's Haldi", orientation: "landscape" },
  { id: "bride-haldi-3", image: "photoBrideHaldi3", category: "Bride's Haldi", orientation: "portrait" },
  { id: "bride-haldi-4", image: "photoBrideHaldi4", category: "Bride's Haldi", orientation: "portrait" },

  { id: "makeover-1", image: "photoMakeover1", category: "Makeover", orientation: "portrait" },
  { id: "makeover-2", image: "photoMakeover2", category: "Makeover", orientation: "portrait" },

  { id: "wedding-1", image: "photoWedding1", category: "Wedding Day", orientation: "portrait" },
  { id: "wedding-2", image: "photoWedding2", category: "Wedding Day", orientation: "landscape" },
  { id: "wedding-3", image: "photoWedding3", category: "Wedding Day", orientation: "portrait" },
  { id: "wedding-4", image: "photoWedding4", category: "Wedding Day", orientation: "portrait" },
  { id: "wedding-5", image: "photoWedding5", category: "Wedding Day", orientation: "landscape" },
  { id: "wedding-6", image: "photoWedding6", category: "Wedding Day", orientation: "portrait" },
  { id: "wedding-7", image: "photoWedding7", category: "Wedding Day", orientation: "portrait" },
  { id: "wedding-8", image: "photoWedding8", category: "Wedding Day", orientation: "portrait" },
  { id: "wedding-9", image: "photoWedding9", category: "Wedding Day", orientation: "portrait" },
  { id: "wedding-10", image: "photoWedding10", category: "Wedding Day", orientation: "portrait" },

  { id: "half-saree-1", image: "photoHalfSaree1", category: "Half Saree", orientation: "landscape" },
  { id: "half-saree-2", image: "photoHalfSaree2", category: "Half Saree", orientation: "landscape" },
  { id: "half-saree-3", image: "photoHalfSaree3", category: "Half Saree", orientation: "portrait" },
  { id: "half-saree-4", image: "photoHalfSaree4", category: "Half Saree", orientation: "portrait" },
  { id: "half-saree-5", image: "photoHalfSaree5", category: "Half Saree", orientation: "portrait" },

  { id: "child-1", image: "photoChild1", category: "Child Makeover", orientation: "portrait" },
  { id: "child-2", image: "photoChild2", category: "Child Makeover", orientation: "landscape" },
  { id: "child-3", image: "photoChild3", category: "Child Makeover", orientation: "landscape" },
  { id: "child-4", image: "photoChild4", category: "Child Makeover", orientation: "portrait" },
];
