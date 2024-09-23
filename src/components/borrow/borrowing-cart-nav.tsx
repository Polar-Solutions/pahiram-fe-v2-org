"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, ShoppingCart, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/borrow/useCartStore";
import { useRouter } from "next/navigation";
import { DisplayGroupedItemsByOffice } from "./presentational/display-grouped-items-by-office";
import { ConfirmationDialog } from "../common/confirmation-dialog";

export const BorrowingCartNav = () => {
  const { clearCart, isCartEmpty } = useCartStore();
  const router = useRouter();
  const handleClick = () => {
    router.push("/borrow/checkout");
  };

  // TODO: Add number of items in cart as badge

  return (
    <Sheet>
      {/* Cart Icon on nav bar */}
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <ShoppingCart />
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open item cart</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SheetContent className="overflow-y-auto">
        <SheetHeader className="my-5">
          <SheetTitle>Borrowing Cart</SheetTitle>
        </SheetHeader>

        {/* Cart Item Accordion Separated by Office */}
        <DisplayGroupedItemsByOffice />

        {/* Footer Section */}
        <SheetFooter className="flex justify-between my-5">
          <ConfirmationDialog
            content={{
              title: "Clear cart content?",
              description:
                "This action will delete your saved items from your cart.",
            }}
            footerBtns={{
              cancel: "Cancel",
              action: "Clear Cart",
              actionFn: () => {
                clearCart();
              },
            }}
          >
            <Button
              disabled={isCartEmpty()}
              className="flex items-center mr-4 bg-transparent border-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Trash className="mr-2 h-4 w-4" />
              Clear cart
            </Button>
          </ConfirmationDialog>

          <SheetClose>
            <Button
              disabled={isCartEmpty()}
              onClick={handleClick}
              className="flex items-center"
            >
              <ChevronRight className="mr-2 h-4 w-4" />
              Proceed to checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
