"use-client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import CartItem from "../../cart-item";

export const BorrowRequestItemsContainer = () => {
  const [parsedCartItems, setParsedCartItems] = useState([]);

  useEffect(() => {
    try {
      const cartitems = localStorage.getItem("cartItems");
      console.log("Raw cart items:", cartitems); // Check if this logs the string as expected

      if (cartitems) {
        const parsed = JSON.parse(cartitems); // Parse the JSON string to an object/array
        console.log("Parsed cart items:", parsed); // Ensure this logs the parsed array
        setParsedCartItems(parsed); // Set the parsed items into the state
      } else {
        console.warn("cartItems key is empty or missing");
      }
    } catch (error) {
      console.error("Error parsing cart items:", error);
    }
  }, []);

  console.log(parsedCartItems);
  return (
    <div className="flex flex-col gap-4 sm:w-full md:w-[60%]">
      <h5 className="text-xl">Requested items</h5>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>ITRO</AccordionTrigger>
            <AccordionContent>{/* <CartItem props={} /> */}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
