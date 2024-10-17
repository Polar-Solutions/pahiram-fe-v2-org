import { getBorrowRequestsPagination, getTransactionRequestPagination } from "@/core/data-access/requests";

export const getBorrowRequestsPaginationUseCase = async (page: number) => {
  const { data } = await getBorrowRequestsPagination(page);
  return {
    data: {
      borrow_requests: data?.borrow_requests,
      last_page: data?.last_page,
    },
  };
}

export const getTransctionRequestPaginationUseCase = async (page: number) => {
  const { data } = await getTransactionRequestPagination(page);
  return { 
    data: { 
      transactions: data?.transactions,
      last_page: data?.last_page,
    }
  }
}

