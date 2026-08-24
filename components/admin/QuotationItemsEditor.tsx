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
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.08em] text-ink/50">
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3 w-24">Qty</th>
              <th className="px-4 py-3 w-32">Rate (₹)</th>
              <th className="px-4 py-3 w-32">Amount</th>
              <th className="px-4 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ItemRow key={item.id} item={item} onSave={handleUpdate} onDelete={handleDelete} disabled={isPending} />
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/40">
                  No line items yet — add the services included in this proposal.
                </td>
              </tr>
            )}
          </tbody>
          {items.length > 0 && (
            <tfoot>
              <tr className="border-t border-ink/15 font-medium">
                <td colSpan={3} className="px-4 py-3 text-right text-xs uppercase tracking-[0.1em] text-ink/50">
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
          <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Service Name</span>
          <input name="service_name" required className={inputClass} />
        </div>
        <div className="flex flex-1 min-w-[200px] flex-col gap-1.5">
          <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Description</span>
          <input name="description" className={inputClass} />
        </div>
        <div className="flex w-20 flex-col gap-1.5">
          <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Qty</span>
          <input type="number" name="quantity" defaultValue={1} min={1} className={inputClass} />
        </div>
        <div className="flex w-32 flex-col gap-1.5">
          <span className="text-xs uppercase tracking-[0.1em] text-ink/50">Rate (₹)</span>
          <input type="number" name="unit_price" defaultValue={0} min={0} className={inputClass} />
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
  const [quantity, setQuantity] = useState(item.quantity);
  const [unitPrice, setUnitPrice] = useState(item.unit_price);
  const [dirty, setDirty] = useState(false);

  function commit() {
    if (!dirty) return;
    const formData = new FormData();
    formData.set("service_name", name);
    formData.set("description", description);
    formData.set("quantity", String(quantity));
    formData.set("unit_price", String(unitPrice));
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
          placeholder="Description (optional)"
          onChange={(e) => {
            setDescription(e.target.value);
            setDirty(true);
          }}
          onBlur={commit}
          className={`${cellInputClass} mt-1 text-xs text-ink/60`}
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
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
          value={unitPrice}
          onChange={(e) => {
            setUnitPrice(Number(e.target.value));
            setDirty(true);
          }}
          onBlur={commit}
          className={cellInputClass}
        />
      </td>
      <td className="px-4 py-2 font-medium">{formatINR(quantity * unitPrice)}</td>
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

const inputClass = "w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta";
const cellInputClass = "w-full border-0 border-b border-transparent bg-transparent px-1 py-0.5 text-sm outline-none focus:border-terracotta";
