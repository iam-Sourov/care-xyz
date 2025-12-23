"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import PrivateRoute from "@/components/PrivateRoute";
import Link from "next/link";
import { Trash2, Calendar, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MyBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/bookings?email=${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setBookings(data);
          } else {
            setBookings([]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching bookings:", err);
          setBookings([]);
          setLoading(false);
        });
    }
  }, [user]);

  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setBookings(bookings.filter((b) => b._id !== id));
        alert("Booking cancelled successfully.");
      } else {
        alert("Failed to cancel.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed">
            <h3 className="text-lg font-semibold text-gray-700">No bookings found</h3>
            <p className="text-gray-500 mb-6">You haven't booked any services yet.</p>
            <Button asChild>
              <Link href="/#services">Browse Services</Link>
            </Button>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{booking.serviceName}</span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {booking.address?.area || "Dhaka"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {booking.date ? new Date(booking.date).toLocaleDateString() : "N/A"}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-gray-700">
                        ${booking.price}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            booking.status === "Pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                              booking.status === "Confirmed" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                                "bg-gray-100 text-gray-800"
                          }>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleCancel(booking._id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </PrivateRoute>
  );
}