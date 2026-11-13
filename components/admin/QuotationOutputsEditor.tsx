"use client";

import { useState } from "react";

export type QuotationOutputRow = {
  output: string;
  count: string;
  includes: string;
};

const emptyRow: QuotationOutputRow = { output: "", count: "", includes: "" };
const inputClass = "w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta";

/** The "Outputs We Give" table on the quotation's last page. Saved with the
 * rest of the details form through the hidden field. */
export function QuotationOutputsEditor({ initialRows }: { initialRows: QuotationOutputRow[] }) {
  const [rows, setRows] = useState(initialRows);

  function change(index: number, field: keyof QuotationOutputRow, value: string) {
    setRows((current) => current.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-serif text-2xl italic">Outputs We Give</h2>
      <input type="hidden" name="outputs" value={JSON.stringify(rows)} />

      {rows.length > 0 && (
        <div className="flex flex-col gap-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[2fr_1fr_1fr_auto] items-center gap-3">
              <input
                aria-label={`Output ${i + 1}`}
                placeholder="Output"
                value={row.output}
                onChange={(e) => change(i, "output", e.target.value)}
                className={inputClass}
              />
              <input
                aria-label={`Count or duration ${i + 1}`}
                placeholder="Count / duration approx"
                value={row.count}
                onChange={(e) => change(i, "count", e.target.value)}
                className={inputClass}
              />
              <input
                aria-label={`Includes ${i + 1}`}
                placeholder="Includes"
                value={row.includes}
                onChange={(e) => change(i, "includes", e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setRows((current) => current.filter((_, index) => index !== i))}
                className="text-xs uppercase tracking-[0.1em] text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setRows((current) => [...current, emptyRow])}
        className="w-fit rounded-full border border-ink/20 px-5 py-2.5 text-xs uppercase tracking-[0.15em] hover:border-ink"
      >
        Add Output
      </button>
    </section>
  );
}
