import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { portfolio as staticPortfolio, categoryCopy, type PortfolioCategory } from "./portfolio";
import { brand } from "./brandImages";

export type LivePortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image: string;
  gallery: string[];
  orientation: "portrait" | "landscape";
  featured: boolean;
};

/** Server-only: reads published portfolio items from Supabase, falling
 * back to the static seed set if the database has no rows yet (or isn't
 * configured). Only call this from Server Components. */
export async function getPortfolioItems(): Promise<LivePortfolioItem[]> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("published", true)
      .order("display_order");

    if (data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        title: row.title,
        category: row.category,
        description: row.description,
        image: row.cover_image_url,
        gallery: row.gallery_image_urls ?? [],
        orientation: row.orientation,
        featured: row.featured,
      }));
    }
  }

  return staticPortfolio.map((p) => ({
    id: p.id,
    title: p.category,
    category: p.category,
    description: categoryCopy[p.category as PortfolioCategory],
    image: brand[p.image],
    gallery: [brand[p.image]],
    orientation: p.orientation,
    featured: false,
  }));
}

export async function getPortfolioCategories(): Promise<string[]> {
  const items = await getPortfolioItems();
  return Array.from(new Set(items.map((i) => i.category)));
}
