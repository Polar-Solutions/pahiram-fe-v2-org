// Interface for item details

export interface IBorrowedItemDetail {
    borrowed_item_id: string;
    borrowed_item_status: string;
    apc_id: string;
}

export interface IItem {
    item_group_id: string;
    model_name: string;
    apc_id: string;
    quantity: number;
    start_date: string;
    due_date: string;
    apc_item_id: string;
    details: IBorrowedItemDetail[]; // Array of borrowed item details
}


// Interface for transaction data
export interface ITransacData {
    id: string;
    borrower: string,
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

export interface IGetSpecificEndorsementApiResponse {
    status: boolean;
    data?: IGetSpecificTransactionApiResponseDataValue;
    error?: any;
    method: string;
}

export interface ISpecificTransaction {
    transacId: string;
}

export interface IOfficeTransacData {
    id: string;
    borrower: string,
    custom_transac_id: string;
    endorsed_by: {
        full_name: string;
    } | null;
    status: string;
    purpose: string;
    user_defined_purpose: string | null;
    created_at: string;
}

export interface IOfficeSpecificTransaction {
    item_group_id: string;
    id: string;
    model_name: string;
    quantity: number;
    start_date: string;
    due_date: string;
    borrowed_item_status: string;
    image: string;
    group_category_id: string;
    group_category: string;
    department: string;
    in_circulation: number;
    availability: string;
    description: string;
    status: string;
    apc_item_id: string;
}

export interface IBaseApiResponse<T = any> {
    status: boolean;
    data?: T;
    error?: any;
    method: string;
}

export interface IGetSpecificTransactionItemsApiResponse {
    status: boolean;
    data?: IItemGroup[];
    error?: any;
    method: string;
}

export interface IItemGroup {
    [key: IItemGroupData["model_name"]]: IItemGroupData;
}

export interface IItemGroupData {
    model_name: string;
    is_required_supervisor_approval: boolean;
    quantity: number;
    start_date: string;
    due_date: string;
    items: IItemData[];
}

export interface IItemData {
    borrowed_item_id: string;
    borrowed_item_status: string;
    item_apc_id: string;
    receiver_name?: string;
    remarks_by_receiver?: string | null;
    // Penalized
    penalty: string | null;
    penalty_finalizer?: string | null;
    remarks_by_penalty_finalizer?: string | null;
}