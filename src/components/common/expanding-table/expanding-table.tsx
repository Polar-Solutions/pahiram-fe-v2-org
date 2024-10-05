import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IItem } from '@/lib/interfaces/get-specific-transaction-interface'; // Adjust path as needed
import { Badge } from "@/components/ui/badge"; // Import your Badge component
import ExpandingCollapsible from '@/components/common/expanding-table/expanding-collapsible'; // Import your ExpandingCollapsible component
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'; // Import Radix icons

interface ExpandTableProps {
  items: IItem[];
  formatDateTime: (dateString: string) => string;
  formatBorrowStatus: (status: string) => { formattedStatus: string, badgeClass: string };
}

export default function ExpandTable({ items, formatDateTime, formatBorrowStatus }: ExpandTableProps) {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null); // Track which row is expanded

  const handleRowToggle = (index: number) => {
    setOpenRowIndex(openRowIndex === index ? null : index); // Toggle open state for the row
  };

  return (
    <div className='w-3/5'>
      <h1 className='text-xl font-bold'>Borrowing items</h1>
      <Table>
        <TableCaption className="w-full text-right">
          You may now claim items from respective departments.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="w-[50px]"></TableHead> {/* Space for the arrow icon */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => {
            const isRowOpen = openRowIndex === index;

            // Check if details exist and use the first one for the status
            const firstDetail = item.details.length > 0 ? item.details[0] : null;

            return (
              <React.Fragment key={index}>
                {/* Main Row */}
                <TableRow
                  className={`cursor-pointer ${item.quantity > 1 ? '' : ''}`} 
                  onClick={() => item.quantity > 1 && handleRowToggle(index)} // Only toggle if quantity > 1
                >
                  <TableCell className="font-medium">{item.model_name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatDateTime(item.start_date)}</TableCell>
                  <TableCell>{formatDateTime(item.due_date)}</TableCell>

                  {/* Display the status of the first item in the details array */}
                  {firstDetail ? (
                    <TableCell className="text-start">
                      {/* Format and display the status of the first detail */}
                      {firstDetail && (
                        <Badge className={formatBorrowStatus(firstDetail.borrowed_item_status).badgeClass}>
                          {formatBorrowStatus(firstDetail.borrowed_item_status).formattedStatus}
                        </Badge>
                      )}
                    </TableCell>
                  ) : (
                    <TableCell className="text-start">
                      <Badge>No Status</Badge>
                    </TableCell>
                  )}

                  {/* Only show the arrow icon if the item is expandable (quantity > 1) */}
                  <TableCell className="text-center">
                    {item.quantity > 1 ? (
                      isRowOpen ? (
                        <ChevronUpIcon className="h-5 w-5 inline-block text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 inline-block text-gray-500" />
                      )
                    ) : null}
                  </TableCell>
                </TableRow>

                {/* Expanding Row (collapsible content) */}
                {isRowOpen && item.quantity > 1 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                    <ExpandingCollapsible
                      items={item.details} // Pass the details array
                      modelName={item.model_name} // Pass the model name
                      startDate={item.start_date} // Pass the start date
                      dueDate={item.due_date} // Pass the due date
                      formatDateTime={formatDateTime}
                      formatBorrowStatus={formatBorrowStatus}
                    />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
