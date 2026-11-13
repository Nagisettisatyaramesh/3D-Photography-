import { brand, type BrandImageKey } from "./brandImages";

/**
 * Every photo on the site the admin can replace from /admin/site-images.
 * A slot's key is the built-in photo it replaces, so a slot with no upload
 * shows that photo. `width` and `height` are the smallest accepted size in
 * pixels, sized for sharp display on high-resolution screens at the
 * frame's shape.
 */
export type SiteImageSlot = {
  key: BrandImageKey;
  group: string;
  label: string;
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

const slot = <K extends BrandImageKey>(key: K, group: string, label: string, size: SlotSize) => ({
  key,
  group,
  label,
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
  slot("heroRing1", ring, "Ring photo 1", ringPanel),
  slot("heroRing2", ring, "Ring photo 2", ringPanel),
  slot("heroRing3", ring, "Ring photo 3", ringPanel),
  slot("heroRing4", ring, "Ring photo 4", ringPanel),
  slot("heroRing5", ring, "Ring photo 5", ringPanel),
  slot("heroRing6", ring, "Ring photo 6", ringPanel),
  slot("heroRing7", ring, "Ring photo 7", ringPanel),
  slot("heroRing8", ring, "Ring photo 8", ringPanel),

  slot("ourBelief1", depth, "Top left photo", depthPhoto),
  slot("ourBelief2", depth, "Top right photo", depthPhoto),
  slot("ourBelief3", depth, "Bottom right photo", depthPhoto),
  slot("ourBelief4", depth, "Bottom left photo", depthPhoto),

  slot("featuredStoryLarge", featured, "Large back photo", { width: 1000, height: 1160, maxMB: 2 }),
  slot("featuredStorySmall", featured, "Small front photo", { width: 800, height: 950, maxMB: 1 }),

  slot("galleryDepth1", gallery, "Frame 1 (far left)", galleryCard),
  slot("galleryDepth2", gallery, "Frame 2", galleryCard),
  slot("galleryDepth3", gallery, "Frame 3", galleryCard),
  slot("galleryDepth4", gallery, "Frame 4 (centre left)", galleryCard),
  slot("galleryDepth5", gallery, "Frame 5 (centre right)", galleryCard),
  slot("galleryDepth6", gallery, "Frame 6", galleryCard),
  slot("galleryDepth7", gallery, "Frame 7", galleryCard),
  slot("galleryDepth8", gallery, "Frame 8 (far right)", galleryCard),

  slot("instagram1", instagram, "Tile 1", square),
  slot("instagram2", instagram, "Tile 2", square),
  slot("instagram3", instagram, "Tile 3", square),
  slot("instagram4", instagram, "Tile 4", square),
  slot("instagram5", instagram, "Tile 5", square),
  slot("instagram6", instagram, "Tile 6", square),

  slot("backgroundPricing", backgrounds, "\"Every celebration is different\" background", cover),
  slot("backgroundQuote", backgrounds, "\"Let's start with your story\" background", cover),

  slot("coverAbout", covers, "About page cover", cover),
  slot("coverPhotography", covers, "Photography page cover", cover),
  slot("coverServices", covers, "Services page cover", cover),
  slot("coverStories", covers, "Stories page cover", cover),
  slot("coverContact", covers, "Contact page cover", cover),

  slot("storiesPreWedding", stories, "Pre-Wedding", chapter),
  slot("storiesGroomHaldi", stories, "Groom's Haldi", chapter),
  slot("storiesBrideHaldi", stories, "Bride's Haldi", chapter),
  slot("storiesMakeover", stories, "Makeover", chapter),
  slot("storiesWeddingDay", stories, "Wedding Day", chapter),
  slot("storiesHalfSaree", stories, "Half Saree", chapter),
  slot("storiesChildMakeover", stories, "Child Makeover", chapter),
] as const satisfies readonly SiteImageSlot[];

export type SiteImageKey = (typeof siteImageSlots)[number]["key"];
export type SiteImageOverrides = Partial<Record<string, string>>;

export const siteImageTypes = ["image/jpeg", "image/png", "image/webp"];

export function findSiteImageSlot(key: string): SiteImageSlot | undefined {
  return siteImageSlots.find((s) => s.key === key);
}

/** The admin's photo in a slot, or the built-in photo it replaces. */
export function resolveSiteImage(overrides: SiteImageOverrides, key: SiteImageKey): string {
  return overrides[key] ?? brand[key];
}
