import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("care-xyz-db");
    await db.collection("services").deleteMany({});

    const services = [
      {
        serviceName: "Child Care",
        description: "Professional babysitting services for children aged 6 months to 10 years. Our verified sitters ensure safety and fun.",
        price: 15, // Hourly rate
        image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800",
        category: "Baby Sitting"
      },
      {
        serviceName: "Elderly Care",
        description: "Compassionate companionship and medical assistance for seniors. We help with medication, mobility, and daily tasks.",
        price: 25,
        image: "https://images.unsplash.com/photo-1581579439045-8a8b8c7b8d45?auto=format&fit=crop&q=80&w=800",
        category: "Elderly Care"
      },
      {
        serviceName: "Care.xyz",
        description: "Specialized assistance for patients recovering from surgery. Includes wound dressing and monitoring vitals.",
        price: 30,
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
        category: "Medical"
      }
    ];

    await db.collection("services").insertMany(services);

    return NextResponse.json({ message: "Services seeded successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}