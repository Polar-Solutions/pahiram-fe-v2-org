import { IItemGroup } from "@/lib/interfaces";
import { IItemGroupStoreState } from "@/lib/interfaces/zustand-store-states";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useItemGroupStore = create<IItemGroupStoreState>()(
  persist(
    (set, get) => ({
      itemGroups: [],

      /**
       * Adds or updates an item group in the store.
       * If the item group already exists, only the `in_circulation` value is updated.
       * If it doesn't exist, a new item group is added.
       *
       * @param {IItemGroup} newItemGroup - The item group to be added or updated.
       * @returns {void}
       */
      addItemGroup: (newItemGroup: IItemGroup): void =>
        set((state) => {
          // Check if item group already exists
          const existingItemGroup = state.itemGroups.find(
            (itemGroup) =>
              itemGroup.item_group_id === newItemGroup.item_group_id
          );

          // If the item group exists, update in_circulation value; otherwise, add a new one
          if (existingItemGroup) {
            return {
              itemGroups: state.itemGroups.map((itemGroup) =>
                itemGroup.item_group_id === newItemGroup.item_group_id
                  ? {
                      ...itemGroup,
                      in_circulation: newItemGroup.in_circulation,
                    }
                  : itemGroup
              ),
            };
          } else {
            // Add new item group
            return {
              itemGroups: [...state.itemGroups, newItemGroup],
            };
          }
        }),

      /**
       * Retrieves specific item group data by its ID.
       *
       * @param {string} itemGroupId - The ID of the item group to retrieve.
       * @returns {IItemGroup | undefined} - The item group if found, otherwise undefined.
       */
      getItemGroupById: (itemGroupId: string): IItemGroup | undefined => {
        const { itemGroups } = get();
        return itemGroups.find(
          (itemGroup) => itemGroup.item_group_id === itemGroupId
        );
      },

      /**
       * Clears all item groups from the store.
       *
       * @returns {void}
       */
      clearItemGroup: (): void => {
        const { itemGroups } = get();
        if (itemGroups && itemGroups.length > 0) {
          set({
            itemGroups: [],
          });
        }
      },

      itemGroupExists: (itemGroupId: string): boolean => {
        const { itemGroups } = get();
        const itemGroup = itemGroups.find(
          (itemGroup) => itemGroup.item_group_id === itemGroupId
        );

        return !!itemGroup;
      },
    }),
    {
      name: "item-groups", // Key for persisting item groups
    }
  )
);
