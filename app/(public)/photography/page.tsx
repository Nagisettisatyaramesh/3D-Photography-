import { getPortfolioItems, getPortfolioCategories } from "@/lib/content/livePortfolio";
import { brand } from "@/lib/content/brandImages";
import { PhotographyGallery } from "@/components/gallery/PhotographyGallery";
import { RevealText } from "@/components/ui/RevealText";
import { HeroImage } from "@/components/ui/HeroImage";

export default async function PhotographyPage() {
  const [items, categories] = await Promise.all([getPortfolioItems(), getPortfolioCategories()]);

  return (
    <main>
      <section className="relative flex h-[60svh] min-h-[440px] w-full items-end overflow-hidden bg-black">
        <HeroImage src={brand.halfSaree1} alt="Floral ceremony decor" />
        <div className="relative z-10 px-6 pb-14 text-parchment md:px-12 md:pb-20">
          <p className="eyebrow mb-4 text-terracotta-soft">Photography</p>
          <RevealText
            as="h1"
            lines={["A gallery built on", "light and honesty."]}
            triggerOnMount
            className="font-serif text-5xl italic leading-[1.05] md:text-7xl"
          />
        </div>
      </section>

      <PhotographyGallery items={items} categories={categories} />
    </main>
  );
}
