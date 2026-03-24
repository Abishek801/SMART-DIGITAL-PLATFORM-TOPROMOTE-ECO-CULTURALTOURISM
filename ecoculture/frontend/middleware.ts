import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const ROLE_ROUTES = {
  "/super-admin": ["SUPER_ADMIN"],
  "/admin":       ["SUPER_ADMIN", "ADMIN"],
  "/guide":       ["SUPER_ADMIN", "ADMIN", "GUIDE"],
  "/artisan":     ["SUPER_ADMIN", "ADMIN", "ARTISAN"],
  "/dashboard":   ["SUPER_ADMIN", "ADMIN", "TRAVELER"],
  "/shop":        ["TRAVELER", "GUIDE", "ARTISAN", "ADMIN", "SUPER_ADMIN"], // Public but auth needed for some actions
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // 1. Public Routes (Always allowed)
  const isPublicRoute = pathname.startsWith('/auth') || 
                        pathname === '/' || 
                        pathname.startsWith('/destinations') ||
                        pathname.startsWith('/api/public');
                        
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 2. Auth Check
  if (!token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  const userRole = token.role as string;

  // 3. Role-Based Access Control
  for (const [route, allowedRoles] of Object.entries(ROLE_ROUTES)) {
    if (pathname.startsWith(route)) {
      if (!allowedRoles.includes(userRole)) {
        // Redirect to their own dashboard if unauthorized
        const dashboardMap: Record<string, string> = {
          SUPER_ADMIN: '/super-admin/dashboard',
          ADMIN: '/admin/dashboard',
          GUIDE: '/guide/dashboard',
          ARTISAN: '/artisan/studio',
          TRAVELER: '/dashboard'
        };
        return NextResponse.redirect(new URL(dashboardMap[userRole] || '/dashboard', request.url));
      }
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
