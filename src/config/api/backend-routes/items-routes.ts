export const getItemsPaginationEndpoint = (page: number) => {
   return `/item-inventory?page=${page}`;
};

export const getItemsCategoriesEndpoint = (page: number) => {
   return `/categories?page=${page}`;
}