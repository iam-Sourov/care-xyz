import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Heart, ShieldCheck } from "lucide-react";

export default function Testimonials() {
  const stats = [
    { label: "Happy Families", value: "200+", icon: Users, color: "text-blue-500" },
    { label: "Verified Caregivers", value: "50+", icon: ShieldCheck, color: "text-green-500" },
    { label: "Hours of Care", value: "10k+", icon: Heart, color: "text-red-500" },
  ];

  const reviews = [
    {
      name: "Sarah Ahmed",
      role: "Mother of two",
      comment: "Care.xyz saved my job! I found a reliable babysitter in less than 2 hours. Highly recommended.",
      rating: 5,
    },
    {
      name: "Rahim Uddin",
      role: "Son of elderly patient",
      comment: "The nurse we hired for my father is incredibly professional and kind. Thank you for this platform.",
      rating: 5,
    },
    {
      name: "Emily Das",
      role: "Working Mom",
      comment: "Secure, fast, and transparent. I love the invoice feature and the ability to track bookings.",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* --- PART 1: SUCCESS METRICS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-full bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- PART 2: TESTIMONIALS --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Trusted by Families</h2>
          <p className="text-gray-500 mt-2">See what our community has to say</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <Card key={idx} className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "{review.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}