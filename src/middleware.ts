import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = '__session';

const withPathnameHeader = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAdminRoute = pathname.startsWith('/admin');
  const isCustomerRoute = pathname.startsWith('/customer');
  const isAdminLogin = pathname === '/admin/login';
  const isCustomerLogin = pathname === '/customer/login';

  if (isAdminLogin || isCustomerLogin) {
    return withPathnameHeader(request);
  }

  if ((isAdminRoute || isCustomerRoute) && !sessionCookie) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = isAdminRoute ? '/admin/login' : '/customer/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return withPathnameHeader(request);
}

export const config = {
  matcher: ['/admin/:path*', '/customer/:path*'],
};
