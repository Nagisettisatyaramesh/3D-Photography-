"use client";

import { createContext, useContext } from "react";
import { resolveSiteImage, type SiteImageKey, type SiteImageOverrides } from "@/lib/content/siteImages";

const SiteImagesContext = createContext<SiteImageOverrides>({});

export function SiteImagesProvider({ overrides, children }: { overrides: SiteImageOverrides; children: React.ReactNode }) {
  return <SiteImagesContext.Provider value={overrides}>{children}</SiteImagesContext.Provider>;
}

/** Returns a lookup for the admin's photo in a slot, or its built-in photo. */
export function useSiteImages() {
  const overrides = useContext(SiteImagesContext);
  return (key: SiteImageKey) => resolveSiteImage(overrides, key);
}
