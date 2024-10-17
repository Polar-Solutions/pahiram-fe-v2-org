import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function TransactionCardSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="w-full h-full flex flex-col">
          {/* Card header with user info and button-like structure */}
          <CardHeader className="flex justify-between mb-4">
            {/* Left side: user profile info */}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" /> {/* Profile picture */}
              <div>
                <Skeleton className="h-6 w-40 mb-1" /> {/* Name */}
                <Skeleton className="h-4 w-32" /> {/* Submitted date */}
              </div>
            </div>

            {/* Right side: button-like structure */}
            <div className="flex justify-end space-x-4">
              <Skeleton className="h-8 w-28" /> {/* Approve button */}
              <Skeleton className="h-8 w-28" /> {/* Decline button */}
              <Skeleton className="h-8 w-12" /> {/* Decline button */}
            </div>

            <Skeleton className="h-4 w-32" /> 
            <Skeleton className="h-4 w-32" /> 
          </CardHeader>

          {/* Card content */}
          <CardContent className="flex-grow p-4">
            <Skeleton className="h-6 w-2 /4 mb-2" /> 
            <Skeleton className="h-4 w-2/4 mb-2" /> 
            <Skeleton className="h-4 w-2/4 mb-4" /> 
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-16" /> 
              <Skeleton className="h-5 w-24 rounded-full" /> 
            </div>
            <Skeleton className="h-4 w-20" /> 
          </CardContent>
        </Card>
      ))}
    </>

  );
}
