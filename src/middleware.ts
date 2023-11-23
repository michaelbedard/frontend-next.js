

import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";

export default function middleware(request : NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);

    return NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        }
    });

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}