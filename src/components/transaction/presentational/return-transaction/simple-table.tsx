import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
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
import { useFormContext } from "react-hook-form";

interface IBorrowedItem {
  borrowed_item_id: string;
  borrowed_item_status: string;
  item_apc_id: string;
}

interface Borrow {
  model_name: string;
  is_required_supervisor_approval: boolean;
  quantity: number;
  start_date: string;
  due_date: string;
  items: IBorrowedItem[];
}

export const SimpleTable: React.FC<any> = ({ items, onSelect }) => {
  const form = useFormContext();
  const typeCastedItems: Borrow[] = items;

  // Flatten the structure
  const flattenedItems =
    typeCastedItems &&
    Object.values(typeCastedItems).flatMap(({ model_name, due_date, items }) =>
      items.map((item) => ({
        model_name,
        due_date,
        ...item,
      }))
    );

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> </TableHead>
          <TableHead>Model</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flattenedItems &&
          Object.values(flattenedItems).map((item, index) => (
            <TableRow key={item?.item_apc_id}>
              <TableCell className="font-medium">
                <Checkbox
                  onCheckedChange={(checked) => {
                    onSelect(item, checked);
                    console.log(form.watch('items'));
                  }}
                />
              </TableCell>
              <TableCell className="font-medium">{item.model_name}</TableCell>
              <TableCell>{item.item_apc_id}</TableCell>
              <TableCell>{item.due_date}</TableCell>
              <TableCell>{item.borrowed_item_status}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
