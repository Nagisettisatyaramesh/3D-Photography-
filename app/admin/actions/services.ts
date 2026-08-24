"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { uploadMedia } from "@/lib/admin/upload";

function parseDeliverables(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createService(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const name = String(formData.get("name") || "");
  const imageFile = formData.get("image") as File | null;
  const imageUrl = await uploadMedia(supabase, imageFile, "services");

  const { error } = await supabase.from("services").insert({
    slug: slugify(name),
    name,
    description: String(formData.get("description") || "") || null,
    deliverables: parseDeliverables(String(formData.get("deliverables") || "")),
    starting_price: formData.get("starting_price") ? Number(formData.get("starting_price")) : null,
    price_visible: formData.get("price_visible") === "on",
    pricing_note: String(formData.get("pricing_note") || "") || null,
    image_url: imageUrl,
    display_order: Number(formData.get("display_order") || 0),
    published: formData.get("published") === "on",
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const update: Record<string, unknown> = {
    name: String(formData.get("name") || ""),
    description: String(formData.get("description") || "") || null,
    deliverables: parseDeliverables(String(formData.get("deliverables") || "")),
    starting_price: formData.get("starting_price") ? Number(formData.get("starting_price")) : null,
    price_visible: formData.get("price_visible") === "on",
    pricing_note: String(formData.get("pricing_note") || "") || null,
    display_order: Number(formData.get("display_order") || 0),
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  const imageFile = formData.get("image") as File | null;
  const newImageUrl = await uploadMedia(supabase, imageFile, "services");
  if (newImageUrl) update.image_url = newImageUrl;

  const { error } = await supabase.from("services").update(update).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { success: true };
}
