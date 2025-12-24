import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Us | Care.xyz",
  description: "Learn about our mission to make caregiving accessible.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
            Care with Compassion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Care.xyz, we believe everyone deserves high-quality care. Whether it's your child,
            an elderly parent, or a loved one recovering from illness, we connect you with
            trusted professionals who treat your family like their own.
          </p>
        </div>
      </section>
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our goal is to make caregiving **easy, secure, and accessible** for everyone in Bangladesh.
              We solve the struggle of finding verified help by creating a transparent platform where
              families can hire with confidence.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="text-gray-700 font-medium">100% Verified Caregivers (NID Checked)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="text-gray-700 font-medium">Transparent Hourly Pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="text-gray-700 font-medium">24/7 Support for Families</span>
              </div>
            </div>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
          <div className="relative h-100 bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2187d80aeff2?q=80&w=2070&auto=format&fit=crop"
              alt="Caregivers Team"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Who We Are</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src={`https://i.pravatar.cc/150?img=${item + 10}`}
                    alt="Team Member"
                    className="w-full h-full object-cover"/>
                </div>
                <h3 className="text-xl font-bold">Team Member {item}</h3>
                <p className="text-primary text-sm font-medium mb-2">Co-Founder</p>
                <p className="text-gray-500 text-sm">
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