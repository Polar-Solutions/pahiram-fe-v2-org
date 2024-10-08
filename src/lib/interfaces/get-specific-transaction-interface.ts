// Interface for item details
 export interface IItem {
    id: string;
    model_name: string;
    quantity: number;
    start_date: string;
    due_date: string;
    borrowed_item_status: string;
  }
  
  // Interface for transaction data
  export interface ITransacData {
    id: string;
    custom_transac_id: string;
    endorsed_by: {
      full_name: string;
    } | null;
    department_acronym: string;
    transac_status: string;
    purpose: string;
    user_defined_purpose: string | null;
    penalty: string | null;
    remarks_by_endorser: string | null;
    remarks_by_approver: string | null;
    created_at: string;
    updated_at: string;
  }
  
  // Interface for the main data object containing transaction and item details
  interface IGetSpecificTransactionApiResponseDataValue {
    transac_data: ITransacData;
    items: IItem;
  }
  
  // Example response type
  export interface IGetSpecificTransactionApiResponse {
    status: boolean;
    data?: IGetSpecificTransactionApiResponseDataValue;
    error?: any;
    method: string;
  }

  export interface ISpecificTransaction {
    transacId: string;
  }
  