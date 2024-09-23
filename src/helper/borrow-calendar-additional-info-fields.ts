import { IDateInfo } from "@/lib/interfaces/get-booked-dates-request-interface";

export const addAdditionalInfoFieldsForBorrowCalendar = (
  items: IDateInfo[] | undefined,
  maxItemReservation: number | undefined
) => {
  if (!items) {
    return null;
  }

  console.log(items);

  return items.map((item) => {
    if (item.count == maxItemReservation) {
      return {
        ...item, // Spread the existing item properties
        title: "Fully booked 🥳", // Add the new field
        color: "#f44336",
      };
    }

    return {
      ...item, // Spread the existing item properties
      title: `${item.count} Reserved`, // Add the new field
    };
  });
};
