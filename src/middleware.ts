import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequestWithAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // Return early if it's the homepage
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next()
    }

    // Allow access to auth-related pages
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/api/auth")
    ) {
      return NextResponse.next()
    }

    // Check if user is authenticated
    if (!request.nextauth.token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", request.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Always return true to let the middleware handle the logic
        return true
      },
    },
  }
)

// Configure which routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - / (homepage)
     * - /login (auth page)
     * - /api/auth (NextAuth.js paths)
     * - /_next (Next.js internals)
     * - /fonts (public static files)
     * - /favicon.ico, /site.webmanifest (public static files)
     */
    "/((?!api/auth|login|signup|_next|fonts|favicon.ico|site.webmanifest|$).*)",
  ],
}
