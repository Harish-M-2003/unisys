import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getValidToken() {

    const token = cookies().get("unisys_token")?.value || "";

    try {
        const token_data = await jwt.verify(token , process.env.TOKEN!);
        return token_data

    } catch (error){
        return {};
    }


}