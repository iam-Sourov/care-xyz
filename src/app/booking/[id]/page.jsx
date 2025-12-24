"use client";

import { useState, useEffect, useContext, use } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import PrivateRoute from "@/components/routes/PrivateRoute"; // Updated to match your path
import { useRouter } from "next/navigation";
import { Calendar as CalendarIcon, MapPin, Clock, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function BookingPage({ params }) {
  // In Next.js 15+, params is a Promise, so we unwrap it with React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const { user } = useContext(AuthContext);
  const router = useRouter();

  // --- State ---
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // --- Form State ---
  const [duration, setDuration] = useState(1);
  const [date, setDate] = useState("");
  const [address, setAddress] = useState({
    division: "",
    district: "",
    area: "",
    details: ""
  });

  // --- 1. Fetch Service Details ---
  useEffect(() => {
    if (!id) return;

    // We fetch ALL services and find the one matching ID (Simple approach)
    // Alternatively, you can create a specific GET /api/services/[id] route
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(s => s._id === id);
        if (found) {
          setService(found);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // --- 2. Calculate Costs ---
  const pricePerHour = service?.price || 0;
  const totalCost = pricePerHour * duration;
  const serviceCharge = (totalCost * 0.05).toFixed(2); // 5% Platform fee
  const grandTotal = (totalCost + parseFloat(serviceCharge)).toFixed(2);

  // --- 3. Handle Submit ---
  const handleBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const bookingData = {
      serviceName: service.serviceName,
      serviceId: service._id,
      userEmail: user?.email,
      userName: user?.displayName,
      price: grandTotal,
      duration: duration,
      date: date,
      address: address,
      status: "Pending"
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });

      if (res.ok) {
        alert("Booking Successful! Check your email invoice.");
        router.push("/my-bookings");
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-10 h-10 text-primary" /></div>;
  if (!service) return <div className="text-center p-20 text-red-500">Service not found or invalid ID.</div>;

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* --- LEFT: BOOKING FORM --- */}
          <Card className="md:col-span-2 shadow-md">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="booking-form" onSubmit={handleBooking} className="space-y-6">

                {/* Date & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="date"
                        className="pl-9"
                        required
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (Hours)</Label>
                    <div className="relative">
                      <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="number"
                        min="1"
                        max="24"
                        value={duration}
                        className="pl-9"
                        onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Address Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Division</Label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                        onChange={(e) => setAddress({ ...address, division: e.target.value })}
                      >
                        <option value="">Select Division</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Rajshahi">Rajshahi</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>District</Label>
                      <Input
                        placeholder="e.g. Narayanganj"
                        required
                        onChange={(e) => setAddress({ ...address, district: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Area / Street</Label>
                    <Input
                      placeholder="e.g. Gulshan 1, Road 12"
                      required
                      onChange={(e) => setAddress({ ...address, area: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>House Details</Label>
                    <Input
                      placeholder="House No, Flat No..."
                      required
                      onChange={(e) => setAddress({ ...address, details: e.target.value })}
                    />
                  </div>
                </div>

              </form>
            </CardContent>
          </Card>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <Card className="h-fit bg-slate-50 border-primary/20 shadow-md">
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service</span>
                <span className="font-medium text-right">{service.serviceName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rate</span>
                <span>${pricePerHour} / hr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span>{duration} Hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee (5%)</span>
                <span>${serviceCharge}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">${grandTotal}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full text-lg font-bold"
                size="lg"
                type="submit"
                form="booking-form"
                disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" /> Confirm & Pay
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PrivateRoute>
  );
}