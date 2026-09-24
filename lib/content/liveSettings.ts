import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { siteConfig } from "./siteConfig";

export type LiveSettings = {
  studioName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  youtube: string;
  heroImage: string | null;
};

export async function getWebsiteSettings(): Promise<LiveSettings> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    const { data } = await supabase.from("website_settings").select("*").eq("id", 1).single();
    if (data) {
      return {
        studioName: data.studio_name || siteConfig.studioName,
        tagline: data.tagline || siteConfig.tagline,
        phone: data.phone || siteConfig.phone,
        whatsapp: data.whatsapp || siteConfig.whatsapp,
        email: data.email || siteConfig.email,
        address: data.address || siteConfig.address,
        instagram: data.instagram || siteConfig.instagram,
        youtube: data.youtube || siteConfig.youtube,
        heroImage: data.hero_image_url,
      };
    }
  }

  return {
    studioName: siteConfig.studioName,
    tagline: siteConfig.tagline,
    phone: siteConfig.phone,
    whatsapp: siteConfig.whatsapp,
    email: siteConfig.email,
    address: siteConfig.address,
    instagram: siteConfig.instagram,
    youtube: siteConfig.youtube,
    heroImage: null,
  };
}
