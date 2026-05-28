import { Hero } from "@/components/marketing/hero";
import { Differentiators } from "@/components/marketing/differentiators";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { PrivacyCallout } from "@/components/marketing/privacy-callout";
import { FAQ } from "@/components/marketing/faq";
import { CTA } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Differentiators />
      <FeatureGrid />
      <PrivacyCallout />
      <FAQ />
      <CTA />
    </>
  );
}
