"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const sliderData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop",
    title: "Compassionate Child Care",
    desc: "Safe, engaging, and trusted babysitting for your little ones.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2068&auto=format&fit=crop",
    title: "Respectful Elderly Support",
    desc: "Dignified companionship and assistance for your aging loved ones.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    title: "Professional Medical Assistance",
    desc: "Expert nursing care right at the comfort of your home.",
  },
];

export default function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <div className="w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}>
        <CarouselContent>
          {sliderData.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-125 md:h-150 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700"
                  style={{ backgroundImage: `url(${slide.image})` }}>
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4 max-w-4xl mx-auto space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    {slide.desc}
                  </p>
                  <Button size="lg" className="text-lg px-8 animate-in fade-in zoom-in duration-1000 delay-300" asChild>
                    <Link href="/all-services">Find a Caregiver</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 hover:bg-white text-white hover:text-black border-none" />
        <CarouselNext className="right-4 bg-white/20 hover:bg-white text-white hover:text-black border-none" />
      </Carousel>
    </div>
  );
}