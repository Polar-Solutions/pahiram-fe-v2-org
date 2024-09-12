"use client";

import {useState} from "react";

import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {useUserStore} from "@/hooks/useUser";

import type {FormSchemas} from "@/lib/form-schemas";
import {LoginSchema} from "@/lib/form-schemas";
import {loginUserAction} from "@/core/actions/authentication";
import {useRouter} from "next/navigation";
import {useAction} from "next-safe-action/hooks";
import {FormError} from "@/components/common/form-error";
import {FormSuccess} from "@/components/common/form-success";

export default function LoginForm() {
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string[] | string | Object | undefined>("");

    const {executeAsync, isExecuting} = useAction(loginUserAction);

    const router = useRouter();

    const form = useForm<FormSchemas>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const {setUserData} = useUserStore();

    // TODO: Add loading spinner


    function onSubmit() {
        // execute({
        //     email: "",
        //     password: "",
        //     remember_me: null
        // })
        executeAsync(form.getValues())
            .then((result) => {
                const data = result?.data;
                const message = data?.message;
                const userData = data?.data?.user;
                const success = data?.success;

                if (!success && message) {
                    setError(message);
                    return;
                }

                if (userData) {
                    setSuccess(message);
                    setError("");
                    setUserData(userData);
                }
            })
            .finally(() => {
                router.replace("/auth/login");
            })

        form.reset(form.getValues());
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
                {/*Container for the error and success messages*/}
                {success || error ?
                    <div className="space-y-2">
                        {/*Maps the error if its an array then displays the form error*/}
                        {Array.isArray(error) && error.map((e: string, index: number) => (
                            <FormError message={e} key={index}/>
                        ))}

                        {/*Renders the form error if the error has value and is a string*/}
                        {typeof error === "string" && <FormError message={error}/>}

                        <FormSuccess message={success}/>

                    </div>
                    : null
                }

                <Button
                    type="submit"
                    className="h-[40px] w-full bg-button text-gray-100"
                    disabled={isExecuting || !!success}
                >
                    {isExecuting ? "Logging in" : "Log in"}
                </Button>
                {/*TODO: Make a terms and condition page*/}
                <FormDescription className="text-center">
                    Upon signing in you accept the terms and conditions.
                </FormDescription>
            </form>
        </Form>
    );
}
