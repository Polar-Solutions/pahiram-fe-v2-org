import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CalendarModal } from "./calendar-modal";
import { useCartStore } from "@/hooks/borrow/useCartStore";
import { ICartItem, IItemGroup } from "@/lib/interfaces";

interface ItemModalFormProps {
  handleCloseItemModal: () => void;
  item: IItemGroup;
}

export const ItemModalForm: React.FC<ItemModalFormProps> = ({
  item,
  handleCloseItemModal,
}) => {
  const { handleSubmit, control, setValue, reset, watch } = useForm();

  // Define the internal submit handler
  const onSubmit: SubmitHandler<any> = (data) => {
    // Format the data to match the desired structure
    const formData: ICartItem = {
      ...item,
      quantity: data.quantity,
      start_date: data.start_date,
      return_date: data.return_date,
    };

    // Add the structured data to the cart or handle it as needed
    addCartItem(formData);
    handleCloseItemModal();
  };

  // Watch for date range changes
  const startDate = watch(`items[${item.item_group_id}].start_date`);
  const returnDate = watch(`items[${item.item_group_id}].end_date`);

  const { addCartItem, getCartItemById } = useCartStore();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[2fr_8fr] gap-4">
        {/* QUANTITY FIELD */}
        <div>
          <Controller
            control={control}
            name="quantity"
            defaultValue={1}
            rules={{
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
              max: { value: 3, message: "Quantity cannot exceed 3" },
            }}
            render={({ field }) => (
              <>
                <Label
                  {...field}
                  htmlFor="quantity"
                  className="text-sm font-medium"
                >
                  Quantity
                </Label>
                <Input
                  {...field}
                  id="quantity"
                  type="number"
                  min={1}
                  className="w-full"
                />
              </>
            )}
          />
        </div>

        {/* Borrow Duration */}
        <div>
          <Controller
            name="start_date"
            control={control}
            defaultValue={getCartItemById(item.item_group_id)?.start_date || ""}
            rules={{ required: "Start date is required" }}
            render={({ field: startField }) => (
              <Controller
                name="return_date"
                control={control}
                defaultValue={
                  getCartItemById(item.item_group_id)?.return_date || ""
                }
                rules={{ required: "Return date is required" }}
                render={({ field: returnField }) => (
                  <CalendarModal
                    itemGroupId={item.item_group_id}
                    startDate={startField.value}
                    returnDate={returnField.value}
                    onDateChange={(start, returnDate) => {
                      setValue(`start_date`, start);
                      setValue(`return_date`, returnDate);
                    }}
                  />
                )}
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={() => handleCloseItemModal()}>
          Cancel
        </Button>

        <Button className="text-black" type="submit">
          Add to borrowing cart
        </Button>
      </div>
    </form>
  );
};
