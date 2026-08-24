"use client";

import { useState, useTransition } from "react";
import { updateQuotationDetails } from "@/app/admin/actions/quotations";

type Quotation = {
  id: string;
  customer_name: string | null;
  bride_name: string | null;
  groom_name: string | null;
  mobile: string | null;
  email: string | null;
  event_date: string | null;
  event_location: string | null;
  wedding_type: string | null;
  number_of_events: number | null;
  number_of_guests: number | null;
  intro_note: string | null;
  terms: string | null;
  discount_type: string;
  discount_value: number;
  additional_charges: number;
  tax_percent: number;
};

export function QuotationDetailsForm({ quotation }: { quotation: Quotation }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const action = updateQuotationDetails.bind(null, quotation.id);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMessage(null);
    startTransition(async () => {
      const result = await action(formData);
      setMessage(result?.error ? result.error : "Saved.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Bride's Name">
          <input name="bride_name" defaultValue={quotation.bride_name ?? ""} className={inputClass} />
        </Field>
        <Field label="Groom's Name">
          <input name="groom_name" defaultValue={quotation.groom_name ?? ""} className={inputClass} />
        </Field>
      </div>

      <Field label="Customer Name (if different from couple)">
        <input name="customer_name" defaultValue={quotation.customer_name ?? ""} className={inputClass} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Mobile">
          <input name="mobile" defaultValue={quotation.mobile ?? ""} className={inputClass} />
        </Field>
        <Field label="Email">
          <input type="email" name="email" defaultValue={quotation.email ?? ""} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Event Date">
          <input type="date" name="event_date" defaultValue={quotation.event_date ?? ""} className={inputClass} />
        </Field>
        <Field label="Wedding / Event Type">
          <input name="wedding_type" defaultValue={quotation.wedding_type ?? ""} className={inputClass} />
        </Field>
      </div>

      <Field label="Location">
        <input name="event_location" defaultValue={quotation.event_location ?? ""} className={inputClass} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Number of Events">
          <input type="number" name="number_of_events" defaultValue={quotation.number_of_events ?? ""} className={inputClass} />
        </Field>
        <Field label="Approx. Guests">
          <input type="number" name="number_of_guests" defaultValue={quotation.number_of_guests ?? ""} className={inputClass} />
        </Field>
      </div>

      <Field label="Intro / Story Note">
        <textarea
          name="intro_note"
          rows={4}
          placeholder="A short personal note that opens the proposal..."
          defaultValue={quotation.intro_note ?? ""}
          className={inputClass}
        />
      </Field>

      <Field label="Terms & Notes">
        <textarea name="terms" rows={3} defaultValue={quotation.terms ?? ""} className={inputClass} />
      </Field>

      <div className="grid grid-cols-4 gap-4">
        <Field label="Discount Type">
          <select name="discount_type" defaultValue={quotation.discount_type} className={inputClass}>
            <option value="fixed">Fixed (₹)</option>
            <option value="percent">Percent (%)</option>
          </select>
        </Field>
        <Field label="Discount Value">
          <input type="number" name="discount_value" defaultValue={quotation.discount_value} className={inputClass} />
        </Field>
        <Field label="Additional Charges (₹)">
          <input type="number" name="additional_charges" defaultValue={quotation.additional_charges} className={inputClass} />
        </Field>
        <Field label="Tax (%)">
          <input type="number" name="tax_percent" defaultValue={quotation.tax_percent} className={inputClass} />
        </Field>
      </div>

      {message && <p className="text-sm text-terracotta">{message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-fit rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save Details"}
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
