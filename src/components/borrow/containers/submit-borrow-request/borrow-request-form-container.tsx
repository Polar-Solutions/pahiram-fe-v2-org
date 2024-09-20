import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PURPOSE_CONSTANTS } from "@/CONSTANTS/PURPOSE_CONSTANTS";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BorrowRequestFormContainerProps } from "@/components/borrow/containers/submit-borrow-request/submit-borrow-request-container";

export const BorrowRequestFormContainer: React.FC<BorrowRequestFormContainerProps> = ({ form }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <h5 className="text-xl">Borrowing details</h5>

            <FormField
                control={form.control}
                name="endorsed_by"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="submit-request-endorser">Endorser</FormLabel>
                        <FormControl>
                            <Input id="submit-request-endorser" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="submit-request-purpose-dropdown">Purpose</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger id="submit-request-purpose-dropdown">
                                    <SelectValue placeholder="Select purpose" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.entries(PURPOSE_CONSTANTS).map(([key, { purpose }]) => (
                                    <SelectItem key={key} value={key}>
                                        {purpose}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="user_defined_purpose"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="specific-purpose">Specific purpose</FormLabel>
                        <FormControl>
                            <Textarea
                                id="specific-purpose"
                                placeholder="Type your purpose here..."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};