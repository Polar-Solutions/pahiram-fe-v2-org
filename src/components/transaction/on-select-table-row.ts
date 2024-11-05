import { IBorrowedItemDetail } from "@/lib/interfaces/get-specific-transaction-interface";

export const onSelectApproveAndRelease = (
  item: IBorrowedItemDetail,
  checked: boolean,
  getValues: (key: string) => IBorrowedItemDetail[],
  setValue: (
    key: string,
    value: Pick<IBorrowedItemDetail, "borrowed_item_id">[]
  ) => void
) => {
  // Get the current values from the form state, specifying the key
  const currentValues = getValues("items") || []; // Get the current items or default to empty array

  if (checked) {
    // Check if the item is already in the array
    const isAlreadySelected = currentValues.some(
      (currentItem) => currentItem.borrowed_item_id === item?.borrowed_item_id
    );

    if (!isAlreadySelected) {
      // Add the selected item if it's not already in the array
      const updatedValues = [...currentValues, item];
      // console.log("ITEEEEMM MO TO", updatedValues);
      setValue("items", updatedValues);
    }
  } else {
    // Remove the item from the array by filtering it out based on borrowed_item_id
    const updatedValues = currentValues.filter(
      (currentItem) => currentItem.borrowed_item_id !== item.borrowed_item_id
    );
    setValue("items", updatedValues);
  }
};
