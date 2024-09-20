"use client";

import { SubmitBorrowRequestContainer } from "@/components/borrow/containers/submit-borrow-request/submit-borrow-request-container";
import Content from "@/components/common/content";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
import { ContentLayout } from "@/components/panel/containers/content-layout";
import { Button } from "@/components/ui/button";
import { submitBorrowRequestAction } from "@/core/actions/submit-borrow-request-action";
import {
  handleApiClientSideError,
  IClientSideApiHandlerResponse,
} from "@/core/handle-api-client-side-error";
import { prepareCartItemsForBorrowSubmission } from "@/helper/prepare-cart-items-for-borrow-submission";
import { useCartStore } from "@/hooks/borrow/useCartStore";
import { useToast } from "@/hooks/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IFormValues {
  endorser: string;
  purpose: string;
  user_defined_purpose: string;
}

export default function page() {
  const { handleSubmit, control, reset, getValues } = useForm<IFormValues>();
  const { executeAsync, isExecuting } = useAction(submitBorrowRequestAction);
  const { getAllCartItems, clearCart, isCartEmpty } = useCartStore();

  const allCartItems = getAllCartItems();

  const router = useRouter();

  const addMoreAction = () => {
    router.push("/borrow/borrow-items");
  };

  const onSubmit = async () => {
    const formValues: IFormValues = getValues();
    const cartItems = prepareCartItemsForBorrowSubmission(allCartItems);

    const res = await executeAsync({
      ...formValues,
      items: cartItems,
    });
    // Adjust according to actual response structure
    const responseData: IClientSideApiHandlerResponse = {
      success: res?.data?.success,
      error: res?.data?.error,
      isSuccessToast: true,
    };
    handleApiClientSideError(responseData);
    if (res?.data?.success) {
      reset();
      clearCart();
    }
  };

  return (
    <ContentLayout title="Borrow Items">
      <DynamicBreadcrumbsComponent
        activePage="Submit Borrowing Request"
        items={["Explore Items"]}
      />
      <Content>
        {/* Main Content */}
          <SubmitBorrowRequestContainer control={control} />

          {/* Footer items */}
          <div className="flex flex-row justify-end w-full gap-4">
            <Button variant="outline" onClick={addMoreAction}>
              Add more
            </Button>
            <Button
              className="text-black"
              disabled={isCartEmpty() || isExecuting}
              onClick={handleSubmit(onSubmit)}
            >
              Submit request
            </Button>
          </div>
      </Content>
    </ContentLayout>
  );
}
