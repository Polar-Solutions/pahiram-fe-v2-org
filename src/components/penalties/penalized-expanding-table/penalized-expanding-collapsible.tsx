import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table"; // Adjust path as needed
import { Badge } from "@/components/ui/badge"; // Import Badge if you want to style the penalty or status

interface ExpandingCollapsibleProps<T> {
  items: T[]; // Generic array of items
  renderRow: (item: T, index: number) => React.ReactNode; // Function to render each row
  emptyMessage?: string; // Optional empty state message
}

export default function ExpandingCollapsible<T>({
                                                  items,
                                                  renderRow,
                                                  emptyMessage = "No items to display"
                                                }: ExpandingCollapsibleProps<T>) {
  // Check if items is a valid array
  if (!Array.isArray(items) || items.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
      <>
        {items.map((item, index) => (
            <TableRow key={index} className="flex justify-evenly">
              {renderRow(item, index)}
            </TableRow>
        ))}
      </>
  );
}
