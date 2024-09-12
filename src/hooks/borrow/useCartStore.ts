import { ICartItem, IItem } from "@/lib/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItemsState = {
  cartItems: ICartItem[];
  addCartItem: (item: ICartItem) => void;
  removeCartItem: (itemId: string) => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
  getCartItemById: (itemId: string) => ICartItem | undefined;
  getAllCartItems: () => ICartItem[];
  getItemQuantityById: (itemId: string) => number | null;
  clearCart: () => void;
  isCartEmpty: () => boolean;
};

// Create the Zustand store
export const useCartStore = create<CartItemsState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      // Function to add an item to the cart
      addCartItem: (item) =>
        set((state) => {
          // Convert item.quantity to a number if it's a string
          const itemQuantity =
            typeof item.quantity === "string"
              ? parseInt(item.quantity, 10)
              : item.quantity;

          // Check if the item already exists in the cart
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem) {
            // If it exists, increment its quantity
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.id === item.id
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

      // Function to remove an item from the cart by its ID
      removeCartItem: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        })),

      // Function to increment the quantity of an item
      incrementQuantity: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          ),
        })),

      // Function to decrement the quantity of an item
      decrementQuantity: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId && (item.quantity || 0) > 1
              ? { ...item, quantity: (item.quantity || 0) - 1 }
              : item
          ),
        })),

      // Get an item by its ID
      getCartItemById: (itemId: string) => {
        const { cartItems } = get(); // Correctly using get() to access the current state
        return cartItems.find((item) => item.id === itemId);
      },

      // Get an item by its ID
      getItemQuantityById: (itemId: string) => {
        const { cartItems } = get(); // Correctly using get() to access the current state
        const item = cartItems.find((item) => item.id === itemId);
        return item ? item.quantity : null;
      },

      // Get all cart items
      getAllCartItems: () => {
        const { cartItems } = get();
        return cartItems;
      },

      // Clear all items from the cart
      clearCart: () => {
        const { cartItems } = get(); // Access the current state
        if (cartItems && cartItems.length > 0) {
          // Check if cartItems is not empty
          set({
            cartItems: [], // Set cartItems to an empty array to clear the cart
          });
        }
      },

      // Function to check if the cart is empty
      isCartEmpty: () => {
        const { cartItems } = get();
        return cartItems.length === 0;
      },
    }),

    {
      name: "cart_items",
    }
  )
);
