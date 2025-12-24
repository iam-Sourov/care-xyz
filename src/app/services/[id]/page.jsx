import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import ServiceBookingSection from "@/components/ServiceClient/ServiceBookingSection"; // Import the new component

export async function generateMetadata({ params }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return { title: "Not Found" };

  const client = await clientPromise;
  const db = client.db("care-xyz-db");
  const service = await db.collection("services").findOne({ _id: new ObjectId(id) });

  return {
    title: service ? `${service.serviceName} | Care.xyz` : "Not Found",
    description: service?.description || "Service details",
  };
}

export default async function ServiceDetails({ params }) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) return notFound();

  const client = await clientPromise;
  const db = client.db("care-xyz-db");
  const service = await db.collection("services").findOne({ _id: new ObjectId(id) });

  if (!service) return notFound();

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Services
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative rounded-xl overflow-hidden border shadow-sm">
          <img
            src={service.image}
            alt={service.serviceName}
            className="w-full h-100 object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{service.serviceName}</h1>
            <p className="text-2xl font-semibold text-primary mt-2">
              ${service.price} <span className="text-sm text-gray-500 font-normal">/ hour</span>
            </p>
          </div>
          <p className="text-gray-600 leading-relaxed">{service.description}</p>
          <div className="bg-gray-50 p-5 rounded-lg border space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Verified Caregiver
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Clock className="w-4 h-4 mr-2 text-blue-500" /> Flexible Hours
            </div>
          </div>

          {/* Use the new component here and pass the ID */}
          <ServiceBookingSection serviceId={service._id.toString()} />

        </div>
      </div>
    </div>
  );
}