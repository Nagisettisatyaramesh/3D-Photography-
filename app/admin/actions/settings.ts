"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { uploadMedia } from "@/lib/admin/upload";

export async function updateWebsiteSettings(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const update: Record<string, unknown> = {
    id: 1,
    studio_name: String(formData.get("studio_name") || ""),
    tagline: String(formData.get("tagline") || "") || null,
    phone: String(formData.get("phone") || "") || null,
    whatsapp: String(formData.get("whatsapp") || "") || null,
    email: String(formData.get("email") || "") || null,
    address: String(formData.get("address") || "") || null,
    instagram: String(formData.get("instagram") || "") || null,
    updated_at: new Date().toISOString(),
  };

  const heroFile = formData.get("hero_image") as File | null;
  const heroUrl = await uploadMedia(supabase, heroFile, "settings");
  if (heroUrl) update.hero_image_url = heroUrl;

  const { error } = await supabase.from("website_settings").upsert(update);
  if (error) return { error: error.message };

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  return { success: true };
}
