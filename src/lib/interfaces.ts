export interface IGetItemsCategoriesApiResponse {
  status: boolean;
  data: {
    categories: IItemCategory[];
    current_page: number;
    last_page: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
  };
  method: "GET";
}

export interface IItemCategory {
  id: string;
  category_name: string;
  is_consumable: boolean;
}

export interface IGetItemsPaginationApiResponse {
  status: boolean;
  data: {
    items: IItemGroup[];
    current_page: number;
    last_page: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: string;
    total: number;
  };
  method: string;
}

// this is not an item. The attributes are for ITEM_GROUPS
// Change this later
export interface IItem {
  id: string;
  image: string;
  model_name: string;
  group_category_id: string;
  group_category: string;
  department: string;
  in_circulation: number;
  availability: string;
  description: string;
  status: string;
}

// This is much better for naming 
export interface IItemGroup {
  item_group_id: string;
  image: string;
  model_name: string;
  group_category_id: string;
  group_category: string;
  department: string;
  in_circulation: number;
  availability: string;
  description: string;
  status: string;
}

export interface ICartItem extends IItemGroup {
  start_date: string;
  return_date: string;
  quantity: number;
}

export interface IAuthCookie {
  user: IUser;
  pahiram_token: string;
  apcis_token: string;
  expires_at: string;
  is_authenticated: string;
}

export interface ILoginInput {
  email: string;
  password: string;
  remember_me: boolean | undefined;
}

export interface ILoginApiResponse {
  status: boolean;
  mesage?: string;
  data: {
    user: IUser;
    pahiram_token: string;
    apcis_token: string;
  };
  method: string;
}

export interface ILoginOutput {
  success: boolean;
  data?: ILoginApiResponse["data"];
  message: string;
  errors?: { [key: string]: string };
}

export interface IUser {
  apc_id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string | null;
  role: string;
  acc_status: string;
  is_admin: boolean;
}
