export const getBorrowListEndpoint = "/user/borrow-request";

export const getBorrowResourceEndpoint = (resourceId: string) => {
  const endpoint = `/user/borrow-request/${resourceId}`;
  return endpoint;
};

export const getItemGroupBookedDatesEndpoint = (resourceId: string) => {
  const endpoint = `/item-model/${resourceId}/booked-dates`;
  return endpoint;
};
export const postBorrowRequestEndpoint = "/user/borrow-request/submit";

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
