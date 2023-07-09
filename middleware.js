import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"



export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {        
        NextResponse.next();
    },
    {
        callbacks: {
            authorized:({ token }) => !!token,
        },
        pages: {
            login: '/auth/login',
            newUser: '/auth/registro',
            error: '/auth/noAccessPage',
        },
        secret: process.env.SECRET_KEY,
    }
)

export const config = { matcher: ["/content/:path*"] }


