import {
  getBorrowRequestsPagination,
  getEndorsementTransactionPagination,
  getTransactionRequestPagination
} from "@/core/data-access/requests";

export const getBorrowRequestsPaginationUseCase = async (page: number) => {
  const { data } = await getBorrowRequestsPagination(page);
  return {
    data: {
      borrow_requests: data?.borrow_requests,
      last_page: data?.last_page,
    },
  };
}

export const getTransactionRequestPaginationUseCase = async (page: number) => {
  const { data } = await getTransactionRequestPagination(page);
  return { 
    data: { 
      transactions: data?.transactions,
      last_page: data?.last_page,
    }
  }
}

export const getEndorsementTransactionPaginationUseCase = async (page: number) => {
  const { data } = await getEndorsementTransactionPagination(page);
  return {
    data: {
      endorsements: data?.transactions,
      last_page: data?.last_page,
    }
  }
}

