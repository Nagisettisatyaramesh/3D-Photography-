"use client";

import { useState } from "react";
import Image from "next/image";
import { ADMIN_PORTFOLIO_CATEGORIES } from "@/lib/content/portfolioCategories";
import { removeGalleryImage } from "@/app/admin/actions/portfolio";

type PortfolioItemData = {
  id?: string;
  title: string;
  category: string;
  location: string | null;
  event_type: string | null;
  event_date: string | null;
  description: string | null;
  cover_image_url?: string;
  gallery_image_urls?: string[];
  orientation: string;
  featured: boolean;
  display_order: number;
  published: boolean;
};

export function PortfolioForm({
  action,
  item,
}: {
  action: (formData: FormData) => void;
  item?: PortfolioItemData;
}) {
  const [gallery, setGallery] = useState(item?.gallery_image_urls ?? []);

  return (
    <form action={action} className="flex max-w-2xl flex-col gap-6">
      <Field label="Title *">
        <input name="title" required defaultValue={item?.title} className={inputClass} />
      </Field>

      <Field label="Category *">
        <select name="category" required defaultValue={item?.category} className={inputClass}>
          <option value="">Select a category</option>
          {ADMIN_PORTFOLIO_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Location">
          <input name="location" defaultValue={item?.location ?? ""} className={inputClass} />
        </Field>
        <Field label="Event Type">
          <input name="event_type" defaultValue={item?.event_type ?? ""} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Event Date">
          <input type="date" name="event_date" defaultValue={item?.event_date ?? ""} className={inputClass} />
        </Field>
        <Field label="Orientation">
          <select name="orientation" defaultValue={item?.orientation ?? "landscape"} className={inputClass}>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>
        </Field>
      </div>

      <Field label="Description">
        <textarea name="description" rows={3} defaultValue={item?.description ?? ""} className={inputClass} />
      </Field>

      <Field label={item ? "Replace Cover Image" : "Cover Image *"}>
        {item?.cover_image_url && (
          <div className="relative mb-2 h-32 w-32 overflow-hidden border border-ink/10">
            <Image src={item.cover_image_url} alt="" fill className="object-cover" />
          </div>
        )}
        <input type="file" name="cover" accept="image/*" required={!item} className={inputClass} />
      </Field>

      <Field label="Add Gallery Images">
        {gallery.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {gallery.map((url) => (
              <div key={url} className="group relative h-20 w-20 overflow-hidden border border-ink/10">
                <Image src={url} alt="" fill className="object-cover" />
                {item?.id && (
                  <button
                    type="button"
                    onClick={async () => {
                      await removeGalleryImage(item.id!, url);
                      setGallery((prev) => prev.filter((u) => u !== url));
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <input type="file" name="gallery" accept="image/*" multiple className={inputClass} />
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
        {item ? "Save Changes" : "Add Portfolio Item"}
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
