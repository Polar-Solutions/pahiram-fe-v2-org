import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table"; // Adjust path as needed
import { IItem, IBorrowedItemDetail } from '@/lib/interfaces/get-specific-transaction-interface'; // Adjust path as needed
import { Badge } from "@/components/ui/badge"; // Adjust path as needed

// Define the props type to accept IBorrowedItemDetail[] instead of IItem[]
interface ExpandingCollapsibleProps {
  items: IBorrowedItemDetail[]; // Still expect IBorrowedItemDetail[]
  modelName: string;            // Add model name as prop
  startDate: string;            // Add start date as prop
  dueDate: string;              // Add due date as prop
  formatDateTime: (dateString: string) => string;
  formatBorrowStatus: (status: string) => { formattedStatus: string, badgeClass: string };
}


export default function ExpandingCollapsible({
  items,
  modelName,
  startDate,
  dueDate,
  formatDateTime,
  formatBorrowStatus
}: ExpandingCollapsibleProps) {
  return (
    <>
      {items.map((item, index) => {
        const { formattedStatus, badgeClass } = formatBorrowStatus(item.borrowed_item_status);
        return (
          <TableRow key={`${item.borrowed_item_id}-${index}`}>
            <TableCell className="font-medium">{modelName}</TableCell>
            {/* Each expanded row will show quantity = 1 */}
            <TableCell>{1}</TableCell>
            <TableCell>{`${formatDateTime(startDate)}`}</TableCell>
            <TableCell>{`${formatDateTime(dueDate)}`}</TableCell>
            <TableCell className="text-start">
              <Badge className={badgeClass}>{formattedStatus}</Badge>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

