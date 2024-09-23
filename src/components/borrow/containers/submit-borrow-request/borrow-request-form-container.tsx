"use client"

import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {PURPOSE_CONSTANTS, PURPOSE_OPTIONS_CONSTANTS} from "@/CONSTANTS/PURPOSE_CONSTANTS";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useFormContext} from "react-hook-form";
import {requestFormIsSubmitting} from "@/signals/shared-signals";
import React from "react";
import {ComboboxWithNoApiIntegration} from "@/components/common/combobox/combobox-no-api-integration";

export const BorrowRequestFormContainer = () => {

    const form = useFormContext();

    return (
        <div className="flex flex-col gap-4 w-full">
            <h5 className="text-xl">Borrowing details</h5>

            <FormField
                disabled={requestFormIsSubmitting.value}
                control={form.control}
                name="endorsed_by"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Endorser</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                disabled={requestFormIsSubmitting.value}
                control={form.control}
                name="purpose"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Purpose</FormLabel>
                        <ComboboxWithNoApiIntegration
                            isDisabled={requestFormIsSubmitting.value}
                            selectedItem={field.value}
                            onSelect={field.onChange}
                            options={PURPOSE_OPTIONS_CONSTANTS}
                            placeholder="Select purpose"
                        />
                        {/*<Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                        {/*    <FormControl>*/}
                        {/*        <SelectTrigger>*/}
                        {/*            <SelectValue onReset={} placeholder="Select purpose"/>*/}
                        {/*        </SelectTrigger>*/}
                        {/*    </FormControl>*/}
                        {/*    <SelectContent>*/}
                        {/*        {Object.entries(PURPOSE_CONSTANTS).map(([key, {purpose}]) => (*/}
                        {/*            <SelectItem key={key} value={key}>*/}
                        {/*                {purpose}*/}
                        {/*            </SelectItem>*/}
                        {/*        ))}*/}
                        {/*    </SelectContent>*/}
                        {/*</Select>*/}
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                disabled={requestFormIsSubmitting.value}
                control={form.control}
                name="user_defined_purpose"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Specific purpose</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Type your purpose here..."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    );
};