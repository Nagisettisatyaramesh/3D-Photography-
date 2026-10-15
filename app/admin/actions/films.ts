"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { uploadMedia } from "@/lib/admin/upload";
import { getYouTubeId, youTubeThumbnailUrl } from "@/lib/youtube";

export async function createFilm(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const videoUrl = String(formData.get("video_url") || "").trim();
  const youtubeId = getYouTubeId(videoUrl);

  // YouTube links fall back to the video's own thumbnail; Vimeo and direct
  // .mp4 links still need one uploaded.
  const thumbFile = formData.get("thumbnail") as File | null;
  const thumbUrl =
    (await uploadMedia(supabase, thumbFile, "films")) ?? (youtubeId ? youTubeThumbnailUrl(youtubeId) : null);
  if (!thumbUrl) return { error: "Upload a thumbnail image — it's only optional for YouTube links." };

  const { error } = await supabase.from("films").insert({
    title: String(formData.get("title") || ""),
    film_type: String(formData.get("film_type") || "") || null,
    description: String(formData.get("description") || "") || null,
    thumbnail_url: thumbUrl,
    video_url: videoUrl,
    featured: formData.get("featured") === "on",
    display_order: Number(formData.get("display_order") || 0),
    published: formData.get("published") === "on",
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/films");
  revalidatePath("/films");
  revalidatePath("/");
  redirect("/admin/films");
}

export async function updateFilm(id: string, formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const update: Record<string, unknown> = {
    title: String(formData.get("title") || ""),
    film_type: String(formData.get("film_type") || "") || null,
    description: String(formData.get("description") || "") || null,
    video_url: String(formData.get("video_url") || "").trim(),
    featured: formData.get("featured") === "on",
    display_order: Number(formData.get("display_order") || 0),
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  const thumbFile = formData.get("thumbnail") as File | null;
  const newThumbUrl = await uploadMedia(supabase, thumbFile, "films");
  if (newThumbUrl) {
    update.thumbnail_url = newThumbUrl;
  } else {
    // Keep an auto YouTube thumbnail in step with the link; never replace
    // one the studio uploaded themselves.
    const youtubeId = getYouTubeId(update.video_url as string);
    const { data: current } = await supabase.from("films").select("thumbnail_url").eq("id", id).single();
    const isAutoThumb = !current?.thumbnail_url || current.thumbnail_url.startsWith("https://i.ytimg.com/");
    if (youtubeId && isAutoThumb) update.thumbnail_url = youTubeThumbnailUrl(youtubeId);
  }

  const { error } = await supabase.from("films").update(update).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/films");
  revalidatePath("/films");
  revalidatePath("/");
  redirect("/admin/films");
}

export async function deleteFilm(id: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { error } = await supabase.from("films").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/films");
  revalidatePath("/films");
  revalidatePath("/");
  return { success: true };
}
