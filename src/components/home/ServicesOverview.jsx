import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, HeartHandshake, Stethoscope, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Baby Care",
    description: "Expert babysitting for your little ones. We ensure safety, fun, and educational engagement while you are away.",
    icon: Baby,
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    title: "Elderly Care",
    description: "Compassionate companionship and daily assistance for seniors. Dignity and respect are our top priorities.",
    icon: HeartHandshake,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "Patient Care",
    description: "Professional nursing support for sick or recovering family members. Medication management and health monitoring.",
    icon: Stethoscope,
    color: "text-green-500",
    bg: "bg-green-50",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Core Services
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We provide specialized care tailored to the specific needs of your family members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-gray-100">
              <CardHeader>
                <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0 text-primary font-semibold group-hover:translate-x-1 transition-transform" asChild>
                  <Link href="/all-services">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}