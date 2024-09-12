"use client";

import { SubmitBorrowRequestContainer } from "@/components/borrow/containers/submit-borrow-request/submit-borrow-request-container";
import Content from "@/components/common/content";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
import { ContentLayout } from "@/components/panel/containers/content-layout";
import { Button } from "@/components/ui/button";
import { submitBorrowRequestAction } from "@/core/actions/submit-borrow-request-action";
import { prepareCartItemsForBorrowSubmission } from "@/helper/prepare-cart-items-for-borrow-submission";
import { useCartStore } from "@/hooks/borrow/useCartStore";
import { useToast } from "@/hooks/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface IFormValues {
  endorser: string;
  purpose: string;
  user_defined_purpose: string;
}

export default function page() {
  const { handleSubmit, control, reset, getValues } = useForm<IFormValues>();
  const { executeAsync, isExecuting } = useAction(submitBorrowRequestAction);
  const { getAllCartItems, clearCart, isCartEmpty } = useCartStore();
  const { toast } = useToast();

  const allCartItems = getAllCartItems();

  const router = useRouter();

  const addMoreAction = () => {
    router.push("/borrow/borrow-items");
  };

  const onSubmit = async () => {
    const formValues: IFormValues = getValues();
    const cartItems = prepareCartItemsForBorrowSubmission(allCartItems);

    try {
      const res = await executeAsync({
        ...formValues,
        items: cartItems,
      });
      // Check if the result contains an error
      if (res?.data?.error) {
        console.log(res?.data?.error);
        if (Array.isArray(res?.data?.error)) {
          res.data.error.forEach((error) => {
            toast({
              variant: "destructive",
              description: error,
            });
          });
          return;
        }

        toast({
          variant: "destructive",
          description: res?.data?.error,
        });
        return;
      }

      // Handle successful result
      toast({
        description: res?.data?.success,
      });
      reset();
      clearCart();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An unexpected error occurred.",
      });
      return;
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
