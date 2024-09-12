import { convertDatesToApiFormat } from "./date-utilities";

export interface ICartItem {
  item_group_id: string;
  start_date: string;
  return_date: string;
  quantity: number;
}

export const prepareCartItemsForBorrowSubmission = (
  cartItems: Array<{
    id: string;
    start_date: string;
    return_date: string;
    quantity: number;
  }>
): ICartItem[] => {
  // Define the properties you want to retain
  const retainedProperties: (keyof ICartItem)[] = [
    "item_group_id",
    "start_date",
    "return_date",
    "quantity",
  ];

  // Transform the array to retain only the desired properties and rename `id` to `item_group_id`
  const mutatedData: ICartItem[] = cartItems.map((item) => {
    // Use reduce to create a new object with only the retained properties
    const result = retainedProperties.reduce((acc, key) => {
      if (key === "item_group_id") {
        acc[key] = item.id; // Map 'id' to 'item_group_id'
      } else if (key in item) {
        acc[key] = item[key];
      }
      return acc;
    }, {} as Record<keyof ICartItem, string | number>);

    // Convert dates to API format
    result.start_date = convertDatesToApiFormat({
      date: result.start_date,
    }).date;
    result.return_date = convertDatesToApiFormat({
      date: result.return_date,
    }).date;

    // Ensure that the result is cast to ICartItem
    return result as ICartItem;
  });

  // Return the array of ICartItem
  return mutatedData;
};
