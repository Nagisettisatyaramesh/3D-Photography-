import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { testimonials as staticTestimonials } from "./testimonials";
import { unsplashUrl } from "./images";

export type LiveTestimonial = {
  id: string;
  names: string;
  location: string | null;
  quote: string;
  image: string;
};

export async function getTestimonials(): Promise<LiveTestimonial[]> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    const { data } = await supabase.from("testimonials").select("*").eq("published", true).order("display_order");

    if (data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        names: row.names,
        location: row.location,
        quote: row.quote,
        image: row.image_url ?? "",
      }));
    }
  }

  return staticTestimonials.map((t, i) => ({
    id: String(i),
    names: t.names,
    location: t.location,
    quote: t.quote,
    image: unsplashUrl(t.image, { w: 900, q: 78 }),
  }));
}
