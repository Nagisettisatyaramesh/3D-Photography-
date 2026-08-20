/**
 * Real studio photography, extracted from the business's own quotation/
 * portfolio deck ("Quotation for Nanda Kishore & Sravani"). These are the
 * primary image source for the site — swappable later per-image via the
 * admin Image Library (Phase B) without touching component code.
 */
export const brand = {
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
