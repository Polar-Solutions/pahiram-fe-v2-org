"use client";

import React, { useRef } from "react";
import { BorrowRequestFormContainer } from "./borrow-request-form-container";
import { motion } from "framer-motion";
import { BorrowRequestItemsContainer } from "./borrow-request-items-container";

export const SubmitBorrowRequestContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-3xl">Borrowing Request</h3>
      <div className="w-full flex flex-col sm:flex-row gap-8">
        <BorrowRequestFormContainer />
        <BorrowRequestItemsContainer />
      </div>
    </motion.div>
  );
};
