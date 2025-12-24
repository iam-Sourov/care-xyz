import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import Slider from "@/components/slider/Slider";
import Testimonials from "@/components/testimonials/Testimonials";


export default function Home() {
  return (
    <main>
      <Hero></Hero>
      <Slider></Slider>
      <ServicesOverview></ServicesOverview>
      <Testimonials></Testimonials>
    </main>
  );
}