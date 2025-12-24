"use client";

import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServiceBookingSection({ serviceId }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="pt-4">
      <Button size="lg" className="w-full md:w-auto text-lg px-8" asChild>
        <Link href={user ? `/booking/${serviceId}` : "/login"}>
          Book This Service Now
        </Link>
      </Button>
      {!user && (
        <p className="text-xs text-red-500 mt-2 font-medium">
          * Login required to proceed
        </p>
      )}
    </div>
  );
}