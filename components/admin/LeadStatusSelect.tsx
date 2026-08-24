"use client";

import { useTransition } from "react";
import { updateLeadStatus, leadStatuses } from "@/app/admin/actions/leads";

export function LeadStatusSelect({ id, status }: { id: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => {
        const value = e.target.value;
        startTransition(async () => {
          await updateLeadStatus(id, value);
        });
      }}
      className="border border-ink/15 bg-white px-3 py-1.5 text-xs uppercase tracking-[0.08em] outline-none focus:border-terracotta disabled:opacity-50"
    >
      {leadStatuses.map((s) => (
        <option key={s} value={s}>
          {s.replace("-", " ")}
        </option>
      ))}
    </select>
  );
}
