"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";

export async function setAvailability(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const date = String(formData.get("date") || "");
  if (!date) return { error: "A date is required." };

  const { error } = await supabase.from("availability").upsert(
    {
      date,
      status: String(formData.get("status") || "available"),
      customer_name: String(formData.get("customer_name") || "") || null,
      note: String(formData.get("note") || "") || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "date" }
  );

  if (error) return { error: error.message };

  revalidatePath("/admin/availability");
  return { success: true };
}

export async function clearAvailability(date: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { error } = await supabase.from("availability").delete().eq("date", date);
  if (error) return { error: error.message };

  revalidatePath("/admin/availability");
  return { success: true };
}
