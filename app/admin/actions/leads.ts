"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";

export const leadStatuses = [
  "new",
  "contacted",
  "follow-up",
  "quotation-sent",
  "negotiation",
  "confirmed",
  "lost",
] as const;

export async function updateLeadStatus(id: string, status: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
  return { success: true };
}
