"use-client";

import React from "react";
import { DisplayGroupedItemsByOffice } from "../../presentational/display-grouped-items-by-office";

export const BorrowRequestItemsContainer = () => {
  return (
    <div className="flex flex-col w-full gap-4 h-full">
      <h5 className="text-xl">Requested items</h5>
      <div className="w-full h-full w-full max-h-[400px] overflow-y-auto">
        <DisplayGroupedItemsByOffice />
      </div>
    </div>
  );
};
