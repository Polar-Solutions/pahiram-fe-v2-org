import { getBorrowRequestsPagination } from "@/core/data-access/requests";

export const getBorrowRequestsPaginationUseCase = async (page: number) => {
  const { data } = await getBorrowRequestsPagination(page);
  return {
    data: {
      borrow_requests: data?.borrow_requests,
      last_page: data?.last_page,
    },
  };
}