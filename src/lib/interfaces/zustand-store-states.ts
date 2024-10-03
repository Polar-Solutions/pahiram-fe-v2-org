import { ICartItem, IItemGroup } from "../interfaces";

export type ICartItemsStoreState = {
  cartItems: ICartItem[];
  addCartItem: (item: ICartItem) => void;
  removeCartItem: (itemId: string) => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
  getCartItemById: (itemId: string) => ICartItem | undefined;
  getAllCartItems: () => ICartItem[];
  getItemQuantityById: (itemId: string) => number | null;
  getAllQuantity: () => number;
  clearCart: () => void;
  isCartEmpty: () => boolean;
};

export type IItemGroupStoreState = {
  itemGroups: IItemGroup[];
  addItemGroup: (itemGroup: IItemGroup) => void;
  getItemGroupById: (itemGroupId: string) => IItemGroup | undefined;
  clearItemGroup: () => void;
  itemGroupExists: (itemGroupId: string) => boolean;
};
