import { ICartItem } from "@/lib/interfaces";
import { ICartItemsStoreState } from "@/lib/interfaces/zustand-store-states";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create the Zustand store
export const useCartStore = create<ICartItemsStoreState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      /**
       * Adds an item to the cart. If the item already exists, increment its quantity.
       * Converts the quantity to a number if it's provided as a string.
       *
       * @param {ICartItem} item - The item to be added to the cart.
       * @returns {void}
       */
      addCartItem: (item: ICartItem): void =>
        set((state) => {
          // Convert item.quantity to a number if it's a string
          const itemQuantity =
            typeof item.quantity === "string"
              ? parseInt(item.quantity, 10)
              : item.quantity;

          // Check if the item already exists in the cart
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.item_group_id === item.item_group_id
          );

          if (existingItem) {
            // If it exists, increment its quantity
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.item_group_id === item.item_group_id
                  ? {
                      ...cartItem,
                      quantity: (cartItem.quantity || 0) + itemQuantity,
                    }
                  : cartItem
              ),
            };
          } else {
            // Otherwise, add the new item with the given quantity
            return {
              cartItems: [
                ...state.cartItems,
                { ...item, quantity: itemQuantity },
              ],
            };
          }
        }),

      /**
       * Removes an item from the cart based on its ID.
       *
       * @param {string} itemGroupId - The ID of the item to be removed.
       * @returns {void}
       */
      removeCartItem: (itemGroupId: string): void =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.item_group_id !== itemGroupId
          ),
        })),

      /**
       * Increments the quantity of an item in the cart by 1.
       *
       * @param {string} itemGroupId - The ID of the item to increment.
       * @returns {void}
       */
      incrementQuantity: (itemGroupId: string): void =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.item_group_id === itemGroupId
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          ),
        })),

      /**
       * Decrements the quantity of an item in the cart by 1, but only if the quantity is greater than 1.
       *
       * @param {string} itemGroupId - The ID of the item to decrement.
       * @returns {void}
       */
      decrementQuantity: (itemGroupId: string): void =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.item_group_id === itemGroupId && (item.quantity || 0) > 1
              ? { ...item, quantity: (item.quantity || 0) - 1 }
              : item
          ),
        })),

      /**
       * Retrieves an item from the cart by its ID.
       *
       * @param {string} itemGroupId - The ID of the item to retrieve.
       * @returns {ICartItem | undefined} - The item if found, otherwise undefined.
       */
      getCartItemById: (itemGroupId: string): ICartItem | undefined => {
        const { cartItems } = get();
        return cartItems.find((item) => item.item_group_id === itemGroupId);
      },

      /**
       * Gets the quantity of a specific item in the cart by its ID.
       *
       * @param {string} itemGroupId - The ID of the item to get the quantity for.
       * @returns {number | null} - The quantity of the item, or null if not found.
       */
      getItemQuantityById: (itemGroupId: string): number | null => {
        const { cartItems } = get();
        const item = cartItems.find(
          (item) => item.item_group_id === itemGroupId
        );
        return item ? item.quantity : null;
      },

      /**
       * Retrieves all items in the cart.
       *
       * @returns {ICartItem[]} - An array of all items in the cart.
       */
      getAllCartItems: (): ICartItem[] => {
        const { cartItems } = get();
        return cartItems;
      },

      /**
       * Clears all items from the cart.
       *
       * @returns {void}
       */
      clearCart: (): void => {
        const { cartItems } = get();
        if (cartItems && cartItems.length > 0) {
          set({
            cartItems: [], // Set cartItems to an empty array to clear the cart
          });
        }
      },

      /**
       * Checks if the cart is empty.
       *
       * @returns {boolean} - True if the cart is empty, otherwise false.
       */
      isCartEmpty: (): boolean => {
        const { cartItems } = get();
        return cartItems.length === 0;
      },
    }),

    {
      name: "cart-items", // Key for persisting the cart state
    }
  )
);
