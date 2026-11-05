import { Hero } from "@/components/home/Hero";
import { DepthStatement } from "@/components/home/DepthStatement";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { Coverflow } from "@/components/home/Coverflow";
import { FilmsTeaser } from "@/components/home/FilmsTeaser";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Experience } from "@/components/home/Experience";
import { PricingCTA } from "@/components/home/PricingCTA";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { QuoteCTA } from "@/components/home/QuoteCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <DepthStatement />
      <FeaturedStory />
      <Coverflow />
      <FilmsTeaser />
      <ServicesSection />
      <Experience />
      <PricingCTA />
      <Testimonials />
      <InstagramFeed />
      <QuoteCTA />
    </main>
  );
}
