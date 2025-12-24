import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Heart, Users, Award } from "lucide-react";

export const metadata = {
  title: "About Us | Care.xyz",
  description: "Learn about our mission to make caregiving accessible.",
};

export default function AboutPage() {
  const team = [
    { name: "Dr. Ayesha Rahman", role: "Medical Advisor", image: "https://i.pravatar.cc/150?img=5" },
    { name: "Tanvir Hasan", role: "Head of Operations", image: "https://i.pravatar.cc/150?img=11" },
    { name: "Sarah Khan", role: "Community Manager", image: "https://i.pravatar.cc/150?img=9" },
  ];

  return (
    <div className="min-h-screen">

      <section className="bg-primary/5 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-primary text-sm font-medium shadow-sm mb-6">
            <Heart className="w-4 h-4 fill-primary" /> Care with Compassion
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            We Treat Your Family <br className="hidden md:block" />
            <span className="text-primary">Like Our Own</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Care.xyz, we believe everyone deserves high-quality care. Whether it's your child,
            an elderly parent, or a loved one recovering from illness, we connect you with
            trusted professionals.
          </p>
        </div>
      </section>
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our goal is to make caregiving **easy, secure, and accessible** for everyone in Bangladesh.
                We solve the struggle of finding verified help by creating a transparent platform where
                families can hire with confidence.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                "100% Verified Caregivers (NID Checked)",
                "Transparent Hourly Pricing",
                "24/7 Support for Families"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="px-8" asChild>
              <Link href="/all-services">Explore Our Services</Link>
            </Button>
          </div>
          <div className="relative h-125 w-full bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="https://static.vecteezy.com/system/resources/previews/006/923/587/large_2x/green-hand-care-icon-logo-free-vector.jpg"
              alt="Caregiver helping elderly woman"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Excellence</p>
                <p className="font-bold text-gray-900">#1 Rated Platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Meet The Team</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16">
            The dedicated professionals working behind the scenes to ensure your family's safety and comfort.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-32 h-32 mx-auto mb-6 relative rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary/30 transition-colors">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"/>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Dedicated to improving the standards of home care services across the country.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}