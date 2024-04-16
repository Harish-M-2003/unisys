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

import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";


export default function LoginForm() {

    const [error, setError] = useState(false);
    const [loading , setLoading] = useState(false);


    const formSchema = z.object({

        email: z.string().email(),

        password: z.string()
            .min(5, { message: "password must be minimum of length 5" })
            .max(10, { message: "password can be at max 10." }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const router = useRouter();
    const [erroreMessage , setErrorMessage] = useState("");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {

            const res = await axios.post("/api/auth/login", {
                email : values.email,
                password : values.password,
            });

            if (res.data.success === true){
                //  Cookies.set("token",res.data.token)
                localStorage.setItem("unisys_token" , res.data.token);
                router.push("/home");
            } else {
                setError(true);
                setErrorMessage(res.data.message);
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
                    {erroreMessage}
                </AlertDescription>
            </Alert>
            }

            <CardHeader className="space-y-1">
                <CardTitle className="text-center text-2xl">Sign In</CardTitle>
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
                        
                        {
                            (loading)?
                                <Skeleton className="w-full">
                                    <Button className="w-full">
                                        Signing In
                                    </Button>
                                </Skeleton>
                              :
                                <Button type="submit" className="w-full">Sign In</Button>

                        }
                    </form>
                </Form>

            </CardContent>
            <CardFooter className="flex flex-col">
                
            <p className="mt-2 text-xs text-center text-gray-700">
                  {" "}
                  Don&apos;t have an account?{" "}
                  <Link href={"/auth/signup"} className=" text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </p>
            </CardFooter>
        </Card>

    );
}