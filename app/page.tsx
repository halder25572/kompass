import HeroSection from "@/components/layout/shared/Hero";
import TemplatesSection from "@/components/sections/BeautifulBook";
import HowiTWorks from "@/components/sections/HowiTWorks";
import ReadytoCreate from "@/components/sections/ReadytoCreate";
import TestimonialsSection from "@/components/sections/Testimonial";


export default function Home() {
  return (
    <section>
      <HeroSection/>
      <TemplatesSection/>
      <HowiTWorks/>
      <TestimonialsSection/>
      <ReadytoCreate/>
    </section>
  );
}
