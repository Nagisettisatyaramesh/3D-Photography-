"use client";

import Image from "next/image";

type ServiceData = {
  id?: string;
  name: string;
  description: string | null;
  deliverables: string[];
  starting_price: number | null;
  price_visible: boolean;
  pricing_note: string | null;
  image_url?: string | null;
  display_order: number;
  published: boolean;
};

export function ServiceForm({ action, item }: { action: (formData: FormData) => void; item?: ServiceData }) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-6">
      <Field label="Service Name *">
        <input name="name" required defaultValue={item?.name} className={inputClass} />
      </Field>

      <Field label="Description">
        <textarea name="description" rows={3} defaultValue={item?.description ?? ""} className={inputClass} />
      </Field>

      <Field label="Deliverables (one per line)">
        <textarea
          name="deliverables"
          rows={4}
          defaultValue={item?.deliverables?.join("\n") ?? ""}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Starting Price (₹)">
          <input type="number" name="starting_price" defaultValue={item?.starting_price ?? ""} className={inputClass} />
        </Field>
        <div className="flex items-end pb-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="price_visible" defaultChecked={item?.price_visible ?? true} />
            Show price publicly
          </label>
        </div>
      </div>

      <Field label="Pricing Note (optional)">
        <input
          name="pricing_note"
          placeholder="Final quotation depends on event requirements, duration and location."
          defaultValue={item?.pricing_note ?? ""}
          className={inputClass}
        />
      </Field>

      <Field label={item ? "Replace Image" : "Image"}>
        {item?.image_url && (
          <div className="relative mb-2 h-24 w-32 overflow-hidden border border-ink/10">
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
        {item ? "Save Changes" : "Add Service"}
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
