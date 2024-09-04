'use client'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import {SelectView} from "@/components/panel/presentational/select-view";
import {ShoppingCart} from "lucide-react";
import { Button } from "@/components/ui/button"
import CartItem from '@/components/borrow/cart-item';
import { IItem } from "@/lib/interfaces";
import { useCart } from "@/providers/CartContext";

export default function BorrowingCartNav() {

    const { cartItems , removeItem, clearCart} = useCart();

    return (
        <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <div className="p-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <ShoppingCart/>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader className='my-5'>
                                <SheetTitle>Borrowing Cart</SheetTitle>
                            </SheetHeader>
                            {cartItems.length === 0 ? (
                                    <div className="text-center text-gray-500">No items in the cart</div>
                                ) : (
                                    cartItems.map(item => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            onRemove={() => removeItem(item.id)} // Pass removeItem function to CartItem
                                        />
                                    ))
                                )}
                            <SheetFooter>
                                <SheetClose className="flex justify-between my-5">
                                    <Button 
                                    onClick={clearCart}
                                    className="flex items-center mr-4 bg-transparent border-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        >
                                        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                                        </svg>
                                        Clear Cart
                                    </Button>
                                    <Button type="submit" className="flex items-center">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                        </svg>
                                        Checkout
                                    </Button>
                                </SheetClose>
                            </SheetFooter>

                        </SheetContent>
                        </Sheet>
                    </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={10} side="bottom">Borrowing Cart</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}