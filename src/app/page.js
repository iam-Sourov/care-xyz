import Slider from "@/components/slider/Slider";
import Testimonials from "@/components/testimonials/Testimonials";


export default function Home() {
  return (
    <main>
      <Slider />
      <section id="services" className="py-20">
      </section>
      <Testimonials />
    </main>
  );
}