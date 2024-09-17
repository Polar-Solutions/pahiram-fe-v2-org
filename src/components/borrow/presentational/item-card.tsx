"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { IItemGroup } from "@/lib/interfaces";
import { updateURLParams } from "@/helper/borrow/updateURLParams";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useGetSpecificItemGroupData } from "@/core/data-access/items";
import { useItemGroupStore } from "@/hooks/useItemGroupStore";

interface IItemCardProps {
  item: IItemGroup;
}

// TODO: Remove scrollbar when opened

export default function ItemCard({ props }: { props: IItemCardProps }) {
  const { item } = props;
  const router = useRouter();

  const { data, isSuccess, isLoading, refetch } = useGetSpecificItemGroupData(
    item.item_group_id
  );
  const { addItemGroup, itemGroupExists } = useItemGroupStore();

  const handleClickItemGroupCard = async () => {
    // Push to the URL
    const serializedItem = encodeURIComponent(
      JSON.stringify(item.item_group_id)
    );
    const newUrl = updateURLParams({
      "item-group-id": serializedItem,
      "show-item-group-modal": 1,
    });
    router.push(newUrl);

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
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="w-full h-full flex flex-col cursor-pointer group"
    >
      <Card
        onClick={() => {
          handleClickItemGroupCard();
        }}
        className="w-full h-full flex flex-col cursor-pointer hover:bg-[hsl(var(--primary))] group"
      >
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={item.image || "/image-placeholder.png"}
              alt={item.model_name || "item"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover rounded-t-lg"
              priority
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
