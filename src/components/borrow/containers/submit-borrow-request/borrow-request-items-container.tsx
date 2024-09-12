"use-client";

import React from "react";
import { DisplayGroupedItemsByOffice } from "../../presentational/display-grouped-items-by-office";

export const BorrowRequestItemsContainer = () => {
  return (
    <div className="flex flex-col gap-4 sm:w-full md:w-[60%] h-full">
   {/* <div className="flex flex-col gap-4 sm:w-full md:w-[60%] h-full max-h-[500px] overflow-y-auto"> */}
      <h5 className="text-xl">Requested items</h5>
      <DisplayGroupedItemsByOffice />
    </div>
  );
};
