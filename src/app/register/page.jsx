"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const nid = form.nid.value;
    const password = form.password.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters, with 1 uppercase and 1 lowercase letter.");
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, "https://github.com/shadcn.png");
      const userPayload = {
        name,
        email,
        phone,
        nid,
        role: "user",
        createdAt: new Date()
      };
      const dbResponse = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      if (dbResponse.ok) {
        toast("Registration Successful!");
        router.push("/");
      } else {
        throw new Error("Failed to save user data to database.");
      }

    } catch (err) {
      console.error(err);
      if (err.message.includes("email-already-in-use")) {
        setError("This email is already registered.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-10">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-primary">Create an Account</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Join Care.xyz to find trusted caregivers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required className="focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" required className="focus-visible:ring-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Contact No</Label>
                <Input id="phone" name="phone" placeholder="017..." required className="focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nid">NID Number</Label>
                <Input id="nid" name="nid" placeholder="National ID" required className="focus-visible:ring-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                required
                className="focus-visible:ring-primary"/>
              <p className="text-xs text-gray-500">
                Must contain 1 uppercase, 1 lowercase, 6+ chars.
              </p>
            </div>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200 animate-in fade-in">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full font-semibold" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account? <Link href="/login" className="text-primary hover:underline font-bold">Log in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}