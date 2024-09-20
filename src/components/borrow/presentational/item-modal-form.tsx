"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CalendarModal } from "../calendar-component/calendar-modal";
import { useCartStore } from "@/hooks/borrow/useCartStore";
import { ICartItem, IItemGroup } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { SuperRefineItemSchema } from "@/lib/form-schemas/submit-borrow-request-form-schema";
import { z } from "zod";

interface ItemModalFormProps {
  handleCloseItemModal: () => void;
  item: IItemGroup;
}

export const ItemModalForm: React.FC<ItemModalFormProps> = ({
  item,
  handleCloseItemModal,
}) => {
  const { addCartItem } = useCartStore();

  const form = useForm<z.infer<typeof SuperRefineItemSchema>>({
    resolver: zodResolver(SuperRefineItemSchema),
    mode: "onChange",
    defaultValues: {
      item_group_id: item.item_group_id,
      quantity: 1,
      start_date: "",
      return_date: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const handleCloseModalAndResetForm = () => {
    form.reset();
    handleCloseItemModal();
  };

  const onSubmit: SubmitHandler<z.infer<typeof SuperRefineItemSchema>> = (
    data
  ) => {
    const formData: ICartItem = {
      ...item,
      quantity: data.quantity,
      start_date: data.start_date,
      return_date: data.return_date,
    };

    addCartItem(formData);
    handleCloseModalAndResetForm();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[2fr_8fr] gap-4">
          {/* QUANTITY FIELD */}
          <FormField
            control={control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    {...field}
                    value={field.value} // Ensure value binding
                    onChange={(e) => field.onChange(Number(e.target.value))} // Convert string to number
                    className="w-full"
                  />
                </FormControl>
                <FormMessage>
                  {errors.quantity && errors.quantity.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Borrow Duration */}
          <FormItem>
            <FormLabel
              className={
                errors.start_date || errors.return_date ? "text-[#7e1f1d]" : ""
              }
            >
              Borrow Duration
            </FormLabel>
            <CalendarModal itemGroupId={item.item_group_id} />
            {errors.start_date?.message && (
              <FormMessage>{errors.start_date.message}</FormMessage>
            )}
            {errors.return_date?.message && (
              <FormMessage>{errors.return_date.message}</FormMessage>
            )}
            {/* {errors.root?.message && (
              <FormMessage>{errors.root.message}</FormMessage>
            )} */}
          </FormItem>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleCloseModalAndResetForm}>
            Cancel
          </Button>

          <Button className="text-black" type="submit">
            Add to borrowing cart
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
