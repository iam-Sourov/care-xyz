import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getServices() {
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db("care-xyz-db");
  const services = await db.collection("services").find({}).toArray();
  return services.map(service => ({
    ...service,
    _id: service._id.toString(),
  }));
}

export default async function Home() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Reliable Care for Your Loved Ones
              </h1>
              <p className="mx-auto max-w-175 text-gray-500 md:text-xl dark:text-gray-400">
                Professional babysitting, elderly assistance, and special needs care.
                Trusted professionals at your doorstep.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="#services">Book a Service</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
              <p className="max-w-225 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Choose from our wide range of professional care options designed for your familys needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service._id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img
                    src={service.image}
                    alt={service.serviceName}
                    className="w-full h-48 object-cover rounded-md mb-4"/>
                  <CardTitle>{service.serviceName}</CardTitle>
                  <CardDescription className="text-primary font-semibold">
                    ${service.price} / hour
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3">
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
      </section>
      <section className="w-full py-12 md:py-24 bg-gray-100">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by 10,000+ Families
            </h2>
            <p className="mx-auto max-w-150 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We ensure every caregiver is vetted, background-checked, and certified.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold text-primary">500+</h3>
              <p className="text-sm text-gray-500">Caregivers</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold text-primary">98%</h3>
              <p className="text-sm text-gray-500">Satisfaction</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold text-primary">24/7</h3>
              <p className="text-sm text-gray-500">Support</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold text-primary">10k+</h3>
              <p className="text-sm text-gray-500">Bookings</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}