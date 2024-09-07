"use-client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { groupItemsByDepartment } from "@/helper/group-items-by-office";
import { useCartStore } from "@/hooks/borrow/useCartStore";
import React from "react";
import CartItem from "../../cart-item";
import { DisplayGroupedItemsByOffice } from "../../presentational/display-grouped-items-by-office";

export const BorrowRequestItemsContainer = () => {
  const { getAllCartItems } = useCartStore();
  const groupedCartItems = groupItemsByDepartment(getAllCartItems());
  return (
    <div className="flex flex-col gap-4 sm:w-full md:w-[60%]">
      <h5 className="text-xl">Requested items</h5>
      <div>
        <DisplayGroupedItemsByOffice/>
      </div>
    </div>
  );
};
