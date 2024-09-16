export const getItemsPaginationEndpoint = (page: number) => {
   return `/item-group?page=${page}`;
};

export const getItemsCategoriesEndpoint = (page: number) => {
   return `/item-group/category?page=${page}`;
}

export const getSpecificItemGroupEndpoint = (itemGroupId : string) => {
   return `/item-group/${itemGroupId}`;
}