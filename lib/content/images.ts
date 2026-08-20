/**
 * Curated placeholder photography (Unsplash) — swappable later via the admin
 * "Website Content" module without touching component code. Every value here
 * is a bare Unsplash photo id; use `unsplashUrl` to build a sized URL.
 */
export const img = {
  embraceBouquet: "1519741497674-611481863552",
  ringHandWatch: "1465495976277-4387d4b0b4c6",
  ringsOnFlorals: "1606800052052-a08af7148866",
  receptionTableFlorals: "1519225421980-715cb0215aed",
  coupleFormalWalking: "1583939003579-730e3918a45a",
  handsHolding: "1520854221256-17451cc331bf",
  ceremonyChairs: "1522673607200-164d1b6ce486",
  groomShoes: "1509927083803-4bd519298ac4",
  coupleCloseOutdoors: "1511285560929-80b456fea0bc",
  receptionRoundTables: "1519167758481-83f550bb49b3",
  coupleSilhouetteSunset: "1519671482749-fd09be7ccebf",
  ringsHandsCloseup: "1522337660859-02fbefca4702",
  coupleSilhouetteCliffs: "1544078751-58fee2d8a03b",
  bridalBouquetGroomBg: "1550005809-91ad75fb315f",
  coupleSunsetPortrait: "1591604466107-ec97de577aff",
  coupleWalkingVenue: "1606216794074-735e91aa2c92",
  coupleEmbraceBacklit: "1606490194859-07c18c9f0968",
  whiteFloralVenue: "1502635385003-ee1e6a1a742d",
  womanWalkingPath: "1503104834685-7205e8607eb9",
  silhouetteMistyForest: "1508921912186-1d1a45ebb3c1",
  brightVenueInterior: "1522708323590-d24dbb6b0267",
  hangingFloralInstall: "1523438885200-e635ba2c371e",
  womanPortraitCloseup: "1544005313-94ddf0286df2",
  weddingDressDetail: "1595407753234-0882f1e77954",
  manPortraitBearded: "1600180758890-6b94519a8ba6",
  tealFabricTexture: "1620503374956-c942862f0372",
} as const;

export type ImageKey = keyof typeof img;

export function unsplashUrl(
  key: ImageKey,
  { w = 1600, q = 80 }: { w?: number; q?: number } = {}
) {
  return `https://images.unsplash.com/photo-${img[key]}?auto=format&fit=crop&w=${w}&q=${q}`;
}
