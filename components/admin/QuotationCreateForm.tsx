"use client";

import { useState, useTransition } from "react";
import { createQuotation } from "@/app/admin/actions/quotations";

type Lead = {
  full_name: string | null;
  mobile: string | null;
  email: string | null;
  event_date: string | null;
  event_type: string | null;
  location: string | null;
};

export function QuotationCreateForm({ leadId, lead }: { leadId?: string; lead?: Lead | null }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await createQuotation(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6">
      {leadId && <input type="hidden" name="lead_id" value={leadId} />}

      <div className="grid grid-cols-2 gap-4">
        <Field label="Bride's Name">
          <input name="bride_name" className={inputClass} />
        </Field>
        <Field label="Groom's Name">
          <input name="groom_name" className={inputClass} />
        </Field>
      </div>

      <Field label="Customer Name (if different from couple)">
        <input name="customer_name" defaultValue={lead?.full_name ?? ""} className={inputClass} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Mobile">
          <input name="mobile" defaultValue={lead?.mobile ?? ""} className={inputClass} />
        </Field>
        <Field label="Email">
          <input type="email" name="email" defaultValue={lead?.email ?? ""} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Event Date">
          <input type="date" name="event_date" defaultValue={lead?.event_date ?? ""} className={inputClass} />
        </Field>
        <Field label="Wedding / Event Type">
          <input name="wedding_type" defaultValue={lead?.event_type ?? ""} className={inputClass} />
        </Field>
      </div>

      <Field label="Location">
        <input name="event_location" defaultValue={lead?.location ?? ""} className={inputClass} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Number of Events">
          <input type="number" name="number_of_events" className={inputClass} />
        </Field>
        <Field label="Approx. Guests">
          <input type="number" name="number_of_guests" className={inputClass} />
        </Field>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-fit rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black disabled:opacity-50"
      >
        {isPending ? "Creating…" : "Create Quotation"}
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
