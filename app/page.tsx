import HeroSection from "@/components/layout/shared/Hero";
import TemplatesSection from "@/components/sections/BeautifulBook";
import ContactSection from "@/components/sections/ContactSection";
import HowItWorksSummary from "@/components/sections/HowItWorksSummary";
import ReadytoCreate from "@/components/sections/ReadytoCreate";
import TestimonialsSection from "@/components/sections/Testimonial";


export default function Home() {
  return (
    <section>
      <HeroSection/>
      <TemplatesSection/>
      <HowItWorksSummary/>
      <TestimonialsSection/>
      <ReadytoCreate/>
      <ContactSection/>
    </section>
  );
}
