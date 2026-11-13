"use client";

import { useState, useTransition } from "react";
import {
  addQuotationItem,
  updateQuotationItem,
  deleteQuotationItem,
} from "@/app/admin/actions/quotations";

type Item = {
  id: string;
  service_name: string;
  description: string | null;
  requirement: string | null;
  event_date: string | null;
  duration: string | null;
  quantity: number;
  unit_price: number;
};

function formatINR(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function QuotationItemsEditor({ quotationId, items }: { quotationId: string; items: Item[] }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setError(null);
    startTransition(async () => {
      const result = await addQuotationItem(quotationId, formData);
      if (result?.error) setError(result.error);
      else form.reset();
    });
  }

  function handleUpdate(itemId: string, formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await updateQuotationItem(itemId, quotationId, formData);
      if (result?.error) setError(result.error);
    });
  }

  function handleDelete(itemId: string) {
    if (!window.confirm("Remove this line item?")) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteQuotationItem(itemId, quotationId);
      if (result?.error) setError(result.error);
    });
  }

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);

  return (
    <div>
      <div className="overflow-x-auto border border-ink/10 bg-white/50">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.08em] text-ink/50">
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Requirement</th>
              <th className="px-4 py-3 w-40">Date</th>
              <th className="px-4 py-3 w-32">Duration / Schedules</th>
              <th className="px-4 py-3 w-36">Amount (₹)</th>
              <th className="px-4 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ItemRow key={item.id} item={item} onSave={handleUpdate} onDelete={handleDelete} disabled={isPending} />
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink/40">
                  No events yet — add the events included in this proposal.
                </td>
              </tr>
            )}
          </tbody>
          {items.length > 0 && (
            <tfoot>
              <tr className="border-t border-ink/15 font-medium">
                <td colSpan={4} className="px-4 py-3 text-right text-xs uppercase tracking-[0.1em] text-ink/50">
                  Subtotal
                </td>
                <td className="px-4 py-3">{formatINR(subtotal)}</td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <form onSubmit={handleAdd} className="mt-4 flex flex-wrap items-end gap-3 border border-dashed border-ink/20 p-4">
        <div className="flex flex-1 min-w-[200px] flex-col gap-1.5">
          <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Event</span>
          <input name="service_name" required className={inputClass} />
        </div>
        <div className="flex flex-1 min-w-[200px] flex-col gap-1.5">
          <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Location / Description</span>
          <input name="description" className={inputClass} />
        </div>
        <div className="flex flex-1 min-w-[200px] flex-col gap-1.5">
          <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Requirement</span>
          <textarea name="requirement" rows={1} className={`${inputClass} ${requirementClass}`} />
        </div>
        <div className="flex w-40 flex-col gap-1.5">
          <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Date</span>
          <input type="date" name="event_date" className={inputClass} />
        </div>
        <div className="flex w-36 flex-col gap-1.5">
          <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Duration / Schedules</span>
          <input name="duration" className={inputClass} />
        </div>
        <div className="flex w-36 flex-col gap-1.5">
          <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Amount (₹)</span>
          <input type="number" name="amount" defaultValue={0} min={0} className={inputClass} />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-terracotta px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-ink hover:bg-terracotta-soft disabled:opacity-50"
        >
          Add Item
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function ItemRow({
  item,
  onSave,
  onDelete,
  disabled,
}: {
  item: Item;
  onSave: (id: string, formData: FormData) => void;
  onDelete: (id: string) => void;
  disabled: boolean;
}) {
  const [name, setName] = useState(item.service_name);
  const [description, setDescription] = useState(item.description ?? "");
  const [requirement, setRequirement] = useState(item.requirement ?? "");
  const [eventDate, setEventDate] = useState(item.event_date ?? "");
  const [duration, setDuration] = useState(item.duration ?? "");
  const [amount, setAmount] = useState(item.quantity * item.unit_price);
  const [dirty, setDirty] = useState(false);

  function commit() {
    if (!dirty) return;
    const formData = new FormData();
    formData.set("service_name", name);
    formData.set("description", description);
    formData.set("requirement", requirement);
    formData.set("event_date", eventDate);
    formData.set("duration", duration);
    formData.set("amount", String(amount));
    onSave(item.id, formData);
    setDirty(false);
  }

  return (
    <tr className="border-b border-ink/5 align-top last:border-0">
      <td className="px-4 py-2">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setDirty(true);
          }}
          onBlur={commit}
          className={cellInputClass}
        />
        <input
          value={description}
          placeholder="Location / description (optional)"
          onChange={(e) => {
            setDescription(e.target.value);
            setDirty(true);
          }}
          onBlur={commit}
          className={`${cellInputClass} mt-1 text-xs text-ink/60`}
        />
      </td>
      <td className="px-4 py-2">
        <textarea
          value={requirement}
          rows={1}
          aria-label="Requirement"
          onChange={(e) => {
            setRequirement(e.target.value);
            setDirty(true);
          }}
          onBlur={commit}
          className={`${cellInputClass} ${requirementClass}`}
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="date"
          value={eventDate}
          aria-label="Date"
          onChange={(e) => {
            setEventDate(e.target.value);
            setDirty(true);
          }}
          onBlur={commit}
          className={cellInputClass}
        />
      </td>
      <td className="px-4 py-2">
        <input
          value={duration}
          aria-label="Duration or schedules"
          onChange={(e) => {
            setDuration(e.target.value);
            setDirty(true);
          }}
          onBlur={commit}
          className={cellInputClass}
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="number"
          min={0}
          value={amount}
          aria-label="Amount"
          onChange={(e) => {
            setAmount(Number(e.target.value));
            setDirty(true);
          }}
          onBlur={commit}
          className={cellInputClass}
        />
      </td>
      <td className="px-4 py-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onDelete(item.id)}
          className="text-xs uppercase tracking-[0.1em] text-red-600 hover:text-red-800 disabled:opacity-50"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

// Grows with what the admin types, without scroll arrows or a resize handle.
const requirementClass = "resize-none overflow-hidden [field-sizing:content]";
const inputClass = "w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta";
const cellInputClass = "w-full border-0 border-b border-transparent bg-transparent px-1 py-0.5 text-sm outline-none focus:border-terracotta";
