"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, ClipboardCheck, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/stores/useCartStore";
import { useRouter } from "nextjs-toploader/app";
import { DisplayGroupedItemsByOffice } from "./presentational/display-grouped-items-by-office";
import { ConfirmationDialog } from "../common/confirmation-dialog";
import { getURLParams } from "@/helper/borrow/getURLParams";
import { updateURLParams } from "@/helper/borrow/updateURLParams";

export const BorrowingCartNav = () => {
  const { showBorrowingListSheet } = getURLParams();

  const { clearCart, isCartEmpty, getAllQuantity } = useCartStore();
  const router = useRouter();
  const handleClick = () => {
    router.push("/borrow/checkout");
  };

  const handleCloseSheet = () => {
    const newUrl = updateURLParams({
      "show-borrowing-list-sheet": 0,
    });
    window.history.pushState({}, "", newUrl);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseSheet();
    }
  };

  return (
    <Sheet open={showBorrowingListSheet} onOpenChange={handleOpenChange}>
      {/* Cart Icon on nav bar */}
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Icon with larger parent div */}
                <ClipboardCheck
                  size={24}
                  className="text-black dark:text-white"
                />
                {getAllQuantity() ? (
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-black border-2 border-white dark:border-zinc-900">
                    {getAllQuantity()}
                  </div>
                ) : null}
              </div>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open borrowing list</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SheetContent className="overflow-y-auto">
        <SheetHeader className="my-5">
          <SheetTitle>Borrowing List</SheetTitle>
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

          <Button
            disabled={isCartEmpty()}
            onClick={handleClick}
            className="flex items-center"
          >
            <ChevronRight className="mr-2 h-4 w-4" />
            Proceed to checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
