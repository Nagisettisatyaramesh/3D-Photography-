"use client";

import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  categories: readonly string[];
  active: string;
  onChange: (category: string) => void;
};

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
      {["All", ...categories].map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          data-cursor-hover="true"
          className={cn(
            "shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-xs uppercase tracking-[0.15em] transition-colors duration-300",
            active === category
              ? "bg-ink text-parchment"
              : "border border-ink/15 bg-transparent text-ink/60 hover:border-terracotta hover:text-terracotta"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
