"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { IItemGroup } from "@/lib/interfaces";
import { updateURLParams } from "@/helper/borrow/updateURLParams";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useGetSpecificItemGroupData } from "@/core/data-access/items";
import { useItemGroupStore } from "@/hooks/useItemGroupStore";
import { specificItemGroupDataIsFetching } from "@/signals/shared-signals";

interface IItemCardProps {
  item: IItemGroup;
}

export default function ItemCard({ props }: { props: IItemCardProps }) {
  const { item } = props;

  const { refetch } = useGetSpecificItemGroupData(item.item_group_id);
  const { addItemGroup, itemGroupExists } = useItemGroupStore();

  const handleClickItemGroupCard = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    // Set specificItemGroupDataIsFetching to true to show loading state
    specificItemGroupDataIsFetching.value = true;
    // Push to the URL
    const serializedItem = encodeURIComponent(
      JSON.stringify(item.item_group_id)
    );
    const newUrl = updateURLParams({
      "item-group-id": serializedItem,
      "show-item-group-modal": 1,
    });
    window.history.pushState({}, "", newUrl);

    // Trigger refetching of API
    try {
      if (!itemGroupExists(item.item_group_id)) {
        const refetchResult = await refetch(); // Refetch the data
        // Access API response data
        if (
          refetchResult?.data?.data?.data &&
          refetchResult.status === "success"
        ) {
          addItemGroup(refetchResult?.data?.data?.data); // Insert data into Zustand store
        }
      }
    } catch (error) {
      console.error("Error during refetch", error);
      //     TODO: Use handling server error component @berbs
    } finally {
      specificItemGroupDataIsFetching.value = false;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="w-full h-full flex flex-col cursor-pointer group"
    >
      <Card
        onClick={handleClickItemGroupCard}
        className="w-full h-full flex flex-col cursor-pointer hover:bg-[hsl(var(--primary))] group"
      >
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={item.image || "/image-placeholder.png"}
              alt={item.model_name || "item"}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <h1 className="text-lg font-semibold mt-2 mb-1 dark:group-hover:text-primary-foreground">
            {item.model_name || "Item Group (Item Model)"}
          </h1>
          <div className="text-xs">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">
                {item.group_category || "No category"}
              </Badge>
              <Badge variant="outline">{item.department || "No office"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
