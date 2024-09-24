import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

const ItemModalSkeleton = ({ open, onOpenChange }: {
    open: boolean | undefined;
    onOpenChange: (open: boolean) => void;
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[900px] max-h-[100dvh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Skeleton className="w-full h-[300px] rounded-lg" />
                        <Skeleton className="h-8 w-3/4" />
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-6 w-24" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/6" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-11/12" />
                                <Skeleton className="h-4 w-10/12" />
                                <Skeleton className="h-4 w-9/12" />
                            </div>
                            <Skeleton className="h-6 w-24" />
                        </div>

                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-1/2" />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ItemModalSkeleton;