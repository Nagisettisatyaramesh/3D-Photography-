export type Package = {
  tier: "essential" | "signature" | "luxury";
  name: string;
  description: string;
  startingPrice: number;
  items: string[];
  featured?: boolean;
};

export const packages: Package[] = [
  {
    tier: "essential",
    name: "Essential",
    description: "Honest, uncomplicated coverage for an intimate celebration.",
    startingPrice: 95000,
    items: ["Traditional photography", "Single-day coverage", "Basic deliverables", "300+ edited images"],
  },
  {
    tier: "signature",
    name: "Signature",
    description: "Our most-booked collection — full storytelling, photo and film.",
    startingPrice: 185000,
    items: [
      "Candid + traditional photography",
      "Cinematic highlight film",
      "2 photographers, 1 cinematographer",
      "Premium deliverables + online gallery",
    ],
    featured: true,
  },
  {
    tier: "luxury",
    name: "Luxury",
    description: "The complete experience — every angle, every format, fully archived.",
    startingPrice: 350000,
    items: [
      "Complete photography + cinematography",
      "Drone coverage",
      "Handcrafted albums",
      "Highlight film + full feature film",
    ],
  },
];

export const packagesNote =
  "These are starting templates, not fixed menus. Every wedding gets a quotation built around what your day actually needs.";
