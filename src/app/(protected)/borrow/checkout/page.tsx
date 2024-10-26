"use client";

import {
    SubmitBorrowRequestContainer
} from "@/components/borrow/containers/submit-borrow-request/submit-borrow-request-container";
import Content from "@/components/common/content";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
import {ContentLayout} from "@/components/panel/containers/content-layout";
import {Button} from "@/components/ui/button";
import {submitBorrowRequestAction} from "@/core/actions/submit-borrow-request-action";
import {useCartStore} from "@/hooks/stores/useCartStore";
import {useAction} from "next-safe-action/hooks";
import {useRouter} from 'nextjs-toploader/app';
import React from "react";
import {Form} from "@/components/ui/form";
import {BorrowRequestSchema, TBorrowRequestFormValues,} from "@/lib/form-schemas/submit-borrow-request-form-schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitButton} from "@/components/common/submit-button";
import {prepareCartItemsForBorrowSubmission} from "@/helper/prepare-cart-items-for-borrow-submission";
import {handleSubmitForm} from "./on-submit-borrow-request";
import {extractFormValidationErrorsAndTriggerToast} from "@/helper/extract-form-validation-errors-and-trigger-toast";

export default function Page() {
    const router = useRouter();
    const {cartItems} = useCartStore();
    const {executeAsync, isExecuting} = useAction(submitBorrowRequestAction);

    const {getAllCartItems, clearCart, isCartEmpty} = useCartStore();
    const allCartItems = getAllCartItems();
    const carItemsInSubmission = prepareCartItemsForBorrowSubmission(allCartItems);

    const form = useForm<TBorrowRequestFormValues>({
        resolver: zodResolver(BorrowRequestSchema),
        defaultValues: {
            endorsed_by: "",
            purpose: "",
            user_defined_purpose: "",
            items: carItemsInSubmission,
        },
        mode: "onChange",
    });

    const onSubmit = async () => {
        await handleSubmitForm(form, executeAsync, clearCart);
        router.push("/borrow/manage-requests");
    };

    const addMoreItemsAction = () => {
        router.push("/borrow/borrow-items");
    };

    return (
        <ContentLayout title="Borrow Items">
            <DynamicBreadcrumbsComponent
                activePage="Submit Borrowing Request"
                items={[{name: "Explore Items", url: "/borrow/borrow-items"}]}
            />
            <Content>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, (errors) => {
                            extractFormValidationErrorsAndTriggerToast(errors);
                        })}
                        className="space-y-6"
                    >
                        <SubmitBorrowRequestContainer/>

                        {/* Footer items */}
                        <div className="flex flex-row justify-end w-full gap-4">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={addMoreItemsAction}
                            >
                                Add more items
                            </Button>
                            <SubmitButton
                                disabled={isCartEmpty() || isExecuting}
                                isLoading={isExecuting}
                                label="Submit request"
                                isLoadingLabel="Submitting"
                                type="submit"
                            />
                        </div>
                    </form>
                </Form>
            </Content>
        </ContentLayout>
    );
}
