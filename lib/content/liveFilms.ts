import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { films as staticFilms } from "./films";
import { brand } from "./brandImages";

export type LiveFilm = {
  id: string;
  title: string;
  type: string | null;
  thumbnail: string;
  videoUrl: string;
  featured: boolean;
};

export async function getFilms(): Promise<LiveFilm[]> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    const { data } = await supabase.from("films").select("*").eq("published", true).order("display_order");

    if (data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        title: row.title,
        type: row.film_type,
        thumbnail: row.thumbnail_url,
        videoUrl: row.video_url,
        featured: row.featured,
      }));
    }
  }

  return staticFilms.map((f) => ({
    id: f.slug,
    title: f.title,
    type: f.type,
    thumbnail: brand[f.thumbnail],
    videoUrl: f.videoUrl,
    featured: false,
  }));
}
