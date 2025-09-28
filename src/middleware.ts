import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the user is trying to access admin routes
    if (pathname.startsWith('/admin')) {
        // Skip middleware for login and forgot-password pages
        if (pathname === '/admin/login' || pathname === '/admin/forgot-password') {
            return NextResponse.next();
        }

        // Check for admin token in cookies
        const token = request.cookies.get('accessToken')?.value;


        // If no token, redirect to login
        if (!token) {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
