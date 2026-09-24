import { Hero } from "@/components/home/Hero";
import { DepthStatement } from "@/components/home/DepthStatement";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { Coverflow } from "@/components/home/Coverflow";
import { ChapterCube } from "@/components/home/ChapterCube";
import { FilmsTeaser } from "@/components/home/FilmsTeaser";
import { SignatureMoments } from "@/components/home/SignatureMoments";
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
      <ChapterCube />
      <FilmsTeaser />
      <SignatureMoments />
      <ServicesSection />
      <Experience />
      <PricingCTA />
      <Testimonials />
      <InstagramFeed />
      <QuoteCTA />
    </main>
  );
}
