"use client";

import React, { useRef } from "react";
import { BorrowRequestFormContainer } from "./borrow-request-form-container";
import { motion } from "framer-motion";
import { BorrowRequestItemsContainer } from "./borrow-request-items-container";
import { Control, useForm } from "react-hook-form";

interface IFormValues {
  endorser: string;
  purpose: string;
  user_defined_purpose: string;
}

interface BorrowRequestFormContainerProps {
  control: Control<IFormValues>;
}

export const SubmitBorrowRequestContainer: React.FC<
  BorrowRequestFormContainerProps
> = ({ control }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-3xl">Borrowing Request</h3>
      <div className="w-full h-full flex flex-col lg:flex-row gap-8 flex-grow">
        <BorrowRequestFormContainer control={control} />
        <BorrowRequestItemsContainer />
      </div>
    </motion.div>
  );
};
