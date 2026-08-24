"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { uploadMedia } from "@/lib/admin/upload";

export async function createTestimonial(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const imageFile = formData.get("image") as File | null;
  const imageUrl = await uploadMedia(supabase, imageFile, "testimonials");

  const { error } = await supabase.from("testimonials").insert({
    names: String(formData.get("names") || ""),
    location: String(formData.get("location") || "") || null,
    quote: String(formData.get("quote") || ""),
    image_url: imageUrl,
    display_order: Number(formData.get("display_order") || 0),
    published: formData.get("published") === "on",
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const update: Record<string, unknown> = {
    names: String(formData.get("names") || ""),
    location: String(formData.get("location") || "") || null,
    quote: String(formData.get("quote") || ""),
    display_order: Number(formData.get("display_order") || 0),
    published: formData.get("published") === "on",
  };

  const imageFile = formData.get("image") as File | null;
  const newImageUrl = await uploadMedia(supabase, imageFile, "testimonials");
  if (newImageUrl) update.image_url = newImageUrl;

  const { error } = await supabase.from("testimonials").update(update).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}
