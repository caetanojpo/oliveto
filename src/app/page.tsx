import { Header } from "@/components/organisms/header";
import { HeroSection } from "@/components/organisms/hero-section";
import { AboutSection } from "@/components/organisms/about-section";
import { StatsSection } from "@/components/organisms/stats-section";
import { CalculatorBanner } from "@/components/organisms/calculator-banner";
import { HowItWorksSection } from "@/components/organisms/how-it-works-section";
import { ServicesSection } from "@/components/organisms/services-section";
import { ArticlesCarousel } from "@/components/organisms/articles-carousel";
import { FaqSection } from "@/components/organisms/faq-section";
import { TestimonialsSection } from "@/components/organisms/testimonials-section";
import { PartnersSection } from "@/components/organisms/partners-section";
import { NewsletterSection } from "@/components/organisms/newsletter-section";
import { WhatsAppButton } from "@/components/molecules/whatsapp-button";
import { Footer } from "@/components/organisms/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <HeroSection />
      <AboutSection />
      {/* <StatsSection /> */}
      {/* <CalculatorBanner /> */}
      <HowItWorksSection />
      <ServicesSection />
      <ArticlesCarousel />
      <FaqSection />
      <TestimonialsSection />
      {/* <PartnersSection /> */}
      {/* <NewsletterSection /> */}
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
