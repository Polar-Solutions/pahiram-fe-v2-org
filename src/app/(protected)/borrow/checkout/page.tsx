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
import {prepareCartItemsForBorrowSubmission} from "@/helper/prepare-cart-items-for-borrow-submission";
import {useCartStore} from "@/hooks/borrow/useCartStore";
import {useAction} from "next-safe-action/hooks";
import {useRouter} from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import {Form} from "@/components/ui/form";
import {BorrowRequestSchema, TBorrowRequestFormValues} from "@/lib/form-schemas/submit-borrow-request-form-schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export default function Page() {
    const [debugInfo, setDebugInfo] = useState<string[]>([]);
    const debugInfoRef = useRef<string[]>([]);
    const [isFormValid, setIsFormValid] = useState(false);

    const form = useForm<TBorrowRequestFormValues>({
        resolver: zodResolver(BorrowRequestSchema),
        defaultValues: {
            endorsed_by: "",
            apcis_token: "",
            purpose: "",
            user_defined_purpose: "",
            items: []
        },
        mode: "onChange"
    });

    const {executeAsync, isExecuting} = useAction(submitBorrowRequestAction);
    const {getAllCartItems, clearCart, isCartEmpty} = useCartStore();

    const allCartItems = getAllCartItems();

    const router = useRouter();

    const addDebugInfo = (info: string) => {
        debugInfoRef.current = [...debugInfoRef.current, `${new Date().toISOString()}: ${info}`];
        setDebugInfo(debugInfoRef.current);
        console.log(info); // Also log to console for easier debugging
    };

    useEffect(() => {
        const subscription = form.watch(() => {
            form.trigger().then(isValid => {
                setIsFormValid(isValid);
                addDebugInfo(`Form validation state updated - isValid: ${isValid}`);
            });
        });
        return () => subscription.unsubscribe();
    }, [form]);

    const addMoreAction = () => {
        router.push("/borrow/borrow-items");
    };

    const onSubmit = async (formValues: TBorrowRequestFormValues) => {
        addDebugInfo("onSubmit function called");
        addDebugInfo(`Form values: ${JSON.stringify(formValues)}`);

        const cartItems = prepareCartItemsForBorrowSubmission(allCartItems);
        addDebugInfo(`Prepared cart items: ${JSON.stringify(cartItems)}`);

        try {
            addDebugInfo("Executing submitBorrowRequestAction");
            const result = await executeAsync({...formValues, items: cartItems});
            addDebugInfo(`Action result: ${JSON.stringify(result)}`);

            const responseData: IClientSideApiHandlerResponse = {
                success: result?.data?.success,
                error: result?.data?.error,
                isSuccessToast: true,
            }
            handleApiClientSideError(responseData);

            if (result?.data?.success) {
                addDebugInfo("Form submission successful");
                form.reset();
                clearCart();
            } else {
                addDebugInfo(`Form submission failed: ${result?.data?.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            addDebugInfo(`Error submitting form: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addDebugInfo("Form submit event triggered");
        form.handleSubmit(onSubmit)(e);
    };

    const handleButtonClick = () => {
        addDebugInfo("Submit button clicked");
        addDebugInfo(`Form state - isDirty: ${form.formState.isDirty}, isValid: ${form.formState.isValid}`);
    };

    return (
        <ContentLayout title="Borrow Items">
            <DynamicBreadcrumbsComponent
                activePage="Submit Borrowing Request"
                items={["Explore Items"]}
            />
            <Content>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <SubmitBorrowRequestContainer form={form}/>

                        {/* Footer items */}
                        <div className="flex flex-row justify-end w-full gap-4">
                            <Button variant="outline" onClick={addMoreAction} type="button">
                                Add more
                            </Button>
                            <Button
                                type="submit"
                                disabled={isCartEmpty() || isExecuting || !isFormValid}
                                onClick={handleButtonClick}
                            >
                                {isExecuting ? "Submitting..." : "Submit request"}
                            </Button>
                        </div>
                    </form>
                </Form>

                {/* Debug information */}
                <div className="mt-4 p-2 bg-gray-100 rounded ">
                    <h2 className="font-bold text-black">Debug Information:</h2>
                    <pre className="text-black whitespace-pre-wrap">
                        {debugInfo.map((info, index) => (
                            <div key={index}>{info}</div>
                        ))}
                    </pre>
                </div>
            </Content>
        </ContentLayout>
    );
}