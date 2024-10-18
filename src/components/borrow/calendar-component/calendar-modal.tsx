import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CalendarIcon } from "lucide-react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg } from "@fullcalendar/core";

import { useFormContext } from "react-hook-form";
import { convertDateForHumanConsumption } from "@/helper/date-utilities";
import { useBookedDates } from "@/core/data-access/items";
import { ICalendarModal } from "@/lib/interfaces/get-booked-dates-request-interface";
import { Badge } from "@/components/ui/badge";
import { handleApiClientSideError } from "@/core/handle-api-client-side-error";
import { useItemGroupStore } from "@/hooks/stores/useItemGroupStore";
import { CustomBorrowDateRangeModal } from "./custom-borrow-date-range-modal";
import { addAdditionalInfoFieldsForBorrowCalendar } from "@/helper/borrow-calendar-additional-info-fields";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const CalendarModal: React.FC<ICalendarModal> = ({ itemGroupId }) => {
    const { setValue, watch, formState: { errors } } = useFormContext();
    const { data, isLoading } = useBookedDates(itemGroupId);
    const dataProperty = data?.data?.data;

    const { getItemGroupById } = useItemGroupStore();
    const item = getItemGroupById(itemGroupId);

    const chosenDateRage = {
        start: watch("start_date"),
        end: watch("return_date"),
    };

    const [isOpenDateModalPicker, setisOpenDateModalPicker] = useState(false);
    const handleOpenDateRangeModal = () => {
        setisOpenDateModalPicker(true);
    };

    const handleDateSelect = (info: DateSelectArg) => {
        const origStartDateStr = new Date(info.startStr);
        const origEndDateStr = new Date(info.endStr);
        origStartDateStr.setMinutes(origStartDateStr.getMinutes() - origStartDateStr.getTimezoneOffset());
        origEndDateStr.setMinutes(origEndDateStr.getMinutes() - origEndDateStr.getTimezoneOffset());

        const formattedStartDate = origStartDateStr.toISOString().slice(0, 16);
        const formattedEndDate = origEndDateStr.toISOString().slice(0, 16);

        setValue("start_date", formattedStartDate);
        setValue("return_date", formattedEndDate);
    };

    const handleErrorToast = () => {
        setTimeout(() => {
            handleApiClientSideError(data);
        }, 2000);
    };

    if (isLoading)
        return (
            <Button variant="outline" id="borrow-duration-selector" className="w-full justify-start text-left font-normal" disabled>
                <CalendarIcon className="mr-2 h-4 w-4" />{" "}
                {watch("start_date") && watch("return_date")
                    ? `${convertDateForHumanConsumption(watch("start_date"))} to ${convertDateForHumanConsumption(watch("return_date"))}`
                    : "Select date range"}{" "}
                <LoadingSpinner className="w-4 ml-2" />
            </Button>
        );

    return (
        <div className="flex flex-col flex-start">
            <Dialog>
                <div>
                    <DialogTrigger asChild>
                        <Button variant="outline" id="borrow-duration-selector" className="w-full justify-start text-left font-normal" onClick={handleErrorToast}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {watch("start_date") && watch("return_date")
                                ? `${convertDateForHumanConsumption(watch("start_date"))} to ${convertDateForHumanConsumption(watch("return_date"))}`
                                : "Select date range"}
                        </Button>
                    </DialogTrigger>
                </div>

                <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] max-h-[90%] w-full overflow-y-auto">
                    <DialogHeader className="flex gap-1">
                        <DialogTitle className="text-2xl font-bold">{item?.model_name}</DialogTitle>
                        <div className="flex gap-2">
                            <Badge variant={item?.in_circulation === undefined || item?.in_circulation === 0 ? "destructive" : "default"}>
                                {item?.in_circulation || item?.in_circulation === 0 ? `${item?.in_circulation} Items Available` : "Unavailable"}
                            </Badge>

                            <Badge variant="outline">{item?.group_category || "No category"}</Badge>
                            <Badge variant="outline">{item?.department || "No designated office"}</Badge>
                        </div>
                    </DialogHeader>

                    <div className="h-full overflow-y-auto">
                        <FullCalendar
                            dragScroll={true}
                            dateClick={() => handleOpenDateRangeModal()}
                            handleWindowResize
                            nowIndicator={true}
                            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                            headerToolbar={{
                                start: "prev,next",
                                center: "title",
                                end: "timeGridWeek,timeGrid",
                            }}
                            buttonText={{
                                listWeek: "List Week",
                                listDay: "List Day",
                            }}
                            initialView="timeGridWeek"
                            views={{
                                timeGridWeek: {
                                    type: "timeGrid",
                                    duration: { weeks: 1 },
                                },
                                timeGridDay: {
                                    type: "timeGrid",
                                    duration: { days: 5 },
                                },
                                dayGridMonth: {
                                    type: "dayGrid",
                                    duration: { months: 1 },
                                },
                            }}
                            hiddenDays={[0]} // Hide Sunday
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            displayEventEnd={true}
                            allDaySlot={false}
                            select={handleDateSelect} // Allow date selection for new events
                            events={[
                                ...(addAdditionalInfoFieldsForBorrowCalendar(dataProperty?.dates, dataProperty?.item_group_data.active_items) || []).map((event) => ({
                                    ...event,
                                    editable: false, // Disable dragging of reserved events
                                    startEditable: false, // Prevent start date change of reserved events
                                    durationEditable: false, // Prevent resizing of reserved events
                                    overlap: false, // Prevent overlap behavior (for safety)
                                    className: "reserved-event", // Optional: Custom class for CSS styling
                                })),
                                {
                                    title: "Chosen Date",
                                    ...chosenDateRage,
                                    color: "#e7b426",
                                },
                            ]}
                            slotMinTime={"07:30:00"}
                            slotMaxTime={"17:30:00"}
                            nextDayThreshold={"00:00:00"}
                            businessHours={[
                                {
                                    // AM Business Hours
                                    daysOfWeek: [1, 2, 3, 4, 5, 6],
                                    startTime: "7:30",
                                    endTime: "12:00",
                                },
                                {
                                    // PM Hours
                                    daysOfWeek: [1, 2, 3, 4, 5, 6],
                                    startTime: "13:00", // 1pm
                                    endTime: "18:00", // 6pm
                                },
                            ]}
                            contentHeight={"auto"}
                            height={"!100%"}
                            expandRows={true}
                            eventOverlap={true} // Allow overlap of events
                            selectOverlap={() => true} // Allow new date selection overlapping existing events
                            editable={false} // Enable editability for new events only
                            droppable={false} // Allow external elements to be dropped onto the calendar
                            eventAllow={() => false} // Prevent dragging or resizing of all existing events
                            eventContent={(eventInfo) => (
                                <div
                                    className={`pointer-events-none ${eventInfo.event.classNames}`}
                                    style={{
                                        whiteSpace: "nowrap", // Prevent wrapping of text
                                        overflow: "hidden", // Hide overflow text
                                        textOverflow: "ellipsis", // Show ellipsis when text overflows
                                    }}
                                >
                                    {eventInfo.event.title}
                                </div>
                            )}
                        />
                    </div>

                    <DialogFooter className="sm:justify-end">
                        <Button onClick={() => handleOpenDateRangeModal()} type="button" variant="secondary">
                            Open Custom Date Picker
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Custom Date Selector Modal */}
            {isOpenDateModalPicker && <CustomBorrowDateRangeModal isOpen={isOpenDateModalPicker} onClose={() => setisOpenDateModalPicker(false)} />}
        </div>
    );
};
