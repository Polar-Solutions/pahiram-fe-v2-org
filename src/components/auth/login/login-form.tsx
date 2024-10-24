"use client";

import {useState} from "react";

import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {useUserStore} from "@/hooks/stores/useUser";

import type {TLoginFormValues} from "@/lib/form-schemas/login-schemas";
import {LoginSchema} from "@/lib/form-schemas/login-schemas";
import {loginUserAction} from "@/core/actions/authentication";
import {useRouter} from 'nextjs-toploader/app';
import {useAction} from "next-safe-action/hooks";
import {FormError} from "@/components/common/form-error";
import {FormSuccess} from "@/components/common/form-success";
import {SubmitButton} from "@/components/common/submit-button";
import {handleApiClientSideError, IClientSideApiHandlerResponse} from "@/core/handle-api-client-side-error";

export default function LoginForm() {

    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string[] | string | Object | undefined>("");

    const {executeAsync, isExecuting} = useAction(loginUserAction);

    const router = useRouter();

    const form = useForm<TLoginFormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const {setUserData} = useUserStore();


    async function onSubmit() {
        const res = await executeAsync(form.getValues());
        const responseData: IClientSideApiHandlerResponse = {
            success: res?.data?.success,
            error: res?.data?.error,
            isSuccessToast: true,
        };
        console.log("responsedata", responseData);

        handleApiClientSideError(responseData);

        console.log("res", res)

        if (res?.data?.success) {
            router.replace("/auth/login");
            setUserData(res?.data?.data?.data?.user);
            form.reset(form.getValues());
        }


    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    disabled={isExecuting}
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>APC Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={isExecuting}
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={isExecuting}
                    control={form.control}
                    name="remember"
                    render={({field}) => (
                        <FormItem className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Remember me for 7 days</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                {success || error ? (
                    <div className="space-y-2">
                        {/*Maps the error if its an array then displays the form error*/}
                        {Array.isArray(error) && error.map((e: string, index: number) => (
                            <FormError message={e} key={index}/>
                        ))}
                        {/*Renders the form error if the error has value and is a string*/}
                        {typeof error === "string" && <FormError message={error}/>}
                        <FormSuccess message={success}/>
                    </div>
                ) : null}

                <SubmitButton
                    disabled={isExecuting || !!success}
                    isLoading={isExecuting || !!success}
                    label="Log in"
                    isLoadingLabel="Logging in"
                    type="submit"
                    className="w-full"
                />

                {/*TODO: Make a terms and condition page*/}
                <FormDescription className="text-center h-[40px]">
                    Upon signing in you accept the terms and conditions.
                </FormDescription>
            </form>
        </Form>
    )
};