import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IItem } from '@/lib/interfaces/get-specific-transaction-interface';
import ExpandingCollapsible from '@/components/common/expanding-table/expanding-collapsible';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { CalendarModal } from '@/components/borrow/calendar-component/calendar-modal';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuperRefineItemSchema } from "@/lib/form-schemas/submit-borrow-request-form-schema";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { useDropdownStore } from '@/hooks/request/useDropdownStore'; // Adjust the path as needed

interface ExpandTableProps {
  items: IItem[];
  formatDateTime: (dateString: string) => string;
  formatBorrowStatus: (status: string) => { formattedStatus: string, badgeClass: string };
  handleDropdownChange: (value: string, field: string, index: number) => void;
  isEditing: boolean;
  modelNames: string[]; // Include modelNames in props
}

export default function ExpandTable({ items, formatDateTime, formatBorrowStatus, handleDropdownChange, isEditing, modelNames }: ExpandTableProps) {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);
  const { dropdownStates, toggleDropdownState, setQuantity, setModel, selectedQuantities, selectedModels } = useDropdownStore(); // Access the Zustand store

  const form = useForm<z.infer<typeof SuperRefineItemSchema>>({
    resolver: zodResolver(SuperRefineItemSchema),
    mode: "onChange",
    defaultValues: {
      item_group_id: items[0]?.item_group_id || '',
      quantity: 1,
      start_date: "",
      return_date: "",
    },
  });

  const { control, formState: { errors } } = form;

  const handleRowToggle = (index: number) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
  };

  return (
    <FormProvider {...form}>
      <div className='w-full ml-4'>
        <h1 className='text-xl font-bold mb-4'>Borrowing items</h1>
        <Table>
          <TableCaption className="w-full text-right">
            You may now claim items from respective departments.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Quantity</TableHead>
              {isEditing ? (
                <TableHead colSpan={2}>Start to End Date</TableHead>
              ) : (
                <>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                </>
              )}
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const isRowOpen = openRowIndex === index;
              const isDropdownOpen = dropdownStates[index] || false;

              return (
                <React.Fragment key={index}>
                  <TableRow
                    className="cursor-pointer"
                    onClick={() => handleRowToggle(index)}
                  >
                    <TableCell className="font-medium">
                      {isEditing ? (
                        <DropdownMenu onOpenChange={() => toggleDropdownState(index)}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              {selectedModels[index] || item.model_name}{" "}
                              {isDropdownOpen ? (
                                <ChevronUpIcon className="ml-2 inline-block h-4 w-4" />
                              ) : (
                                <ChevronDownIcon className="ml-2 inline-block h-4 w-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Select Model</DropdownMenuLabel>
                            {modelNames.map((model, idx) => (
                              <DropdownMenuItem key={idx} onSelect={() => {
                                setModel(index, model); // Update model in Zustand
                                handleDropdownChange(model, "model_name", index);
                              }}>
                                {model}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        selectedModels[index] || item.model_name
                      )}
                    </TableCell>

                    <TableCell>
                      {isEditing ? (
                        <DropdownMenu onOpenChange={() => toggleDropdownState(index)}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              {selectedQuantities[index] || item.quantity}{" "}
                              {isDropdownOpen ? (
                                <ChevronUpIcon className="ml-2 inline-block h-4 w-4" />
                              ) : (
                                <ChevronDownIcon className="ml-2 inline-block h-4 w-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Select Quantity</DropdownMenuLabel>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                              <DropdownMenuItem
                                key={qty}
                                onSelect={() => {
                                  setQuantity(index, qty); // Update quantity in Zustand
                                  handleDropdownChange(qty.toString(), "quantity", index);
                                }}
                              >
                                {qty}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        selectedQuantities[index] || item.quantity
                      )}
                    </TableCell>

                    {isEditing ? (
                      <TableCell colSpan={2}>
                        <CalendarModal itemGroupId={item.item_group_id} />
                      </TableCell>
                    ) : (
                      <>
                        <TableCell>
                          {formatDateTime(item.start_date)}
                        </TableCell>
                        <TableCell>
                          {formatDateTime(item.due_date)}
                        </TableCell>
                      </>
                    )}

                    <TableCell className="text-center">
                      {isRowOpen ? (
                        <ChevronUpIcon className="h-5 w-5 inline-block text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 inline-block text-gray-500" />
                      )}
                    </TableCell>
                  </TableRow>

                  {isRowOpen && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <ExpandingCollapsible
                          items={item.details} // Pass the details for the specific item
                          renderRow={(detail, index) => {
                            // Define how each row in the collapsed table should be rendered
                            const { formattedStatus, badgeClass } = formatBorrowStatus(detail.borrowed_item_status);
                            return (
                              <>
                                <TableCell className="font-medium">{detail.apc_id}</TableCell>
                                <TableCell className="text-start">
                                  <Badge className={badgeClass}>{formattedStatus}</Badge>
                                </TableCell>
                              </>
                            );
                          }}
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
    </FormProvider>
  );
}
