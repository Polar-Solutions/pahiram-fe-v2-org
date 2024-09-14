import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getURLParams } from "@/helper/borrow/getURLParams";
import { updateURLParams } from "@/helper/borrow/updateURLParams";
import { useRouter } from "next/navigation";
import { IItem } from "@/lib/interfaces";
import { ItemModalForm } from "./item-modal-form";
import { Badge } from "@/components/ui/badge";

interface ISpecificItemModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalItem: IItem | undefined;
}
// TODO: Implement URL reading instead of useState

export default function ItemModal() {
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

  return (
    <>
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

              {/*Tags*/}
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    item?.in_circulation === undefined ||
                    item?.in_circulation === 0
                      ? "destructive"
                      : "default"
                  }
                >
                  {item?.in_circulation || item?.in_circulation === 0
                    ? `${item.in_circulation} Items Available`
                    : "Unavailable"}
                </Badge>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {item?.group_category_id || "No category"}
                  </Badge>
                  <Badge variant="outline">
                    {" "}
                    {item?.department || "No designated office"}
                  </Badge>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna.
                  </li>
                  <li>
                    Pellentesque sit amet sapien fringilla, mattis ligula
                    consectetur, ultrices mauris.
                  </li>
                  <li>
                    Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                    Vestibulum auctor ornare leo, non suscipit magna interdum
                    eu.
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

              {/* Form within the item modal, and within it is the calendar modal */}
              {item && (
                <ItemModalForm
                  item={item}
                  handleCloseItemModal={handleCloseModal}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
