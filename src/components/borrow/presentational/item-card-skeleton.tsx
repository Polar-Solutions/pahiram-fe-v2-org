import React from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function ItemCardSkeleton() {
    return (
        <>
            {[...Array(6)].map((_, index) => (
                <Card key={index} className="w-full h-full flex flex-col">
                    <CardHeader className="p-0">
                        <Skeleton className="w-full aspect-[4/3]"/> {/* Match the aspect ratio of the image */}
                    </CardHeader>
                    <CardContent className="flex-grow p-4">
                        <Skeleton className="h-6 w-3/4 mb-2"/> {/* Item name */}
                        <Skeleton className="h-4 w-full mb-2"/> {/* Description line 1 */}
                        <Skeleton className="h-4 w-2/3 mb-4"/> {/* Description line 2 */}
                        <div className="flex items-center justify-between mb-2">
                            <Skeleton className="h-4 w-16"/> {/* Office */}
                            <Skeleton className="h-5 w-24 rounded-full"/> {/* Circulation status */}
                        </div>
                        <Skeleton className="h-4 w-20"/> {/* Category */}
                    </CardContent>
                </Card>
            ))}
        </>
    );
}