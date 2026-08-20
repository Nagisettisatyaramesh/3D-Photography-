import type { ImageKey } from "./images";

export type TeamMember = {
  name: string;
  role: string;
  image: ImageKey;
};

export const team: TeamMember[] = [
  { name: "Vihaan Rao", role: "Lead Photographer & Founder", image: "manPortraitBearded" },
  { name: "Ananya Iyer", role: "Cinematographer", image: "womanPortraitCloseup" },
  { name: "Kabir Sen", role: "Associate Photographer", image: "manPortraitBearded" },
  { name: "Meher Kapoor", role: "Studio & Client Experience", image: "womanPortraitCloseup" },
];
