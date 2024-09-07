export interface IGetItemsPaginationApiResponse {
  status: boolean;
  data: {
    items: IItem[];
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

export interface IItem {
  id: string;
  image: string;
  model_name: string;
  // TODO: Suggest to change to category and return a string with spaces and not _ as the separator
  group_category_id: string;
  department: string;
  // TODO: Add these attributes in the backend
  in_circulation: number;
  availability: string;
  description: string;
  status: string;
}

export interface ICartItem extends IItem {
  start_date: string;
  return_date: string;
  quantity: number;
}

export interface IAuthCookie {
  user: IUserFromCookie;
  pahiram_token: string;
  apcis_token: string;
  expires_at: string;
  isAuthenticated: string;
}

export interface ILoginInput {
  email: string;
  password: string;
  remember: boolean | undefined;
}

export interface ILoginApiResponse {
  status: boolean;
  data: {
    user: {
      apc_id: string;
      first_name: string;
      last_name: string;
      email: string;
      course: string;
      department: string | null;
      role: string;
      acc_status: string;
      is_admin: boolean;
    };
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

export interface IUserFromCookie {
  apc_id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string | null;
  role: string;
  acc_status: string;
  is_admin: boolean;
}
