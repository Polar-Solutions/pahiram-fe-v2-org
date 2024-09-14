import React from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function RequestListSkeleton() {
    return (
        <>
            {[...Array(6)].map((_, index) => (
                <Card key={index} className="w-full flex flex-row">
                    <CardHeader className="w-1/12">
                        <Skeleton className="w-full h-full"/>
                    </CardHeader>
                    <CardContent className="w-2/3 p-4 flex flex-col justify-between">
                        <div>
                            <Skeleton className="h-6 w-3/4 mb-2"/> {/* Item name */}
                            <Skeleton className="h-4 w-full mb-2"/> {/* Description line 1 */}
                        </div>
                        <Skeleton className="h-4 w-20"/> 
                    </CardContent>
                </Card>


            ))}
        </>
    );
}