

import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";

export default function middleware(request : NextRequest) {
    const pathname = request.nextUrl.pathname;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', pathname);

    if (pathname == '/') {
        const url = request.nextUrl.clone()
        url.pathname = "/home";

        return NextResponse.redirect(url, {
            headers: requestHeaders,
        });
    }


    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}