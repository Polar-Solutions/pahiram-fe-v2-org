import React from 'react';
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ActionButtonsProps {
    approveText: string;
    declineText: string;
    onApprove: () => Promise<void>;
    onDecline: () => Promise<void>;
    loading?: boolean; // New prop to indicate loading state
    modalTitleApprove?: string;
    modalDescApprove?: string;
    modalTitleDecline?: string;
    modalDescDecline?: string;
}

export default function ActionButton({
    approveText,
    declineText,
    onApprove,
    onDecline,
    loading = false,
    modalTitleApprove = "Are you absolutely sure?",
    modalDescApprove = "This action cannot be undone",
    modalTitleDecline = "Are you absolutely sure?",
    modalDescDecline = "This action cannot be undone",
}: ActionButtonsProps) {
    return (
        <div className='flex gap-2'>
            <ConfirmationDialog
                content={{
                    title: modalTitleApprove,
                    description: modalDescApprove,
                }}
                footerBtns={{
                    cancel: "Cancel",
                    action: approveText,
                    actionFnAsync: onApprove,
                }}
            >
                <Button disabled={loading}>
                    {loading ? (
                        <>
                            <LoadingSpinner />
                            {approveText}
                        </>
                    ) : (
                        <>
                            <svg width="15" height="15" viewBox="0 0 15 15" className="mr-2" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                    fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                                </path>
                            </svg>
                            {approveText}
                        </>
                    )}
                </Button>
            </ConfirmationDialog>

            <ConfirmationDialog
                content={{
                    title: modalTitleDecline,
                    description: modalDescDecline,
                }}
                footerBtns={{
                    cancel: "Cancel",
                    action: declineText,
                    actionFnAsync: onDecline,
                }}
            >
                <Button variant="outline" disabled={loading}>
                    {loading ? (

                        <>
                            <LoadingSpinner/>   
                            {declineText}
                        </>
                    ) : (
                        <>
                            <svg width="15" height="15" viewBox="0 0 15 15" className="mr-2" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                                    fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                                </path>
                            </svg>
                            {declineText}
                        </>
                    )}
                </Button>
            </ConfirmationDialog>
        </div>
    );
}
