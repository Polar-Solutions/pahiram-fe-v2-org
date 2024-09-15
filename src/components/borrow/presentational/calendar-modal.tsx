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
import { convertDateForHumanConsumption } from "@/helper/date-utilities";
import { useBookedDates } from "@/core/data-access/items";
import { toast } from "@/hooks/use-toast";
import { ICalendarModal } from "@/lib/interfaces/get-booked-dates-request-interface";
import { getURLParams } from "@/helper/borrow/getURLParams";
import { Badge } from "@/components/ui/badge";
import { handleApiClientSideError } from "@/core/handle-api-client-side-error";
import { useItemGroupStore } from "@/hooks/useItemGroupStore";

export const CalendarModal: React.FC<ICalendarModal> = ({
  startDate,
  returnDate,
  onDateChange,
  itemGroupId,
}) => {
  const { data, isLoading } = useBookedDates(itemGroupId);
  const { getItemGroupById } = useItemGroupStore();
  const dataProperty = data?.data?.data;
  console.log("Data property, CALENDAR RENDERED", dataProperty);

  const item = getItemGroupById(itemGroupId);

  const [newEvent, setNewEvent] = useState<Object>({});

  const handleDateSelect = (info: DateSelectArg) => {
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

    onDateChange(formattedStartDate, formattedEndDate);
    setNewEvent({
      start: formattedStartDate,
      end: formattedEndDate,
    });
  };

  // Add delay because the toast error is showing up immediately
  // after opening calendar for errors like unreachable server
  const handleErrorToast = () => {
    setTimeout(() => {
      handleApiClientSideError(data);
    }, 2000);
  };

  if (isLoading)
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
              disabled
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate && returnDate
                ? convertDateForHumanConsumption(startDate) +
                  " to " +
                  convertDateForHumanConsumption(returnDate)
                : "Select date range"}
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    );

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
            onClick={handleErrorToast}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate && returnDate
              ? convertDateForHumanConsumption(startDate) +
                " to " +
                convertDateForHumanConsumption(returnDate)
              : "Select date range"}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] w-full overflow-y-auto">
          <DialogHeader className="flex gap-1">
            <DialogTitle className="text-2xl font-bold">
              {item?.model_name}
            </DialogTitle>
            <DialogDescription className="flex gap-2">
              {/* {itemData?.active_items} */}
              <Badge
                variant={
                  item?.in_circulation === undefined ||
                  item?.in_circulation === 0
                    ? "destructive"
                    : "default"
                }
              >
                {item?.in_circulation || item?.in_circulation === 0
                  ? `${item?.in_circulation} Items Available`
                  : "Unavailable"}
              </Badge>

              <Badge variant="outline">
                {item?.group_category || "No category"}
              </Badge>
              <Badge variant="outline">
                {" "}
                {item?.department || "No designated office"}
              </Badge>
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
              ...(dataProperty?.dates || []),
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
                // TODO: Adjust the ending dates depending on the clients needs
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
