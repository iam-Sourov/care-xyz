import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Loading() {
  // Create an array of 6 items to show 6 fake cards
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section Skeleton */}
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-64 mx-auto" /> {/* Title Skeleton */}
          <Skeleton className="h-6 w-full max-w-lg mx-auto" /> {/* Subtitle Skeleton */}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletons.map((_, index) => (
            <Card key={index} className="flex flex-col h-full">
              {/* Image Skeleton */}
              <div className="h-48 w-full bg-gray-200 rounded-t-xl overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>

              {/* Title Skeleton */}
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>

              {/* Description Skeleton */}
              <CardContent className="grow space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>

              {/* Button Skeleton */}
              <CardFooter>
                <Skeleton className="h-10 w-full rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}