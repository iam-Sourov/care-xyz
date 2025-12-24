import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, ShieldCheck, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-linear-to-br from-blue-50 via-white to-gray-50 py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side: Text Content */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-medium mb-2">
              <Heart className="w-4 h-4 mr-2 fill-primary" /> #1 Caregiving Platform
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Trusted Care for <br />
              <span className="text-primary">Your Loved Ones</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              We provide verified professional caregivers for babies, elderly people, and patients. ensure safety, comfort, and peace of mind for your family.
            </p>

            {/* Feature List (Optional but looks good) */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-700 font-medium">
              <div className="flex items-center"><ShieldCheck className="w-5 h-5 mr-1 text-green-600" /> Verified Staff</div>
              <div className="flex items-center"><Clock className="w-5 h-5 mr-1 text-blue-600" /> 24/7 Support</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg shadow-blue-200" asChild>
                <Link href="/all-services">Find a Caregiver</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2" asChild>
                <Link href="about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="relative animate-in slide-in-from-right duration-700 delay-200">
            {/* Background Blob Shape for style */}
            <div className="absolute -z-10 top-0 right-0 w-100 h-100 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              {/* High Quality Emotional Image from Unsplash */}
              <img
                src="https://static.vecteezy.com/system/resources/previews/006/923/587/large_2x/green-hand-care-icon-logo-free-vector.jpg"
                alt="Caregiver holding hands with elderly person"
                className="w-full h-125 object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Service Rating</p>
                  <p className="font-bold text-gray-900">4.9/5 Excellent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}