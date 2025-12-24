import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>

      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}