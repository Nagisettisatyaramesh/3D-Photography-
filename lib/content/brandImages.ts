/**
 * Real studio photography, extracted from the business's own quotation/
 * portfolio deck ("Quotation for Nanda Kishore & Sravani"). These are the
 * primary image source for the site — swappable later per-image via the
 * admin Image Library (Phase B) without touching component code.
 */
export const brand = {
  heroRing1: "/brand/hero-ring-1.jpg",
  heroRing2: "/brand/hero-ring-2.jpg",
  heroRing3: "/brand/hero-ring-3.jpg",
  heroRing4: "/brand/hero-ring-4.jpg",
  heroRing5: "/brand/hero-ring-5.jpg",
  heroRing6: "/brand/hero-ring-6.jpg",
  heroRing7: "/brand/hero-ring-7.jpg",
  heroRing8: "/brand/hero-ring-8.jpg",

  ourBelief1: "/brand/our-belief-1.jpg",
  ourBelief2: "/brand/our-belief-2.jpg",
  ourBelief3: "/brand/our-belief-3.jpg",
  ourBelief4: "/brand/our-belief-4.jpg",

  featuredStoryLarge: "/brand/featured-story-large.jpg",
  featuredStorySmall: "/brand/featured-story-small.jpg",

  galleryDepth1: "/brand/gallery-depth-1.jpg",
  galleryDepth2: "/brand/gallery-depth-2.jpg",
  galleryDepth3: "/brand/gallery-depth-3.jpg",
  galleryDepth4: "/brand/gallery-depth-4.jpg",
  galleryDepth5: "/brand/gallery-depth-5.jpg",
  galleryDepth6: "/brand/gallery-depth-6.jpg",
  galleryDepth7: "/brand/gallery-depth-7.jpg",
  galleryDepth8: "/brand/gallery-depth-8.jpg",

  instagram1: "/brand/instagram-1.jpg",
  instagram2: "/brand/instagram-2.jpg",
  instagram3: "/brand/instagram-3.jpg",
  instagram4: "/brand/instagram-4.jpg",
  instagram5: "/brand/instagram-5.jpg",
  instagram6: "/brand/instagram-6.jpg",

  storiesPreWedding: "/brand/stories-pre-wedding.jpg",
  storiesGroomHaldi: "/brand/stories-groom-haldi.jpg",
  storiesBrideHaldi: "/brand/stories-bride-haldi.jpg",
  storiesMakeover: "/brand/stories-makeover.jpg",
  storiesWeddingDay: "/brand/stories-wedding-day.jpg",
  storiesHalfSaree: "/brand/stories-half-saree.jpg",
  storiesChildMakeover: "/brand/stories-child-makeover.jpg",

  coverAbout: "/brand/cover-about.jpg",
  coverPhotography: "/brand/cover-photography.jpg",
  coverServices: "/brand/cover-services.jpg",
  coverStories: "/brand/cover-stories.jpg",
  coverContact: "/brand/cover-contact.jpg",

  backgroundPricing: "/brand/background-pricing.jpg",
  backgroundQuote: "/brand/background-quote.jpg",

  preWedding1: "/brand/pre-wedding-1.jpg",
  preWedding2: "/brand/pre-wedding-2.jpg",
  preWedding3: "/brand/pre-wedding-3.jpg",

  groomSolo: "/brand/groom-solo.jpg",
  groomHaldi1: "/brand/groom-haldi-1.jpg",
  groomHaldi2: "/brand/groom-haldi-2.jpg",

  brideHaldiPot: "/brand/bride-haldi-pot.jpg",
  brideHaldiJewelry: "/brand/bride-haldi-jewelry.jpg",
  brideHaldi1: "/brand/bride-haldi-1.jpg",
  brideHaldi2: "/brand/bride-haldi-2.jpg",

  makeoverBrideCloseup: "/brand/makeover-bride-closeup.jpg",
  makeoverCoupleBw: "/brand/makeover-couple-bw.jpg",
  makeoverJewelryDetail: "/brand/makeover-jewelry-detail.jpg",
  makeoverGroomDark: "/brand/makeover-groom-dark.jpg",

  weddingGroomPink: "/brand/wedding-groom-pink.jpg",
  weddingBridePlate: "/brand/wedding-bride-plate.jpg",
  weddingBrideOrange: "/brand/wedding-bride-orange.jpg",
  weddingCeremony1: "/brand/wedding-ceremony-1.jpg",
  weddingCeremony2: "/brand/wedding-ceremony-2.jpg",
  weddingCeremony3: "/brand/wedding-ceremony-3.jpg",

  halfSaree1: "/brand/half-saree-1.jpg",
  halfSaree2: "/brand/half-saree-2.jpg",
  halfSaree3: "/brand/half-saree-3.jpg",

  childMakeover1: "/brand/child-makeover-1.jpg",
  childMakeover2: "/brand/child-makeover-2.jpg",
  childMehndi: "/brand/child-mehndi.jpg",
  childMakeover3: "/brand/child-makeover-3.jpg",
} as const;

export type BrandImageKey = keyof typeof brand;
