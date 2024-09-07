import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CalendarIcon } from "lucide-react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg } from "@fullcalendar/core";

import React, { useState } from "react";
import { convertDateForHumanConsumption } from "@/helper/DateUtility";

interface CalendarModal {
  startDate: string;
  returnDate: string;
  onDateChange: (start: string, returnDate: string) => void;
}
export const CalendarModal: React.FC<CalendarModal> = ({
  startDate,
  returnDate,
  onDateChange,
}) => {
  const [newEvent, setNewEvent] = useState<Object>({});

  const handleDateSelect = (info: DateSelectArg) => {
    console.log("Handle Select Date", info);
    const origStartDateStr = new Date(info.startStr);
    const origEndDateStr = new Date(info.endStr);

    origStartDateStr.setMinutes(
      origStartDateStr.getMinutes() - origStartDateStr.getTimezoneOffset()
    );
    origEndDateStr.setMinutes(
      origEndDateStr.getMinutes() - origEndDateStr.getTimezoneOffset()
    );

    const formattedStartDate = origStartDateStr.toISOString().slice(0, 16);
    const formattedEndDate = origEndDateStr.toISOString().slice(0, 16);

    // setStartDate(formattedStartDate);
    // setEndDate(formattedEndDate);

    onDateChange(formattedStartDate, formattedEndDate);

    setNewEvent({
      start: formattedStartDate,
      end: formattedEndDate,
    });
  };

  return (
    <div className="flex flex-col flex-start">
      <Label
        htmlFor="borrow-duration-selector"
        className="text-sm font-medium mb-1"
      >
        Borrow Duration
      </Label>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            id="borrow-duration-selector"
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate && returnDate
              ? convertDateForHumanConsumption(startDate) +
                " to " +
                convertDateForHumanConsumption(returnDate)
              : "Select date range"}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] w-full">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>

          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              start: "prev,next",
              center: "title",
              end: "timeGridWeek,timeGridDay",
            }}
            // buttonText={{
            //   listWeek: "List Week",
            //   listDay: "List Day",
            // }}
            // views={["dayGridWeek", "dayGridDay", "listWeek"]}
            initialView="timeGridWeek"
            //   views={["dayGridWeek", "dayGridDay"]}
            views={{
              timeGridWeek: {
                type: "timeGrid", // Ensure the correct type for the view
                duration: { weeks: 1 },
              },
              timeGridDay: {
                type: "timeGrid",
                duration: { days: 1 },
              },
              dayGridMonth: {
                type: "dayGrid",
                duration: { months: 1 },
              },
            }}
            hiddenDays={[0]} // Sunday Hidden
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            displayEventEnd={true}
            allDaySlot={false}
            validRange={() => {
              const nowDate = new Date();
              const nextTwoMonthsDate = new Date(nowDate);
              const localNowDate = new Date(
                nowDate.toLocaleString("en-US", { timeZone: "Asia/Manila" })
              );
              return {
                start: localNowDate,
                end: nextTwoMonthsDate.setMonth(
                  nextTwoMonthsDate.getMonth() + 2
                ),
              };
            }}
            select={handleDateSelect}
            events={[
              // ...bookedDates,
              { title: "Chosen Date", ...newEvent, color: "#e7b426" },
            ]}
            slotMinTime={"07:30:00"}
            slotMaxTime={"17:30:00"}
            nextDayThreshold={"09:00:00"}
            businessHours={[
              {
                // AM
                daysOfWeek: [1, 2, 3, 4, 5, 6],
                startTime: "7:30",
                endTime: "12:00",
              },
              {
                // PM
                daysOfWeek: [1, 2, 3, 4, 5, 6],
                startTime: "13:00", // 1pm
                endTime: "18:00", // 6pm
              },
            ]}
            contentHeight={"auto"}
            height={"parent"}
            // selectConstraint={"businessHours"}
            //   eventBackgroundColor={secondaryMain}
          />

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
