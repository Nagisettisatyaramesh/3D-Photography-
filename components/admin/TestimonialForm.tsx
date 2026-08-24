"use client";

import Image from "next/image";

type TestimonialData = {
  id?: string;
  names: string;
  location: string | null;
  quote: string;
  image_url?: string | null;
  display_order: number;
  published: boolean;
};

export function TestimonialForm({ action, item }: { action: (formData: FormData) => void; item?: TestimonialData }) {
  return (
    <form action={action} className="flex max-w-xl flex-col gap-6">
      <Field label="Names *">
        <input name="names" required defaultValue={item?.names} className={inputClass} />
      </Field>
      <Field label="Location">
        <input name="location" defaultValue={item?.location ?? ""} className={inputClass} />
      </Field>
      <Field label="Quote *">
        <textarea name="quote" rows={3} required defaultValue={item?.quote} className={inputClass} />
      </Field>
      <Field label={item ? "Replace Photo" : "Photo"}>
        {item?.image_url && (
          <div className="relative mb-2 h-24 w-24 overflow-hidden border border-ink/10">
            <Image src={item.image_url} alt="" fill className="object-cover" />
          </div>
        )}
        <input type="file" name="image" accept="image/*" className={inputClass} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Display Order">
          <input type="number" name="display_order" defaultValue={item?.display_order ?? 0} className={inputClass} />
        </Field>
        <div className="flex items-end pb-3">
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
        {item ? "Save Changes" : "Add Testimonial"}
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
