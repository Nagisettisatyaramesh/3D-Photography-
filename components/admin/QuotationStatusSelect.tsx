"use client";

import { useTransition } from "react";
import { updateQuotationStatus } from "@/app/admin/actions/quotations";

const statuses = ["draft", "sent", "accepted", "booking_confirmed"];

export function QuotationStatusSelect({ quotationId, status }: { quotationId: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => {
        const value = e.target.value;
        startTransition(async () => {
          await updateQuotationStatus(quotationId, value);
        });
      }}
      className="border border-ink/15 bg-white px-3 py-1.5 text-xs uppercase tracking-[0.08em] outline-none focus:border-terracotta disabled:opacity-50"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}
