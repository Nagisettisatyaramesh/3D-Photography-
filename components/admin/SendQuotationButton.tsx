"use client";

import { useState, useTransition } from "react";
import { sendQuotationEmail } from "@/app/admin/actions/quotations";

export function SendQuotationButton({
  quotationId,
  customerEmail,
  disabled,
}: {
  quotationId: string;
  customerEmail: string | null;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function handleClick() {
    if (!customerEmail) {
      setMessage("Add the customer's email under Event & Customer Details, save, then send.");
      return;
    }
    if (!window.confirm(`Send this quotation PDF to ${customerEmail} now?`)) return;
    setMessage(null);
    startTransition(async () => {
      const result = await sendQuotationEmail(quotationId);
      setMessage(result?.error ? result.error : "Sent to the customer.");
    });
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        disabled={disabled || isPending}
        onClick={handleClick}
        className="rounded-full bg-terracotta px-6 py-3 text-xs uppercase tracking-[0.2em] text-ink hover:bg-terracotta-soft disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Send to Customer"}
      </button>
      {message && (
        <p className={`max-w-xs text-right text-xs ${message === "Sent to the customer." ? "text-terracotta" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
