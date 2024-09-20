export const getBorrowListEndpoint = (page: number) => {
  return `/user/borrow-request?page=${page}`;
};


export const getBorrowResourceEndpoint = (resourceId: string) => {
  const endpoint = `/user/borrow-request/${resourceId}`;
  return endpoint;
};

export const getItemGroupBookedDatesEndpoint = (resourceId: string) => {
  const endpoint = `/item-model/${resourceId}/booked-dates`;
  return endpoint;
};
export const postBorrowRequestEndpoint = "/user/borrow-request/submit-V2";

export const patchBorrowRequestEndpoint = (resourceId: string) => {
  const endpoint = `/user/borrow-request/${resourceId}/edit`;
  return endpoint;
};

export const cancelBorrowRequestEndpoint = (resourceId: string) => {
  const endpoint = `/user/borrow-request/${resourceId}/cancel`;
  return endpoint;
};

export const getPenalizedTransacListEndpoint = "/user/penalized-transaction";

export const getSpecificPenalizedTransacEndpoint = (resourceId: string) =>
  `${getPenalizedTransacListEndpoint}/${resourceId}`;

export const getFilteredItemsEndpoint = (resourceId: string) => {
  const endpoint = `/item/${resourceId}`;
  return endpoint;
}

