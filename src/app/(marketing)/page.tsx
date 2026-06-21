import { WhatsNew } from "@/components/marketing/whats-new";
import { Hero } from "@/components/marketing/hero";
import { ProductVisual } from "@/components/marketing/product-visual";
import { Differentiators } from "@/components/marketing/differentiators";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { InsightsShowcase } from "@/components/marketing/insights-showcase";
import { PrivacyCallout } from "@/components/marketing/privacy-callout";
import { FAQ } from "@/components/marketing/faq";
import { CTA } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <WhatsNew />
      <Hero />
      <ProductVisual />
      <Differentiators />
      <FeatureGrid />
      <InsightsShowcase />
      <PrivacyCallout />
      <FAQ />
      <CTA />
    </>
  );
}
