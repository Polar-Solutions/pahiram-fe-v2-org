import React from 'react';
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import Placeholder from '../../../public/image-placeholder.png';
import { Button } from '../ui/button';
import { IItem } from '@/lib/interfaces';

interface CartItemProps {
    item: IItem;
    onRemove: () => void; 
}

export default function CartItem({ item, onRemove }: CartItemProps) {
    return (
        <Card className="w-full rounded-lg mt-2">
            <div className='flex items-center justify-between h-fit overflow-y-auto'>
                <div className="flex flex-col items-start">
                    <div className="flex items-center">
                        <Image
                            src={item.image || Placeholder}
                            alt={item.model_name || "Item"}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="ml-4 mt-4 flex flex-col w-3/5 truncate">
                            <h1>{item.model_name}</h1>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 my-2">
                                    <Button
                                        variant="outline"
                                        className="px-2 py-1"
                                    >
                                        -
                                    </Button>
                                    <span className="text-lg font-medium text-slate-600 dark:text-gray-400">
                                        1
                                    </span>
                                    <Button
                                        variant="outline"
                                        className="px-2 py-1"
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-6 mr-2 cursor-pointer hover:text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        onClick={onRemove} // Call onRemove when clicked
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            </div>
        </Card>
    );
}
