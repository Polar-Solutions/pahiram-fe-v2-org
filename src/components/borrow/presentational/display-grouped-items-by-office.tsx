import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCartStore } from "@/hooks/borrow/useCartStore";
import { groupItemsByDepartment } from "@/helper/group-items-by-office";
import CartItem from "../cart-item";

export const DisplayGroupedItemsByOffice = () => {
  const { getAllCartItems } = useCartStore();
  const groupedCartItems = groupItemsByDepartment(getAllCartItems());

  // Check if groupedCartItems has data
  if (!Object.keys(groupedCartItems).length) {
    return <p className="text-center text-gray-500">No items in your cart</p>;
  }

  return (
    <>
      {Object.entries(groupedCartItems).map(([department, items]) => (
        <Accordion
          type="multiple"
          defaultValue={[department]}
          className="w-full"
          key={`accordion-${department}`}
        >
          <AccordionItem value={department} key={`item-${department}`}>
            <AccordionTrigger>{department}</AccordionTrigger>
            <AccordionContent>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};
