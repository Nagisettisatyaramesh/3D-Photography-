"use client";

import Image from "next/image";

type FilmData = {
  id?: string;
  title: string;
  film_type: string | null;
  description: string | null;
  thumbnail_url?: string | null;
  video_url: string;
  featured: boolean;
  display_order: number;
  published: boolean;
};

export function FilmForm({ action, item }: { action: (formData: FormData) => void; item?: FilmData }) {
  return (
    <form action={action} className="flex max-w-xl flex-col gap-6">
      <Field label="Title *">
        <input name="title" required defaultValue={item?.title} className={inputClass} />
      </Field>
      <Field label="Film Type">
        <input name="film_type" placeholder="Telugu Wedding Film" defaultValue={item?.film_type ?? ""} className={inputClass} />
      </Field>
      <Field label="Description">
        <textarea name="description" rows={3} defaultValue={item?.description ?? ""} className={inputClass} />
      </Field>
      <Field label="Video URL (YouTube, Vimeo, or direct .mp4) *">
        <input name="video_url" required defaultValue={item?.video_url} className={inputClass} />
      </Field>
      <Field label={item ? "Replace Thumbnail" : "Thumbnail *"}>
        {item?.thumbnail_url && (
          <div className="relative mb-2 h-24 w-32 overflow-hidden border border-ink/10">
            <Image src={item.thumbnail_url} alt="" fill className="object-cover" />
          </div>
        )}
        <input type="file" name="thumbnail" accept="image/*" required={!item} className={inputClass} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Display Order">
          <input type="number" name="display_order" defaultValue={item?.display_order ?? 0} className={inputClass} />
        </Field>
        <div className="flex items-end gap-6 pb-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={item?.featured} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={item?.published ?? true} />
            Published
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black"
      >
        {item ? "Save Changes" : "Add Film"}
      </button>
    </form>
  );
}

const inputClass = "w-full border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-terracotta";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.12em] text-ink/50">{label}</span>
      {children}
    </label>
  );
}
