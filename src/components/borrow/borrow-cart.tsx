import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '../ui/button';
import CartItem from '@/components/borrow/cart-item';

export default function BorrowCart() {
  return (
    <Card className="w-full my-4 sm:my-8">
      <CardHeader>
        <h1 className='text-lg lg:text-xl font-bold'>Borrowing Cart</h1>
      </CardHeader>
      <CardContent className="max-h-72 overflow-y-auto no-scrollbar">
        <h2 className="text-sm my-4 text-center font-bold">
        </h2>
      </CardContent>
      <CardFooter className='flex flex-col xl:flex-row justify-end gap-2'>
        <Button className='text-black dark:text-white flex items-center bg-transparent border-2 hover:bg-gray-100 dark:hover:bg-gray-700'>
            <svg
            className='h-5 w-5 mr-2'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="M3 6h18M4 6l1 14h14l1-14H4zM10 11v6M14 11v6" />
            </svg>
            Clear Cart
        </Button>
        <Button className='text-black flex items-center'>
            <svg
            className='h-5 w-5 mr-2'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="M10 17l5-5-5-5" />
            </svg>
            Checkout
        </Button>
      </CardFooter>

    </Card>
  );
}
