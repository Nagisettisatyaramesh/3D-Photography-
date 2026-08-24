import type { SupabaseClient } from "@supabase/supabase-js";

/** Uploads a File to the public `media` storage bucket and returns its
 * public URL. Returns null if `file` is empty (e.g. an untouched file
 * input on an edit form). */
export async function uploadMedia(
  supabase: SupabaseClient,
  file: File | null,
  folder: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const buffer = await file.arrayBuffer();

  const { error } = await supabase.storage.from("media").upload(path, buffer, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
