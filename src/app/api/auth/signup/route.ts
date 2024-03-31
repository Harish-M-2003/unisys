import {NextResponse , NextRequest} from "next/server";
import {supabase} from "@/db/supabase-client";
import bcrypt from "bcrypt";


export async function POST(req : NextRequest){

    const {email , password} =  await req.json();

    try {

        const {data , error} = await supabase
        .from("Users")
        .select("email")
        .eq("email" , email);

        if (data && data.length != 0){
            return NextResponse.json({message : "That email is already taken" , success : false});
        } 

        const hash_password = await bcrypt.hash(password , 10);
        const res = await supabase
        .from("Users")
        .insert([
            {email : email , password : hash_password}
        ])

        if (res.error) {
            return NextResponse.json({success : false , message : res.error});
        }

    } catch (error) {
        return NextResponse.json({success : false , message : "something went wrong"});
    }

    return NextResponse.json({success : true , message : "done"})
}