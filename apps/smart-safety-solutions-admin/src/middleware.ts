import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { SessionCookies } from 'packages/contexts/src/lib/session/types';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/', '/login'];

/**
 * Routes the user based on their authentication status.
 *
 * @param request incoming request
 * @returns a navigation response
 */
export const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get(SessionCookies.token)?.value;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (path === '/' || (!isLoggedIn && isProtectedRoute)) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (
    isPublicRoute &&
    isLoggedIn &&
    !request.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
