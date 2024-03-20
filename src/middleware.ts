
import { NextRequest, NextResponse } from 'next/server'
import axios from "axios";
// import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = request.cookies.get("unisys_token")?.value || '';

    if (!token){
      return NextResponse.redirect(new URL("/" , request.url));
    }

    // console.log(isValidToken(token))
    // if (request.nextUrl.pathname.startsWith('/')) {
    //     return NextResponse.rewrite(new URL('/home', request.url))
    // }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/home',
    '/m-chat'
  ],
}