import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PURPOSE_CONSTANTS } from "@/CONSTANTS/PURPOSE_CONSTANTS";

const style = "flex flex-col gap-2";

export const BorrowRequestFormContainer = () => {
  return (
    <div className="flex flex-col gap-4 sm:w-full md:w-[40%]">
      <h5 className="text-xl">Borrowing details</h5>

      {/* Endorser */}
      <div className={style}>
        <Label htmlFor="submit-request-endorser">Endorser</Label>
        <Input id="submit-request-endorser" />
      </div>
      
      {/* Purpose */}
      <div className={style}>
        <Label htmlFor="submit-request-purpose-dropdown">Purpose</Label>
        <Select>
          <SelectTrigger id="submit-request-purpose-dropdown">
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(PURPOSE_CONSTANTS).map(([key, { purpose }]) => (
              <SelectItem key={key} value={purpose}>
                {purpose}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Specific Purpose */}
      <div className={style}>
        <Label htmlFor="specific-purpose">Specific purpose</Label>
        <Textarea id="specific-purpose" placeholder="Type your purpose here..." />
      </div>
    </div>
  );
};
