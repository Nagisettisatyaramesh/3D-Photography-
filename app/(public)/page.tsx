import { Hero } from "@/components/home/Hero";
import { FloatingStatement } from "@/components/home/FloatingStatement";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { Showcase } from "@/components/home/Showcase";
import { FilmsTeaser } from "@/components/home/FilmsTeaser";
import { SignatureMoments } from "@/components/home/SignatureMoments";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Experience } from "@/components/home/Experience";
import { PricingCTA } from "@/components/home/PricingCTA";
import { Testimonials } from "@/components/home/Testimonials";
import { QuoteCTA } from "@/components/home/QuoteCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <FloatingStatement />
      <FeaturedStory />
      <Showcase />
      <FilmsTeaser />
      <SignatureMoments />
      <ServicesSection />
      <Experience />
      <PricingCTA />
      <Testimonials />
      <QuoteCTA />
    </main>
  );
}
