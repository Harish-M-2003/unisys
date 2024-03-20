"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
// import { signIn } from 'next-auth/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LoginForm from '@/_components/login-form'


export default function AuthenticationPage() {

  return (
    <>

      <div className="container relative  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

        <div className=" backgroundDiv relative hidden h-full bg-zinc-900 flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 " />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Twisted Silver Labs
          </div>
          {/* <Image alt='' height={600} width={600} src={}/> */}
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Empower Your Business, Elevate Your Workforce: Seamless Solutions Tailored for Success!
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-lg md:max-w-md sm:max-w-sm ">
          
            <LoginForm/>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>

            </p>
          </div>
        </div>
      </div>
    </>
  )
}

const ErrorMessage = () => {
  return (
    <div className="bg-red-100 border mt-3 border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
      <strong className="font-bold ">Authentication Failed: </strong>

      <span className="block sm:inline">Invalid email and password</span>
    </div>
  );
};