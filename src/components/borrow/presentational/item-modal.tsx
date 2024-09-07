import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { getURLParams } from "@/helper/borrow/getURLParams";
import { updateURLParams } from "@/helper/borrow/updateURLParams";
import { useRouter } from "next/navigation";
// import {useCart} from "@/providers/CartContext"

//
// interface ISpecificItemModalProps {
//     // showModal: boolean;
//     // setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
//     // item: IItem | undefined;
// }

import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useCart } from "@/providers/CartContext";
import {IItem} from "@/lib/interfaces";

interface ISpecificItemModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalItem: IItem | undefined;
}
// TODO: Implement URL reading instead of useState

export default function ItemModal() {
  // const {showModal, setShowModal, item} = props;
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [shouldTruncate, setShouldTruncate] = useState(false);

  const { item, showModalItem } = getURLParams();

  const router = useRouter();

  const handleCloseModal = () => {
    const newUrl = updateURLParams({ item: "", showModalItem: 0 });
    router.push(newUrl);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (item?.description) {
      setShouldTruncate(item.description.length > 150);
    }
  }, [item]);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleAddToCart = () => {
    if (item) {
      // setShowModal(false); // Optionally close the modal
    }
  };

  return (
    <Dialog open={showModalItem} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[100dvh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <img
              src={item?.image || "/image-placeholder.png"}
              alt={item?.model_name}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full mt-5 md:mt-0"
              style={{ aspectRatio: "4/3", objectFit: "cover" }}
            />
            <DialogTitle className="text-2xl font-bold">
              {item?.model_name}
            </DialogTitle>

            {/*TODO: Dynamic tag in circulation */}
            {/*Tags*/}
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item?.in_circulation
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item?.in_circulation
                  ? `${item.in_circulation} in circulation`
                  : "Unavailable"}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {item?.group_category_id || "No category"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item?.department || "No designated office"}
                </span>
              </div>
            </div>
            <div className="max-h-[130px] overflow-y-auto space-y-2">
              <p className="text-muted-foreground">
                {shouldTruncate && !isDescriptionExpanded
                  ? truncateDescription(
                      item?.description || "No description available.",
                      150
                    )
                  : item?.description || "No description available."}
              </p>
              {shouldTruncate && (
                <Button
                  variant="link"
                  onClick={toggleDescription}
                  className="p-0"
                >
                  {isDescriptionExpanded ? "See less" : "See more"}
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Borrowing Policy</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna.
                </li>
                <li>
                  Pellentesque sit amet sapien fringilla, mattis ligula
                  consectetur, ultrices mauris.
                </li>
                <li>
                  Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                  Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                </li>
                <li>
                  Curabitur pellentesque nibh nibh, at maximus ante fermentum
                  sit amet.
                </li>
              </ol>
              <Button variant="link" className="p-0">
                View Policy
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="borrowing-period"
                    className="text-sm font-medium"
                  >
                    Borrowing Period (days)
                  </Label>
                  <Input
                    id="borrowing-period"
                    type="number"
                    min={1}
                    defaultValue={1}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    defaultValue={1}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="borrow-start-date"
                    className="text-sm font-medium"
                  >
                    Borrow Start Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="borrow-start-date"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate
                          ? startDate.toDateString()
                          : "Select start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label
                    htmlFor="borrow-return-date"
                    className="text-sm font-medium"
                  >
                    Borrow Return Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="borrow-return-date"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate
                          ? returnDate.toDateString()
                          : "Select return date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => handleCloseModal()}>
              Cancel
            </Button>
            <Button
              className="text-black"
              onClick={() => {
                handleAddToCart();
                handleCloseModal();
              }}
            >
              Add to Borrowing Cart
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
