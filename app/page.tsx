import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Comparison } from "@/components/comparison";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Demo } from "@/components/demo";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Comparison />
        <Features />
        <HowItWorks />
        <Demo />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
