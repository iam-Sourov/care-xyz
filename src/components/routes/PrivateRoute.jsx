"use client";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (!user) {
    router.push(`/login?redirect=${pathname}`);
    return null;
  }

  return children;
}