"use client";

import { useTransition } from "react";

export function DeleteButton({
  action,
  label = "Delete",
  confirmText = "Are you sure?",
}: {
  action: () => Promise<{ error?: string; success?: boolean } | void>;
  label?: string;
  confirmText?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!window.confirm(confirmText)) return;
        startTransition(async () => {
          await action();
        });
      }}
      className="text-xs uppercase tracking-[0.1em] text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {isPending ? "…" : label}
    </button>
  );
}
