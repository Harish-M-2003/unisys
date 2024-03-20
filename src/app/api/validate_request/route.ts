import "dotenv/config";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function GET(req : NextRequest){

    const token = await req.cookies.get("unisys_token")?.value || "";

    try {
        if (token){
        const token_status = jwt.verify(token , process.env.TOKEN!);
        return NextResponse.json({valid : true , data : token_status});
        } else {
            return NextResponse.json({valid : false , message : "Token not found"});
        }

    } catch (error){
        
        const response = NextResponse.json({valid : false , message : "invalid signature"});
        response.cookies.delete("unisys_token");
        return response;
    }
}