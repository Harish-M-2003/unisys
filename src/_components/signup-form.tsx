"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link";
import { validateCredentials } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignUpForm() {

    const [error, setError] = useState(false);
    const [loading , setLoading] = useState(false);


    const formSchema = z.object({

        email: z.string().email(),

        password: z.string()
            .min(5, { message: "password must be minimum of length 5" })
            .max(10, { message: "password can be at max 10." }),

        confirm_password: z.string()
            .min(5, { message: "password must be minimum of length 5" })
            .max(10, { message: "password can be at max 10." }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm_password: "",
        },
    })

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {

            const res = await axios.post("/api/auth/signup", {
                email : values.email,
                password : values.password,
            });

            if (res.data.success === true){
                router.push("/");
            } else {
                setError(true);
                setTimeout(() => setError(false) , 3000);
            }

        } catch (error) {

            setError(true);
            setTimeout(() => setError(false), 3000);
        }
        setLoading(false);
    }

    return (

        <Card>
            {
            error && <Alert className="text-red-500">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                    Something went wrong
                </AlertDescription>
            </Alert>
            }

            <CardHeader className="space-y-1">
                <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
                <CardDescription className="text-center">
                    Enter your email and password to login
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" {...field} type="password" />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" {...field} type={"password"} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            (loading)?
                                <Skeleton className="w-full">
                                    <Button className="w-full">
                                        Signing Up
                                    </Button>
                                </Skeleton>
                              :
                                <Button type="submit" className="w-full">Submit</Button>

                        }
                    </form>
                </Form>

            </CardContent>
            <CardFooter className="flex flex-col">
                <p className="mt-2 text-center text-xs text-gray-700">
                    {" "}
                    Already have an account?{" "}
                    <Link href={"/"} className=" text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>

    );
}