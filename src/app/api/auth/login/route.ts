import "dotenv/config";
import { supabase } from "@/db/supabase-client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export async function POST(req : NextRequest){

    const {email , password} = await req.json();

    try {

        const {data , error} = await supabase
        .from("Users")
        .select("*")
        .eq("email" , email);

        if (data && data.length != 0){
            const isPasswordValid = await bcrypt.compare(password , data[0].password)
            if ( isPasswordValid === true){

                const token = await jwt.sign({email : email} , process.env.TOKEN!);
                
                const response = NextResponse.json({success : true , message : "logged in"});

                response.cookies.set("unisys_token" , token , {
                    httpOnly : true,
                })

                return response;

            } else {
                return NextResponse.json({success : false , message : "Incorrect password"});
            }

        } else {
            return NextResponse.json({success : false , message : "users does not exists"});
        }

    } catch (error){

    }

    return NextResponse.json({success : true , message : "done"})

}