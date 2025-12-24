import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "All Services | Care.xyz",
  description: "Browse our trusted caregiving services.",
};

export default async function ServicesPage() {
  const client = await clientPromise;
  const db = client.db("care-xyz-db");
  const services = await db.collection("services").find({}).toArray();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Our Care Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional, compassionate, and verified caregivers ready to assist your family.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service._id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
              <div className="relative h-48 w-full bg-gray-200 rounded-t-xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.serviceName}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"/>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-black backdrop-blur-sm">
                    ${service.price}/hr
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{service.serviceName}</CardTitle>
              </CardHeader>
              <CardContent className="grow">
                <p className="text-gray-500 line-clamp-3">
                  {service.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/services/${service._id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}