import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format, parseISO, isSameDay, isValid } from "date-fns";
import { cn } from "@/lib/utils"; // Your utility function for class names
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"; // Your Calendar component
import { format as formatZonedTime, toZonedTime } from "date-fns-tz";

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  placeholder?: string;
  buttonClassName?: string;
  minDate?: Date;
  calendarProps?: any; // Additional props to pass to the Calendar component
}

export function ControlledDatePicker({
  selectedDate,
  onDateChange,
  minDate,
  placeholder = "Pick a date",
  buttonClassName = "w-full min-w[100px] justify-start text-left font-normal",
  calendarProps = {},
}: DatePickerProps) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  const timeZone = "Asia/Manila"; // Manila time zone
  const date = parseISO(selectedDate);

  const handleDateChange = (selected: Date | null) => {
    // Check if the selected date is valid
    if (!selected || !isValid(selected)) {
      setCalendarOpen(false); 
      return;
    }

    // Convert the Date object to Manila time
    const zonedDate = toZonedTime(selected, timeZone);
    const dateString = formatZonedTime(zonedDate, "yyyy-MM-dd", { timeZone }); // Format it to ensure proper date in the timezone
    onDateChange(dateString); // Call the parent callback with the string date in Manila time
    setCalendarOpen(false);
  };

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            buttonClassName,
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          fromDate={minDate ? minDate : null}
          disabled={{ dayOfWeek: [0, 0] }}
          {...calendarProps} // Spread additional calendar props
        />
      </PopoverContent>
    </Popover>
  );
}
