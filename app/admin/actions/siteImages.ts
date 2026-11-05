"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { uploadMedia } from "@/lib/admin/upload";
import { findSiteImageSlot, siteImageTypes } from "@/lib/content/siteImages";

/** Server Actions can be called from any route, so the /admin middleware
 * isn't enough on its own: confirm the signed-in admin here too. */
async function getAuthorizedClient() {
  const session = await getSupabaseServerClient();
  const { data } = (await session?.auth.getUser()) ?? { data: { user: null } };
  if (!data.user) return null;
  return getSupabaseAdminClient();
}

function refreshPages() {
  revalidatePath("/admin/site-images");
  revalidatePath("/", "layout");
}

export async function updateSiteImage(formData: FormData) {
  const supabase = await getAuthorizedClient();
  if (!supabase) return { error: "Please sign in again." };

  const slot = findSiteImageSlot(String(formData.get("slot")));
  if (!slot) return { error: "Unknown image slot." };

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose an image first." };
  if (!siteImageTypes.includes(file.type)) return { error: "Upload a JPG, PNG or WebP image." };
  if (file.size > slot.maxMB * 1024 * 1024) return { error: `The image must be ${slot.maxMB} MB or smaller.` };

  const imageUrl = await uploadMedia(supabase, file, "site-images");
  const { error } = await supabase
    .from("site_images")
    .upsert({ slot: slot.key, image_url: imageUrl, updated_at: new Date().toISOString() });
  if (error) return { error: error.message };

  refreshPages();
  return { success: true };
}

export async function resetSiteImage(slotKey: string) {
  const supabase = await getAuthorizedClient();
  if (!supabase) return { error: "Please sign in again." };

  const { error } = await supabase.from("site_images").delete().eq("slot", slotKey);
  if (error) return { error: error.message };

  refreshPages();
  return { success: true };
}
