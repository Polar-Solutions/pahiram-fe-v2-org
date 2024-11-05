import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatBorrowedItemStatus,
  formatBorrowStatus,
} from "@/helper/formatting-utilities";
import { Badge } from "@/components/ui/badge";
import { useFormContext } from "react-hook-form";
import { getUserFromAuthCookie } from "@/core/data-access/cookies";
import { useUserStore } from "@/hooks/stores/useUser";
import { Button } from "@/components/ui/button";
import {
  ACTIVE_BORROWED_ITEM_STATUSES,
  BORROWED_ITEM_STATUS,
} from "@/CONSTANTS/BORROWED_ITEM_STATUS";

interface IBorrowedItem {
  borrowed_item_id: string;
  borrowed_item_status: string;
  item_apc_id: string;
}

interface Borrow {
  model_name: string;
  quantity: number;
  start_date: string;
  due_date: string;
  is_required_supervisor_approval: boolean;
  items: IBorrowedItem[];
}

const showCheckbox = (status: string) => {
  return Object.values(ACTIVE_BORROWED_ITEM_STATUSES).includes(status);
};

export const SimpleTable: React.FC<any> = ({
  isFetchLoading,
  isFetchSuccess,
  refetchItems,
  items,
  onSelect,
}) => {
  const { getValues, setValue } = useFormContext();
  const typeCastedItems: Borrow[] = items;
  const user = useUserStore();
  const userRole = user?.userData?.role;

  // Flatten the structure
  const flattenedItems =
    typeCastedItems &&
    Object.values(typeCastedItems).flatMap(
      ({
        model_name,
        due_date,
        items,
        start_date,
        is_required_supervisor_approval,
      }) =>
        items.map((item) => ({
          model_name,
          due_date,
          start_date,
          is_required_supervisor_approval,
          ...item,
        }))
    );

  if (isFetchLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
      </div>
    );
  }

  if (isFetchSuccess) {
    return (
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Model</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Supervisor Approval</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flattenedItems &&
            Object.values(flattenedItems).map((item) => {
              const { variant, formattedStatus } = formatBorrowedItemStatus(
                item.borrowed_item_status
              );
              return (
                <TableRow key={item?.item_apc_id}>
                  <TableCell>
                    {showCheckbox(item?.borrowed_item_status) && (
                      <div className="pr-2">
                        <Checkbox
                          // disabled={approvalDisabled}
                          onCheckedChange={(checked) =>
                            onSelect(item, checked, getValues, setValue)
                          }
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item?.model_name}</TableCell>
                  <TableCell>{item?.item_apc_id}</TableCell>
                  <TableCell>{item?.start_date}</TableCell>
                  <TableCell>{item?.due_date}</TableCell>
                  <TableCell>
                    <Badge variant={variant}>
                      {formattedStatus === "In Possession"
                        ? "Possessed"
                        : formattedStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.is_required_supervisor_approval?.toString()}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Button variant="outline" onClick={refetchItems()}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Click to reload items
      </Button>
    </div>
  );
};
