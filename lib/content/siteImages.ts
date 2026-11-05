import { brand } from "./brandImages";

/**
 * Every photo on the site the admin can replace from /admin/site-images.
 * `width` and `height` are the smallest accepted size in pixels, sized for
 * sharp display on high-resolution screens at the frame's shape.
 */
export type SiteImageSlot = {
  key: string;
  group: string;
  label: string;
  fallback: string;
  width: number;
  height: number;
  maxMB: number;
  /** The frame shows the whole photo, so a different shape isn't cropped. */
  uncropped?: boolean;
};

type SlotSize = Pick<SiteImageSlot, "width" | "height" | "maxMB" | "uncropped">;

const ringPanel: SlotSize = { width: 1040, height: 1520, maxMB: 2 };
const depthPhoto: SlotSize = { width: 600, height: 800, maxMB: 1 };
const galleryCard: SlotSize = { width: 1120, height: 1660, maxMB: 2 };
const square: SlotSize = { width: 800, height: 800, maxMB: 1 };
const cover: SlotSize = { width: 1920, height: 1080, maxMB: 3 };
const chapter: SlotSize = { width: 1000, height: 1250, maxMB: 2, uncropped: true };

const slot = <K extends string>(key: K, group: string, label: string, fallback: string, size: SlotSize) => ({
  key,
  group,
  label,
  fallback,
  ...size,
});

const ring = "Home: hero ring";
const depth = "Home: \"Our belief\" section";
const featured = "Home: featured story";
const gallery = "Home: \"A gallery in depth\"";
const instagram = "Home: Instagram grid";
const backgrounds = "Home: section backgrounds";
const covers = "Page cover pictures";
const stories = "Stories page chapters";

export const siteImageSlots = [
  slot("hero-ring-1", ring, "Ring photo 1", brand.weddingCeremony2, ringPanel),
  slot("hero-ring-2", ring, "Ring photo 2", brand.preWedding2, ringPanel),
  slot("hero-ring-3", ring, "Ring photo 3", brand.halfSaree2, ringPanel),
  slot("hero-ring-4", ring, "Ring photo 4", brand.weddingBridePlate, ringPanel),
  slot("hero-ring-5", ring, "Ring photo 5", brand.childMehndi, ringPanel),
  slot("hero-ring-6", ring, "Ring photo 6", brand.preWedding3, ringPanel),
  slot("hero-ring-7", ring, "Ring photo 7", brand.weddingGroomPink, ringPanel),
  slot("hero-ring-8", ring, "Ring photo 8", brand.weddingBrideOrange, ringPanel),

  slot("depth-1", depth, "Top left photo", brand.preWedding1, depthPhoto),
  slot("depth-2", depth, "Top right photo", brand.weddingBrideOrange, depthPhoto),
  slot("depth-3", depth, "Bottom right photo", brand.childMakeover2, depthPhoto),
  slot("depth-4", depth, "Bottom left photo", brand.weddingGroomPink, depthPhoto),

  slot("featured-back", featured, "Large back photo", brand.weddingCeremony2, { width: 1000, height: 1160, maxMB: 2 }),
  slot("featured-front", featured, "Small front photo", brand.weddingBridePlate, { width: 800, height: 950, maxMB: 1 }),

  slot("gallery-1", gallery, "Frame 1 (far left)", brand.weddingBrideOrange, galleryCard),
  slot("gallery-2", gallery, "Frame 2", brand.preWedding2, galleryCard),
  slot("gallery-3", gallery, "Frame 3", brand.halfSaree1, galleryCard),
  slot("gallery-4", gallery, "Frame 4 (centre)", brand.weddingCeremony3, galleryCard),
  slot("gallery-5", gallery, "Frame 5", brand.preWedding1, galleryCard),
  slot("gallery-6", gallery, "Frame 6", brand.makeoverGroomDark, galleryCard),
  slot("gallery-7", gallery, "Frame 7 (far right)", brand.childMakeover2, galleryCard),

  slot("instagram-1", instagram, "Tile 1", brand.preWedding1, square),
  slot("instagram-2", instagram, "Tile 2", brand.weddingCeremony1, square),
  slot("instagram-3", instagram, "Tile 3", brand.halfSaree1, square),
  slot("instagram-4", instagram, "Tile 4", brand.weddingBrideOrange, square),
  slot("instagram-5", instagram, "Tile 5", brand.childMakeover2, square),
  slot("instagram-6", instagram, "Tile 6", brand.preWedding3, square),

  slot("pricing-background", backgrounds, "\"Every wedding is different\" background", brand.makeoverJewelryDetail, cover),
  slot("quote-background", backgrounds, "\"Let's start with your story\" background", brand.halfSaree1, cover),

  slot("cover-about", covers, "About page cover", brand.halfSaree2, cover),
  slot("cover-photography", covers, "Photography page cover", brand.halfSaree1, cover),
  slot("cover-services", covers, "Services page cover", brand.weddingBridePlate, cover),
  slot("cover-stories", covers, "Stories page cover", brand.childMehndi, cover),
  slot("cover-contact", covers, "Contact page cover", brand.makeoverBrideCloseup, cover),

  slot("story-pre-wedding", stories, "Pre-Wedding", brand.preWedding2, chapter),
  slot("story-groom-haldi", stories, "Groom's Haldi", brand.groomHaldi1, chapter),
  slot("story-bride-haldi", stories, "Bride's Haldi", brand.brideHaldi2, chapter),
  slot("story-makeover", stories, "Makeover", brand.makeoverGroomDark, chapter),
  slot("story-wedding-day", stories, "Wedding Day", brand.weddingCeremony2, chapter),
  slot("story-half-saree", stories, "Half Saree", brand.halfSaree2, chapter),
  slot("story-child-makeover", stories, "Child Makeover", brand.childMakeover2, chapter),
] as const satisfies readonly SiteImageSlot[];

export type SiteImageKey = (typeof siteImageSlots)[number]["key"];
export type SiteImageOverrides = Partial<Record<string, string>>;

export const siteImageTypes = ["image/jpeg", "image/png", "image/webp"];

export function findSiteImageSlot(key: string): SiteImageSlot | undefined {
  return siteImageSlots.find((s) => s.key === key);
}

const fallbacks = new Map<string, string>(siteImageSlots.map((s) => [s.key, s.fallback]));

export function resolveSiteImage(overrides: SiteImageOverrides, key: SiteImageKey): string {
  return overrides[key] ?? fallbacks.get(key)!;
}
