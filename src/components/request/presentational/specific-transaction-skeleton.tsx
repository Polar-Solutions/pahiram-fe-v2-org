import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

export default function SpecificTransactionSkeleton() {
    return (
        <div className="flex flex-col space-y-4 w-full h-auto">
            {/* Transaction Details Skeleton */}
            <div className="w-full flex flex-col mb-4">
                <div className="flex items-center p-4">
                    <div className="flex  w-full">
                        <Skeleton className="w-8 h-8 mr-4 mb-2" /> {/* Icon Skeleton */}
                        <div className="flex flex-col space-y-2 w-full">
                        <Skeleton className="h-6 w-1/3 mb-2" /> {/* TRANSACTION ID */}
                            <Skeleton className="h-4 w-1/2" /> {/* STATUS */}
                            <Skeleton className="h-4 w-1/5" /> {/* DEPARTMENT */}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex'>
                <div className='w-2/5'>
                    <Skeleton className='h-8 w-1/3 mb-4' /> {/* Borrowing details title skeleton */}
                    
                    <div className="grid w-full max-w-sm my-7 items-center gap-1.5">
                        <Skeleton className="h-4 w-1/4" /> {/* Label skeleton */}
                        <Skeleton className="h-10 w-full" /> {/* Input skeleton */}
                    </div>

                    <div className="grid w-full max-w-sm my-7 items-center gap-1.5">
                        <Skeleton className="h-4 w-1/4" /> {/* Label skeleton */}
                        <Skeleton className="h-10 w-full" /> {/* Input skeleton */}
                    </div>

                    <div className="grid w-full max-w-sm my-7 items-center gap-1.5">
                        <Skeleton className="h-4 w-1/4" /> {/* Label skeleton */}
                        <Skeleton className="h-24 w-full" /> {/* Textarea skeleton */}
                    </div>
                </div>

                <div className='w-3/5'>
                    <Skeleton className='h-8 w-1/3 mb-4' /> {/* Borrowing items title skeleton */}

                    <Table>
                        <TableCaption className="w-full text-right">
                        <Skeleton className="h-4 w-3/4 mx-auto" /> {/* Caption skeleton */}
                        </TableCaption>

                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                            <Skeleton className="h-4 w-full" /> {/* Table header skeleton for Name */}
                            </TableHead>
                            <TableHead>
                            <Skeleton className="h-4 w-full" /> {/* Table header skeleton for Quantity */}
                            </TableHead>
                            <TableHead>
                            <Skeleton className="h-4 w-full" /> {/* Table header skeleton for Start Date */}
                            </TableHead>
                            <TableHead>
                            <Skeleton className="h-4 w-full" /> {/* Table header skeleton for End Date */}
                            </TableHead>
                            <TableHead className="text-right">
                            <Skeleton className="h-4 w-full" /> {/* Table header skeleton for Status */}
                            </TableHead>
                        </TableRow>
                        </TableHeader>

                        <TableBody>
                        {[...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-4 w-20" /> {/* Name cell skeleton */}
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-12" /> {/* Quantity cell skeleton */}
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-24" /> {/* Start Date cell skeleton */}
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-24" /> {/* End Date cell skeleton */}
                            </TableCell>
                            <TableCell className="text-start">
                                <Skeleton className="h-4 w-20" /> {/* Status cell skeleton */}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </div>

            </div>


            {/* Actions Skeleton */}
            <div className='space-x-4 flex justify-end mt-4'>
                <Skeleton className="h-10 w-32" /> {/* Cancel Request Button */}
                <Skeleton className="h-10 w-32" /> {/* Edit Request Button */}
            </div>
        </div>
    );
}
