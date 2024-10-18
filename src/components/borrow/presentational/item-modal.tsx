import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {getURLParams} from "@/helper/borrow/getURLParams";
import {updateURLParams} from "@/helper/borrow/updateURLParams";
import {IItem, IItemGroup} from "@/lib/interfaces";
import {ItemModalForm} from "./item-modal-form";
import {Badge} from "@/components/ui/badge";
import {useItemGroupStore} from "@/hooks/stores/useItemGroupStore";
import ItemModalSkeleton from "@/components/borrow/presentational/item-modal-skeleton";
import {specificItemGroupDataIsFetching} from "@/signals/shared-signals";

interface ISpecificItemModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalItem: IItem | undefined;
}

// TODO: Implement URL reading instead of useState

export default function ItemModal() {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [shouldTruncate, setShouldTruncate] = useState(false);

  const {itemGroupId, showItemGroupModal} = getURLParams();

  const {getItemGroupById} = useItemGroupStore();

  const specificItemGroup: IItemGroup | undefined = getItemGroupById(
      itemGroupId || ""
  );

  const handleCloseModal = () => {
    const newUrl = updateURLParams({
      "item-group-id": "",
      "show-item-group-modal": 0,
    });
    window.history.pushState({}, '', newUrl);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (specificItemGroup?.description) {
      setShouldTruncate(specificItemGroup.description.length > 150);
    }
  }, [specificItemGroup]);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
      specificItemGroupDataIsFetching.value ?
          (
              <ItemModalSkeleton open={showItemGroupModal} onOpenChange={handleOpenChange}/>
          ) :
          (
              <Dialog open={showItemGroupModal} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-[900px] max-h-[100dvh] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <img
                          src={specificItemGroup?.image || "/image-placeholder.png"}
                          alt={specificItemGroup?.model_name}
                          width={400}
                          height={300}
                          className="rounded-lg object-cover w-full mt-5 md:mt-0"
                          style={{aspectRatio: "4/3", objectFit: "cover"}}
                      />
                      <DialogTitle className="text-2xl font-bold">
                        {specificItemGroup?.model_name}
                      </DialogTitle>

                      {/*Tags*/}
                      <div className="flex items-center justify-between">
                        <Badge
                            variant={
                              specificItemGroup?.in_circulation === undefined ||
                              specificItemGroup?.in_circulation === 0
                                  ? "destructive"
                                  : "default"
                            }
                        >
                          {specificItemGroup?.in_circulation ||
                          specificItemGroup?.in_circulation === 0
                              ? `${specificItemGroup?.in_circulation} Items Available`
                              : "Unavailable"}
                        </Badge>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {specificItemGroup?.group_category || "No category"}
                          </Badge>
                          <Badge variant="outline">
                            {" "}
                            {specificItemGroup?.department || "No designated office"}
                          </Badge>
                        </div>
                      </div>
                      <div className="max-h-[130px] overflow-y-auto space-y-2">
                        <p className="text-muted-foreground">
                          {shouldTruncate && !isDescriptionExpanded
                              ? truncateDescription(
                                  specificItemGroup?.description ||
                                  "No description available.",
                                  150
                              )
                              : specificItemGroup?.description ||
                              "No description available."}
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
                      {specificItemGroup && (
                          <ItemModalForm
                              item={specificItemGroup}
                              handleCloseItemModal={handleCloseModal}
                          />
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
          )
  );
}
