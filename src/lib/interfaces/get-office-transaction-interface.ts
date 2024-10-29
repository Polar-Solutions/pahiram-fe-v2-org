export interface IGetTransactionRequestApiResponse {
    status: boolean;
    data: {
        transactions: ITransactionRequest[];
        current_page: number;
        last_page: number;
        next_page_url: string;
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
    endorsed_by: {
        apc_id: string,
        full_name: string
    },
    apc_id: string;
    custom_transac_id: string;
    borrow_transaction_status: string;
    purpose: string;
    user_defined_purpose: string;
    created_at: string;
    items: IItemTransaction[];
    //   Penalized
    penalized_transaction_status: string;
    remarks_by_return_facilitator: string;
    total_penalty: string;
}

export interface IItemTransaction {
    model_name: string;
    quantity: number;
    start_date: string;
    due_date: string;
}