"use client";

import { useRef, useState, useTransition } from "react";
import { setAvailability } from "@/app/admin/actions/availability";

export function AvailabilityForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMessage(null);
    startTransition(async () => {
      const result = await setAvailability(formData);
      setMessage(result?.error ? result.error : "Saved.");
      if (!result?.error) formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4 border border-ink/10 bg-white/50 p-5">
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Date</span>
        <input type="date" name="date" required className="border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Status</span>
        <select name="status" className="border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
          <option value="available">Available</option>
          <option value="enquiry">Enquiry</option>
          <option value="quotation">Quotation</option>
          <option value="booked">Booked</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Customer</span>
        <input name="customer_name" className="border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
      </label>
      <label className="flex flex-1 flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Note</span>
        <input name="note" className="w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-ink px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Set Date"}
      </button>
      {message && <span className="text-xs text-terracotta">{message}</span>}
    </form>
  );
}
