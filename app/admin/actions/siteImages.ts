"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { uploadMedia } from "@/lib/admin/upload";
import { findSiteImageSlot, siteImageTypes } from "@/lib/content/siteImages";

function refreshPages() {
  revalidatePath("/admin/site-images");
  revalidatePath("/", "layout");
}

export async function updateSiteImage(formData: FormData) {
  await requireAdmin();
  const db = getSupabaseAdminClient();
  if (!db) return { error: "The database isn't configured." };

  const slot = findSiteImageSlot(String(formData.get("slot")));
  if (!slot) return { error: "Unknown image slot." };

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose an image first." };
  if (!siteImageTypes.includes(file.type)) return { error: "Upload a JPG, PNG or WebP image." };
  if (file.size > slot.maxMB * 1024 * 1024) return { error: `The image must be ${slot.maxMB} MB or smaller.` };

  let imageUrl: string | null;
  try {
    imageUrl = await uploadMedia(db, file, "siteimages");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "The image could not be saved." };
  }
  if (!imageUrl) return { error: "Choose an image first." };

  const { error } = await db
    .from("site_images")
    .upsert({ slot: slot.key, image_url: imageUrl, updated_at: new Date().toISOString() });
  if (error) return { error: error.message };

  refreshPages();
  return { success: true };
}

export async function resetSiteImage(slotKey: string) {
  await requireAdmin();
  const db = getSupabaseAdminClient();
  if (!db) return { error: "The database isn't configured." };

  const { error } = await db.from("site_images").delete().eq("slot", slotKey);
  if (error) return { error: error.message };

  refreshPages();
  return { success: true };
}
