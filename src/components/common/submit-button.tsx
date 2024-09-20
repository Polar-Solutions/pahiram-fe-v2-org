import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/icons";
import React from "react";
import {cn} from "@/lib/utils";
import {UseFormReturn} from "react-hook-form";

interface ISubmitButtonProps {
    disabled: boolean;
    onClick?: () => void;
    isLoading: boolean;
    label: string;
    isLoadingLabel?: string;
    type?: "submit" | "reset" | "button" | undefined;
    className?: string;
    form?: UseFormReturn<{
        items: { item_group_id: string; quantity: number; start_date: string; return_date: string; }[];
        purpose: string;
        user_defined_purpose: string;
        endorsed_by?: string | undefined;
        apcis_token?: string | undefined;
    }, any, undefined>; // Add this line to accept a form prop
}

export const SubmitButton = ({
                                 disabled,
                                 onClick,
                                 isLoading,
                                 label,
                                 isLoadingLabel = "Loading...",
                                 type = "submit", // Change the default to "submit"
                                 className,
                                 form, // Add this line to destructure the form prop
                             }: ISubmitButtonProps) => {
    return (
        <Button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={cn("text-black", className)}
            {...form} // Add this line to pass the form prop to the Button
        >
            <div className="flex items-center gap-2">
                {isLoading && <LoadingSpinner strokeColor="black" size={14}/>}
                {isLoading ? isLoadingLabel || label : label}
            </div>
        </Button>
    )
}