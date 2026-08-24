"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { uploadMedia } from "@/lib/admin/upload";

export async function createPortfolioItem(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const coverFile = formData.get("cover") as File | null;
  const coverUrl = await uploadMedia(supabase, coverFile, "portfolio");
  if (!coverUrl) return { error: "A cover image is required." };

  const galleryFiles = formData.getAll("gallery") as File[];
  const galleryUrls: string[] = [coverUrl];
  for (const file of galleryFiles) {
    const url = await uploadMedia(supabase, file, "portfolio");
    if (url) galleryUrls.push(url);
  }

  const { error } = await supabase.from("portfolio_items").insert({
    title: String(formData.get("title") || ""),
    category: String(formData.get("category") || ""),
    location: String(formData.get("location") || "") || null,
    event_type: String(formData.get("event_type") || "") || null,
    event_date: String(formData.get("event_date") || "") || null,
    description: String(formData.get("description") || "") || null,
    cover_image_url: coverUrl,
    gallery_image_urls: galleryUrls,
    orientation: String(formData.get("orientation") || "landscape"),
    featured: formData.get("featured") === "on",
    display_order: Number(formData.get("display_order") || 0),
    published: formData.get("published") === "on",
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/portfolio");
  revalidatePath("/photography");
  redirect("/admin/portfolio");
}

export async function updatePortfolioItem(id: string, formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const update: Record<string, unknown> = {
    title: String(formData.get("title") || ""),
    category: String(formData.get("category") || ""),
    location: String(formData.get("location") || "") || null,
    event_type: String(formData.get("event_type") || "") || null,
    event_date: String(formData.get("event_date") || "") || null,
    description: String(formData.get("description") || "") || null,
    orientation: String(formData.get("orientation") || "landscape"),
    featured: formData.get("featured") === "on",
    display_order: Number(formData.get("display_order") || 0),
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  const coverFile = formData.get("cover") as File | null;
  const newCoverUrl = await uploadMedia(supabase, coverFile, "portfolio");
  if (newCoverUrl) update.cover_image_url = newCoverUrl;

  const galleryFiles = (formData.getAll("gallery") as File[]).filter((f) => f.size > 0);
  if (galleryFiles.length > 0) {
    const { data: existing } = await supabase.from("portfolio_items").select("gallery_image_urls").eq("id", id).single();
    const newUrls: string[] = [];
    for (const file of galleryFiles) {
      const url = await uploadMedia(supabase, file, "portfolio");
      if (url) newUrls.push(url);
    }
    update.gallery_image_urls = [...(existing?.gallery_image_urls ?? []), ...newUrls];
  }

  const { error } = await supabase.from("portfolio_items").update(update).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/portfolio");
  revalidatePath("/photography");
  redirect("/admin/portfolio");
}

export async function deletePortfolioItem(id: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/portfolio");
  revalidatePath("/photography");
  return { success: true };
}

export async function removeGalleryImage(id: string, url: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { data: existing } = await supabase.from("portfolio_items").select("gallery_image_urls").eq("id", id).single();
  const updated = (existing?.gallery_image_urls ?? []).filter((u: string) => u !== url);

  const { error } = await supabase.from("portfolio_items").update({ gallery_image_urls: updated }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath(`/admin/portfolio/${id}`);
  return { success: true };
}
