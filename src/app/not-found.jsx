import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-extrabold text-primary tracking-widest">404</h1>
      <div className="bg-orange-100 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="mt-8 text-lg text-gray-600 font-medium">
        Oops! The page you are looking for does not exist.
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}