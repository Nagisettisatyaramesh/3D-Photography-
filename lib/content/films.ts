import type { BrandImageKey } from "./brandImages";

export type Film = {
  slug: string;
  title: string;
  type: string;
  thumbnail: BrandImageKey;
  videoUrl: string;
};

// Sample-hosted placeholder video files stand in for real wedding films
// until the studio's own footage is uploaded via the admin Film Library.
export const films: Film[] = [
  {
    slug: "the-big-day",
    title: "The Big Day",
    type: "Telugu Wedding Film",
    thumbnail: "weddingCeremony2",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    slug: "pre-wedding-film",
    title: "Before the Vows",
    type: "Pre-Wedding Film",
    thumbnail: "preWedding2",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    slug: "haldi-film",
    title: "Colours of Haldi",
    type: "Haldi Ceremony Film",
    thumbnail: "groomHaldi2",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    slug: "half-saree-film",
    title: "Half Saree",
    type: "Traditional Function Film",
    thumbnail: "halfSaree2",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
];
