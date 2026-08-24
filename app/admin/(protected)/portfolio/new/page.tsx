import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { createPortfolioItem } from "@/app/admin/actions/portfolio";

export default function NewPortfolioItemPage() {
  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Portfolio</p>
      <h1 className="mb-10 font-serif text-4xl italic">Add Portfolio Item</h1>
      <PortfolioForm action={createPortfolioItem} />
    </div>
  );
}
