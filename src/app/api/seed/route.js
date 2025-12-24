// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("care-xyz-db");
//     await db.collection("services").deleteMany({});

//     const services = [
//   {
//     "serviceName": "Child Care",
//     "description": "Professional babysitting services for children aged 6 months to 10 years. Includes engaging activities and meals.",
//     "price": 15,
//     "image": "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=60",
//     "category": "Baby Sitting"
//   },
//   {
//     "serviceName": "Elderly Care",
//     "description": "Compassionate companionship and medical assistance for seniors. We help with daily routines and medication.",
//     "price": 25,
//     "image": "https://images.unsplash.com/photo-1581579439045-8a8b8c7b8d45?auto=format&fit=crop&w=800&q=60",
//     "category": "Elderly Care"
//   },
//   {
//     "serviceName": "Post-Op Recovery",
//     "description": "Specialized assistance for patients recovering from surgery. Includes wound care and physical aid.",
//     "price": 30,
//     "image": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=60",
//     "category": "Medical"
//   },
//   {
//     "serviceName": "Pet Sitting",
//     "description": "Reliable pet sitting for dogs and cats. Includes walking, feeding, and playtime while you are away.",
//     "price": 12,
//     "image": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=60",
//     "category": "Pet Care"
//   },
//   {
//     "serviceName": "Deep House Cleaning",
//     "description": "Thorough cleaning services for your home, including vacuuming, dusting, and sanitizing bathrooms.",
//     "price": 20,
//     "image": "https://images.unsplash.com/photo-1581578731117-104f2a412c54?auto=format&fit=crop&w=800&q=60",
//     "category": "Housekeeping"
//   },
//   {
//     "serviceName": "Home Physiotherapy",
//     "description": "Certified physiotherapists visiting your home to help with mobility exercises and pain relief.",
//     "price": 45,
//     "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=60",
//     "category": "Medical"
//   },
//   {
//     "serviceName": "Academic Tutoring",
//     "description": "One-on-one tutoring for K-12 students in Math, Science, and English to boost academic performance.",
//     "price": 22,
//     "image": "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=60",
//     "category": "Education"
//   },
//   {
//     "serviceName": "Special Needs Support",
//     "description": "Dedicated support for individuals with special needs, focusing on skill-building and daily comfort.",
//     "price": 35,
//     "image": "https://images.unsplash.com/photo-1529397938791-2aba4681454f?auto=format&fit=crop&w=800&q=60",
//     "category": "Special Care"
//   },
//   {
//     "serviceName": "Healthy Meal Prep",
//     "description": "Personalized meal preparation services catering to dietary restrictions and healthy living goals.",
//     "price": 18,
//     "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=60",
//     "category": "Nutrition"
//   },
//   {
//     "serviceName": "Mental Health Counseling",
//     "description": "Virtual or in-person counseling sessions to support mental well-being and stress management.",
//     "price": 50,
//     "image": "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=60",
//     "category": "Mental Health"
//   },
//   {
//     "serviceName": "Garden Maintenance",
//     "description": "Professional gardening services including lawn mowing, pruning, and planting for a beautiful yard.",
//     "price": 25,
//     "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=60",
//     "category": "Home Service"
//   },
//   {
//     "serviceName": "Tech Support for Seniors",
//     "description": "Patient technology assistance for seniors, helping with phones, computers, and internet setup.",
//     "price": 18,
//     "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=60",
//     "category": "Technology"
//   }
// ];

//     await db.collection("services").insertMany(services);

//     return NextResponse.json({ message: "Services seeded successfully!" });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }