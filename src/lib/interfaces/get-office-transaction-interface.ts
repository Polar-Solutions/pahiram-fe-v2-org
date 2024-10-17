export interface IGetTransactionRequestApiResponse {
    status: boolean;
    data: {
      transactions: ITransactionRequest[];
      current_page: number;
      last_page: number;
      next_page_url: string;
      path: string;
      per_page: number;
      prev_page_url: string;
      to: number;
      total: number;
    };
    method: "GET";
  }
  
  export interface ITransactionRequest {
    id: string;
    borrower: string;
    apc_id: string;
    custom_transac_id: string;
    status: string;
    purpose: string;
    user_defined_purpose: string;
    created_at: string;
    updated_at: string;
    items: IItemTransaction[];
  }
  
  export interface IItemTransaction {
    model_name: string;
    quantity: number;
    start_date: string;
    due_date: string;
  }