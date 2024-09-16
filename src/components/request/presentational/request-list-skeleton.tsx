import React from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function RequestListSkeleton() {
    return (
        <>
            {[...Array(6)].map((_, index) => (
                <Card key={index} className="w-full flex flex-row">
                    <CardHeader className="w-2/12">
                        <Skeleton className="w-full h-full"/>
                    </CardHeader>
                    <CardContent className="w-2/3 p-4 flex flex-col justify-between">
                        <div>
                            <Skeleton className="h-6 w-full mb-2"/> {/* TRANSACTION ID */}
                            <Skeleton className="h-4 w-40 mb-2"/> {/* DEPARTMENT */}
                        </div>
                        <Skeleton className="h-4 w-2/5"/>  {/* DATE SUBMITTED */}
                    </CardContent>
                </Card>
            ))}
        </>
    );
}