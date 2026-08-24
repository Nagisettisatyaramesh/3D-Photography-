import { getServices, getPricingNote } from "@/lib/content/liveServices";
import { brand } from "@/lib/content/brandImages";
import { RevealText } from "@/components/ui/RevealText";
import { HeroImage } from "@/components/ui/HeroImage";
import { ServiceDetailRow } from "@/components/services/ServiceDetailRow";

export default async function ServicesPage() {
  const [services, pricingNote] = await Promise.all([getServices(), getPricingNote()]);

  return (
    <main>
      <section className="relative flex h-[60svh] min-h-[440px] w-full items-end overflow-hidden bg-black">
        <HeroImage src={brand.weddingBridePlate} alt="Bride holding a traditional ritual object" />
        <div className="relative z-10 px-6 pb-14 text-parchment md:px-12 md:pb-20">
          <p className="eyebrow mb-4 text-terracotta-soft">Services</p>
          <RevealText
            as="h1"
            lines={["What we bring to", "your celebration."]}
            triggerOnMount
            className="font-serif text-5xl italic leading-[1.05] md:text-7xl"
          />
        </div>
      </section>

      <p className="mx-auto max-w-lg px-6 pt-16 text-center text-sm text-ink/60 md:px-12">{pricingNote}</p>

      <div className="mt-16 flex flex-col gap-24 pb-28 md:gap-32 md:pb-40">
        {services.map((service, i) => (
          <ServiceDetailRow key={service.id} service={service} index={i} />
        ))}
      </div>
    </main>
  );
}
