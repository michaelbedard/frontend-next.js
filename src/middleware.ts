import {NextRequest, NextResponse} from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";

export default function middleware(request : NextRequest) {
    console.log("MIDDLEWARE")
}
// export default withAuth(
//     function middleware(request : NextRequestWithAuth) {
//         console.log("MIDDLEWARE WITH AUTH")
//
//         if (request.nextUrl.pathname == '/') {
//             return NextResponse.rewrite(
//                 new URL("/home", request.url)
//             )
//         }
//         if (request.nextUrl.pathname.startsWith("/auth/admin")
//         && request.nextauth.token?.role !== "ADMIN") {
//             return NextResponse.rewrite(
//                 new URL("/denied", request.url)
//             )
//         }
//         if (request.nextUrl.pathname.startsWith("/auth/user")
//         && request.nextauth.token?.role !== "ADMIN"
//             && request.nextauth.token?.role !== "MANAGER" ) {
//             new URL("/denied", request.url)
//         }
//
//     },
//     {
//         callbacks : {
//             authorized: () => true
//         }
//     }
// )
//
// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico).*)'
//     ]
// }