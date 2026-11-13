import { connection } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import type { SiteImageOverrides } from "./siteImages";

/** Photos the admin has swapped in. Any failure, such as the table not being
 * created yet, leaves the site on its built-in photos. */
export async function getSiteImageOverrides(): Promise<SiteImageOverrides> {
  await connection();
  const supabase = getSupabaseAdminClient();
  if (!supabase) return {};

  try {
    const { data } = await supabase.from("site_images").select("slot, image_url");
    return Object.fromEntries((data ?? []).map((row) => [row.slot, row.image_url]));
  } catch {
    return {};
  }
}
