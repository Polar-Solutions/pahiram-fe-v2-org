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
import { Control, Controller } from "react-hook-form";

const style = "flex flex-col gap-2";
// Define the interface for form data
interface IFormValues {
  endorser: string;
  purpose: string;
  user_defined_purpose: string;
}

// Define the props interface including Control from RHF
interface BorrowRequestFormContainerProps {
  control: Control<IFormValues>;
}

export const BorrowRequestFormContainer: React.FC<
  BorrowRequestFormContainerProps
> = ({ control }) => {
  return (
    <form className="flex flex-col gap-4 sm:w-full md:w-[40%] h-full">
      <h5 className="text-xl">Borrowing details</h5>

      {/* Endorser */}
      <div className={style}>
        <Controller
          control={control}
          name="endorser"
          defaultValue=""
          rules={{
            min: { value: 1, message: "Quantity must be at least 1" },
            max: { value: 3, message: "Quantity cannot exceed 3" },
          }}
          render={({ field }) => (
            <>
              <Label htmlFor="submit-request-endorser">Endorser</Label>
              <Input id="submit-request-endorser" />
            </>
          )}
        />
      </div>

      {/* Purpose */}
      <div className={style}>
        <Controller
          control={control}
          name="purpose"
          defaultValue=""
          rules={{
            required: "Purpose is required",
            // validate: (value) =>
            //   value !== OFFICES.SELECT_OFFICE.office || "Select Office",
          }}
          render={({ field }) => (
            <>
              <Label htmlFor="submit-request-purpose-dropdown">Purpose</Label>
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger id="submit-request-purpose-dropdown">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent {...field}>
                  {Object.entries(PURPOSE_CONSTANTS).map(
                    ([key, { purpose }]) => (
                      <SelectItem key={key} value={key}>
                        {purpose}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </>
          )}
        />
      </div>

      {/* Specific Purpose */}
      <div className={style}>
        <Controller
          control={control}
          name="user_defined_purpose"
          defaultValue=""
          rules={{
            required: "Purpose is required",
            minLength: {
              value: 5,
              message: "Purpose should be at least 5 characters",
            },
            maxLength: {
              value: 30,
              message: "Purpose should not exceed 30 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9\s-]+$/,
              message:
                "Invalid input. Only letters, numbers, and hyphens are allowed.",
            },
          }}
          render={({ field }) => (
            <>
              <Label htmlFor="specific-purpose">Specific purpose</Label>
              <Textarea
                {...field}
                id="specific-purpose"
                placeholder="Type your purpose here..."
              />
            </>
          )}
        />
      </div>
    </form>
  );
};
