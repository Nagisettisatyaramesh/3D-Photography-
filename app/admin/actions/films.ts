"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { uploadMedia } from "@/lib/admin/upload";

export async function createFilm(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const thumbFile = formData.get("thumbnail") as File | null;
  const thumbUrl = await uploadMedia(supabase, thumbFile, "films");
  if (!thumbUrl) return { error: "A thumbnail image is required." };

  const { error } = await supabase.from("films").insert({
    title: String(formData.get("title") || ""),
    film_type: String(formData.get("film_type") || "") || null,
    description: String(formData.get("description") || "") || null,
    thumbnail_url: thumbUrl,
    video_url: String(formData.get("video_url") || ""),
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
    video_url: String(formData.get("video_url") || ""),
    featured: formData.get("featured") === "on",
    display_order: Number(formData.get("display_order") || 0),
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  const thumbFile = formData.get("thumbnail") as File | null;
  const newThumbUrl = await uploadMedia(supabase, thumbFile, "films");
  if (newThumbUrl) update.thumbnail_url = newThumbUrl;

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
