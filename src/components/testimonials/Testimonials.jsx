import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Heart, ShieldCheck, Quote } from "lucide-react";

export default function Testimonials() {
  const stats = [
    { label: "Happy Families", value: "200+", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Verified Caregivers", value: "50+", icon: ShieldCheck, color: "text-green-600", bg: "bg-green-100" },
    { label: "Hours of Care", value: "10k+", icon: Heart, color: "text-red-600", bg: "bg-red-100" },
  ];

  const reviews = [
    {
      name: "Sarah Ahmed",
      role: "Mother of two",
      comment: "Care.xyz saved my job! I found a reliable babysitter in less than 2 hours. Highly recommended.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Rahim Uddin",
      role: "Son of elderly patient",
      comment: "The nurse we hired for my father is incredibly professional and kind. Thank you for this platform.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=11"
    },
    {
      name: "Emily Das",
      role: "Working Mom",
      comment: "Secure, fast, and transparent. I love the invoice feature and the ability to track bookings.",
      rating: 4,
      image: "https://i.pravatar.cc/150?img=9"
    },
  ];

  return (
    <section className="py-24 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Quote className="w-4 h-4 mr-2" /> Testimonials
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Trusted by Families Like Yours
          </h2>
          <p className="text-lg text-gray-500">
            Don't just take our word for it. Here is what our community has to say about their experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <Card key={idx} className="relative border-none shadow-lg bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <Quote className="absolute top-6 right-6 text-gray-100 w-12 h-12 rotate-180" />

              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={review.image} alt={review.name} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-xs text-primary font-medium uppercase tracking-wide">{review.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed">
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