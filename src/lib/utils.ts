import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function validateCredentials(
  { email,
    password 
  }: 
  { email: string,
    password: string 
  }) : {
    email : string,
    password : string,
    valid : boolean
  } {

  const emailSchema = z.string().email().safeParse(email);
  const passwordSchema = z.string()
                         .min(5, { message: "password must be minimum of length 5" })
                         .max(10, { message: "password must be maximum of 10." })
                         .safeParse(password);
  
  if (emailSchema.success && passwordSchema.success){

    return {email , password , valid : true}

  } else {
    return {email , password , valid : false };
  }

}