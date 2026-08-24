import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { services as staticServices, pricingNote as staticPricingNote } from "./services";
import { brand } from "./brandImages";

export type LiveService = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  deliverables: string[];
  startingPrice: number | null;
  priceVisible: boolean;
  pricingNote: string | null;
  image: string;
};

export async function getServices(): Promise<LiveService[]> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    const { data } = await supabase.from("services").select("*").eq("published", true).order("display_order");

    if (data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        description: row.description,
        deliverables: row.deliverables ?? [],
        startingPrice: row.starting_price,
        priceVisible: row.price_visible,
        pricingNote: row.pricing_note,
        image: row.image_url ?? "",
      }));
    }
  }

  return staticServices.map((s) => ({
    id: s.slug,
    slug: s.slug,
    name: s.name,
    description: s.description,
    deliverables: s.deliverables,
    startingPrice: s.startingPrice,
    priceVisible: true,
    pricingNote: null,
    image: brand[s.image],
  }));
}

export async function getPricingNote(): Promise<string> {
  return staticPricingNote;
}
