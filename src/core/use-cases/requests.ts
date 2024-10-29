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

export const getTransactionRequestPaginationUseCase = async (page: number, forceRefetch = false) => {
  // Pass the forceRefetch parameter to the underlying function
  const { data } = await getTransactionRequestPagination(page, forceRefetch);
  return {
    data: {
      transactions: data?.transactions,
      last_page: data?.last_page,
    }
  };
};

export const getPenalizedTransactionRequestPaginationUseCase = async (page: number, forceRefetch = false) => {
  // Pass the forceRefetch parameter to the underlying function
  const { data } = await getTransactionRequestPagination(page, forceRefetch);
  return {
    data: {
      transactions: data?.transactions,
      last_page: data?.last_page,
    }
  };
};



export const getEndorsementTransactionPaginationUseCase = async (page: number) => {
  const { data } = await getEndorsementTransactionPagination(page);
  return {
    data: {
      endorsements: data?.transactions,
      last_page: data?.last_page,
    }
  }
}

