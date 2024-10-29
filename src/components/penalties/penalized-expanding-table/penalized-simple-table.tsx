import {Checkbox} from "@/components/ui/checkbox";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";

interface IBorrowedItem {
    borrowed_item_id: string;
    borrowed_item_status: string;
    item_apc_id: string;
    penalty: number;
    receiver_name: string;
    remarks_by_receiver: string,
    penalty_finalizer: string,
    remarks_by_penalty_finalizer: string
}

interface Borrow {
    model_name: string;
    is_required_supervisor_approval: boolean;
    quantity: number;
    start_date: string;
    due_date: string;
    items: IBorrowedItem[];
}

export const PenalizedSimpleTable: React.FC<any> = ({items, onSelect}) => {
    const typeCastedItems: Borrow[] = items;

    // Flatten the structure
    const flattenedItems =
        typeCastedItems &&
        Object.values(typeCastedItems).flatMap(({model_name, due_date, items, start_date, quantity}) =>
            items.map((item) => ({
                model_name,
                due_date,
                quantity,
                start_date,
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
                                <Checkbox onCheckedChange={(checked) => onSelect(item, checked)} />
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