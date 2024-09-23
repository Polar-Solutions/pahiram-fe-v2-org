import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/icons";
import React from "react";
import {cn} from "@/lib/utils";

interface ISubmitButtonProps {
    disabled: boolean;
    isLoading: boolean;
    label: string;
    isLoadingLabel?: string;
    type?: "submit" | "reset" | "button" | undefined;
    className?: string;
    // Add this line to accept a form prop
}

export const SubmitButton = ({
                                 disabled,
                                 isLoading,
                                 label,
                                 isLoadingLabel = "Loading...",
                                 type = "submit", // Change the default to "submit"
                                 className,
                             }: ISubmitButtonProps) => {


    return (
        <Button
            type={type}
            disabled={disabled}
            className={cn("text-black", className)}
        >
            <div className="flex items-center gap-2">
                {isLoading && <LoadingSpinner strokeColor="black" size={14}/>}
                {isLoading ? isLoadingLabel || label : label}
            </div>
        </Button>
    )
}