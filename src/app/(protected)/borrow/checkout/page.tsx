"use client";

import {
    SubmitBorrowRequestContainer
} from "@/components/borrow/containers/submit-borrow-request/submit-borrow-request-container";
import Content from "@/components/common/content";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
import {ContentLayout} from "@/components/panel/containers/content-layout";
import {Button} from "@/components/ui/button";
import {submitBorrowRequestAction} from "@/core/actions/submit-borrow-request-action";
import {handleApiClientSideError, IClientSideApiHandlerResponse,} from "@/core/handle-api-client-side-error";
import {useCartStore} from "@/hooks/borrow/useCartStore";
import {useAction} from "next-safe-action/hooks";
import {useRouter} from "next/navigation";
import React from "react";
import {Form} from "@/components/ui/form";
import {BorrowRequestSchema, TBorrowRequestFormValues} from "@/lib/form-schemas/submit-borrow-request-form-schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {requestFormIsSubmitting} from "@/signals/shared-signals";
import {SubmitButton} from "@/components/common/submit-button";
import {prepareCartItemsForBorrowSubmission} from "@/helper/prepare-cart-items-for-borrow-submission";


export default function Page() {
    const {executeAsync, isExecuting} = useAction(submitBorrowRequestAction);
    const {getAllCartItems, clearCart, isCartEmpty} = useCartStore();

    const allCartItems = getAllCartItems();

    const cartItems = prepareCartItemsForBorrowSubmission(allCartItems);

    const form = useForm<TBorrowRequestFormValues>({
        resolver: zodResolver(BorrowRequestSchema),
        defaultValues: {
            purpose: "",
            user_defined_purpose: "",
            items: cartItems
        },
        mode: "onChange"
    });

    const router = useRouter();


    const addMoreAction = () => {
        router.push("/borrow/borrow-items");
    };

    // onSubmit function
    const onSubmit = async () => {
        requestFormIsSubmitting.value = true;
        console.log("submitting", requestFormIsSubmitting.value);

        const formValues: TBorrowRequestFormValues = form.getValues();

        const res = await executeAsync(formValues);
        // Adjust according to actual response structure
        const responseData: IClientSideApiHandlerResponse = {
            success: res?.data?.success,
            error: res?.data?.error,
            isSuccessToast: true,
        };
        handleApiClientSideError(responseData);
        if (res?.data?.success) {
            requestFormIsSubmitting.value = false;
            console.log("submitting", requestFormIsSubmitting.value);
            clearCart();
        } else {
            requestFormIsSubmitting.value = false;
        }

        form.reset();

    };


    return (
        <ContentLayout title="Borrow Items">
            <DynamicBreadcrumbsComponent
                activePage="Submit Borrowing Request"
                items={["Explore Items"]}
            />
            <Content>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, (e) => {
                        console.log(e)
                    })} className="space-y-6">
                        <SubmitBorrowRequestContainer/>


                        {/* Footer items */}
                        <div className="flex flex-row justify-end w-full gap-4">
                            <Button variant="outline" onClick={addMoreAction} type="button">
                                Add more
                            </Button>
                            <SubmitButton
                                disabled={isCartEmpty() || isExecuting}
                                isLoading={isExecuting}
                                label="Submit request"
                                isLoadingLabel="Submitting"
                                type="submit"
                            />
                            {/*<Button*/}
                            {/*    type="submit"*/}
                            {/*    disabled={isCartEmpty() || isExecuting}*/}
                            {/*    className={cn("text-black")}*/}
                            {/*>*/}
                            {/*    <div className="flex items-center gap-2">*/}
                            {/*        {isExecuting && <LoadingSpinner strokeColor="black" size={14}/>}*/}
                            {/*        {isExecuting ? "Submitting" : "Submit Button"}*/}
                            {/*    </div>*/}
                            {/*</Button>*/}
                        </div>
                    </form>
                </Form>

            </Content>
        </ContentLayout>
    );
}