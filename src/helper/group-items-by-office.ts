import { ICartItem } from "@/lib/interfaces";

// Function to group items by department
export function groupItemsByDepartment(
  cartItems: ICartItem[]
): Record<string, ICartItem[]> {
  // Initialize an empty object to hold the grouped items
  const groupedItems: Record<string, ICartItem[]> = {};

  // Iterate over each item
  cartItems.forEach((item) => {
    // Use department as the key
    const department = item.department;

    // If the department key doesn't exist in the object, initialize it with an empty array
    if (!groupedItems[department]) {
      groupedItems[department] = [];
    }
    // Push the item into the corresponding department array
    groupedItems[department].push(item);
  });

  return groupedItems;
}
